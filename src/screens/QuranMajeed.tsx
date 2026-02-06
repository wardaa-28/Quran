import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { surahList } from '../constants/surahData';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreensColors, HomeGradients } from '../constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import { getBookmarks, Bookmark } from '../utils/bookmarkStorage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const colors = ScreensColors.screen1;

type RootStackParamList = {
  Home: undefined;
  QuranMajeed: undefined;
  SurahDetail: { surah: any };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const QuranMajeed: React.FC = (): React.JSX.Element => {
  const navigation = useNavigation<NavigationProp>();
  const [activeTab, setActiveTab] = useState<'Parah' | 'Surah' | 'Bookmark'>('Parah');
  const [bookmarkedAyahs, setBookmarkedAyahs] = useState<Bookmark[]>([]);
  const [selectedParah, setSelectedParah] = useState<number | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      if (activeTab === 'Bookmark') {
        loadBookmarks();
      }
    }, [activeTab])
  );

  const loadBookmarks = async () => {
    const allBookmarks = await getBookmarks();
    // Filter only ayahs (not duas)
    const ayahs = allBookmarks.filter((b) => b.type === 'ayah');
    setBookmarkedAyahs(ayahs);
  };

  const playbackItems = [
    { title: 'Al-Baqarah', verse: 'Verse 180' },
    { title: 'Al-Imran', verse: 'Verse 45' },
    { title: 'An-Nisa', verse: 'Verse 12' },
  ];

  const parahList = [
    { number: 1, english: 'Alif Laam Meem', arabic: 'الٓمّ' },
    { number: 2, english: 'Sayaqool', arabic: 'سَيَقُولُ' },
    { number: 3, english: 'Tilka ar-Rusul', arabic: 'تِلْكَ الرُّسُلُ' },
    { number: 4, english: 'Lan Tanaaloo', arabic: 'لَنْ تَنَالُوا' },
    { number: 5, english: 'Wal Muhsanat', arabic: 'وَالْمُحْصَنَاتُ' },
    { number: 6, english: 'La Yuhibullah', arabic: 'لَا يُحِبُّ اللَّهُ' },
    { number: 7, english: 'Wa Iza Samiu', arabic: 'وَإِذَا سَمِعُوا' },
    { number: 8, english: 'Wa Lau Annana', arabic: 'وَلَوْ أَنَّنَا' },
    { number: 9, english: 'Qaalal Mala', arabic: 'قَالَ الْمَلَأُ' },
    { number: 10, english: "Wa A'lamu", arabic: 'وَاعْلَمُوا' },
    { number: 11, english: "Ya'lamoon", arabic: 'يَعْلَمُونَ' },
    { number: 12, english: 'Wa Mamin Daabbah', arabic: 'وَمَا مِنْ دَابَّةٍ' },
    { number: 13, english: "Wa Ma Ubrri'u", arabic: 'وَمَا أُبَرِّئُ' },
    { number: 14, english: 'Rubama', arabic: 'رُبَمَا' },
    { number: 15, english: 'Subhanallazi', arabic: 'سُبْحَانَ الَّذِي' },
    { number: 16, english: 'Qaal Alam', arabic: 'قَالَ أَلَمْ' },
    { number: 17, english: 'Iqtaraba', arabic: 'اقْتَرَبَ' },
    { number: 18, english: 'Qad Aflaha', arabic: 'قَدْ أَفْلَحَ' },
    { number: 19, english: 'Wa Qaalal Lazeena', arabic: 'وَقَالَ الَّذِينَ' },
    { number: 20, english: 'Amman Khalaq', arabic: 'أَمَّنْ خَلَقَ' },
    { number: 21, english: 'Uttlu Ma Ooohiya', arabic: 'اتْلُ مَا أُوحِيَ' },
    { number: 22, english: 'Wa Manyaqnut', arabic: 'وَمَنْ يَقْنُتْ' },
    { number: 23, english: 'Wa Ma Liya', arabic: 'وَمَا لِيَ' },
    { number: 24, english: 'Faman Azlam', arabic: 'فَمَنْ أَظْلَمُ' },
    { number: 25, english: 'Ilayhi Yuraddu', arabic: 'إِلَيْهِ يُرَدُّ' },
    { number: 26, english: 'Ha Meem', arabic: 'حـمٓ' },
    { number: 27, english: 'Qaala Fama Khatbukum', arabic: 'قَالَ فَمَا خَطْبُكُمْ' },
    { number: 28, english: 'Qad Sami\'Allahu', arabic: 'قَدْ سَمِعَ اللَّهُ' },
    { number: 29, english: 'Tabarakallazi', arabic: 'تَبَارَكَ الَّذِي' },
    { number: 30, english: "Amma Yatasa'aloon", arabic: 'عَمَّ يَتَسَاءَلُونَ' },
  ];

  // Mapping of Parah numbers to their surah IDs
  const parahToSurahs: { [key: number]: number[] } = {
    1: [1, 2], // Al-Fatiha, Al-Baqarah (partial)
    2: [2], // Al-Baqarah (partial)
    3: [2, 3], // Al-Baqarah (partial), Aal-Imran (partial)
    4: [3, 4], // Aal-Imran (partial), An-Nisa (partial)
    5: [4], // An-Nisa (partial)
    6: [4, 5], // An-Nisa (partial), Al-Maidah (partial)
    7: [5], // Al-Maidah (partial)
    8: [5, 6], // Al-Maidah (partial), Al-An'am (partial)
    9: [6, 7], // Al-An'am (partial), Al-A'raf (partial)
    10: [7, 8], // Al-A'raf (partial), Al-Anfal
    11: [8, 9], // Al-Anfal (partial), At-Tawbah (partial)
    12: [9, 10, 11], // At-Tawbah (partial), Yunus, Hud (partial)
    13: [11, 12], // Hud (partial), Yusuf
    14: [12, 13, 14, 15], // Yusuf (partial), Ar-Ra'd, Ibrahim, Al-Hijr (partial)
    15: [15, 16, 17], // Al-Hijr (partial), An-Nahl, Al-Isra (partial)
    16: [17, 18], // Al-Isra (partial), Al-Kahf
    17: [18, 19, 20], // Al-Kahf (partial), Maryam, Ta-Ha (partial)
    18: [20, 21, 22], // Ta-Ha (partial), Al-Anbiya, Al-Hajj (partial)
    19: [22, 23, 24], // Al-Hajj (partial), Al-Mu'minun, An-Nur (partial)
    20: [24, 25, 26, 27], // An-Nur (partial), Al-Furqan, Ash-Shu'ara, An-Naml (partial)
    21: [27, 28, 29], // An-Naml (partial), Al-Qasas, Al-Ankabut (partial)
    22: [29, 30, 31, 32], // Al-Ankabut (partial), Ar-Rum, Luqman, As-Sajdah
    23: [33, 34, 35, 36], // Al-Ahzab, Saba, Fatir, Ya-Sin (partial)
    24: [36, 37, 38], // Ya-Sin (partial), As-Saffat, Sad (partial)
    25: [38, 39, 40], // Sad (partial), Az-Zumar, Ghafir (partial)
    26: [40, 41, 42, 43], // Ghafir (partial), Fussilat, Ash-Shura, Az-Zukhruf (partial)
    27: [43, 44, 45, 46], // Az-Zukhruf (partial), Ad-Dukhan, Al-Jathiyah, Al-Ahqaf
    28: [46, 47, 48, 49, 50], // Al-Ahqaf (partial), Muhammad, Al-Fath, Al-Hujurat, Qaf (partial)
    29: [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77], // Qaf onwards
    30: [78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114], // Last surahs
  };

  const getSurahsForParah = (parahNumber: number) => {
    const surahIds = parahToSurahs[parahNumber] || [];
    return surahList.filter(surah => surahIds.includes(surah.id));
  };




  return (
    <View style={styles.container}>
      {/* Top Gradient Section */}
      <LinearGradient
        colors={['#88F9BD', '#38EF90']}
        style={styles.gradientHeader}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Image source={require('../assets/images/back.png')} style={styles.backIconImage} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Quran Majeed</Text>
          <View style={styles.headerRight} />
        </View>

        {/* Playback Section */}
        {/* <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.playbackSection}
          contentContainerStyle={styles.playbackContent}>
          {playbackItems.map((item, index) => (
            <View key={index} style={styles.playbackCard}>
              <View >
                <Image source={require('../assets/images/playicon.png')} style={styles.playIconImage} />
              </View>
              <View style={styles.playbackTextContainer}>
                <Text style={styles.playbackTitle}>{item.title}</Text>
                <Text style={styles.playbackVerse}>{item.verse}</Text>
              </View>
              <View style={styles.soundWaveIcon}>
                <View style={styles.waveBar} />
                <View style={[styles.waveBar, styles.waveBar2]} />
                <View style={[styles.waveBar, styles.waveBar3]} />
                <View style={[styles.waveBar, styles.waveBar4]} />
              </View>
            </View>
          ))}
        </ScrollView> */}
      </LinearGradient>

      {/* Main Content Area */}
      <View style={styles.mainContentWrapper}>
        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Parah' && styles.tabActive]}
            onPress={() => {
              setActiveTab('Parah');
              setSelectedParah(null);
            }}>
            <Text style={[styles.tabText, activeTab === 'Parah' && styles.tabTextActive]}>Parah</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Surah' && styles.tabActive]}
            onPress={() => {
              setActiveTab('Surah');
              setSelectedParah(null);
            }}>
            <Text style={[styles.tabText, activeTab === 'Surah' && styles.tabTextActive]}>Surah</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Bookmark' && styles.tabActive]}
            onPress={() => {
              setActiveTab('Bookmark');
              setSelectedParah(null);
            }}>
            <Text style={[styles.tabText, activeTab === 'Bookmark' && styles.tabTextActive]}>Bookmark</Text>
          </TouchableOpacity>
        </View>

        {/* List Content */}
        <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
          {activeTab === 'Parah' && (
            <>
              {selectedParah === null ? (
                <>
                  {parahList.map((parah) => (
                    <TouchableOpacity
                      key={parah.number}
                      style={styles.parahCard}
                      onPress={() => setSelectedParah(parah.number)}>
                      <View style={styles.parahNumberCircle}>
                        <Text style={styles.parahNumber}>{parah.number}</Text>
                      </View>
                      <View style={styles.parahTextContainer}>
                        <Text style={styles.parahEnglish}>{parah.english}</Text>
                        <Text style={styles.parahSubtitle}>Parah {parah.number}</Text>
                      </View>
                      <Text style={styles.parahArabic}>{parah.arabic}</Text>
                    </TouchableOpacity>
                  ))}
                </>
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.backToParahButton}
                    onPress={() => setSelectedParah(null)}>
                    <Image
                      source={require('../assets/images/back.png')}
                      style={styles.backIconImage}
                    />
                    <Text style={styles.backToParahText}>
                      Back to Parah List
                    </Text>
                  </TouchableOpacity>
                  {getSurahsForParah(selectedParah).map((surah) => (
                    <TouchableOpacity
                      key={surah.id}
                      style={styles.surahCard}
                      onPress={() => {
                        navigation.navigate('SurahDetail', { surah });
                      }}
                    >
                      <View>
                        <Image source={require('../assets/images/playicon.png')} style={styles.playIconImage} />
                      </View>
                      <View style={styles.surahTextContainer}>
                        <Text style={styles.surahEnglish}>{surah.nameEnglish}</Text>
                        <Text style={styles.surahSubtitle}>{surah.meaning}</Text>
                      </View>
                      <Text style={styles.surahArabic}>{surah.nameArabic}</Text>
                    </TouchableOpacity>
                  ))}
                </>
              )}
              <View style={{ height: 100 }} />
            </>
          )}
          {activeTab === 'Surah' && (
            <>
              {surahList.map((surah) => (
                <TouchableOpacity
                  key={surah.id}
                  style={styles.surahCard}
                  onPress={() => {
                    navigation.navigate('SurahDetail', { surah });
                  }}
                >
                  <View >
                    <Image source={require('../assets/images/playicon.png')} style={styles.playIconImage} />
                  </View>
                  <View style={styles.surahTextContainer}>
                    <Text style={styles.surahEnglish}>{surah.nameEnglish}</Text>
                    <Text style={styles.surahSubtitle}>{surah.meaning}</Text>
                  </View>
                  <Text style={styles.surahArabic}>{surah.nameArabic}</Text>
                </TouchableOpacity>
              ))}
              <View style={{ height: 100 }} />
            </>
          )}
          {activeTab === 'Bookmark' && (
            <>
              {bookmarkedAyahs.length === 0 ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>No bookmarked ayahs yet</Text>
                  <Text style={[styles.emptyStateText, { fontSize: 14, marginTop: 10 }]}>
                    Tap the heart icon on any ayah to bookmark it
                  </Text>
                </View>
              ) : (
                <>
                  {bookmarkedAyahs.map((bookmark) => (
                    <TouchableOpacity
                      key={bookmark.id}
                      style={styles.bookmarkCard}
                      onPress={() => {
                        // Find the surah from surahList
                        const surahId = bookmark.reference?.match(/Quran (\d+):/)?.[1];
                        if (surahId) {
                          const surah = surahList.find((s) => s.id === parseInt(surahId));
                          if (surah) {
                            navigation.navigate('SurahDetail', { surah });
                          }
                        }
                      }}>
                      <View style={styles.bookmarkCardHeader}>
                        <View style={styles.bookmarkInfo}>
                          <Text style={styles.bookmarkTitle}>{bookmark.title || bookmark.surahName}</Text>
                          <Text style={styles.bookmarkReference}>{bookmark.reference}</Text>
                        </View>
                        <FontAwesome name={'heart'} size={20} color={'green'}/>
                      </View>
                      <View style={styles.bookmarkCardBody}>
                        <Text style={styles.bookmarkArabic}>{bookmark.arabic}</Text>
                        {bookmark.translation && (
                          <Text style={styles.bookmarkTranslation}>{bookmark.translation}</Text>
                        )}
                      </View>
                    </TouchableOpacity>
                  ))}
                  <View style={{ height: 100 }} />
                </>
              )}
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  gradientHeader: {
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden', // Ensures content respects rounded corners if needed, though usually for the view itself
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50, // Added padding for status bar area
    paddingBottom: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // backButtonCircle: {
  //   width: 40,
  //   height: 40,
  //   borderRadius: 20,
  //   backgroundColor: 'rgba(56, 239, 144, 0.5)', // Semi-transparent green matching header
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  backButtonIcon: {
    fontSize: 24,
    // color: '#1E3A2B',
    // fontWeight: 'bold',
    marginBottom: 4, // Adjust for center alignment
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F261C',
    flex: 1,
    textAlign: 'center',
    marginLeft: -40, // Offset for back button to center exactly
  },
  headerRight: {
    width: 40,
  },
  playbackSection: {
    marginTop: 10,
    marginBottom: 0,
  },
  playbackContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  playbackCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  playbackIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E7F9EF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  playIcon: {
    color: '#29A464',
    fontSize: 16,
    marginLeft: 3,
  },
  playbackTextContainer: {
    flex: 1,
  },
  playbackTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#29A464',
    marginBottom: 4,
  },
  playbackVerse: {
    fontSize: 12,
    color: '#555',
  },
  soundWaveIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
    gap: 3,
    marginBottom: 20, // Move it up a bit
  },
  waveBar: {
    width: 3,
    backgroundColor: '#ccc',
    borderRadius: 2,
    height: 8,
  },
  waveBar2: { height: 12 },
  waveBar3: { height: 16 },
  waveBar4: { height: 10 },

  // Main Content & Tabs
  mainContentWrapper: {
    flex: 1,
    marginTop: -25, // Pull up to overlap gradient
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    // marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    justifyContent: 'space-between',
    bottom: 35
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#29A464', // Active green
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  parahCard: {
    backgroundColor: '#EFFCEF', // Very light green background
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0F5E0',
  },
  parahNumberCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#7DE7A9', // Light green circle
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  parahNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  parahTextContainer: {
    flex: 1,
  },
  parahEnglish: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2A23',
    marginBottom: 4,
  },
  parahSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  parahArabic: {
    fontSize: 22,
    color: '#29A464',
    fontWeight: '600',
    fontFamily: 'System', // Or specific Arabic font if available
  },

  // Surah Card Styles
  surahCard: {
    backgroundColor: '#EFFCEF', // Light green background matching image
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E6F4EA',
  },
  playIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#7DE7A9', // Bright green circle like the image
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  surahPlayIcon: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 3,
  },
  surahTextContainer: {
    flex: 1,
  },
  surahEnglish: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0F261C',
    marginBottom: 2,
  },
  surahSubtitle: {
    fontSize: 11,
    color: '#333',
    opacity: 0.8,
  },
  surahArabic: {
    fontSize: 18,
    color: '#29A464', // Green arabic text
    fontWeight: '600',
  },

  // Image Styles
  backIconImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    // tintColor: '#1E3A2B', // Dark green tint for back icon
  },
  playIconImage: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    marginRight: 8
  },

  emptyState: {
    marginTop: 50,
    alignItems: 'center',
  },
  emptyStateText: {
    color: '#999',
    fontSize: 16,
  },
  bookmarkCard: {
    backgroundColor: '#EFFCEF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0F5E0',
  },
  bookmarkCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0F5E0',
  },
  bookmarkInfo: {
    flex: 1,
  },
  bookmarkTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2A23',
    marginBottom: 4,
  },
  bookmarkReference: {
    fontSize: 13,
    color: '#666',
  },
  bookmarkHeart: {
    fontSize: 24,
  },
  bookmarkCardBody: {
    alignItems: 'center',
  },
  bookmarkArabic: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#29A464',
    marginBottom: 10,
    textAlign: 'center',
    lineHeight: 32,
  },
  bookmarkTranslation: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    lineHeight: 18,
  },
  backToParahButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 15,
  },
  backToParahText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#29A464',
    marginLeft: 10,
  },
});

export default QuranMajeed;

