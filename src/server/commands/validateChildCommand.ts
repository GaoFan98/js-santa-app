import { saveEvent } from '../services/eventStoreService';
import { validateChildQuery } from '../queries/validateChildQuery';
import { ValidationResult } from '../types';

export const validateChildCommand = async (childId: string): Promise<ValidationResult> => {
  const validation = await validateChildQuery(childId); 
  await saveEvent('CHILD_VALIDATION', { childId, result: validation }); 
  return validation;
};
