import AsyncStorage from '@react-native-async-storage/async-storage';

const READING_PROGRESS_KEY = '@reading_progress';

export interface ReadingProgress {
  source: 'parah' | 'surah';
  parahNumber?: number;
  surahId: number;
  surah: any;
  ayahNumber: number;
  timestamp: number;
}

export const saveReadingProgress = async (progress: Omit<ReadingProgress, 'timestamp'>): Promise<void> => {
  try {
    const data: ReadingProgress = {
      ...progress,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(READING_PROGRESS_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving reading progress:', error);
  }
};

export const getReadingProgress = async (): Promise<ReadingProgress | null> => {
  try {
    const data = await AsyncStorage.getItem(READING_PROGRESS_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.error('Error getting reading progress:', error);
    return null;
  }
};
