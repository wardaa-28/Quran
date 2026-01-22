import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const TasbihDetail: React.FC = (): React.JSX.Element => {
    const navigation = useNavigation();
    const route = useRoute();
    const { tasbih } = (route.params as any) || {};

    const [count, setCount] = useState(0);
    const targetCount = tasbih?.count || 33;

    const handleIncrement = () => {
        if (count < targetCount) {
            setCount(count + 1);
        }
    };

    const handleReset = () => {
        setCount(0);
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
                <Text style={styles.headerTitle}>Tasbih</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Content */}
            <View style={styles.content}>
                <Image
                    source={require('../assets/images/hands.png')}
                    style={styles.handsImage}
                    resizeMode="contain"
                />

                <Text style={styles.arabicText}>{tasbih?.arabic || 'SubhanAllah'}</Text>
                <Text style={styles.dateText}>{tasbih?.date || '16-Dec-25'}</Text>
                <Text style={styles.counterText}>{count}/{targetCount}</Text>

                <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                    <Text style={styles.resetButtonText}>Reset</Text>
                </TouchableOpacity>

                <Text style={styles.targetLabel}>Target Count:</Text>

                {/* Circular Button */}
                <TouchableOpacity onPress={handleIncrement} activeOpacity={0.8}>
                    <LinearGradient
                        colors={['#6DD082', '#34A876']}
                        style={styles.circleButton}
                    >
                        <View style={styles.innerCircle}>
                            <Text style={styles.bigCountText}>{count}/{targetCount}</Text>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
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
        marginBottom: 10,
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

    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0F261C',
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: 20
    },
    handsImage: {
        width: width * 0.6,
        height: width * 0.5,
        marginBottom: 20
    },
    arabicText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2E8B57', // Greenish text
        marginBottom: 5
    },
    dateText: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10
    },
    counterText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20
    },
    resetButton: {
        backgroundColor: '#CFE795', // Yellowish green from image
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginBottom: 30
    },
    resetButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0F261C'
    },
    targetLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#888',
        marginBottom: 20
    },
    circleButton: {
        width: 140,
        height: 140,
        borderRadius: 70,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
    innerCircle: {
        width: 170,
        height: 170,
        borderRadius: 85,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bigCountText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#FFFFFF'
    }
});

export default TasbihDetail;
