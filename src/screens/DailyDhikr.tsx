import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { saveBookmark, isBookmarked, removeBookmark, getBookmarks } from '../utils/bookmarkStorage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';

const DailyDhikr: React.FC = (): React.JSX.Element => {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState<'Morning' | 'Evening'>('Morning');
    const [bookmarkedDhikrs, setBookmarkedDhikrs] = useState<Set<string>>(new Set());

    const morningDhikrList = [
        {
            id: 1,
            count: 1,
            arabic: 'الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي فِي جَسَدِي، وَرَدَّ عَلَيَّ رُوحِي، وَأَذِنَ لِي بِذِكْرِهِ',
            transliteration: 'Alhamdu lillahi-lathee AAafnee fee jasadee waradda AAalayya roohhee wa-athina lee bithikrih',
            translation: 'All praise for Allah who restored to me my health and returned my soul and has allowed me to remember him.',
            reference: 'At-Tirmidhi 5:473'
        },
        {
            id: 2,
            count: 100,
            arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
            transliteration: 'Subhanallahi wa bihamdihi',
            translation: 'Glory be to Allah and praise be to Him.',
            reference: 'Muslim'
        },
        {
            id: 3,
            count: 100,
            arabic: 'أَسْتَغْفِرُ اللَّهَ',
            transliteration: 'Astaghfirullah',
            translation: 'I seek forgiveness from Allah.',
            reference: 'Sunnah'
        },
        {
            id: 4,
            count: 1,
            arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ',
            transliteration: 'Allahumma bika asbahna wa bika amsayna wa bika nahya wa bika namootu wa ilaykan-nushoor',
            translation: 'O Allah, by You we enter the morning and by You we enter the evening, by You we live and by You we die, and to You is the resurrection.',
            reference: 'At-Tirmidhi'
        },
        {
            id: 5,
            count: 33,
            arabic: 'سُبْحَانَ اللَّهِ',
            transliteration: 'Subhanallah',
            translation: 'Glory be to Allah.',
            reference: 'Sunnah'
        },
        {
            id: 6,
            count: 33,
            arabic: 'الْحَمْدُ لِلَّهِ',
            transliteration: 'Alhamdulillah',
            translation: 'All praise be to Allah.',
            reference: 'Sunnah'
        },
        {
            id: 7,
            count: 33,
            arabic: 'اللَّهُ أَكْبَرُ',
            transliteration: 'Allahu Akbar',
            translation: 'Allah is the Greatest.',
            reference: 'Sunnah'
        }
    ];

    const eveningDhikrList = [
        {
            id: 1,
            count: 1,
            arabic: 'اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ',
            transliteration: 'Allahumma bika amsayna wa bika asbahna wa bika nahya wa bika namootu wa ilaykal-maseer',
            translation: 'O Allah, by You we enter the evening and by You we enter the morning, by You we live and by You we die, and to You is the return.',
            reference: 'At-Tirmidhi'
        },
        {
            id: 2,
            count: 100,
            arabic: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ',
            transliteration: 'Astaghfirullahal-Azeem',
            translation: 'I seek forgiveness from Allah, the Most Great.',
            reference: 'Sunnah'
        },
        {
            id: 3,
            count: 100,
            arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ',
            transliteration: 'Subhanallahi wa bihamdihi Subhanallahil-Azeem',
            translation: 'Glory be to Allah and praise be to Him. Glory be to Allah, the Most Great.',
            reference: 'Bukhari & Muslim'
        },
        {
            id: 4,
            count: 1,
            arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ',
            transliteration: 'Allahumma innee a\'oodhu bika min sharri hathal-yawmi wa sharri ma ba\'dahu',
            translation: 'O Allah, I seek refuge in You from the evil of this day and the evil that follows it.',
            reference: 'Abu Dawud'
        },
        {
            id: 5,
            count: 33,
            arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ',
            transliteration: 'La ilaha illallah',
            translation: 'There is no deity except Allah.',
            reference: 'Sunnah'
        },
        {
            id: 6,
            count: 100,
            arabic: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
            transliteration: 'Astaghfirullah wa atoobu ilayh',
            translation: 'I seek forgiveness from Allah and repent to Him.',
            reference: 'Sunnah'
        },
        {
            id: 7,
            count: 1,
            arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
            transliteration: 'Rabbana atina fid dunya hasanatan wa fil akhirati hasanatan wa qina azaban naar',
            translation: 'Our Lord, give us good in this world and good in the Hereafter, and save us from the punishment of the Fire.',
            reference: 'Quran 2:201'
        }
    ];

    const dhikrList = activeTab === 'Morning' ? morningDhikrList : eveningDhikrList;

    const loadBookmarkStatus = async () => {
        const bookmarked = new Set<string>();
        for (const dhikr of dhikrList) {
            const reference = `Dhikr ${activeTab} - ${dhikr.reference}`;
            const isBooked = await isBookmarked(dhikr.arabic, reference);
            if (isBooked) {
                bookmarked.add(`${dhikr.arabic}-${reference}`);
            }
        }
        setBookmarkedDhikrs(bookmarked);
    };

    useEffect(() => {
        loadBookmarkStatus();
    }, [activeTab]);

    const handleBookmarkToggle = async (dhikr: any) => {
        const reference = `Dhikr ${activeTab} - ${dhikr.reference}`;
        const key = `${dhikr.arabic}-${reference}`;
        const currentlyBookmarked = bookmarkedDhikrs.has(key);

        if (currentlyBookmarked) {
            // Remove bookmark
            const allBookmarks = await getBookmarks();
            const bookmarkToRemove = allBookmarks.find(
                (b) => b.arabic === dhikr.arabic && b.reference === reference
            );
            if (bookmarkToRemove) {
                await removeBookmark(bookmarkToRemove.id);
                setBookmarkedDhikrs((prev) => {
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
                type: 'dua',
                arabic: dhikr.arabic,
                transliteration: dhikr.transliteration || '',
                translation: dhikr.translation || '',
                reference: reference,
                title: `Daily Dhikr - ${activeTab} - ${dhikr.reference}`,
            });

            if (success) {
                setBookmarkedDhikrs((prev) => new Set(prev).add(key));
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
                <Text style={styles.headerTitle}>Daily Dhikr</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Tabs */}
            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'Morning' && styles.activeTabButton]}
                    onPress={() => setActiveTab('Morning')}
                >
                    <Text style={[styles.tabText, activeTab === 'Morning' && styles.activeTabText]}>Morning Dhikr</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'Evening' && styles.activeTabButton]}
                    onPress={() => setActiveTab('Evening')}
                >
                    <Text style={[styles.tabText, activeTab === 'Evening' && styles.activeTabText]}>Evening Dhikr</Text>
                </TouchableOpacity>
            </View>

            {/* List */}
            <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
                {dhikrList.map((item) => (
                    <View key={item.id} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View style={styles.countBadge}>
                                <Text style={styles.countText}>{item.count}</Text>
                            </View>
                            <View style={styles.cardActions}>
                                {/* <TouchableOpacity style={styles.actionIcon}>
                                    <Image source={require('../assets/images/speaker.png')} style={[styles.iconImage, { tintColor: '#29A464' }]} />
                                </TouchableOpacity> */}
                                <TouchableOpacity 
                                    style={styles.actionIcon}
                                    onPress={() => handleBookmarkToggle(item)}>
                                    {bookmarkedDhikrs.has(`${item.arabic}-Dhikr ${activeTab} - ${item.reference}`) ? (
                                        <FontAwesome name={'heart'} size={20} color={'#29A464'} />
                                    ) : (
                                        <FontAwesome name={'heart-o'} size={20} color={'#29A464'} />
                                    )}
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.actionIcon}>
                                    <Text style={{ color: '#29A464' }}>🔗</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={styles.arabicText}>{item.arabic}</Text>
                            <Text style={styles.transliterationText}>{item.transliteration}</Text>
                            <Text style={styles.translationText}>{item.translation}</Text>
                            <Text style={styles.referenceText}>{item.reference}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        // backgroundColor: '#50D287',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIconImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        // tintColor: '#fff'
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0F261C',
    },
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        borderRadius: 30,
        padding: 5,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#F0F0F0'
    },
    tabButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: 'center',
    },
    activeTabButton: {
        backgroundColor: '#29A464',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#888',
    },
    activeTabText: {
        color: '#FFFFFF',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#F5F5F5' // Very light border
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: '#EFFCEF', // Light green header strip
        marginHorizontal: -15,
        marginTop: -15,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    },
    countBadge: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#C5E898', // Lime green
        justifyContent: 'center',
        alignItems: 'center',
    },
    countText: {
        fontWeight: 'bold',
        color: '#000',
    },
    cardActions: {
        flexDirection: 'row',
        gap: 15,
    },
    actionIcon: {
        padding: 5
    },
    iconImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    textContainer: {
        alignItems: 'center',
        paddingHorizontal: 10
    },
    arabicText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#29A464',
        marginBottom: 10,
        textAlign: 'center',
        lineHeight: 35
    },
    transliterationText: {
        fontSize: 14,
        color: '#29A464',
        textAlign: 'center',
        marginBottom: 10,
        lineHeight: 20
    },
    translationText: {
        fontSize: 13,
        color: '#555',
        textAlign: 'center',
        marginBottom: 15,
        lineHeight: 18
    },
    referenceText: {
        fontSize: 12,
        color: '#88F6B5', // Brighter green for ref
        fontWeight: 'bold'
    }
});

export default DailyDhikr;
