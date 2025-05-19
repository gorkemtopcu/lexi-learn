/**
 * Utility functions for audio playback
 */

/**
 * Plays an audio file from a URL, handling different URL formats
 * 
 * @param audioUrl The URL of the audio file to play
 * @returns A promise that resolves when the audio starts playing or rejects if there's an error
 */
export function playAudio(audioUrl: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!audioUrl) {
      reject(new Error('No audio URL provided'));
      return;
    }
    
    // Format the URL correctly based on its structure
    const formattedUrl = audioUrl.startsWith('http') 
      ? audioUrl 
      : audioUrl.startsWith('//') 
        ? `https:${audioUrl}` 
        : `https://${audioUrl}`;
    
    console.log("Playing audio from:", formattedUrl);
    
    const audio = new Audio(formattedUrl);
    
    // Add event listeners for better error handling
    audio.addEventListener('error', (e) => {
      console.error("Audio playback error:", e);
      reject(e);
    });
    
    audio.addEventListener('playing', () => {
      resolve();
    });
    
    // Play the audio
    audio.play().catch(error => {
      console.error("Error playing audio:", error);
      reject(error);
    });
  });
}
