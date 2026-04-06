import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';

interface StepProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  background: any;
}

interface Props {
  step: StepProps;
}

const { width, height } = Dimensions.get('window');
const isVerySmall = height < 680;
const isSmall = height < 760;

export function OnboardingPage({ step }: Props) {
  return (
    <ImageBackground
      source={step.background}
      style={[styles.container, { width }]}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <View style={styles.topBar}>
        <Image
          source={require('../../assets/images/Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <View style={styles.centerContent}>
          <View
            style={[
              styles.iconCircle,
              {
                backgroundColor: step.color + '33',
                shadowColor: step.color,
              },
            ]}
          >
            <View
              style={[
                styles.iconInner,
                { backgroundColor: step.color + '55' },
              ]}
            >
              <Text style={styles.iconText}>{step.icon}</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomContent}>
          <Text
            style={[styles.title, { color: step.color }]}
            numberOfLines={2}
            adjustsFontSizeToFit
          >
            {step.title}
          </Text>

          <Text style={styles.description}>
            {step.description}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.42)',
  },
  topBar: {
    position: 'absolute',
    top: isVerySmall ? 76 : isSmall ? 88 : 98,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 2,
  },
  logo: {
    width: isVerySmall ? 30 : isSmall ? 34 : 38,
    height: isVerySmall ? 30 : isSmall ? 34 : 38,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: isVerySmall ? 150 : isSmall ? 168 : 184,
    paddingBottom: isVerySmall ? 245 : isSmall ? 260 : 278,
    paddingHorizontal: isVerySmall ? 22 : isSmall ? 26 : 30,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    minHeight: isVerySmall ? 180 : isSmall ? 210 : 240,
  },
  iconCircle: {
    width: isVerySmall ? 138 : isSmall ? 150 : 164,
    height: isVerySmall ? 138 : isSmall ? 150 : 164,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: isVerySmall ? 20 : isSmall ? 24 : 28,
    elevation: 20,
  },
  iconInner: {
    width: isVerySmall ? 96 : isSmall ? 104 : 112,
    height: isVerySmall ? 96 : isSmall ? 104 : 112,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: isVerySmall ? 42 : isSmall ? 46 : 50,
  },
  bottomContent: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    minHeight: isVerySmall ? 120 : isSmall ? 132 : 144,
  },
  title: {
    fontSize: isVerySmall ? 26 : isSmall ? 30 : 34,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: isVerySmall ? 12 : 14,
  },
  description: {
    fontSize: isVerySmall ? 15 : isSmall ? 16 : 18,
    color: 'rgba(255,255,255,0.82)',
    textAlign: 'center',
    lineHeight: isVerySmall ? 22 : isSmall ? 24 : 28,
    maxWidth: 340,
  },
});