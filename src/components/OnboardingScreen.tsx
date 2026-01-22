import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  illustration: React.ReactNode;
  content?: React.ReactNode;
}

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }): React.JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const slides: OnboardingSlide[] = [
    {
      id: 1,
      title: 'Connect with Allah Every Day',
      description: 'Accurate Salah timings, daily duas, and Quran tools for your worship.',
      illustration: (
        <View style={styles.firstSlideContainer}>
          <View style={styles.kabahContainer}>
            <Image
              source={require('../assets/images/kabah.png')}
              style={styles.kabahImage}
              resizeMode="cover"
            />
          </View>
          <Image
            source={require('../assets/images/qurantext.png')}
            style={styles.quranTextImage}
            resizeMode="contain"
          />
        </View>
      ),
    },
    {
      id: 2,
      title: 'Reading Quran',
      description: 'Accurate Salah timings, daily duas, and Quran tools for your worship.',
      illustration: (
        <View style={styles.illustrationContainer}>
          <Image
            source={require('../assets/images/boy.png')}
            style={styles.illustrationImage}
            resizeMode="contain"
          />
        </View>
      ),
    },
    {
      id: 3,
      title: 'Qibla Finder',
      description: 'Accurate Salah timings, daily duas, and Quran tools for your worship.',
      illustration: (
        <View style={styles.illustrationContainer}>
          <Image
            source={require('../assets/images/finder.png')}
            style={styles.illustrationImage}
            resizeMode="contain"
          />
        </View>
      ),
    },
    {
      id: 4,
      title: 'Salah Time',
      description: 'Accurate Salah timings, daily duas, and Quran tools for your worship.',
      illustration: (
        <View style={styles.illustrationContainer}>
          <Image
            source={require('../assets/images/namaz.png')}
            style={styles.illustrationImage}
            resizeMode="contain"
          />
        </View>
      ),
    },
    {
      id: 5,
      title: 'Alerts',
      description: 'How would you like Imaan to notify you?',
      illustration: (
        <View style={styles.alertsHeaderContainer}>
          <View style={styles.alarmIconContainer}>
            <Image
              source={require('../assets/images/alarm.png')}
              style={styles.alarmIcon}
              resizeMode="contain"
            />
          </View>
        </View>
      ),
      content: (
        <View style={styles.prayerTimesContainer}>
          {[
            { name: 'Fajr', time: '05:10 AM', enabled: true },
            { name: 'Zuhr', time: '05:10 AM', enabled: true },
            { name: 'Asr', time: '05:10 AM', enabled: true },
            { name: 'Magrib', time: '05:10 AM', enabled: true },
            { name: 'Isha', time: '05:10 AM', enabled: true },
          ].map((prayer, index) => (
            <TouchableOpacity key={index} style={styles.prayerTimeItem} activeOpacity={0.7}>
              <Text style={styles.prayerName}>{prayer.name}</Text>
              <View style={styles.prayerTimeRight}>
                <Text style={styles.prayerTime}>{prayer.time}</Text>
                <Image
                  source={prayer.enabled ? require('../assets/images/speaker.png') : require('../assets/images/mute.png')}
                  style={styles.speakerIcon}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ),
    },
  ];

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  const handleNext = (): void => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      scrollViewRef.current?.scrollTo({
        x: nextIndex * SCREEN_WIDTH,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    } else {
      onComplete();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}>
        {slides.map((slide) => (
          <View key={slide.id} style={styles.slide}>
            {slide.id === 5 ? (
              <View style={styles.lastSlideContent}>
                <View style={styles.alertsIllustrationWrapper}>{slide.illustration}</View>
                <View style={styles.alertsContentWrapper}>
                  <Text style={styles.title}>{slide.title}</Text>
                  <Text style={styles.description}>{slide.description}</Text>
                  {slide.content && <View style={styles.customContent}>{slide.content}</View>}
                </View>
              </View>
            ) : (
              <>
                <View style={styles.illustrationWrapper}>{slide.illustration}</View>
                <View style={styles.contentWrapper}>
                  <Text style={styles.title}>{slide.title}</Text>
                  <Text style={styles.description}>{slide.description}</Text>
                  {slide.content && <View style={styles.customContent}>{slide.content}</View>}
                </View>
              </>
            )}
            <TouchableOpacity 
              style={slide.id === 5 ? styles.continueButtonLastSlide : styles.continueButton} 
              onPress={handleNext}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#132019', // Dark green background
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width: SCREEN_WIDTH,
    flex: 1,
    // paddingTop: 60,
    // paddingBottom: 40,
    justifyContent: 'space-between',
  },
  illustrationWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 20,
  },
  illustrationContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  illustrationImage: {
    width: '80%',
    height: '80%',
    maxWidth: 300,
    maxHeight: 300,
  },
  contentWrapper: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 22,
  },
  customContent: {
    marginTop: 20,
    width: '100%',
  },
  lastSlideContent: {
    flex: 1,
    justifyContent: 'flex-start',
    minHeight: 0,
  },
  alertsIllustrationWrapper: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  alertsContentWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: 10,
    minHeight: 0,
  },
  alertsHeaderContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alarmIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#249D56',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 5,
  },
  alarmIcon: {
    width: 50,
    height: 50,
    tintColor: '#fff',
  },
  prayerTimesContainer: {
    width: '100%',
    marginTop: 5,
    // paddingHorizontal: 5,
  },
  prayerTimeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a5f3f',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 8,
  },
  prayerName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  prayerTimeRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  prayerTime: {
    fontSize: 15,
    color: '#fff',
    opacity: 0.9,
  },
  speakerIcon: {
    width: 18,
    height: 18,
  },
  continueButton: {
    backgroundColor: '#249D56',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 15,
    alignSelf: 'stretch',
    marginHorizontal: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  continueButtonLastSlide: {
    backgroundColor: '#249D56',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 15,
    alignSelf: 'stretch',
    marginHorizontal: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  firstSlideContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
  },
  kabahContainer: {
    width: '100%',
    height: '100%',
    marginTop: 0,
    marginBottom: -120,
    overflow: 'hidden',
    alignSelf: 'stretch',
  },
  kabahImage: {
    width: '100%',
    height: '60%',
    resizeMode: 'cover',
  },
  quranTextImage: {
    width: '75%',
    height: 150,
    maxWidth: 280,
    maxHeight: 250,
    marginTop: -20,
  },
});

export default OnboardingScreen;


