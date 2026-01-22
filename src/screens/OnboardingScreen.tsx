import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreenComponent from '../components/OnboardingScreen';
import { RootStackParamList } from '../navigation/Stack';

type OnboardingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;

const ONBOARDING_COMPLETE_KEY = '@onboarding_complete';

const OnboardingScreen: React.FC = (): React.JSX.Element => {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();

  const handleOnboardingComplete = async (): Promise<void> => {
    try {
      await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, 'true');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      <OnboardingScreenComponent onComplete={handleOnboardingComplete} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default OnboardingScreen;


