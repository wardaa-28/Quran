import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Bookmark {
  id: string;
  type: 'dua' | 'ayah';
  arabic: string;
  transliteration: string;
  translation: string;
  reference: string;
  title?: string;
  surahName?: string;
  ayahNumber?: number;
  createdAt: number;
}

const BOOKMARKS_KEY = '@bookmarks';

export const saveBookmark = async (bookmark: Omit<Bookmark, 'id' | 'createdAt'>): Promise<boolean> => {
  try {
    const existingBookmarks = await getBookmarks();
    const newBookmark: Bookmark = {
      ...bookmark,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };
    
    // Check if bookmark already exists (by arabic text)
    const exists = existingBookmarks.some(
      (b) => b.arabic === bookmark.arabic && b.reference === bookmark.reference
    );
    
    if (exists) {
      return false; // Already bookmarked
    }
    
    const updatedBookmarks = [newBookmark, ...existingBookmarks];
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updatedBookmarks));
    return true;
  } catch (error) {
    console.error('Error saving bookmark:', error);
    return false;
  }
};

export const getBookmarks = async (): Promise<Bookmark[]> => {
  try {
    const data = await AsyncStorage.getItem(BOOKMARKS_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error getting bookmarks:', error);
    return [];
  }
};

export const removeBookmark = async (id: string): Promise<boolean> => {
  try {
    const existingBookmarks = await getBookmarks();
    const updatedBookmarks = existingBookmarks.filter((b) => b.id !== id);
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updatedBookmarks));
    return true;
  } catch (error) {
    console.error('Error removing bookmark:', error);
    return false;
  }
};

export const isBookmarked = async (arabic: string, reference: string): Promise<boolean> => {
  try {
    const bookmarks = await getBookmarks();
    return bookmarks.some(
      (b) => b.arabic === arabic && b.reference === reference
    );
  } catch (error) {
    console.error('Error checking bookmark:', error);
    return false;
  }
};
