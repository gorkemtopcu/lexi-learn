import { supabase } from "@/lib/supabase-client";
import { WordData } from "@/services/dictionary-api/types";
import { handleAuthError, isAuthError } from "@/lib/auth-error-handler";

/**
 * Handles errors from Supabase operations with proper auth error handling
 */
function handleSupabaseError(error: unknown): string {
  if (isAuthError(error)) {
    const authErrorResult = handleAuthError(error);
    return authErrorResult.userFriendlyMessage;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
}

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
      return { success: false, error: handleSupabaseError(error) };
    }
    
    return { success: true };
  } catch (err) {
    return { success: false, error: handleSupabaseError(err) };
  }
}

/**
 * Fetches a page of saved words for a user from Supabase.
 * @param userId - The authenticated user's UUID
 * @param options - Pagination options: limit and offset
 * @returns Promise<{ words: WordData[]; total: number; error?: string }>
 */
export async function getSavedWords(
  userId: string,
  { limit = 20, offset = 0 }: { limit?: number; offset?: number } = {}
): Promise<{ words: WordData[]; total: number; error?: string }> {
  try {
    const { data, error, count } = await supabase
      .from("saved_words")
      .select("word_data", { count: "exact" })
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);
      
    if (error) {
      return { words: [], total: 0, error: handleSupabaseError(error) };
    }
    
    const words = (data ?? []).map((row: { word_data: WordData }) => row.word_data);
    return { words, total: count ?? 0 };
  } catch (err) {
    return { words: [], total: 0, error: handleSupabaseError(err) };
  }
}

/**
 * Searches saved words for a user in Supabase.
 * @param userId - The authenticated user's UUID
 * @param searchQuery - The search query to match against word names
 * @param options - Pagination options: limit and offset
 * @returns Promise<{ words: WordData[]; total: number; error?: string }>
 */
export async function searchSavedWords(
  userId: string,
  searchQuery: string,
  { limit = 20, offset = 0 }: { limit?: number; offset?: number } = {}
): Promise<{ words: WordData[]; total: number; error?: string }> {
  try {
    const { data, error, count } = await supabase
      .from("saved_words")
      .select("word_data", { count: "exact" })
      .eq("user_id", userId)
      .ilike("word", `%${searchQuery}%`)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);
      
    if (error) {
      return { words: [], total: 0, error: handleSupabaseError(error) };
    }
    
    const words = (data ?? []).map((row: { word_data: WordData }) => row.word_data);
    return { words, total: count ?? 0 };
  } catch (err) {
    return { words: [], total: 0, error: handleSupabaseError(err) };
  }
}

/**
 * Removes a saved word for a user in Supabase.
 * @param userId - The authenticated user's UUID
 * @param word - The word to remove
 * @returns Promise<{ success: boolean; error?: string }>
 */
export async function unsaveWord(userId: string, word: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from("saved_words")
      .delete()
      .eq("user_id", userId)
      .eq("word", word);
      
    if (error) {
      return { success: false, error: handleSupabaseError(error) };
    }
    
    return { success: true };
  } catch (err) {
    return { success: false, error: handleSupabaseError(err) };
  }
} 