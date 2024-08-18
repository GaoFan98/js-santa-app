import { validateChildQuery } from '../queries/validateChildQuery';
import axios from 'axios';

jest.mock('axios');

describe('Validation Query', () => {
  const mockUserProfiles = [
    { userUid: '730b0412-72c7-11e9-a923-1681be663d3e', address: 'Address 1', birthdate: '2017/12/05' },
    { userUid: '730b06a6-72c7-11e9-a923-1681be663d3e', address: 'Address 2', birthdate: '1987/01/01' },
  ];

  const mockUsers = [
    { username: 'charlie.brown', uid: '730b0412-72c7-11e9-a923-1681be663d3e' },
    { username: 'james.bond', uid: '730b06a6-72c7-11e9-a923-1681be663d3e' },
  ];

  beforeEach(() => {
    (axios.get as jest.Mock).mockImplementation((url: string) => {
      if (url.includes('userProfiles.json')) {
        return Promise.resolve({ data: mockUserProfiles });
      }
      if (url.includes('users.json')) {
        return Promise.resolve({ data: mockUsers });
      }
    });
  });

  it('should validate a registered child under 10 years old', async () => {
    const result = await validateChildQuery('730b0412-72c7-11e9-a923-1681be663d3e');
    expect(result.isValid).toBe(true);
    expect(result.childName).toBe('charlie.brown');
    expect(result.childAddress).toBe('Address 1');
  });

  it('should return an error for a child not registered', async () => {
    const result = await validateChildQuery('invalid-id');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Child not registered.');
  });

  it('should return an error for a child older than 10 years', async () => {
    const result = await validateChildQuery('730b06a6-72c7-11e9-a923-1681be663d3e');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Child is older than 10 years.');
  });
});
