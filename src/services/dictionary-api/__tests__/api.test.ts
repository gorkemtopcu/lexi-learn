/**
 * Tests for the dictionary API service
 *
 * Note: This is a basic test file structure. In a real application, you would
 * use a testing framework like Jest and mock the axios requests.
 */

import { fetchWordDefinition } from '../api';
import axios from 'axios';

// Mock axios to avoid actual API calls during tests
jest.mock('axios', () => ({
  ...jest.requireActual('axios'),
  get: jest.fn(),
  isAxiosError: jest.fn((payload) => payload && payload.isAxiosError === true)
}));
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Dictionary API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return word data when API call is successful', async () => {
    // Mock successful API response
    const mockApiResponse = {
      data: [
        {
          word: 'test',
          phonetic: '/test/',
          phonetics: [{ text: '/test/', audio: 'test.mp3' }],
          origin: 'origin of test',
          meanings: [
            {
              partOfSpeech: 'noun',
              definitions: [
                {
                  definition: 'a procedure to evaluate quality',
                  example: 'this is a test',
                  synonyms: ['examination', 'assessment'],
                  antonyms: []
                }
              ]
            }
          ]
        }
      ]
    };

    mockedAxios.get.mockResolvedValueOnce(mockApiResponse);

    const result = await fetchWordDefinition('test');

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://api.dictionaryapi.dev/api/v2/entries/en/test'
    );
    expect(result.data).toEqual({
      word: 'test',
      phonetic: '/test/',
      phonetics: [{ text: '/test/', audio: 'test.mp3' }],
      origin: 'origin of test',
      meanings: [
        {
          partOfSpeech: 'noun',
          definitions: [
            {
              definition: 'a procedure to evaluate quality',
              example: 'this is a test',
              synonyms: ['examination', 'assessment'],
              antonyms: []
            }
          ]
        }
      ]
    });
    expect(result.error).toBeNull();
  });

  it('should return error when word is not found', async () => {
    // Mock 404 error response
    const mockError = {
      isAxiosError: true,
      response: {
        status: 404,
        data: { message: 'No definitions found' }
      }
    };

    mockedAxios.get.mockRejectedValueOnce(mockError);

    const result = await fetchWordDefinition('nonexistentword');

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://api.dictionaryapi.dev/api/v2/entries/en/nonexistentword'
    );
    expect(result.data).toBeNull();
    expect(result.error).toBe('No definition found for "nonexistentword". Please check your spelling or try another word.');
  });

  it('should return error when API call fails', async () => {
    // Mock network error
    const mockError = new Error('Network Error');
    mockedAxios.get.mockRejectedValueOnce(mockError);

    const result = await fetchWordDefinition('test');

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://api.dictionaryapi.dev/api/v2/entries/en/test'
    );
    expect(result.data).toBeNull();
    expect(result.error).toBe('Network error. Please check your internet connection and try again.');
  });

  it('should return error when input is empty', async () => {
    const result = await fetchWordDefinition('');

    expect(mockedAxios.get).not.toHaveBeenCalled();
    expect(result.data).toBeNull();
    expect(result.error).toBe('Please enter a word to search');
  });
});
