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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/Stack';
import { saveBookmark, isBookmarked, removeBookmark } from '../utils/bookmarkStorage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Dua data for each ashra
const ashraDuas = {
  1: {
    name: 'Pehla Ashra',
    nameUrdu: 'پہلا عشرہ',
    description: 'Rahmat (Mercy)',
    duas: [
      {
        id: 1,
        arabic: 'رَبِّ اغْفِرْ وَارْحَمْ وَأَنْتَ خَيْرُ الرَّاحِمِينَ',
        transliteration: 'Rabbi ighfir warham wa anta khayrur raahimeen',
        translation: 'O my Lord, forgive and have mercy, and You are the best of the merciful.',
        reference: 'Quran 23:118',
      },
      {
        id: 2,
        arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
        transliteration: 'Rabbana atina fid dunya hasanatan wa fil akhirati hasanatan wa qina azaban naar',
        translation: 'Our Lord, give us good in this world and good in the Hereafter, and save us from the punishment of the Fire.',
        reference: 'Quran 2:201',
      },
    ],
  },
  2: {
    name: 'Dusra Ashra',
    nameUrdu: 'دوسرا عشرہ',
    description: 'Maghfirat (Forgiveness)',
    duas: [
      {
        id: 1,
        arabic: 'أَسْتَغْفِرُ اللَّهَ رَبِّي مِنْ كُلِّ ذَنْبٍ وَأَتُوبُ إِلَيْهِ',
        transliteration: 'Astaghfirullah rabbi min kulli dhambin wa atoobu ilayh',
        translation: 'I seek forgiveness from Allah, my Lord, from every sin and I repent to Him.',
        reference: 'Hadith',
      },
      {
        id: 2,
        arabic: 'رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَكَفِّرْ عَنَّا سَيِّئَاتِنَا وَتَوَفَّنَا مَعَ الْأَبْرَارِ',
        transliteration: 'Rabbana ighfir lana dhunoobana wa kaffir anna sayyiatina wa tawaffana ma al abrar',
        translation: 'Our Lord, forgive us our sins and remove from us our misdeeds and cause us to die with the righteous.',
        reference: 'Quran 3:193',
      },
    ],
  },
  3: {
    name: 'Teesra Ashra',
    nameUrdu: 'تیسرا عشرہ',
    description: 'Nijat (Salvation)',
    duas: [
      {
        id: 1,
        arabic: 'اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ',
        transliteration: 'Allahumma ajirni minan naar',
        translation: 'O Allah, save me from the Fire.',
        reference: 'Hadith',
      },
      {
        id: 2,
        arabic: 'رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
        transliteration: 'Rabbana afrigh alayna sabran wa thabbit aqdamana wansurna alal qawmil kafireen',
        translation: 'Our Lord, pour upon us patience and plant firmly our feet and give us victory over the disbelieving people.',
        reference: 'Quran 2:250',
      },
    ],
  },
};

const RamzanAshraDua: React.FC = (): React.JSX.Element => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { ashraNumber, ashraName } = route.params as {
    ashraNumber: number;
    ashraName: string;
  };

  const ashraData = ashraDuas[ashraNumber as keyof typeof ashraDuas];
  const duas = ashraData?.duas || [];
  
  const [bookmarkedItems, setBookmarkedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadBookmarkStatus();
  }, []);

  const loadBookmarkStatus = async () => {
    const bookmarked = new Set<string>();
    for (const dua of duas) {
      const isBooked = await isBookmarked(dua.arabic, dua.reference);
      if (isBooked) {
        bookmarked.add(`${dua.arabic}-${dua.reference}`);
      }
    }
    setBookmarkedItems(bookmarked);
  };

  const handleBookmarkToggle = async (dua: typeof duas[0]) => {
    const key = `${dua.arabic}-${dua.reference}`;
    const currentlyBookmarked = bookmarkedItems.has(key);

    if (currentlyBookmarked) {
      // Remove bookmark
      const bookmarks = await import('../utils/bookmarkStorage');
      const allBookmarks = await bookmarks.getBookmarks();
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
        Alert.alert('Success', 'Bookmark removed');
      }
    } else {
      // Add bookmark
      const success = await saveBookmark({
        type: 'dua',
        arabic: dua.arabic,
        transliteration: dua.transliteration,
        translation: dua.translation,
        reference: dua.reference,
        title: `${ashraData?.name} - Dua ${dua.id}`,
      });

      if (success) {
        setBookmarkedItems((prev) => new Set(prev).add(key));
        Alert.alert('Success', 'Bookmark saved');
      } else {
        Alert.alert('Info', 'Already bookmarked');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/images/back.png')}
            style={styles.backIconImage}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {ashraData?.name || ashraName}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}>
        {ashraData && (
          <View style={styles.ashraInfoCard}>
            <Text style={styles.ashraInfoName}>{ashraData.nameUrdu}</Text>
            <Text style={styles.ashraInfoDescription}>{ashraData.description}</Text>
          </View>
        )}

        {duas.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.countBadge}>
                <Text style={styles.countText}>{item.id}</Text>
              </View>
              <View style={styles.cardActions}>
                <TouchableOpacity
                  style={styles.actionIcon}
                  onPress={() => handleBookmarkToggle(item)}>
                  <Text
                    style={{
                      color: bookmarkedItems.has(`${item.arabic}-${item.reference}`)
                        ? '#FF0000'
                        : '#29A464',
                      fontSize: 20,
                    }}>
                    {bookmarkedItems.has(`${item.arabic}-${item.reference}`)
                      ? '❤️'
                      : '♥'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionIcon}>
                  <Text style={{ color: '#29A464' }}>🔗</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.arabicText}>{item.arabic}</Text>
              <Text style={styles.transliterationText}>
                {item.transliteration}
              </Text>
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
  ashraInfoCard: {
    backgroundColor: '#E7F9EF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  ashraInfoName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#29A464',
    marginBottom: 8,
  },
  ashraInfoDescription: {
    fontSize: 16,
    color: '#0F261C',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#E7F9EF',
    marginHorizontal: -15,
    marginTop: -15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  countBadge: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 15,
  },
  actionIcon: {
    padding: 5,
  },
  iconImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  arabicText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#29A464',
    marginBottom: 10,
    textAlign: 'center',
    lineHeight: 32,
  },
  transliterationText: {
    fontSize: 14,
    color: '#29A464',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 20,
  },
  translationText: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 18,
  },
  referenceText: {
    fontSize: 10,
    color: '#88F6B5',
    fontWeight: 'bold',
  },
});

export default RamzanAshraDua;
