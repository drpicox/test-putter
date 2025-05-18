import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { challenges, getChallengeById } from '@/features/challenges';
import { setChallenge, selectCurrentChallengeId } from '@/features/editor';
import { setTestCases, resetTests } from '@/features/testing';
import { resetKeystrokes } from '@/features/metrics';

/**
 * Hook for managing challenges
 */
export function useChallenge() {
  const dispatch = useDispatch();
  const currentChallengeId = useSelector(selectCurrentChallengeId);
  const currentChallenge = getChallengeById(currentChallengeId);
  
  /**
   * Change to a new challenge
   */
  const switchChallenge = useCallback((challengeId: string) => {
    const challenge = getChallengeById(challengeId);
    
    if (challenge) {
      // Update the code
      dispatch(setChallenge({
        id: challenge.id,
        template: challenge.template
      }));
      
      // Update the tests
      dispatch(setTestCases(challenge.tests));
      
      // Reset keystrokes and test results
      dispatch(resetKeystrokes());
      dispatch(resetTests());
    }
  }, [dispatch]);
  
  return {
    challenges,
    currentChallenge,
    currentChallengeId,
    switchChallenge
  };
}

export default useChallenge;