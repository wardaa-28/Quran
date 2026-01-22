import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { namesOfAllah } from '../constants/namesOfAllah';

const NamesOfAllah: React.FC = (): React.JSX.Element => {
    const navigation = useNavigation();

    const renderName = ({ item, index }: { item: any; index: number }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.countBadge}>
                    <Text style={styles.countText}>{index + 1}</Text>
                </View>
                <View style={styles.cardActions}>
                    <TouchableOpacity style={styles.actionIcon}>
                        <Image source={require('../assets/images/speaker.png')} style={[styles.iconImage, { tintColor: '#29A464' }]} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionIcon}>
                        <Text style={{ color: '#29A464' }}>♥</Text>
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
                <Text style={styles.meaningText}>{item.meaning}</Text>
            </View>
        </View>
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
                <Text style={styles.headerTitle}>Names of Allah</Text>
                <View style={{ width: 40 }} />
            </View>

            <FlatList
                data={namesOfAllah}
                renderItem={renderName}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContent}
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
        borderColor: '#F5F5F5'
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
        borderTopRightRadius: 16
    },
    countBadge: {
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
        lineHeight: 20,
        fontWeight: '600'
    },
    translationText: {
        fontSize: 14,
        color: '#0F261C',
        textAlign: 'center',
        marginBottom: 10,
        lineHeight: 20,
        fontWeight: 'bold'
    },
    meaningText: {
        fontSize: 12,
        color: '#555',
        textAlign: 'center',
        marginBottom: 5,
        lineHeight: 18
    }
});

export default NamesOfAllah;
