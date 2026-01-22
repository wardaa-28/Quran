import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { surahList } from '../constants/surahData';

const ListenQuran: React.FC = (): React.JSX.Element => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = React.useState(false);
    const [selectedSurah, setSelectedSurah] = React.useState<any>(null);
    const [reciterModalVisible, setReciterModalVisible] = React.useState(false);
    const [selectedReciter, setSelectedReciter] = React.useState('Salah Bukhatir');
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [isRepeating, setIsRepeating] = React.useState(false);

    const reciters = [
        'Salah Bukhatir',
        'Mishary Rashid',
        'Abdul Basit',
        'Saud Al-Shuraim',
        'Abdur Rahman Al-Sudais',
        'Maher Al-Muaiqly',
        'Saad Al-Ghamdi',
        'Yasser Al-Dosari',
        'Ahmed Al-Ajmi',
        'Abdullah Basfar',
    ];

    // Simulate time update for design (no actual audio)
    React.useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;
        if (isPlaying && duration > 0) {
            interval = setInterval(() => {
                setCurrentTime((prev) => {
                    if (prev >= duration) {
                        setIsPlaying(false);
                        return duration;
                    }
                    return prev + 1;
                });
            }, 1000);
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isPlaying, duration]);

    const handleSurahPress = (surah: any) => {
        setSelectedSurah(surah);
        setModalVisible(true);
        // Set default duration for display (in seconds)
        setDuration(300); // 5 minutes default
        setCurrentTime(0);
    };

    const handleReciterSelect = (reciter: string) => {
        setSelectedReciter(reciter);
        setReciterModalVisible(false);
    };

    const handlePlay = () => {
        setIsPlaying(true);
    };

    const handlePause = () => {
        setIsPlaying(false);
    };

    const handleResume = () => {
        setIsPlaying(true);
    };

    const handleSeekForward = () => {
        if (currentTime < duration) {
            setCurrentTime(Math.min(currentTime + 10, duration));
        }
    };

    const handleSeekBackward = () => {
        if (currentTime > 0) {
            setCurrentTime(Math.max(currentTime - 10, 0));
        }
    };

    const handleRestart = () => {
        setCurrentTime(0);
        if (!isPlaying) {
            setIsPlaying(true);
        }
    };

    const handleToggleRepeat = () => {
        setIsRepeating(!isRepeating);
    };

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleModalClose = () => {
        setModalVisible(false);
        setIsPlaying(false);
    };

    const renderReciterModal = () => (
        <Modal
            animationType="slide"
            transparent={false}
            visible={reciterModalVisible}
            onRequestClose={() => setReciterModalVisible(false)}
        >
            <View style={styles.reciterModalContainer}>
                {/* Header */}
                <View style={styles.reciterHeader}>
                    <TouchableOpacity
                        style={styles.backButtonReciter}
                        onPress={() => setReciterModalVisible(false)}>
                        <Image
                            source={require('../assets/images/back.png')}
                            style={styles.backIconImage}
                        />
                    </TouchableOpacity>
                    <Text style={styles.reciterHeaderTitle}>Choose your favorite reciter</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView style={styles.reciterList} showsVerticalScrollIndicator={false}>
                    {reciters.map((reciter, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.reciterCard,
                                selectedReciter === reciter && styles.reciterCardSelected
                            ]}
                            onPress={() => handleReciterSelect(reciter)}
                        >
                            <View style={styles.reciterCardLeft}>
                                <Image
                                    source={require('../assets/images/salah-bukhatir.png')}
                                    style={styles.reciterCardImage}
                                />
                                <Text style={styles.reciterCardName}>{reciter}</Text>
                            </View>
                            <View style={styles.arrowCircleSmall}>
                                <Text style={styles.arrowTextSmall}>{'>'}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                    <View style={{ height: 20 }} />
                </ScrollView>
            </View>
        </Modal>
    );

    const renderPlayerModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={handleModalClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeaderBar} />

                    {/* Reciter Info */}
                    <TouchableOpacity
                        style={styles.playerHeader}
                        onPress={() => setReciterModalVisible(true)}
                    >
                        <Image
                            source={require('../assets/images/salah-bukhatir.png')}
                            style={styles.reciterImage}
                        />
                        <Text style={styles.reciterName}>{selectedReciter}</Text>
                        <TouchableOpacity onPress={handleModalClose}>
                            <Text style={styles.closeButton}>v</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>

                    {/* Surah Info */}
                    <View style={styles.playerInfo}>
                        <Text style={styles.playerSurahEnglish}>{selectedSurah?.nameEnglish || 'Surah Name'}</Text>
                        <Text style={styles.playerSurahArabic}>{selectedSurah?.nameArabic || 'سورة'}</Text>
                    </View>

                    {/* Waveform Visualization */}
                    <View style={styles.waveformContainer}>
                        <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                        <View style={styles.waveformBarContainer}>
                            {[...Array(20)].map((_, i) => {
                                    const progress = duration > 0 ? currentTime / duration : 0;
                                    const barIndex = i / 20;
                                    const isActive = barIndex <= progress;
                                    return (
                                        <View
                                            key={i}
                                            style={[
                                                styles.waveformBar,
                                                {
                                                    height: isActive && isPlaying
                                                        ? Math.random() * 20 + 10
                                                        : 5,
                                                    backgroundColor: isActive && isPlaying
                                                        ? (i % 2 === 0 ? '#50D287' : '#C4ECCF')
                                                        : '#E0E0E0',
                                                }
                                            ]}
                                        />
                                    );
                                })}
                        </View>
                        <Text style={styles.timeText}>{formatTime(duration)}</Text>
                    </View>

                    {/* Controls */}
                    <View style={styles.controlsContainer}>
                        <TouchableOpacity onPress={handleRestart}>
                            <Text style={[styles.controlIcon, isRepeating && styles.controlIconActive]}>↺</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSeekBackward}>
                            <Text style={styles.controlIcon}>«</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.playPauseButton}
                            onPress={isPlaying ? handlePause : (duration > 0 ? handleResume : handlePlay)}
                        >
                            <Image
                                source={require('../assets/images/playicon.png')}
                                style={styles.playPauseIconImage}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSeekForward}>
                            <Text style={styles.controlIcon}>»</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleToggleRepeat}>
                            <Text style={[styles.controlIcon, isRepeating && styles.controlIconActive]}>↻</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../assets/images/back.png')}
                        style={styles.backIconImage}
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Listen Quran</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Main List */}
            <ScrollView
                style={styles.scrollContainer}
                showsVerticalScrollIndicator={false}>
                {surahList.map((surah) => (
                    <View key={surah.id} style={styles.surahCard}>
                        <TouchableOpacity onPress={() => handleSurahPress(surah)}>
                            <Image
                                source={require('../assets/images/playicon.png')}
                                style={styles.playIconImage}
                            />
                        </TouchableOpacity>

                        <View style={styles.surahInfo}>
                            <Text style={styles.surahEnglish}>{surah.nameEnglish}</Text>
                            <Text style={styles.surahMeaning}>{surah.meaning || 'The Opening'}</Text>
                        </View>

                        <Text style={styles.surahArabic}>{surah.nameArabic}</Text>
                    </View>
                ))}
            </ScrollView>

            {renderPlayerModal()}
            {renderReciterModal()}
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
    scrollContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    surahCard: {
        backgroundColor: '#EFFCEF',
        borderRadius: 12,
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E6F4EA',
        justifyContent: 'space-between',
    },
    playIconImage: {
        width: 35,
        height: 35,
        resizeMode: 'contain',
        marginRight: 5,
    },
    surahInfo: {
        flex: 1,
        marginRight: 10,
    },
    surahEnglish: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#0F261C',
        marginBottom: 2,
    },
    surahMeaning: {
        fontSize: 12,
        color: '#333',
        opacity: 0.8,
    },
    surahArabic: {
        fontSize: 18,
        color: '#29A464',
        fontWeight: '600',
        textAlign: 'right',
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
        padding: 20,
        minHeight: 350,
        paddingBottom: 40,
    },
    modalHeaderBar: {
        width: 40,
        height: 4,
        backgroundColor: '#29A464',
        alignSelf: 'center',
        borderRadius: 2,
        marginBottom: 20,
    },
    playerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 12,
    },
    reciterImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    reciterName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        flex: 1,
        marginLeft: 10,
    },
    closeButton: {
        fontSize: 18,
        color: '#999',
        fontWeight: 'bold',
        padding: 5,
    },
    playerInfo: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
    },
    playerSurahEnglish: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
    },
    playerSurahArabic: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#29A464',
    },
    waveformContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    timeText: {
        fontSize: 10,
        color: '#888',
        width: 40,
        textAlign: 'center',
    },
    waveformBarContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        marginHorizontal: 10,
    },
    waveformBar: {
        width: 3,
        marginHorizontal: 2,
        borderRadius: 2,
    },
    controlsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    controlIcon: {
        fontSize: 20,
        color: '#29A464',
        fontWeight: 'bold',
    },
    controlIconActive: {
        color: '#1BA95A',
    },
    playPauseButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    playPauseIconImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    reciterModalContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 50,
    },
    reciterHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    backButtonReciter: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#50D287',
        justifyContent: 'center',
        alignItems: 'center',
    },
    reciterHeaderTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0F261C',
    },
    reciterList: {
        paddingHorizontal: 20,
    },
    reciterCard: {
        backgroundColor: '#FCFDF5',
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#E6F4EA',
    },
    reciterCardSelected: {
        backgroundColor: '#E6F4EA',
        borderColor: '#29A464',
        borderWidth: 2,
    },
    reciterCardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reciterCardImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 15,
    },
    reciterCardName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0F261C',
    },
    arrowCircleSmall: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#C5E898',
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowTextSmall: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
});

export default ListenQuran;
