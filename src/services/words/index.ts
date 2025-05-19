import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { User } from 'firebase/auth';
import { WordData } from '@/services/dictionary/types';

const COLLECTION_NAME = 'savedWords';

/**
 * Save a word to the user's collection
 * 
 * @param user The authenticated user
 * @param wordData The word data to save
 * @returns A promise that resolves when the word is saved
 */
export const saveWord = async (user: User, wordData: WordData): Promise<string> => {
  if (!user) {
    throw new Error('User must be authenticated to save words');
  }

  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      userId: user.uid,
      word: wordData.word,
      data: wordData,
      createdAt: serverTimestamp(),
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error saving word:', error);
    throw new Error('Failed to save word. Please try again.');
  }
};

/**
 * Get all saved words for a user
 * 
 * @param user The authenticated user
 * @returns A promise that resolves to an array of saved words
 */
export const getSavedWords = async (user: User): Promise<WordData[]> => {
  if (!user) {
    return [];
  }

  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('userId', '==', user.uid)
    );
    
    const querySnapshot = await getDocs(q);
    const words: WordData[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      words.push({
        ...data.data,
        id: doc.id, // Add the document ID for reference
      } as WordData);
    });
    
    return words;
  } catch (error) {
    console.error('Error getting saved words:', error);
    throw new Error('Failed to retrieve saved words. Please try again.');
  }
};

/**
 * Remove a word from the user's collection
 * 
 * @param user The authenticated user
 * @param wordId The ID of the word to remove
 * @returns A promise that resolves when the word is removed
 */
export const removeWord = async (user: User, wordId: string): Promise<void> => {
  if (!user) {
    throw new Error('User must be authenticated to remove words');
  }

  try {
    await deleteDoc(doc(db, COLLECTION_NAME, wordId));
  } catch (error) {
    console.error('Error removing word:', error);
    throw new Error('Failed to remove word. Please try again.');
  }
};

/**
 * Check if a word is saved by the user
 * 
 * @param user The authenticated user
 * @param word The word to check
 * @returns A promise that resolves to a boolean indicating if the word is saved
 */
export const isWordSaved = async (user: User, word: string): Promise<boolean> => {
  if (!user) {
    return false;
  }

  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('userId', '==', user.uid),
      where('word', '==', word)
    );
    
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking if word is saved:', error);
    return false;
  }
};
