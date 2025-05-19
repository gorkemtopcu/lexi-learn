import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

/**
 * Sign up a new user with email and password
 * 
 * @param email User's email
 * @param password User's password
 * @returns A promise that resolves to a UserCredential
 */
export const signUp = async (email: string, password: string): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password);
};

/**
 * Sign in an existing user with email and password
 * 
 * @param email User's email
 * @param password User's password
 * @returns A promise that resolves to a UserCredential
 */
export const signIn = async (email: string, password: string): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

/**
 * Sign out the current user
 * 
 * @returns A promise that resolves when sign-out is complete
 */
export const logOut = async (): Promise<void> => {
  return signOut(auth);
};

/**
 * Subscribe to auth state changes
 * 
 * @param callback Function to call when auth state changes
 * @returns Unsubscribe function
 */
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Get the current user
 * 
 * @returns The current user or null if not signed in
 */
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

export type { User };
