import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from '../screens/OnboardingScreen';
import Home from '../screens/Home';
import QuranMajeed from '../screens/QuranMajeed';
import ListenQuran from '../screens/ListenQuran';
import SurahDetail from '../screens/SurahDetail';
import Tasbih from '../screens/Tasbih';
import TasbihDetail from '../screens/TasbihDetail';
import DailyDhikr from '../screens/DailyDhikr';
import DuaCategories from '../screens/DuaCategories';
import DuaTopicList from '../screens/DuaTopicList';
import DuaListPage from '../screens/DuaListPage';
import NamesOfAllah from '../screens/NamesOfAllah';
import RamzanAshras from '../screens/RamzanAshras';
import RamzanAshraDua from '../screens/RamzanAshraDua';

export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  QuranMajeed: undefined;
  ListenQuran: undefined;
  SurahDetail: { surah: any };
  Tasbih: undefined;
  TasbihDetail: { tasbih: any };
  DailyDhikr: undefined;
  DuaCategories: undefined;
  DuaTopicList: { categoryTitle: string };
  DuaListPage: { topicTitle: string; categoryTitle?: string; topicId?: string };
  NamesOfAllah: undefined;
  RamzanAshras: undefined;
  RamzanAshraDua: { ashraNumber: number; ashraName: string };
  Test: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const ONBOARDING_COMPLETE_KEY = '@onboarding_complete';

const AppStack: React.FC = (): React.JSX.Element => {
  const [isOnboardingComplete, setIsOnboardingComplete] = React.useState<boolean | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async (): Promise<void> => {
    try {
      const value = await AsyncStorage.getItem(ONBOARDING_COMPLETE_KEY);
      setIsOnboardingComplete(value === 'true');
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setIsOnboardingComplete(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    // Show loading indicator while checking onboarding status
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isOnboardingComplete ? 'Home' : 'Onboarding'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="QuranMajeed"
          component={QuranMajeed}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ListenQuran"
          component={ListenQuran}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SurahDetail"
          component={SurahDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tasbih"
          component={Tasbih}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TasbihDetail"
          component={TasbihDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DailyDhikr"
          component={DailyDhikr}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DuaCategories"
          component={DuaCategories}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DuaTopicList"
          component={DuaTopicList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DuaListPage"
          component={DuaListPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NamesOfAllah"
          component={NamesOfAllah}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RamzanAshras"
          component={RamzanAshras}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RamzanAshraDua"
          component={RamzanAshraDua}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;

