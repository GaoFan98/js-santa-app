import axios from 'axios';
import { createErrorResponse, ERROR_MESSAGES } from './errorService';
import { ValidationResult } from '../types';

const calculateAge = (birthdate: string): number => {
  const birthDate = new Date(birthdate);
  const difference = Date.now() - birthDate.getTime();
  const ageDate = new Date(difference); 
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const validateChild = async (childId: string): Promise<ValidationResult> => { 
  try {
    const userProfiles = await axios.get('https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json');
    const users = await axios.get('https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json');

    const user = users.data.find((u: any) => u.uid === childId);
    if (!user) {
      return createErrorResponse('CHILD_NOT_REGISTERED');
    }

    const profile = userProfiles.data.find((p: any) => p.userUid === user.uid);
    if (!profile) {
      return createErrorResponse('CHILD_PROFILE_NOT_FOUND');
    }

    const age = calculateAge(profile.birthdate);
    if (age > 10) {
      return createErrorResponse('CHILD_TOO_OLD');
    }

    return { 
      isValid: true, 
      childName: user.username, 
      childAddress: profile.address  
    };
  } catch (error) {
    return createErrorResponse('VALIDATION_SERVICE_ERROR');
  }
};

export default { validateChild };
