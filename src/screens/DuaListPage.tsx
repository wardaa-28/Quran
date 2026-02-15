import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { duasData } from '../constants/duasData';
import { saveBookmark, isBookmarked, removeBookmark, getBookmarks } from '../utils/bookmarkStorage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';

const DuaListPage: React.FC = (): React.JSX.Element => {
    const navigation = useNavigation();
    const route = useRoute();
    const { topicTitle, categoryTitle, topicId } = route.params as { 
        topicTitle: string;
        categoryTitle?: string;
        topicId?: string;
    } || { topicTitle: 'Upon waking up' };

    const [bookmarkedItems, setBookmarkedItems] = useState<Set<string>>(new Set());

    // Find the duas for this topic
    let duaList: any[] = [];
    
    if (categoryTitle && topicId) {
        const categoryData = duasData.find(cat => cat.categoryTitle === categoryTitle);
        const topic = categoryData?.topics.find(t => t.id === topicId);
        if (topic) {
            duaList = topic.duas.map((dua, index) => ({
                ...dua,
                count: index + 1
            }));
        }
    }

    // If no duas found, show empty state
    if (duaList.length === 0) {
        duaList = [{
            id: 1,
            count: 1,
            arabic: 'اَلْحَمْدُ لِلَّهِ الَّذِي عَافَانِي فِي جَسَدِي، وَرَدَّ عَلَيَّ رُوحِي، وَأَذِنَ لِي بِذِكْرِهِ.',
            transliteration: 'Alhamdu lillahi-lathee AAafnee fee jasadee waradda AAalayya roohhee wa-athina lee bithikrih',
            translation: 'All praise for Allah who restored to me my health and returned my soul and has allowed me to remember him.',
            reference: 'At-Tirmidhi 5:473'
        }];
    }

    useEffect(() => {
        loadBookmarkStatus();
    }, [duaList]);

    const loadBookmarkStatus = async () => {
        const bookmarked = new Set<string>();
        for (const dua of duaList) {
            const isBooked = await isBookmarked(dua.arabic, dua.reference);
            if (isBooked) {
                bookmarked.add(`${dua.arabic}-${dua.reference}`);
            }
        }
        setBookmarkedItems(bookmarked);
    };

    const handleBookmarkToggle = async (dua: any) => {
        const key = `${dua.arabic}-${dua.reference}`;
        const currentlyBookmarked = bookmarkedItems.has(key);

        if (currentlyBookmarked) {
            // Remove bookmark
            const allBookmarks = await getBookmarks();
            const bookmarkToRemove = allBookmarks.find(
                (b) => b.arabic === dua.arabic && b.reference === dua.reference
            );
            if (bookmarkToRemove) {
                await removeBookmark(bookmarkToRemove.id);
                setBookmarkedItems((prev) => {
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
                arabic: dua.arabic,
                transliteration: dua.transliteration,
                translation: dua.translation,
                reference: dua.reference,
                title: `${topicTitle} - Dua ${dua.count || dua.id}`,
            });

            if (success) {
                setBookmarkedItems((prev) => new Set(prev).add(key));
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
                <Text style={styles.headerTitle}>{topicTitle}</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
                {duaList.map((item) => (
                    <View key={item.id} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View style={styles.countBadge}>
                                <Text style={styles.countText}>{item.count}</Text>
                            </View>
                            <View style={styles.cardActions}>
                                <TouchableOpacity
                                    style={styles.actionIcon}
                                    onPress={() => handleBookmarkToggle(item)}>
                                    <FontAwesome
                                        name={bookmarkedItems.has(`${item.arabic}-${item.reference}`) ? 'heart' : 'heart-o'}
                                        size={20}
                                        color="#29A464"
                                    />
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
        backgroundColor: '#50D287',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIconImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0F261C',
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
        backgroundColor: '#E7F9EF', // Light green header strip matches design
        marginHorizontal: -15,
        marginTop: -15,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    },
    countBadge: {
        width: 30, // Smaller or larger based on design? keeping 30
        height: 30,
        // borderRadius: 15, // No border radius on badge in this design? Actually screenshot shows simple text 1
        // Actually screenshot shows "1" on the left, not in a circle? 
        // Wait, looking at the right screenshot (Upon waking up), the "1" is just text on the left.
        // But looking at the LEFT screenshot (Morning), the "1" is in a Green Circle.
        // The user wants "Upon waking up" detail screen.
        // In the Detail screen (Right), the '1' is simple text.
        // But let's look closer at the Right screenshot.
        // Ah, the Right screenshot has a header "1" on the top left, but it's just black text on the green strip.
        // Let's adjust to match the Right screenshot.

        justifyContent: 'center',
        alignItems: 'center',
    },
    countText: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: 16
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
        fontSize: 18,
        fontWeight: 'bold',
        color: '#29A464',
        marginBottom: 10,
        textAlign: 'center',
        lineHeight: 32
    },
    transliterationText: {
        fontSize: 14,
        color: '#29A464',
        textAlign: 'center',
        marginBottom: 10,
        lineHeight: 20
    },
    translationText: {
        fontSize: 12,
        color: '#555',
        textAlign: 'center',
        marginBottom: 15,
        lineHeight: 18
    },
    referenceText: {
        fontSize: 10,
        color: '#88F6B5', // Brighter green for ref
        fontWeight: 'bold'
    }
});

export default DuaListPage;
