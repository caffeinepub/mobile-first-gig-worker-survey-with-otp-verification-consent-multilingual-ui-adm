import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Char "mo:core/Char";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Int "mo:core/Int";



actor {
  include MixinStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  type Category = { #banking; #insurance; #aadhaar };
  type OTPStatus = { #pending; #verified; #expired };

  public type Survey = {
    id : Text;
    category : Category;
    phoneNumber : Text;
    otp : Text;
    otpStatus : OTPStatus;
    aadhaarHash : ?Text;
    digitalSignature : ?Storage.ExternalBlob;
    timestamp : Int;

    // New Fields
    age : Nat;
    yearsOfExperienceGroup : Text;
    modeOfPayment : Text;
    employerName : ?Text;
    insuranceType : ?Text;
    panchayat : Text;
    block : Text;
    servingCity : ?Text;
    servingArea : ?Text;
    servingPanchayat : ?Text;
    servingPincode : ?Text;
  };

  public type OTPAttempt = {
    phoneNumber : Text;
    timestamp : Int;
    success : Bool;
  };

  public type SMSPayload = {
    phoneNumber : Text;
    message : Text;
    timestamp : Int;
    messageType : { #otp; #confirmation };
  };

  public type RateLimitEntry = {
    phoneNumber : Text;
    attempts : Nat;
    lastAttempt : Int;
  };

  public type OTPRecord = {
    otp : Text;
    timestamp : Int;
    expiry : Int;
    attempts : Nat;
  };

  module Survey {
    public func compare(survey1 : Survey, survey2 : Survey) : Order.Order {
      Text.compare(survey1.id, survey2.id);
    };
  };

  let surveys = Map.empty<Text, Survey>();
  let otpAttempts = Map.empty<Text, [OTPAttempt]>();
  let smsPayloads = Map.empty<Text, [SMSPayload]>();
  let rateLimits = Map.empty<Text, RateLimitEntry>();
  let otps = Map.empty<Text, OTPRecord>();

  func padLeft(text : Text, length : Nat, padChar : Char) : Text {
    let currentLength = text.size();
    if (currentLength >= length) {
      return text;
    };

    let paddingLength = if (length > currentLength) {
      length - currentLength;
    } else {
      0;
    };

    let paddingText = Text.fromIter(Array.repeat(padChar, paddingLength).values());
    paddingText # text;
  };

  public shared ({ caller }) func submitSurvey(survey : Survey) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can submit surveys");
    };

    let persistedSurvey : Survey = {
      id = survey.id;
      category = survey.category;
      phoneNumber = survey.phoneNumber;
      otp = survey.otp;
      otpStatus = survey.otpStatus;
      aadhaarHash = survey.aadhaarHash;
      digitalSignature = survey.digitalSignature;
      timestamp = survey.timestamp;
      age = survey.age;
      yearsOfExperienceGroup = survey.yearsOfExperienceGroup;
      modeOfPayment = survey.modeOfPayment;
      employerName = survey.employerName;
      insuranceType = survey.insuranceType;
      panchayat = survey.panchayat;
      block = survey.block;
      servingCity = survey.servingCity;
      servingArea = survey.servingArea;
      servingPanchayat = survey.servingPanchayat;
      servingPincode = survey.servingPincode;
    };

    surveys.add(survey.id, persistedSurvey);
  };

  public shared ({ caller }) func generateOTP(phoneNumber : Text) : async Text {
    // Rate limiting check
    let now = Time.now();
    switch (rateLimits.get(phoneNumber)) {
      case (?entry) {
        let timeDiff = now - entry.lastAttempt;
        if (timeDiff < 60_000_000_000 and entry.attempts >= 3) {
          Runtime.trap("Rate limit exceeded. Please try again later.");
        };
      };
      case null {};
    };

    // Generate 6-digit OTP with leading zeros
    let rawOTP = (Int.abs(now) % 1000000).toText();
    let paddedOTP = padLeft(rawOTP, 6, '0');

    // Save OTP record with expiry timestamp (e.g., 5 minutes)
    let otpRecord : OTPRecord = {
      otp = paddedOTP;
      timestamp = now;
      expiry = now + 300_000_000_000;
      attempts = 0;
    };
    otps.add(phoneNumber, otpRecord);

    // Update rate limits
    let newEntry : RateLimitEntry = {
      phoneNumber = phoneNumber;
      attempts = switch (rateLimits.get(phoneNumber)) {
        case (?entry) { entry.attempts + 1 };
        case null { 1 };
      };
      lastAttempt = now;
    };
    rateLimits.add(phoneNumber, newEntry);

    // Log SMS payload for OTP
    let smsPayload : SMSPayload = {
      phoneNumber = phoneNumber;
      message = "Your OTP is: " # paddedOTP;
      timestamp = now;
      messageType = #otp;
    };
    let existingPayloads = switch (smsPayloads.get(phoneNumber)) {
      case (?payloads) { payloads };
      case null { [] };
    };
    smsPayloads.add(phoneNumber, existingPayloads.concat([smsPayload]));

    paddedOTP;
  };

  public shared ({ caller }) func verifyOTP(phoneNumber : Text, otp : Text, surveyId : Text) : async Bool {
    let now = Time.now();

    // Log attempt (always)
    let attempt : OTPAttempt = {
      phoneNumber = phoneNumber;
      timestamp = now;
      success = false;
    };

    let existingAttempts = switch (otpAttempts.get(phoneNumber)) {
      case (?attempts) { attempts };
      case null { [] };
    };
    otpAttempts.add(phoneNumber, existingAttempts.concat([attempt]));

    switch (otps.get(phoneNumber)) {
      case (?storedOTP) {
        // Check for expiry
        if (now > storedOTP.expiry) {
          Runtime.trap("OTP expired. Please request a new one.");
        };

        // Validate OTP
        if (otp == storedOTP.otp) {
          // Log successful attempt
          let successAttempt : OTPAttempt = {
            phoneNumber = phoneNumber;
            timestamp = now;
            success = true;
          };
          let existingAttempts = switch (otpAttempts.get(phoneNumber)) {
            case (?attempts) { attempts };
            case null { [] };
          };
          otpAttempts.add(phoneNumber, existingAttempts.concat([successAttempt]));
          return true;
        } else {
          // Max attempts check (optional)
          if (storedOTP.attempts >= 3) {
            otps.remove(phoneNumber);
            Runtime.trap("Maximum OTP attempts exceeded. Please request a new OTP.");
          };

          // Update attempt count and return failure
          let updatedOTP : OTPRecord = {
            otp = storedOTP.otp;
            timestamp = storedOTP.timestamp;
            expiry = storedOTP.expiry;
            attempts = storedOTP.attempts + 1;
          };
          otps.add(phoneNumber, updatedOTP);

          return false;
        };
      };
      case null {
        return false;
      };
    };
  };

  // Admin-only: View individual survey for privacy protection
  // Authorization: Admin only
  public query ({ caller }) func getSurvey(id : Text) : async Survey {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view survey details");
    };
    switch (surveys.get(id)) {
      case (null) { Runtime.trap("Survey not found") };
      case (?survey) { survey };
    };
  };

  // Admin-only: View all surveys
  // Authorization: Admin only
  public query ({ caller }) func getAllSurveys() : async [Survey] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all surveys");
    };
    surveys.values().toArray().sort();
  };

  // Admin-only: Get category-wise analytics
  // Authorization: Admin only
  public query ({ caller }) func getCategoryAnalytics() : async [(Category, Nat)] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view analytics");
    };

    var bankingCount = 0;
    var insuranceCount = 0;
    var aadhaarCount = 0;

    for (survey in surveys.values()) {
      switch (survey.category) {
        case (#banking) { bankingCount += 1 };
        case (#insurance) { insuranceCount += 1 };
        case (#aadhaar) { aadhaarCount += 1 };
      };
    };

    [(#banking, bankingCount), (#insurance, insuranceCount), (#aadhaar, aadhaarCount)];
  };

  // Admin-only: Get verified vs unverified counts
  // Authorization: Admin only
  public query ({ caller }) func getVerificationStats() : async { verified : Nat; unverified : Nat } {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view verification stats");
    };

    var verifiedCount = 0;
    var unverifiedCount = 0;

    for (survey in surveys.values()) {
      switch (survey.otpStatus) {
        case (#verified) { verifiedCount += 1 };
        case (#pending or #expired) { unverifiedCount += 1 };
      };
    };

    { verified = verifiedCount; unverified = unverifiedCount };
  };

  // Admin-only: Get OTP verification logs
  // Authorization: Admin only
  public query ({ caller }) func getOTPLogs(phoneNumber : ?Text) : async [OTPAttempt] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view OTP logs");
    };

    switch (phoneNumber) {
      case (?phone) {
        switch (otpAttempts.get(phone)) {
          case (?attempts) { attempts };
          case null { [] };
        };
      };
      case null {
        var allAttempts : [OTPAttempt] = [];
        for (attempts in otpAttempts.values()) {
          allAttempts := allAttempts.concat(attempts);
        };
        allAttempts;
      };
    };
  };

  // Admin-only: Get SMS payloads for verification
  // Authorization: Admin only
  public query ({ caller }) func getSMSPayloads(phoneNumber : ?Text) : async [SMSPayload] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view SMS payloads");
    };

    switch (phoneNumber) {
      case (?phone) {
        switch (smsPayloads.get(phone)) {
          case (?payloads) { payloads };
          case null { [] };
        };
      };
      case null {
        var allPayloads : [SMSPayload] = [];
        for (payloads in smsPayloads.values()) {
          allPayloads := allPayloads.concat(payloads);
        };
        allPayloads;
      };
    };
  };

  // Admin-only: Export survey data (returns surveys for CSV generation on frontend)
  // Authorization: Admin only
  public query ({ caller }) func exportSurveyData() : async [Survey] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can export data");
    };
    surveys.values().toArray().sort();
  };

  // Admin-only: Get completion rate metrics
  // Authorization: Admin only
  public query ({ caller }) func getCompletionStats() : async { total : Nat; completed : Nat; rate : Float } {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view completion stats");
    };

    let total = surveys.size();
    var completed = 0;

    for (survey in surveys.values()) {
      if (survey.otpStatus == #verified) {
        completed += 1;
      };
    };

    let rate = if (total > 0) {
      completed.toFloat() / total.toFloat();
    } else {
      0.0;
    };

    { total = total; completed = completed; rate = rate };
  };
};
