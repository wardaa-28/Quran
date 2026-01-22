import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const DuaCategories: React.FC = (): React.JSX.Element => {
    const navigation = useNavigation();

    const categories = [
        { id: '1', title: 'Salah', image: require('../assets/images/Praying.png') },
        { id: '2', title: 'Morning', image: require('../assets/images/morning.png') },
        { id: '3', title: 'Evening', image: require('../assets/images/evening.png') },
        { id: '4', title: 'Names of Allah', image: require('../assets/images/allah.png') },
        { id: '5', title: 'Before Sleep', image: require('../assets/images/sleep.png') },
        { id: '6', title: 'Home & Family', image: require('../assets/images/family.png') },
        { id: '7', title: 'Ruqyah & illness', image: require('../assets/images/illness.png') },
        { id: '8', title: 'Sunnah Duas', image: require('../assets/images/sunnah.png') },
        { id: '9', title: 'Dhikr for All Time', image: require('../assets/images/hands.png') }, // Reusing hands or tasbee
        { id: '10', title: 'Food & Drinks', image: require('../assets/images/food.png') },
        { id: '11', title: 'Quranic Duas', image: require('../assets/images/Qurann.png') },
        { id: '12', title: 'Home & Family', image: require('../assets/images/home.png') }, // Duplicate title in design, using home icon
    ];

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => (navigation as any).navigate('DuaTopicList', { categoryTitle: item.title })}
        >
            <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
            <Text style={styles.cardTitle}>{item.title}</Text>
        </TouchableOpacity>
    );

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
                <Text style={styles.headerTitle}>Dua</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Grid List */}
            <FlatList
                data={categories}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={3}
                contentContainerStyle={styles.listContent}
                columnWrapperStyle={styles.columnWrapper}
                showsVerticalScrollIndicator={false}
            />
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
        height: 40, // Consistent with other screens
        borderRadius: 20,
        backgroundColor: '#50D287',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIconImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        // tintColor: '#fff', // Image seems to have white content or fits well
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0F261C',
    },
    listContent: {
        paddingHorizontal: 15,
        paddingBottom: 20,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 10,
        width: (width - 60) / 3, // 3 columns calculation
        minHeight: 110,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#F5F5F5'
    },
    cardImage: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#0F261C',
        textAlign: 'center',
    }
});

export default DuaCategories;
