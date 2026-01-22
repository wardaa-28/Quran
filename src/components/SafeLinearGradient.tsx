import React from 'react';
import { View, ViewStyle } from 'react-native';

interface SafeLinearGradientProps {
  colors: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  style?: ViewStyle | ViewStyle[];
  children?: React.ReactNode;
}

// Lazy load LinearGradient to avoid crashes at module load time
const getLinearGradient = () => {
  try {
    return require('react-native-linear-gradient').default;
  } catch (error) {
    return null;
  }
};

const SafeLinearGradient: React.FC<SafeLinearGradientProps> = ({
  colors,
  start,
  end,
  style,
  children,
}) => {
  const LinearGradient = React.useMemo(() => getLinearGradient(), []);

  // If LinearGradient is not available, use View with first color as background
  if (!LinearGradient) {
    return (
      <View style={[style, { backgroundColor: colors[0] || '#ffffff' }]}>
        {children}
      </View>
    );
  }

  try {
    return (
      <LinearGradient
        colors={colors}
        start={start || { x: 0, y: 0 }}
        end={end || { x: 1, y: 1 }}
        style={style}>
        {children}
      </LinearGradient>
    );
  } catch (error) {
    console.warn('Error rendering LinearGradient, using fallback:', error);
    return (
      <View style={[style, { backgroundColor: colors[0] || '#ffffff' }]}>
        {children}
      </View>
    );
  }
};

export default SafeLinearGradient;

