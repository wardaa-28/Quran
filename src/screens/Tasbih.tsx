import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Modal,
    TextInput,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { getTasbihCount } from '../utils/tasbihStorage';
import { getTasbihList, saveTasbihList, TasbihItem } from '../utils/tasbihListStorage';

const Tasbih: React.FC = (): React.JSX.Element => {
    const navigation = useNavigation();

    const [isModalVisible, setModalVisible] = React.useState(false);
    const [selectedCount, setSelectedCount] = React.useState(33);
    const [title, setTitle] = React.useState('');
    const [zikr, setZikr] = React.useState('');
    const [tasbihCounts, setTasbihCounts] = React.useState<{ [key: number | string]: number }>({});

    // Default initial tasbih list
    const defaultTasbihList: TasbihItem[] = [
        {
            id: 1,
            arabic: 'الحمد لله',
            date: '16-Dec-25',
            count: 33,
            colors: ['#E7F9EF', '#FCFFFD'], // Light green gradient
            buttonColor: '#B6E8BD',
        },
        {
            id: 2,
            arabic: 'سُبْحَانَ ٱللَّٰهِ',
            date: '16-Dec-25',
            count: 33,
            colors: ['#E7F9EF', '#FCFFFD'],
            buttonColor: '#B6E8BD',
        },
        {
            id: 3,
            arabic: 'الله أكبر',
            date: '16-Dec-25',
            count: 33,
            colors: ['#E7F9EF', '#FCFFFD'],
            buttonColor: '#B6E8BD',
        },
    ];

    const [tasbihList, setTasbihList] = React.useState<TasbihItem[]>(defaultTasbihList);

    // Load tasbih list from storage on mount
    React.useEffect(() => {
        const loadTasbihList = async () => {
            const savedList = await getTasbihList();
            if (savedList.length > 0) {
                setTasbihList(savedList);
            } else {
                // If no saved list, use default and save it
                setTasbihList(defaultTasbihList);
                await saveTasbihList(defaultTasbihList);
            }
        };
        loadTasbihList();
    }, []);

    // Load tasbih list and counts when screen comes into focus
    useFocusEffect(
        React.useCallback(() => {
            const loadData = async () => {
                // Load tasbih list from storage
                const savedList = await getTasbihList();
                if (savedList.length > 0) {
                    setTasbihList(savedList);
                }
                
                // Load saved counts
                const counts: { [key: number | string]: number } = {};
                const listToUse = savedList.length > 0 ? savedList : tasbihList;
                for (const item of listToUse) {
                    const savedCount = await getTasbihCount(item.id);
                    counts[item.id] = savedCount;
                }
                setTasbihCounts(counts);
            };
            loadData();
        }, [])
    );

    const handleAddTasbih = async () => {
        if (!zikr && !title) {
            // Don't add if both fields are empty
            return;
        }

        const newTasbih: TasbihItem = {
            id: Date.now(),
            arabic: zikr || title || 'New Tasbih', // Fallback
            date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' }).replace(/ /g, '-'),
            count: selectedCount,
            colors: ['#E7F9EF', '#FCFFFD'],
            buttonColor: '#B6E8BD',
        };
        
        const updatedList = [...tasbihList, newTasbih];
        setTasbihList(updatedList);
        
        // Save to local storage
        await saveTasbihList(updatedList);
        
        setModalVisible(false);
        setTitle('');
        setZikr('');
        setSelectedCount(33);
    };

    const renderModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => setModalVisible(false)}>
            <TouchableOpacity 
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={() => setModalVisible(false)}>
                <View 
                    style={styles.modalContainer}
                    onStartShouldSetResponder={() => true}>
                    <View style={styles.modalHeaderBar} />
                    <Text style={styles.modalTitle}>Create Tasbih</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Title</Text>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            value={title}
                            onChangeText={setTitle}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Zikr</Text>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            value={zikr}
                            onChangeText={setZikr}
                        />
                    </View>

                    <Text style={styles.inputLabel}>Zikr Count:</Text>
                    <View style={styles.countOptionsRow}>
                        {[33, 100, 200, 500].map((count) => (
                            <TouchableOpacity
                                key={count}
                                style={[
                                    styles.countOptionButton,
                                    selectedCount === count && styles.countOptionButtonActive,
                                ]}
                                onPress={() => setSelectedCount(count)}>
                                <Text
                                    style={[
                                        styles.countOptionText,
                                        selectedCount === count && styles.countOptionTextActive,
                                    ]}>
                                    {count}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity style={styles.continueButton} onPress={handleAddTasbih}>
                        <Text style={styles.continueButtonText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
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
                <Text style={styles.headerTitle}>Tasbih</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Tasbih List */}
            <ScrollView
                style={styles.contentContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}>
                {tasbihList.map((item) => (
                    <LinearGradient
                        key={item.id}
                        colors={item.colors}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.card}>

                        <TouchableOpacity
                            style={styles.cardContentTouchable}
                            onPress={() => (navigation as any).navigate('TasbihDetail', { tasbih: item })}
                        >
                            <Text style={styles.arabicText}>{item.arabic}</Text>
                            <Text style={styles.dateText}>{item.date}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.countButton, { backgroundColor: item.buttonColor }]}
                            onPress={() => (navigation as any).navigate('TasbihDetail', { tasbih: item })}>
                            <Text style={styles.countText}>Count {tasbihCounts[item.id] ?? 0}/{item.count}</Text>
                            <View style={styles.arrowCircle}>
                                <Text style={styles.arrowText}>{'>'}</Text>
                            </View>
                        </TouchableOpacity>
                    </LinearGradient>
                ))}
            </ScrollView>

            {/* Add Tasbih Button */}
            <View style={styles.footer}>
                <TouchableOpacity 
                    style={styles.addButton} 
                    onPress={() => setModalVisible(true)}
                    activeOpacity={0.7}>
                    <Text style={styles.plusIcon}>+</Text>
                </TouchableOpacity>
                <Text style={styles.addButtonLabel}>Add Tasbih</Text>
            </View>

            {/* Modal */}
            {renderModal()}
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
        width: 35,
        height: 35,
        resizeMode: 'contain',
        // tintColor: '#fff',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0F261C',
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    scrollContent: {
        paddingBottom: 150, // Add padding to prevent content from being hidden behind footer
    },
    card: {
        borderRadius: 12,
        padding: 20,
        marginBottom: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F0F9F4',
    },
    cardContentTouchable: {
        width: '100%',
        alignItems: 'center'
    },
    arabicText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0F261C',
        marginBottom: 5,
    },
    dateText: {
        fontSize: 14,
        color: '#555',
        marginBottom: 15,
    },
    countButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        width: '100%',
        position: 'relative'
    },
    countText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2E8B57', // Darker text for contrast
    },
    arrowCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#50D287',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 15
    },
    arrowText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: -2
    },
    footer: {
        alignItems: 'center',
        marginBottom: 30,
        backgroundColor: '#FFFFFF',
        paddingTop: 10,
        paddingBottom: 10,
    },
    addButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#50D287',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    plusIcon: {
        fontSize: 32,
        color: '#FFFFFF',
        fontWeight: '400',
        marginTop: -2
    },
    addButtonLabel: {
        fontSize: 14,
        color: '#50D287',
        fontWeight: '600'
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 25,
        minHeight: 450,
    },
    modalHeaderBar: {
        width: 40,
        height: 4,
        backgroundColor: '#29A464',
        alignSelf: 'center',
        borderRadius: 2,
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 15,
    },
    input: {
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        padding: 15,
        fontSize: 14,
        color: '#333',
    },
    inputLabel: {
        fontSize: 14,
        marginBottom: 8,
        color: '#333'
    },
    countOptionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
        marginTop: 5
    },
    countOptionButton: {
        width: 60,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#F7FCEF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E6F4EA'
    },
    countOptionButtonActive: {
        backgroundColor: '#50D287',
        borderColor: '#50D287'
    },
    countOptionText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#555',
    },
    countOptionTextActive: {
        color: '#FFF'
    },
    continueButton: {
        backgroundColor: '#29A464',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10
    },
    continueButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Tasbih;
