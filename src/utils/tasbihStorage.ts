import AsyncStorage from '@react-native-async-storage/async-storage';

const TASBIH_COUNTERS_KEY = '@tasbih_counters';

export interface TasbihCounter {
  tasbihId: number | string;
  count: number;
  lastUpdated: number;
}

// Save tasbih counter
export const saveTasbihCount = async (tasbihId: number | string, count: number): Promise<boolean> => {
  try {
    const counters = await getTasbihCounters();
    const existingIndex = counters.findIndex((c) => c.tasbihId === tasbihId);
    
    const counterData: TasbihCounter = {
      tasbihId,
      count,
      lastUpdated: Date.now(),
    };

    if (existingIndex >= 0) {
      counters[existingIndex] = counterData;
    } else {
      counters.push(counterData);
    }

    await AsyncStorage.setItem(TASBIH_COUNTERS_KEY, JSON.stringify(counters));
    return true;
  } catch (error) {
    console.error('Error saving tasbih count:', error);
    return false;
  }
};

// Get tasbih counter for a specific tasbih
export const getTasbihCount = async (tasbihId: number | string): Promise<number> => {
  try {
    const counters = await getTasbihCounters();
    const counter = counters.find((c) => c.tasbihId === tasbihId);
    return counter?.count || 0;
  } catch (error) {
    console.error('Error getting tasbih count:', error);
    return 0;
  }
};

// Get all tasbih counters
export const getTasbihCounters = async (): Promise<TasbihCounter[]> => {
  try {
    const data = await AsyncStorage.getItem(TASBIH_COUNTERS_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error getting tasbih counters:', error);
    return [];
  }
};

// Reset tasbih counter
export const resetTasbihCount = async (tasbihId: number | string): Promise<boolean> => {
  try {
    return await saveTasbihCount(tasbihId, 0);
  } catch (error) {
    console.error('Error resetting tasbih count:', error);
    return false;
  }
};
