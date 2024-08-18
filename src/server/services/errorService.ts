export const ERROR_MESSAGES = {
    CHILD_NOT_REGISTERED: 'Child not registered.',
    CHILD_PROFILE_NOT_FOUND: 'Child profile not found.',
    CHILD_TOO_OLD: 'Child is older than 10 years.',
    VALIDATION_SERVICE_ERROR: 'Validation service error.',
    BIRTHDATE_MISMATCH: 'Birthdate does not match.',
  };
  
  export const createErrorResponse = (errorKey: keyof typeof ERROR_MESSAGES) => {
    return {
      isValid: false,
      error: ERROR_MESSAGES[errorKey],
    };
  };
  