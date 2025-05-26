import { supabase } from "@/lib/supabase-client";
import { WordData } from "@/services/dictionary-api/types";

/**
 * Saves a word for a user in Supabase.
 * @param userId - The authenticated user's UUID
 * @param wordData - The WordData object to save
 * @returns Promise<{ success: boolean; error?: string }>
 */
export async function saveWord(userId: string, wordData: WordData): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from("saved_words").upsert([
      {
        user_id: userId,
        word: wordData.word,
        word_data: wordData,
      },
    ], { onConflict: "user_id,word" });
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

/**
 * Fetches all saved words for a user from Supabase.
 * @param userId - The authenticated user's UUID
 * @returns Promise<{ words: WordData[]; error?: string }>
 */
export async function getSavedWords(userId: string): Promise<{ words: WordData[]; error?: string }> {
  try {
    const { data, error } = await supabase
      .from("saved_words")
      .select("word_data")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) {
      return { words: [], error: error.message };
    }
    const words = (data ?? []).map((row: { word_data: WordData }) => row.word_data);
    return { words };
  } catch (err) {
    return { words: [], error: (err as Error).message };
  }
} 