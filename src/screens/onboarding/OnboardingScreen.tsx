import React, { useRef, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useAppContext } from '../../context/AppContext';
import { OnboardingPage } from './OnboardingPage';

const STEPS = [
  {
    id: '1',
    title: 'Discover Natural Wonders',
    description:
      'Explore 20 unique natural phenomena in the Pickering region, from stunning landscapes to rare occurrences.',
    icon: '📍',
    color: '#E24B4A',
    background: require('../../assets/images/OnboardingBg1.png'),
  },
  {
    id: '2',
    title: 'Read Local Stories',
    description:
      'Dive into fascinating blog posts about local experiences, tied to specific locations across Pickering.',
    icon: '📖',
    color: '#EF9F27',
    background: require('../../assets/images/OnboardingBg2.png'),
  },
  {
    id: '3',
    title: 'Test Your Knowledge',
    description:
      'Challenge yourself with fun quizzes about Canada and discover interesting facts about the region.',
    icon: '🧠',
    color: '#1D9E75',
    background: require('../../assets/images/OnboardingBg3.png'),
  },
  {
    id: '4',
    title: 'Travel Tips & Advice',
    description:
      'Get practical tips for travelers visiting Pickering and the surrounding areas.',
    icon: '🧭',
    color: '#7F77DD',
    background: require('../../assets/images/OnboardingBg4.png'),
  },
  {
    id: '5',
    title: 'Save Your Favorites',
    description:
      'Bookmark locations and tips to build your personal guide for exploring Pickering.',
    icon: '🔖',
    color: '#D4537E',
    background: require('../../assets/images/OnboardingBg5.png'),
  },
];

const { width, height } = Dimensions.get('window');
const isVerySmall = height < 680;
const isSmall = height < 760;

export function OnboardingScreen() {
  const { dispatch } = useAppContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const isLast = currentIndex === STEPS.length - 1;
  const currentStep = STEPS[currentIndex];

  const handleNext = () => {
    if (isLast) {
      dispatch({ type: 'COMPLETE_ONBOARDING' });
      return;
    }

    const nextIndex = currentIndex + 1;
    flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    setCurrentIndex(nextIndex);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={STEPS}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OnboardingPage step={item} />}
        onMomentumScrollEnd={(e) => {
          setCurrentIndex(Math.round(e.nativeEvent.contentOffset.x / width));
        }}
      />

      <TouchableOpacity
        style={styles.skipBtn}
        onPress={() => dispatch({ type: 'COMPLETE_ONBOARDING' })}
        activeOpacity={0.85}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <View style={styles.indicators}>
          {STEPS.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === currentIndex
                  ? {
                      backgroundColor: currentStep.color,
                      width: isVerySmall ? 24 : isSmall ? 28 : 30,
                    }
                  : {
                      backgroundColor: 'rgba(255,255,255,0.32)',
                      width: isVerySmall ? 7 : 8,
                    },
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: currentStep.color }]}
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>
            {isLast ? 'Get Started' : 'Next →'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  skipBtn: {
    position: 'absolute',
    top: isVerySmall ? 72 : isSmall ? 82 : 92,
    right: isVerySmall ? 20 : 24,
    zIndex: 3,
  },
  skipText: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: isVerySmall ? 15 : 17,
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: isVerySmall ? 42 : isSmall ? 50 : 58,
    paddingHorizontal: isVerySmall ? 24 : isSmall ? 28 : 32,
    gap: isVerySmall ? 12 : 14,
    zIndex: 5,
  },
  indicators: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: isVerySmall ? 8 : 9,
    marginBottom: isVerySmall ? 2 : 4,
  },
  dot: {
    height: isVerySmall ? 7 : 8,
    borderRadius: 999,
  },
  button: {
    minHeight: isVerySmall ? 52 : isSmall ? 56 : 58,
    paddingHorizontal: 20,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: isVerySmall ? 16 : isSmall ? 17 : 18,
    fontWeight: '700',
  },
});