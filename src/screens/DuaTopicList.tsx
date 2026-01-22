import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { duasData } from '../constants/duasData';

const DuaTopicList: React.FC = (): React.JSX.Element => {
    const navigation = useNavigation();
    const route = useRoute();
    const { categoryTitle } = route.params as { categoryTitle: string } || { categoryTitle: 'Morning' };

    // Find the category data
    const categoryData = duasData.find(cat => cat.categoryTitle === categoryTitle);
    
    // If "Names of Allah" is clicked, navigate directly to Names of Allah screen
    React.useEffect(() => {
        if (categoryTitle === 'Names of Allah') {
            (navigation as any).navigate('NamesOfAllah');
        }
    }, [categoryTitle, navigation]);

    // If "Names of Allah", return null as we're navigating away
    if (categoryTitle === 'Names of Allah') {
        return null;
    }

    // Get topics for this category
    const topics = categoryData?.topics || [];

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
                <Text style={styles.headerTitle}>{categoryTitle}</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Topic List */}
            <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
                {topics.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No topics available for this category</Text>
                    </View>
                ) : (
                    topics.map((topic, index) => (
                        <TouchableOpacity
                            key={topic.id}
                            style={styles.topicCard}
                            onPress={() => (navigation as any).navigate('DuaListPage', { 
                                topicTitle: topic.title,
                                categoryTitle: categoryTitle,
                                topicId: topic.id
                            })}
                        >
                            <View style={styles.topicLeft}>
                                <View style={styles.numberBadge}>
                                    <Text style={styles.numberText}>{index + 1}</Text>
                                </View>
                                <Text style={styles.topicTitle}>{topic.title}</Text>
                            </View>
                            <View style={styles.arrowCircle}>
                                <Text style={styles.arrowText}>{'>'}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                )}
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
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0F261C',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    topicCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F0F9EA', // Light yellowish-green
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#E1EEDD'
    },
    topicLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    numberBadge: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#86E3A3', // Green badge
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    },
    numberText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    topicTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0F261C'
    },
    arrowCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#C8E685', // Light lime
        justifyContent: 'center',
        alignItems: 'center'
    },
    arrowText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12
    },
    emptyContainer: {
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center'
    }
});

export default DuaTopicList;
