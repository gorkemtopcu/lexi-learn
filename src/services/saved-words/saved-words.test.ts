import { saveWord, getSavedWords } from './saved-words';
import { supabase } from '@/lib/supabase-client';
import { WordData } from '@/services/dictionary-api/types';

// Mock the auth error handler
jest.mock('@/lib/auth-error-handler', () => ({
  handleAuthError: jest.fn(),
  isAuthError: jest.fn(() => false),
}));

jest.mock('@/lib/supabase-client', () => ({
  supabase: {
    from: jest.fn()
  }
}));

const mockSupabaseFrom = (supabase.from as jest.Mock);

describe('saved-words service', () => {
  const userId = 'user-uuid';
  const wordData: WordData = {
    word: 'example',
    phonetic: '/example/',
    phonetics: [{ text: '/example/', audio: 'audio.mp3' }],
    origin: 'origin info',
    meanings: [
      {
        partOfSpeech: 'noun',
        definitions: [
          {
            definition: 'an example definition',
            example: 'this is an example',
            synonyms: ['sample'],
            antonyms: []
          }
        ]
      }
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('saveWord', () => {
    it('should save a word successfully', async () => {
      mockSupabaseFrom.mockReturnValueOnce({
        upsert: jest.fn().mockResolvedValue({ error: null })
      });
      const result = await saveWord(userId, wordData);
      expect(result).toEqual({ success: true });
      expect(mockSupabaseFrom).toHaveBeenCalledWith('saved_words');
    });

    it('should return error if upsert fails', async () => {
      const errorObj = new Error('fail');
      mockSupabaseFrom.mockReturnValueOnce({
        upsert: jest.fn().mockResolvedValue({ error: errorObj })
      });
      const result = await saveWord(userId, wordData);
      expect(result).toEqual({ success: false, error: 'fail' });
    });

    it('should handle exceptions', async () => {
      mockSupabaseFrom.mockImplementationOnce(() => { throw new Error('crash'); });
      const result = await saveWord(userId, wordData);
      expect(result).toEqual({ success: false, error: 'crash' });
    });
  });

  describe('getSavedWords', () => {
    it('should fetch saved words successfully', async () => {
      mockSupabaseFrom.mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        range: jest.fn().mockResolvedValue({ 
          data: [{ word_data: wordData }], 
          error: null, 
          count: 1 
        })
      });
      const result = await getSavedWords(userId);
      expect(result).toEqual({ words: [wordData], total: 1 });
    });

    it('should return error if fetch fails', async () => {
      const errorObj = new Error('fetch error');
      mockSupabaseFrom.mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        range: jest.fn().mockResolvedValue({ 
          data: null, 
          error: errorObj, 
          count: 0 
        })
      });
      const result = await getSavedWords(userId);
      expect(result).toEqual({ words: [], total: 0, error: 'fetch error' });
    });

    it('should handle exceptions', async () => {
      mockSupabaseFrom.mockImplementationOnce(() => { throw new Error('crash'); });
      const result = await getSavedWords(userId);
      expect(result).toEqual({ words: [], total: 0, error: 'crash' });
    });
  });
}); 