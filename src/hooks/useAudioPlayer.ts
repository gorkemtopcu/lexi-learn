"use client"

import { useState } from 'react';
import { playAudio } from '@/utils/audio';

/**
 * Custom hook for handling audio playback with error handling
 * 
 * @returns An object containing the audio error state and a function to play audio
 */
export function useAudioPlayer() {
  const [audioError, setAudioError] = useState<string | null>(null);

  /**
   * Plays an audio file from the given URL with error handling
   * 
   * @param audioUrl The URL of the audio file to play
   * @param errorMessage Optional custom error message to display on failure
   */
  const handlePlayAudio = (audioUrl: string, errorMessage?: string) => {
    if (!audioUrl) return;

    setAudioError(null);

    playAudio(audioUrl).catch(error => {
      console.error("Failed to play audio:", error);
      setAudioError(errorMessage || "Could not play pronunciation audio. Please try again later.");
    });
  };

  return {
    audioError,
    handlePlayAudio,
  };
}
