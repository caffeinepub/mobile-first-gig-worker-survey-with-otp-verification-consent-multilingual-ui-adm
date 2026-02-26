import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Survey, OTPAttempt, SMSPayload, UserProfile, Category } from '../backend';

export function useGenerateOTP() {
  const { actor } = useActor();
  
  return useMutation({
    mutationFn: async (phoneNumber: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.generateOTP(phoneNumber);
    },
  });
}

export function useVerifyOTP() {
  const { actor } = useActor();
  
  return useMutation({
    mutationFn: async ({ phoneNumber, otp, surveyId }: { phoneNumber: string; otp: string; surveyId: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.verifyOTP(phoneNumber, otp, surveyId);
    },
  });
}

export function useSubmitSurvey() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (survey: Survey) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitSurvey(survey);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['surveys'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });
}

export function useGetAllSurveys() {
  const { actor, isFetching: actorFetching } = useActor();
  
  return useQuery<Survey[]>({
    queryKey: ['surveys'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllSurveys();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetVerificationStats() {
  const { actor, isFetching: actorFetching } = useActor();
  
  return useQuery<{ verified: bigint; unverified: bigint }>({
    queryKey: ['verificationStats'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getVerificationStats();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetCategoryAnalytics() {
  const { actor, isFetching: actorFetching } = useActor();
  
  return useQuery<Array<[Category, bigint]>>({
    queryKey: ['categoryAnalytics'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCategoryAnalytics();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetCompletionStats() {
  const { actor, isFetching: actorFetching } = useActor();
  
  return useQuery<{ total: bigint; completed: bigint; rate: number }>({
    queryKey: ['completionStats'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCompletionStats();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetOTPLogs(phoneNumber?: string | null) {
  const { actor, isFetching: actorFetching } = useActor();
  
  return useQuery<OTPAttempt[]>({
    queryKey: ['otpLogs', phoneNumber],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getOTPLogs(phoneNumber || null);
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetSMSPayloads(phoneNumber?: string | null) {
  const { actor, isFetching: actorFetching } = useActor();
  
  return useQuery<SMSPayload[]>({
    queryKey: ['smsPayloads', phoneNumber],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getSMSPayloads(phoneNumber || null);
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useExportSurveyData() {
  const { actor } = useActor();
  
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.exportSurveyData();
    },
  });
}

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isCallerAdmin();
      } catch {
        return false;
      }
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}
