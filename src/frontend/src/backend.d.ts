import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface OTPAttempt {
    timestamp: bigint;
    success: boolean;
    phoneNumber: string;
}
export interface Survey {
    id: string;
    age: bigint;
    otp: string;
    modeOfPayment: string;
    insuranceType?: string;
    digitalSignature?: ExternalBlob;
    yearsOfExperienceGroup: string;
    panchayat: string;
    servingArea?: string;
    servingCity?: string;
    employerName?: string;
    timestamp: bigint;
    category: Category;
    aadhaarHash?: string;
    block: string;
    servingPincode?: string;
    phoneNumber: string;
    otpStatus: OTPStatus;
    servingPanchayat?: string;
}
export interface UserProfile {
    name: string;
}
export interface SMSPayload {
    messageType: Variant_otp_confirmation;
    message: string;
    timestamp: bigint;
    phoneNumber: string;
}
export enum Category {
    banking = "banking",
    aadhaar = "aadhaar",
    insurance = "insurance"
}
export enum OTPStatus {
    verified = "verified",
    expired = "expired",
    pending = "pending"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_otp_confirmation {
    otp = "otp",
    confirmation = "confirmation"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    exportSurveyData(): Promise<Array<Survey>>;
    generateOTP(phoneNumber: string): Promise<string>;
    getAllSurveys(): Promise<Array<Survey>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCategoryAnalytics(): Promise<Array<[Category, bigint]>>;
    getCompletionStats(): Promise<{
        total: bigint;
        rate: number;
        completed: bigint;
    }>;
    getOTPLogs(phoneNumber: string | null): Promise<Array<OTPAttempt>>;
    getSMSPayloads(phoneNumber: string | null): Promise<Array<SMSPayload>>;
    getSurvey(id: string): Promise<Survey>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getVerificationStats(): Promise<{
        verified: bigint;
        unverified: bigint;
    }>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitSurvey(survey: Survey): Promise<void>;
    verifyOTP(phoneNumber: string, otp: string, surveyId: string): Promise<boolean>;
}
