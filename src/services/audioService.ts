import Sound from 'react-native-sound';

// Enable playback in silence mode (iOS)
Sound.setCategory('Playback');

// Reciter audio base URLs - 10 Qaris
export const reciterAudioUrls: { [key: string]: string } = {
  'Salah Bukhatir': 'https://cdn.islamic.network/quran/audio-surah/128/',
  'Mishary Rashid': 'https://cdn.islamic.network/quran/audio-surah/7/',
  'Abdul Basit': 'https://cdn.islamic.network/quran/audio-surah/3/',
  'Saud Al-Shuraim': 'https://cdn.islamic.network/quran/audio-surah/4/',
  'Abdur Rahman Al-Sudais': 'https://cdn.islamic.network/quran/audio-surah/5/',
  'Maher Al-Muaiqly': 'https://cdn.islamic.network/quran/audio-surah/9/',
  'Saad Al-Ghamdi': 'https://cdn.islamic.network/quran/audio-surah/6/',
  'Yasser Al-Dosari': 'https://cdn.islamic.network/quran/audio-surah/10/',
  'Ahmed Al-Ajmi': 'https://cdn.islamic.network/quran/audio-surah/8/',
  'Abdullah Basfar': 'https://cdn.islamic.network/quran/audio-surah/2/',
};

// Get audio file name for surah ID (1-114)
export const getAudioFileName = (surahId: number): string => {
  const paddedId = surahId.toString().padStart(3, '0');
  return `${paddedId}.mp3`;
};

// Store current sound instance
let currentSound: Sound | null = null;
let currentSurahId: number | null = null;
let currentReciter: string | null = null;

// Initialize player (no-op for react-native-sound)
export const setupPlayer = async (): Promise<void> => {
  // react-native-sound doesn't need setup
  return Promise.resolve();
};

// Play audio
export const playAudio = async (
  surahId: number,
  reciterName: string,
  surahNameEnglish: string,
  surahNameArabic: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // Stop current sound if playing
      if (currentSound) {
        currentSound.stop();
        currentSound.release();
        currentSound = null;
      }

      const baseUrl = reciterAudioUrls[reciterName] || reciterAudioUrls['Salah Bukhatir'];
      const audioFileName = getAudioFileName(surahId);
      const audioUrl = `${baseUrl}${audioFileName}`;

      currentSurahId = surahId;
      currentReciter = reciterName;

      // Create new sound instance
      currentSound = new Sound(audioUrl, '', (error) => {
        if (error) {
          console.error('Error loading audio:', error);
          currentSound = null;
          reject(error);
          return;
        }

        // Play the sound
        currentSound?.play((success) => {
          if (!success) {
            console.error('Error playing audio');
            reject(new Error('Failed to play audio'));
          } else {
            resolve();
          }
        });
      });
    } catch (error) {
      console.error('Error in playAudio:', error);
      reject(error);
    }
  });
};

// Pause audio
export const pauseAudio = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      if (currentSound) {
        // Check if playing, then pause
        const isPlaying = currentSound.isPlaying();
        if (isPlaying) {
          currentSound.pause();
        }
        resolve();
      } else {
        resolve();
      }
    } catch (error) {
      console.error('Error pausing audio:', error);
      reject(error);
    }
  });
};

// Resume audio
export const resumeAudio = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      if (currentSound) {
        currentSound.play((success) => {
          if (success) {
            resolve();
          } else {
            reject(new Error('Failed to resume audio'));
          }
        });
      } else {
        reject(new Error('No audio to resume'));
      }
    } catch (error) {
      console.error('Error resuming audio:', error);
      reject(error);
    }
  });
};

// Seek forward (10 seconds)
export const seekForward = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      if (currentSound) {
        currentSound.getCurrentTime((seconds) => {
          const newPosition = Math.min(seconds + 10, currentSound?.getDuration() || 0);
          currentSound?.setCurrentTime(newPosition);
          resolve();
        });
      } else {
        reject(new Error('No audio playing'));
      }
    } catch (error) {
      console.error('Error seeking forward:', error);
      reject(error);
    }
  });
};

// Seek backward (10 seconds)
export const seekBackward = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      if (currentSound) {
        currentSound.getCurrentTime((seconds) => {
          const newPosition = Math.max(seconds - 10, 0);
          currentSound?.setCurrentTime(newPosition);
          resolve();
        });
      } else {
        reject(new Error('No audio playing'));
      }
    } catch (error) {
      console.error('Error seeking backward:', error);
      reject(error);
    }
  });
};

// Get current position
export const getCurrentPosition = async (): Promise<number> => {
  return new Promise((resolve, reject) => {
    try {
      if (currentSound) {
        currentSound.getCurrentTime((seconds) => {
          resolve(seconds);
        });
      } else {
        resolve(0);
      }
    } catch (error) {
      console.error('Error getting current position:', error);
      resolve(0);
    }
  });
};

// Get duration
export const getDuration = async (): Promise<number> => {
  return new Promise((resolve) => {
    try {
      if (currentSound) {
        const duration = currentSound.getDuration();
        resolve(duration > 0 ? duration : 0);
      } else {
        resolve(0);
      }
    } catch (error) {
      console.error('Error getting duration:', error);
      resolve(0);
    }
  });
};

// Get player state (simplified - returns boolean)
export const getPlayerState = async (): Promise<'playing' | 'paused' | 'stopped'> => {
  return new Promise((resolve) => {
    try {
      if (currentSound) {
        if (currentSound.isPlaying()) {
          resolve('playing');
        } else {
          resolve('paused');
        }
      } else {
        resolve('stopped');
      }
    } catch (error) {
      console.error('Error getting player state:', error);
      resolve('stopped');
    }
  });
};

// Seek to specific position
export const seekTo = async (position: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      if (currentSound) {
        currentSound.setCurrentTime(position);
        resolve();
      } else {
        reject(new Error('No audio playing'));
      }
    } catch (error) {
      console.error('Error seeking to position:', error);
      reject(error);
    }
  });
};

// Stop and reset
export const stopAudio = async (): Promise<void> => {
  return new Promise((resolve) => {
    try {
      if (currentSound) {
        currentSound.stop();
        currentSound.release();
        currentSound = null;
        currentSurahId = null;
        currentReciter = null;
      }
      resolve();
    } catch (error) {
      console.error('Error stopping audio:', error);
      resolve();
    }
  });
};
