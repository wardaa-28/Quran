import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { saveBookmark, isBookmarked, removeBookmark, getBookmarks } from '../utils/bookmarkStorage';
import { saveReadingProgress } from '../utils/readingProgressStorage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
// Import all surahs
import { surahAlFatihah } from '../constants/surah/fatiha';
import { surahAlBaqarah } from '../constants/surah/baqarah';
import { surahAliImran } from '../constants/surah/aliimran';
import { surahAnNisa } from '../constants/surah/nisa';
import { surahAlMaidah } from '../constants/surah/maidah';
import { surahAlAnam } from '../constants/surah/anam';
import { surahAlAraf } from '../constants/surah/araf';
import { surahAlAnfal } from '../constants/surah/anfal';
import { surahAtTawbah } from '../constants/surah/tawbah';
import { surahYunus } from '../constants/surah/yunus';
import { surahHud } from '../constants/surah/hud';
import { surahYusuf } from '../constants/surah/yusuf';
import { surahArRad } from '../constants/surah/rad';
import { surahIbrahim } from '../constants/surah/ibrahim';
import { surahAlHijr } from '../constants/surah/hijr';
import { surahAnNahl } from '../constants/surah/nahl';
import { surahAlIsra } from '../constants/surah/isra';
import { surahAlKahf } from '../constants/surah/kahf';
import { surahMaryam } from '../constants/surah/maryam';
import { surahTaha } from '../constants/surah/taha';
import { surahAlAnbya } from '../constants/surah/alanbya';
import { surahAlHajj } from '../constants/surah/hajj';
import { surahAlMuminun } from '../constants/surah/muminun';
import { surahAnNur } from '../constants/surah/nur';
import { surahAlFurqan } from '../constants/surah/furqan';
import { surahAshShuara } from '../constants/surah/shuara';
import { surahAnNaml } from '../constants/surah/naml';
import { surahAlQasas } from '../constants/surah/qasas';
import { surahAlAnkabut } from '../constants/surah/alankabut';
import { surahArRum } from '../constants/surah/rum';
import { surahLuqman } from '../constants/surah/luqman';
import { surahAsSajdah } from '../constants/surah/sajdah';
import { surahAlAhzab } from '../constants/surah/ahzab';
import { surahSaba } from '../constants/surah/saba';
import { surahFatir } from '../constants/surah/fatir';
import { surahYaSin } from '../constants/surah/yasin';
import { surahAsSaffat } from '../constants/surah/saffat';
import { surahSad } from '../constants/surah/sad';
import { surahAzZumar } from '../constants/surah/zumar';
import { surahGhafir } from '../constants/surah/ghafir';
import { surahFussilat } from '../constants/surah/fussilat';
import { surahAshShuraa } from '../constants/surah/ashshuraa';
import { surahAzZukhruf } from '../constants/surah/zukhruf';
import { surahAdDukhan } from '../constants/surah/dukhan';
import { surahAlJathiyah } from '../constants/surah/jathiyah';
import { surahAlAhqaf } from '../constants/surah/ahqaf';
import { surahMuhammad } from '../constants/surah/muhammad';
import { surahAlFath } from '../constants/surah/fath';
import { surahAlHujurat } from '../constants/surah/hujurat';
import { surahQaf } from '../constants/surah/qaf';
import { surahAdhDhariyat } from '../constants/surah/dhariyat';
import { surahAtTur } from '../constants/surah/tur';
import { surahAnNajm } from '../constants/surah/najm';
import { surahAlQamar } from '../constants/surah/qamar';
import { surahArRahman } from '../constants/surah/rahman';
import { surahAlWaqiah } from '../constants/surah/waqiah';
import { surahAlHadid } from '../constants/surah/hadid';
import { surahAlMujadila } from '../constants/surah/almujadila';
import { surahAlHashr } from '../constants/surah/hashr';
import { surahAlMumtahanah } from '../constants/surah/mumtahanah';
import { surahAsSaf } from '../constants/surah/assaf';
import { surahAlJumuah } from '../constants/surah/jumuah';
import { surahAlMunafiqun } from '../constants/surah/munafiqun';
import { surahAtTaghabun } from '../constants/surah/taghabun';
import { surahAtTalaq } from '../constants/surah/talaq';
import { surahAtTahrim } from '../constants/surah/tahrim';
import { surahAlMulk } from '../constants/surah/mulk';
import { surahAlQalam } from '../constants/surah/qalam';
import { surahAlHaqqah } from '../constants/surah/haqqah';
import { surahAlMaarij } from '../constants/surah/maarij';
import { surahNuh } from '../constants/surah/nuh';
import { surahAlJinn } from '../constants/surah/jinn';
import { surahAlMuzzammil } from '../constants/surah/muzzammil';
import { surahAlMuddaththir } from '../constants/surah/almuddaththir';
import { surahAlQiyamah } from '../constants/surah/qiyamah';
import { surahAlInsan } from '../constants/surah/insan';
import { surahAlMursalat } from '../constants/surah/mursalat';
import { surahAnNaba } from '../constants/surah/naba';
import { surahAnNaziat } from '../constants/surah/naziat';
import { surahAbasa } from '../constants/surah/abasa';
import { surahAtTakwir } from '../constants/surah/takwir';
import { surahAlInfitar } from '../constants/surah/infitar';
import { surahAlMutaffifin } from '../constants/surah/mutaffifin';
import { surahAlInshiqaq } from '../constants/surah/inshiqaq';
import { surahAlBuruj } from '../constants/surah/buruj';
import { surahAtTariq } from '../constants/surah/tariq';
import { surahAlAla } from '../constants/surah/ala';
import { surahAlGhashiyah } from '../constants/surah/ghashiyah';
import { surahAlFajr } from '../constants/surah/fajr';
import { surahAlBalad } from '../constants/surah/balad';
import { surahAshShams } from '../constants/surah/shams';
import { surahAlLayl } from '../constants/surah/layl';
import { surahAdDuhaa } from '../constants/surah/adduhaa';
import { surahAshSharh } from '../constants/surah/sharh';
import { surahAtTin } from '../constants/surah/tin';
import { surahAlAlaq } from '../constants/surah/alalaq';
import { surahAlQadr } from '../constants/surah/qadr';
import { surahAlBayyinah } from '../constants/surah/bayyinah';
import { surahAzZalzalah } from '../constants/surah/zalzalah';
import { surahAlAdiyat } from '../constants/surah/aladiyat';
import { surahAlQariah } from '../constants/surah/qariah';
import { surahAtTakathur } from '../constants/surah/takathur';
import { surahAlAsr } from '../constants/surah/alasr';
import { surahAlHumazah } from '../constants/surah/humazah';
import { surahAlFil } from '../constants/surah/fil';
import { surahQuraysh } from '../constants/surah/quraysh';
import { surahAlMaun } from '../constants/surah/maun';
import { surahAlKawthar } from '../constants/surah/kawthar';
import { surahAlKafirun } from '../constants/surah/kafirun';
import { surahAnNasr } from '../constants/surah/nasr';
import { surahAlMasad } from '../constants/surah/masad';
import { surahAlIkhlas } from '../constants/surah/ikhlas';
import { surahAlFalaq } from '../constants/surah/falaq';
import { surahAnNas } from '../constants/surah/nas';

