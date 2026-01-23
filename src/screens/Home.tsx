import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import SafeLinearGradient from '../components/SafeLinearGradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreensColors, PrayerCardColors, HomeGradients } from '../constants/colors';
import { Coordinates, CalculationMethod, PrayerTimes } from 'adhan';

type RootStackParamList = {
  Home: undefined;
  QuranMajeed: undefined;
  ListenQuran: undefined;
  Tasbih: undefined;
  DailyDhikr: undefined;
  DuaCategories: undefined;
  RamzanAshras: undefined;
  RamzanAshraDua: { ashraNumber: number; ashraName: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const colors = ScreensColors.screen1;

const Home: React.FC = (): React.JSX.Element => {
  const navigation = useNavigation<NavigationProp>();

  const [activePrayerIndex, setActivePrayerIndex] = React.useState<number>(2); // Asr is initially active
  const [prayerTimes, setPrayerTimes] = React.useState([
    { name: 'Fajr', time: '03:19 AM', image: require('../assets/images/fajar.png') },
    { name: 'Zuhr', time: '03:19 AM', image: require('../assets/images/zuhar.png') },
    { name: 'Asr', time: '03:19 AM', image: require('../assets/images/asar.png') },
    { name: 'Magrib', time: '03:19 AM', image: require('../assets/images/magrib.png') },
    { name: 'Isha', time: '8:52 PM', image: require('../assets/images/esha.png') },
  ]);

  // Get current date in format: DD-MMM-YY
  const getCurrentDate = (): string => {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[now.getMonth()];
    const year = now.getFullYear().toString().slice(-2);
    return `${day}-${month}-${year}`;
  };

  // Format time to 12-hour format with AM/PM
  const formatTime = (date: Date): string => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes.toString().padStart(2, '0');
    return `${hours.toString().padStart(2, '0')}:${minutesStr} ${ampm}`;
  };

  // Calculate prayer times for Lahore, Pakistan
  const calculatePrayerTimes = (): void => {
    // Lahore coordinates: 31.5204° N, 74.3587° E
    const coordinates = new Coordinates(31.5204, 74.3587);
    const date = new Date();
    
    // Using Karachi calculation method (commonly used in Pakistan)
    const params = CalculationMethod.Karachi();
    const prayerTimesObj = new PrayerTimes(coordinates, date, params);

    setPrayerTimes([
      { name: 'Fajr', time: formatTime(prayerTimesObj.fajr), image: require('../assets/images/fajar.png') },
      { name: 'Zuhr', time: formatTime(prayerTimesObj.dhuhr), image: require('../assets/images/zuhar.png') },
      { name: 'Asr', time: formatTime(prayerTimesObj.asr), image: require('../assets/images/asar.png') },
      { name: 'Magrib', time: formatTime(prayerTimesObj.maghrib), image: require('../assets/images/magrib.png') },
      { name: 'Isha', time: formatTime(prayerTimesObj.isha), image: require('../assets/images/esha.png') },
    ]);
  };

  React.useEffect(() => {
    console.log('Home screen mounted');
    calculatePrayerTimes();
  }, []);

  const handlePrayerPress = (index: number): void => {
    setActivePrayerIndex(index);
  };

  return (
    <SafeLinearGradient
      colors={[HomeGradients.homeBackground.start, HomeGradients.homeBackground.end]}
      style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}>
        {/* Location and Date Bar */}
        <View style={styles.locationBar}>
          <SafeLinearGradient
            colors={[HomeGradients.locationTag.start, HomeGradients.locationTag.end]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.locationButton}>
            <Image source={require('../assets/images/location.png')} style={styles.locationIcon} />
            {/* <Text style={styles.locationIcon}></Text> */}
            <Text style={styles.locationText}>Lahore, Pakistan</Text>
          </SafeLinearGradient>
          <Text style={styles.dateText}>{getCurrentDate()}</Text>
        </View>

        {/* Featured Tasbih Card */}
        <View style={styles.tasbihCard}>
          <View style={styles.tasbihCardLeft}>
            <Text style={styles.tasbihSubtitle}>Remember Allah</Text>
            <Text style={styles.tasbihTitle} >Start Tasbih</Text>
            <Text style={styles.tasbihTitleGreen}>Counter</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Tasbih')}>
              <SafeLinearGradient
                colors={[HomeGradients.getStartedButton.start, HomeGradients.getStartedButton.end]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.getStartButton}>
                <Text style={styles.getStartButtonText}>Get Start Now</Text>
              </SafeLinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.tasbihCardRight}>
            <Image
              source={require('../assets/images/dua.png')}
              style={styles.tasbihImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Prayer Timings Section */}
        <View style={styles.prayerSection}>
          <Text style={styles.sectionTitle}>Prayer Timings</Text>
        
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.prayerTimesRow}
            contentContainerStyle={styles.prayerTimesContent}>
            {prayerTimes.map((prayer, index) => {
              const isActive = activePrayerIndex === index;
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.7}
                  onPress={() => handlePrayerPress(index)}
                  style={[
                    styles.prayerTimeCard,
                    isActive && styles.prayerTimeCardActive,
                  ]}>
                  <Text
                    style={[
                      styles.prayerTime,
                      isActive && styles.prayerTimeActive,
                    ]}>
                    {prayer.time}
                  </Text>
                  <Image
                    source={prayer.image}
                    style={[
                      styles.prayerIcon,
                      {
                        tintColor: isActive
                          ? PrayerCardColors.active.iconColor
                          : PrayerCardColors.inactive.iconColor,
                      },
                    ]}
                    resizeMode="contain"
                  />
                  <Text
                    style={[
                      styles.prayerName,
                      isActive && styles.prayerNameActive,
                    ]}>
                    {prayer.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Main Content Cards */}
        <View style={styles.mainCardsRow}>
          <TouchableOpacity onPress={() => navigation.navigate('RamzanAshras')}>
            <SafeLinearGradient
              colors={[HomeGradients.listenQuran.start, HomeGradients.listenQuran.end]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.mainCard, styles.listenQuranCard]}>
              <View style={styles.mainCardIcon}>
                <Image
                  source={require('../assets/images/ramzan.png')}
                  style={styles.mainCardImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.mainCardTitle}>Ramzan</Text>
              <Text style={styles.mainCardDescription}>
                Neque porro quisquam qui dolorem ipsum.
              </Text>
            </SafeLinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('QuranMajeed')}>
            <SafeLinearGradient
              colors={[HomeGradients.quranMajeed.start, HomeGradients.quranMajeed.end]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.mainCard, styles.quranMajeedCard]}>
              <View style={styles.mainCardIcon}>
                <Image
                  source={require('../assets/images/quranPak.png')}
                  style={styles.mainCardImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.mainCardTitle}>Quran Majeed</Text>
              <Text style={styles.mainCardDescription}>
                Neque porro quisquam qui dolorem ipsum.
              </Text>
            </SafeLinearGradient>
          </TouchableOpacity>
        </View>

        {/* Bottom Action Buttons */}
        <View style={styles.bottomButtonsRow}>
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => navigation.navigate('DailyDhikr')}
          >
            <Image
              source={require('../assets/images/quran.png')}
              style={styles.bottomButtonIcon}
              resizeMode="contain"
            />
            <Text style={styles.bottomButtonText}>Azkar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => navigation.navigate('DuaCategories')}
          >
            <Image
              source={require('../assets/images/duas.png')}
              style={styles.bottomButtonIcon}
              resizeMode="contain"
            />
            <Text style={styles.bottomButtonText}>Duas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => navigation.navigate('Tasbih')}>
            <Image
              source={require('../assets/images/tasbee.png')}
              style={styles.bottomButtonIcon}
              resizeMode="contain"
            />
            <Text style={styles.bottomButtonText}>Tasbih</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeLinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  locationBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 10,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
  },
  locationIcon: {
    fontSize: 16,
    marginRight: 6,
    color: colors[4], // #2e4039
  },
  locationText: {
    fontSize: 14,
    color: colors[4], // #2e4039
    fontWeight: '600',
  },
  dateText: {
    fontSize: 14,
    color: colors[0], // #505050
    fontWeight: '500',
  },
  tasbihCard: {
    flexDirection: 'row',
    backgroundColor: colors[4], // #2e4039
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 20,
    padding: 16,
    overflow: 'hidden',
    minHeight: 100,
  },
  tasbihCardLeft: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 10,
  },
  tasbihSubtitle: {
    fontSize: 13,
    color: colors[3], // #a8bea5
    marginBottom: 5,
    fontWeight: '500',
  },
  tasbihTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors[1], // #ffffff
    marginBottom: -8,
    lineHeight: 32,
    width: 100
  },
  tasbihTitleGreen: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors[3], // #a8bea5
    marginBottom: 10,
    lineHeight: 32,
  },
  getStartButton: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  getStartButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  tasbihCardRight: {
    width: 130,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tasbihImage: {
    width: '100%',
    height: '100%',
  },
  prayerSection: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors[0], // #505050
    marginBottom: 5,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 10,
    color: colors[0], // #505050
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.7,
  },
  prayerTimesRow: {
    marginTop: 5,
  },
  prayerTimesContent: {
    paddingRight: 20,
  },
  prayerTimeCard: {
    backgroundColor: PrayerCardColors.inactive.border,
    padding: 6,
    borderRadius: 16,
    marginRight: 5,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prayerTimeCardActive: {
    backgroundColor: PrayerCardColors.active.gradientBottom,
    borderWidth: 0,
  },
  prayerTime: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  prayerTimeActive: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  prayerIcon: {
    width: 36,
    height: 36,
    marginBottom: 10,
  },
  prayerName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  prayerNameActive: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  mainCardsRow: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    marginBottom: 10,
    gap: 8,
    justifyContent: 'space-between',
  },
  mainCard: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    minHeight: 100,
    maxWidth: 145,
    justifyContent: 'flex-start',
  },
  listenQuranCard: {
    // Gradient handled by LinearGradient
  },
  quranMajeedCard: {
    // Gradient handled by LinearGradient
  },
  mainCardIcon: {
    width: 85,
    height: 85,
    marginBottom: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainCardImage: {
    width: '100%',
    height: '100%',
  },
  mainCardTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: colors[0], // #505050
    marginBottom: 10,
    textAlign: 'center',
  },
  mainCardDescription: {
    fontSize: 12,
    color: colors[0], // #505050
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 18,
  },
  bottomButtonsRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 35,
    gap: 16,
  },
  bottomButton: {
    flex: 1,
    backgroundColor: colors[1], // #ffffff
    borderRadius: 18,
    padding: 22,
    alignItems: 'center',
    minHeight: 110,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    minWidth: 90
  },
  bottomButtonIcon: {
    width: 42,
    height: 42,
    marginBottom: 12,
    // tintColor: colors[4], // #2e4039
  },
  bottomButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors[0], // #505050
  },
});

export default Home;

