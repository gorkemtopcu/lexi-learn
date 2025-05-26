import { saveWord, getSavedWords } from './saved-words';
import { supabase } from '@/lib/supabase-client';
import { WordData } from '@/services/dictionary-api/types';

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
      mockSupabaseFrom.mockReturnValueOnce({
        upsert: jest.fn().mockResolvedValue({ error: { message: 'fail' } })
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
        order: jest.fn().mockResolvedValue({ data: [ { word_data: wordData } ], error: null })
      });
      const result = await getSavedWords(userId);
      expect(result).toEqual({ words: [wordData] });
    });

    it('should return error if fetch fails', async () => {
      mockSupabaseFrom.mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue({ data: null, error: { message: 'fetch error' } })
      });
      const result = await getSavedWords(userId);
      expect(result).toEqual({ words: [], error: 'fetch error' });
    });

    it('should handle exceptions', async () => {
      mockSupabaseFrom.mockImplementationOnce(() => { throw new Error('crash'); });
      const result = await getSavedWords(userId);
      expect(result).toEqual({ words: [], error: 'crash' });
    });
  });
}); 