import axios from 'axios';
import { DictionaryApiResponse, DictionaryServiceResult } from './types';
import { mapApiResponseToWordData } from './mapper';

const API_BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

/**
 * Fetches word definition from the Dictionary API
 *
 * @param word The word to look up
 * @returns A promise that resolves to a DictionaryServiceResult
 */
export async function fetchWordDefinition(word: string): Promise<DictionaryServiceResult> {
  if (!word.trim()) {
    return {
      data: null,
      error: 'Please enter a word to search'
    };
  }

  try {
    const response = await axios.get<DictionaryApiResponse[]>(
      `${API_BASE_URL}/${encodeURIComponent(word.trim())}`
    );

    if (response.data && response.data.length > 0) {
      try {
        // Map the API response to our WordData interface
        const wordData = mapApiResponseToWordData(response.data[0]);

        // Validate that the mapped data has the required fields
        if (!wordData.word || !wordData.meanings || wordData.meanings.length === 0) {
          console.warn('API returned incomplete data for word:', word);
          return {
            data: null,
            error: `The dictionary returned incomplete information for "${word}".`
          };
        }

        return {
          data: wordData,
          error: null
        };
      } catch (mappingError) {
        console.error('Error mapping API response:', mappingError);
        return {
          data: null,
          error: 'Error processing dictionary data. Please try again later.'
        };
      }
    } else {
      return {
        data: null,
        error: `No results found for "${word}".`
      };
    }
  } catch (err) {
    console.error('Error fetching word data:', err);

    if (axios.isAxiosError(err)) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (err.response?.status === 404) {
        return {
          data: null,
          error: `No definition found for "${word}". Please check your spelling or try another word.`
        };
      } else if (err.response?.status === 429) {
        return {
          data: null,
          error: 'Too many requests to the dictionary API. Please try again in a moment.'
        };
      } else if (err.response?.status >= 500) {
        return {
          data: null,
          error: 'The dictionary service is currently unavailable. Please try again later.'
        };
      } else {
        return {
          data: null,
          error: `Error: ${err.response?.data?.title || err.response?.data?.message || 'Something went wrong'}`
        };
      }
    } else if (err instanceof Error) {
      // Network errors or other issues
      if (err.message.includes('Network Error')) {
        return {
          data: null,
          error: 'Network error. Please check your internet connection and try again.'
        };
      }

      return {
        data: null,
        error: `An error occurred: ${err.message}`
      };
    } else {
      // Unknown error
      return {
        data: null,
        error: 'An unexpected error occurred. Please try again later.'
      };
    }
  }
}