const ESTIMATED_VERSE_HEIGHT = 200;

const SurahDetail: React.FC = (): React.JSX.Element => {
    const navigation = useNavigation();
    const route = useRoute();
    const { surah, scrollToAyahNumber, source = 'surah', parahNumber } = (route.params as any) || {};
    const scrollViewRef = useRef<ScrollView>(null);
    const lastScrollY = useRef(0);

    // Map surah IDs to their data files
    const surahDataMap: { [key: number]: any[] } = {
        1: surahAlFatihah,
        2: surahAlBaqarah,
        3: surahAliImran,
        4: surahAnNisa,
        5: surahAlMaidah,
        6: surahAlAnam,
        7: surahAlAraf,
        8: surahAlAnfal,
        9: surahAtTawbah,
        10: surahYunus,
        11: surahHud,
        12: surahYusuf,
        13: surahArRad,
        14: surahIbrahim,
        15: surahAlHijr,
        16: surahAnNahl,
        17: surahAlIsra,
        18: surahAlKahf,
        19: surahMaryam,
        20: surahTaha,
        21: surahAlAnbya,
        22: surahAlHajj,
        23: surahAlMuminun,
        24: surahAnNur,
        25: surahAlFurqan,
        26: surahAshShuara,
        27: surahAnNaml,
        28: surahAlQasas,
        29: surahAlAnkabut,
        30: surahArRum,
        31: surahLuqman,
        32: surahAsSajdah,
        33: surahAlAhzab,
        34: surahSaba,
        35: surahFatir,
        36: surahYaSin,
        37: surahAsSaffat,
        38: surahSad,
        39: surahAzZumar,
        40: surahGhafir,
        41: surahFussilat,
        42: surahAshShuraa,
        43: surahAzZukhruf,
        44: surahAdDukhan,
        45: surahAlJathiyah,
        46: surahAlAhqaf,
        47: surahMuhammad,
        48: surahAlFath,
        49: surahAlHujurat,
        50: surahQaf,
        51: surahAdhDhariyat,
        52: surahAtTur,
        53: surahAnNajm,
        54: surahAlQamar,
        55: surahArRahman,
        56: surahAlWaqiah,
        57: surahAlHadid,
        58: surahAlMujadila,
        59: surahAlHashr,
        60: surahAlMumtahanah,
        61: surahAsSaf,
        62: surahAlJumuah,
        63: surahAlMunafiqun,
        64: surahAtTaghabun,
        65: surahAtTalaq,
        66: surahAtTahrim,
        67: surahAlMulk,
        68: surahAlQalam,
        69: surahAlHaqqah,
        70: surahAlMaarij,
        71: surahNuh,
        72: surahAlJinn,
        73: surahAlMuzzammil,
        74: surahAlMuddaththir,
        75: surahAlQiyamah,
        76: surahAlInsan,
        77: surahAlMursalat,
        78: surahAnNaba,
        79: surahAnNaziat,
        80: surahAbasa,
        81: surahAtTakwir,
        82: surahAlInfitar,
        83: surahAlMutaffifin,
        84: surahAlInshiqaq,
        85: surahAlBuruj,
        86: surahAtTariq,
        87: surahAlAla,
        88: surahAlGhashiyah,
        89: surahAlFajr,
        90: surahAlBalad,
        91: surahAshShams,
        92: surahAlLayl,
        93: surahAdDuhaa,
        94: surahAshSharh,
        95: surahAtTin,
        96: surahAlAlaq,
        97: surahAlQadr,
        98: surahAlBayyinah,
        99: surahAzZalzalah,
        100: surahAlAdiyat,
        101: surahAlQariah,
        102: surahAtTakathur,
        103: surahAlAsr,
        104: surahAlHumazah,
        105: surahAlFil,
        106: surahQuraysh,
        107: surahAlMaun,
        108: surahAlKawthar,
        109: surahAlKafirun,
        110: surahAnNasr,
        111: surahAlMasad,
        112: surahAlIkhlas,
        113: surahAlFalaq,
        114: surahAnNas,
    };

    const currentSurahData = surahDataMap[surah?.id] || [];
    const [bookmarkedVerses, setBookmarkedVerses] = useState<Set<string>>(new Set());

    useEffect(() => {
        loadBookmarkStatus();
    }, [currentSurahData]);

    useEffect(() => {
        if (scrollToAyahNumber && scrollViewRef.current && currentSurahData.length > 0) {
            const index = currentSurahData.findIndex((v) => Number(v.ayah) === scrollToAyahNumber);
            if (index >= 0) {
                setTimeout(() => {
                    scrollViewRef.current?.scrollTo({
                        y: Math.max(0, index * ESTIMATED_VERSE_HEIGHT - 50),
                        animated: true,
                    });
                }, 300);
            }
        }
    }, [scrollToAyahNumber, currentSurahData]);

    const saveProgress = React.useCallback(
        (offsetY: number) => {
            if (!surah || currentSurahData.length === 0) return;
            const index = Math.floor(offsetY / ESTIMATED_VERSE_HEIGHT);
            const clampedIndex = Math.max(0, Math.min(index, currentSurahData.length - 1));
            const verse = currentSurahData[clampedIndex];
            if (verse) {
                saveReadingProgress({
                    source,
                    parahNumber,
                    surahId: surah.id,
                    surah,
                    ayahNumber: Number(verse.ayah),
                });
            }
        },
        [surah, currentSurahData, source, parahNumber]
    );

    const handleScroll = React.useCallback(
        (e: any) => {
            const offsetY = e.nativeEvent?.contentOffset?.y ?? 0;
            lastScrollY.current = offsetY;
            saveProgress(offsetY);
        },
        [saveProgress]
    );

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                saveProgress(lastScrollY.current);
            };
        }, [saveProgress])
    );

    const loadBookmarkStatus = async () => {
        const bookmarked = new Set<string>();
        for (const verse of currentSurahData) {
            const reference = `Quran ${surah?.id || 1}:${verse.ayah}`;
            const isBooked = await isBookmarked(verse.arabic, reference);
            if (isBooked) {
                bookmarked.add(`${verse.arabic}-${reference}`);
            }
        }
        setBookmarkedVerses(bookmarked);
    };

    const handleBookmarkToggle = async (verse: any) => {
        const reference = `Quran ${surah?.id || 1}:${verse.ayah}`;
        const key = `${verse.arabic}-${reference}`;
        const currentlyBookmarked = bookmarkedVerses.has(key);

        if (currentlyBookmarked) {
            // Remove bookmark
            const allBookmarks = await getBookmarks();
            const bookmarkToRemove = allBookmarks.find(
                (b) => b.arabic === verse.arabic && b.reference === reference
            );
            if (bookmarkToRemove) {
                await removeBookmark(bookmarkToRemove.id);
                setBookmarkedVerses((prev) => {
                    const newSet = new Set(prev);
                    newSet.delete(key);
                    return newSet;
                });
                Toast.show({
                    type: 'success',
                    text1: 'Bookmark removed',
                    position: 'top',
                    visibilityTime: 2000,
                });
            }
        } else {
            // Add bookmark
            const success = await saveBookmark({
                type: 'ayah',
                arabic: verse.arabic,
                transliteration: '',
                translation: verse.translation || '',
                reference: reference,
                title: `${surah?.nameEnglish || 'Surah'} - Ayah ${verse.ayah}`,
                surahName: surah?.nameEnglish || '',
                ayahNumber: verse.ayah,
            });

            if (success) {
                setBookmarkedVerses((prev) => new Set(prev).add(key));
                Toast.show({
                    type: 'success',
                    text1: 'Bookmark saved',
                    position: 'top',
                    visibilityTime: 2000,
                });
            } else {
                Toast.show({
                    type: 'info',
                    text1: 'Already bookmarked',
                    position: 'top',
                    visibilityTime: 2000,
                });
            }
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../assets/images/back.png')}
                        style={styles.backIconImage}
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Surah {surah?.nameEnglish || 'Detail'}</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Verses List */}
            <ScrollView
                ref={scrollViewRef}
                style={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                onScrollEndDrag={handleScroll}
                onMomentumScrollEnd={handleScroll}>
                {currentSurahData.map((verse, index) => {
                    const reference = `Quran ${surah?.id || 1}:${verse.ayah}`;
                    const key = `${verse.arabic}-${reference}`;
                    const isBooked = bookmarkedVerses.has(key);
                    
                    return (
                    <View key={verse.ayah} style={styles.verseCard}>
                        {/* Card Header (Green Bar) */}
                        <View style={styles.cardHeader}>
                            <View style={styles.verseNumberContainer}>
                                <Text style={styles.verseNumberText}>{surah?.id || 1}.{verse.ayah}</Text>
                            </View>
                            <View style={styles.cardIcons}>
                                <TouchableOpacity
                                    style={styles.iconButton}
                                    onPress={() => handleBookmarkToggle(verse)}>
                                    <FontAwesome
                                        name={isBooked ? 'heart' : 'heart-o'}
                                        size={20}
                                        color="#29A464"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Card Body */}
                        <View style={styles.cardBody}>
                            {/* Transliteration/Bismillah placeholder as per image style, 
                   though data only provides Arabic. 
                   I will render Arabic prominent. */}
                            <Text style={styles.arabicText}>{verse.arabic}</Text>

                            {/* 
                  The screenshot shows a green English text (Transliteration?) 
                  and a gray English text (Translation?).
                  User data only has 'translation'. 
                  I will render translation in gray at bottom.
                  I will add a fixed Bismillah transliteration if it's the first verse? 
                  The screenshot has "Bismillahir Rahmanir Raheem" in green for 1.1 and 1.2
                  It seems the Green text is the "Transliteration".
                  Since I don't have transliteration in data, I will skip it or just use translation.
                  I'll stick to rendering Arabic and Translation.
               */}
                            <Text style={styles.translationText}>{verse.translation}</Text>
                        </View>
                    </View>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#50D287',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIconImage: {
        width: 35,
        height: 35,
        resizeMode: 'contain',

    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0F261C',
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: '#F5F5F5', // Light gray background for the list area to make cards pop
    },
    scrollContent: {
        padding: 20,
    },
    verseCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 15,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardHeader: {
        backgroundColor: '#D6F2D6', // Light green header
        paddingVertical: 8,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    verseNumberContainer: {
        // 
    },
    verseNumberText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0F261C',
    },
    cardIcons: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
    },
    iconButton: {
        padding: 5,
    },
    iconImage: {
        width: 18,
        height: 18,
        resizeMode: 'contain',
        tintColor: '#29A464', // Green icons
    },
    cardBody: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    arabicText: {
        fontSize: 24,
        color: '#29A464', // Green arabic
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: 'System', // Or platform default
    },
    translationText: {
        fontSize: 14,
        color: '#505050',
        textAlign: 'center',
        lineHeight: 20,
    },
});

export default SurahDetail;
