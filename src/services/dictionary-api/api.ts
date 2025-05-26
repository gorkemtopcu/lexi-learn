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

  let response: { data: DictionaryApiResponse[] } | null = null;
  try {
    response = await axios.get<DictionaryApiResponse[]>(
      `${API_BASE_URL}/${encodeURIComponent(word.trim())}`
    );
  } catch (err) {
    if (axios.isAxiosError(err)) {
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
      } else if (err.response?.status && err.response.status >= 500) {
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
      return {
        data: null,
        error: 'An unexpected error occurred. Please try again later.'
      };
    }
  }

  if (!response || !response.data || response.data.length === 0) {
    return {
      data: null,
      error: `No results found for "${word}".`
    };
  }

  try {
    const wordData = mapApiResponseToWordData(response.data[0]);
    if (!wordData.word || !wordData.meanings || wordData.meanings.length === 0) {
      return {
        data: null,
        error: `The dictionary returned incomplete information for "${word}".`
      };
    }
    return {
      data: wordData,
      error: null
    };
  } catch {
    return {
      data: null,
      error: 'Error processing dictionary data. Please try again later.'
    };
  }
}
