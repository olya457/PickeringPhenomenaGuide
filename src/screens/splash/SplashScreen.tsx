import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const { width, height } = Dimensions.get('window');

export function SplashScreen({ navigation }: Props) {
  const rotation = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();

    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/SplashBackground.png')}
        style={styles.background}
        resizeMode="cover"
      />
      <View style={styles.overlay} />
      <Animated.View style={{ opacity }}>
        <Animated.Image
          source={require('../../assets/images/Logo.png')}
          style={[styles.logo, { transform: [{ rotate }] }]}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  background: { position: 'absolute', width, height },
  overlay: { position: 'absolute', width, height, backgroundColor: 'rgba(0,0,0,0.45)' },
  logo: { width: 180, height: 180 },
});