import AsyncStorage from '@react-native-async-storage/async-storage';

export interface TasbihItem {
    id: number;
    arabic: string;
    date: string;
    count: number;
    colors: string[];
    buttonColor: string;
}

const TASBIH_LIST_KEY = '@tasbih_list';

// Save tasbih list
export const saveTasbihList = async (tasbihList: TasbihItem[]): Promise<boolean> => {
    try {
        await AsyncStorage.setItem(TASBIH_LIST_KEY, JSON.stringify(tasbihList));
        return true;
    } catch (error) {
        console.error('Error saving tasbih list:', error);
        return false;
    }
};

// Get tasbih list
export const getTasbihList = async (): Promise<TasbihItem[]> => {
    try {
        const data = await AsyncStorage.getItem(TASBIH_LIST_KEY);
        if (data) {
            return JSON.parse(data);
        }
        return [];
    } catch (error) {
        console.error('Error getting tasbih list:', error);
        return [];
    }
};

// Add a new tasbih to the list
export const addTasbih = async (tasbih: TasbihItem): Promise<boolean> => {
    try {
        const existingList = await getTasbihList();
        const updatedList = [...existingList, tasbih];
        return await saveTasbihList(updatedList);
    } catch (error) {
        console.error('Error adding tasbih:', error);
        return false;
    }
};
