/**
 * Types for the Dictionary API responses and service
 */

// API Response Types
export interface DictionaryApiPhonetic {
  text: string;
  audio?: string;
}

export interface DictionaryApiDefinition {
  definition: string;
  example?: string;
  synonyms: string[];
  antonyms: string[];
}

export interface DictionaryApiMeaning {
  partOfSpeech: string;
  definitions: DictionaryApiDefinition[];
}

export interface DictionaryApiResponse {
  word: string;
  phonetic?: string;
  phonetics?: DictionaryApiPhonetic[];
  origin?: string;
  meanings: DictionaryApiMeaning[];
}

// Application Types (matching the existing WordData interface)
export interface Phonetic {
  text: string;
  audio?: string;
}

export interface Definition {
  definition: string;
  example?: string;
  synonyms: string[];
  antonyms: string[];
}

export interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

export interface WordData {
  word: string;
  phonetic?: string;
  phonetics?: Phonetic[];
  origin?: string;
  meanings: Meaning[];
}

// Error Types
export interface DictionaryApiError {
  title: string;
  message: string;
  resolution: string;
}

// Service Result Types
export interface DictionaryServiceResult {
  data: WordData | null;
  error: string | null;
}
