import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SafeLinearGradient from '../components/SafeLinearGradient';
import { HomeGradients } from '../constants/colors';
import { RootStackParamList } from '../navigation/Stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const RamzanAshras: React.FC = (): React.JSX.Element => {
  const navigation = useNavigation<NavigationProp>();

  const ashras = [
    {
      number: 1,
      name: 'Pehla Ashra',
      nameUrdu: 'پہلا عشرہ',
      description: 'Rahmat (Mercy)',
    },
    {
      number: 2,
      name: 'Dusra Ashra',
      nameUrdu: 'دوسرا عشرہ',
      description: 'Maghfirat (Forgiveness)',
    },
    {
      number: 3,
      name: 'Teesra Ashra',
      nameUrdu: 'تیسرا عشرہ',
      description: 'Nijat (Salvation)',
    },
  ];

  return (
    <SafeLinearGradient
      colors={[HomeGradients.homeBackground.start, HomeGradients.homeBackground.end]}
      style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/images/back.png')}
            style={styles.backIconImage}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ramzan</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Ramzan ke Ashre</Text>
        <Text style={styles.sectionSubtitle}>Select an Ashra to view its Dua</Text>

        {ashras.map((ashra) => (
          <TouchableOpacity
            key={ashra.number}
            onPress={() =>
              navigation.navigate('RamzanAshraDua', {
                ashraNumber: ashra.number,
                ashraName: ashra.name,
              })
            }>
            <SafeLinearGradient
              colors={['#F0FCF0', '#E8F8E8']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.ashraCard}>
              <View style={styles.ashraCardContent}>
                <View style={styles.ashraNumberBadge}>
                  <Text style={styles.ashraNumberText}>{ashra.number}</Text>
                </View>
                <View style={styles.ashraTextContainer}>
                  <Text style={styles.ashraName}>{ashra.name}</Text>
                  <Text style={styles.ashraNameUrdu}>{ashra.nameUrdu}</Text>
                  <Text style={styles.ashraDescription}>{ashra.description}</Text>
                </View>
                <Image
                  source={require('../assets/images/ramzan.png')}
                  style={styles.ashraIcon}
                  resizeMode="contain"
                />
              </View>
            </SafeLinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeLinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F261C',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F261C',
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#505050',
    textAlign: 'center',
    marginBottom: 25,
    opacity: 0.7,
  },
  ashraCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E6F4EA',
  },
  ashraCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ashraNumberBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#7DE7A9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  ashraNumberText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  ashraTextContainer: {
    flex: 1,
  },
  ashraName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F261C',
    marginBottom: 5,
  },
  ashraNameUrdu: {
    fontSize: 18,
    fontWeight: '600',
    color: '#29A464',
    marginBottom: 5,
  },
  ashraDescription: {
    fontSize: 14,
    color: '#333',
    opacity: 0.8,
  },
  ashraIcon: {
    width: 60,
    height: 60,
    tintColor: '#29A464',
    opacity: 0.5,
  },
});

export default RamzanAshras;
