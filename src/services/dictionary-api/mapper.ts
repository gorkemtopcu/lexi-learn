import { DictionaryApiResponse, WordData } from './types';

/**
 * Maps the Dictionary API response to the application's WordData format
 * 
 * @param apiResponse The raw API response from the Dictionary API
 * @returns A properly formatted WordData object
 */
export function mapApiResponseToWordData(apiResponse: DictionaryApiResponse): WordData {
  return {
    word: apiResponse.word,
    phonetic: apiResponse.phonetic || undefined,
    phonetics: apiResponse.phonetics || [],
    origin: apiResponse.origin || undefined,
    meanings: apiResponse.meanings.map(meaning => ({
      partOfSpeech: meaning.partOfSpeech,
      definitions: meaning.definitions.map(def => ({
        definition: def.definition,
        example: def.example || undefined,
        synonyms: def.synonyms || [],
        antonyms: def.antonyms || []
      }))
    }))
  };
}
