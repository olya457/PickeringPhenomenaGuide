import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppContext } from '../../context/AppContext';
import { QuizStackParamList } from '../../navigation/MainTabNavigator';

type Props = NativeStackScreenProps<QuizStackParamList, 'QuizResult'>;

const { height, width } = Dimensions.get('window');
const isVerySmall = height < 680;
const isSmall = height < 760;
const isNarrow = width < 370;

export function QuizResultScreen({ route, navigation }: Props) {
  const { dispatch } = useAppContext();
  const { score, total } = route.params;
  const pct = Math.round((score / total) * 100);

  const getMessage = (): string => {
    if (pct >= 80) return 'Outstanding! You\'re a Pickering expert!';
    if (pct >= 60) return 'Great job exploring your knowledge!';
    if (pct >= 40) return 'Good effort! Keep exploring!';
    return 'Keep learning about Pickering\'s wonders!';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🏅</Text>

      <Text style={styles.title}>Quiz Complete!</Text>

      <Text style={styles.message}>{getMessage()}</Text>

      <View style={styles.scoreCard}>
        <Text style={styles.scoreMain}>{score}/{total}</Text>
        <Text style={styles.scoreLabel}>Correct Answers</Text>

        <View style={styles.divider} />

        <Text style={styles.scorePct}>{pct}%</Text>
        <Text style={styles.scoreLabel}>Score</Text>
      </View>

      <TouchableOpacity
        style={styles.retryBtn}
        onPress={() => {
          dispatch({ type: 'RESTART_QUIZ' });
          navigation.replace('Quiz');
        }}
      >
        <Text style={styles.retryText}>↺ Try Again</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.homeBtn}
        onPress={() => navigation.getParent()?.navigate('LocationsTab')}
      >
        <Text style={styles.homeText}>Explore Locations</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: isVerySmall ? 18 : isSmall ? 22 : 32,
    paddingTop: Platform.OS === 'android' ? 20 : 0,
    paddingBottom: isVerySmall ? 20 : 28,
  },
  emoji: {
    fontSize: isVerySmall ? 56 : isSmall ? 64 : 72,
    marginBottom: isVerySmall ? 12 : 16,
  },
  title: {
    fontSize: isVerySmall ? 24 : isSmall ? 26 : 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: isVerySmall ? 14 : 15,
    color: '#9A9A9A',
    textAlign: 'center',
    marginBottom: isVerySmall ? 22 : 32,
    lineHeight: isVerySmall ? 20 : 22,
    paddingHorizontal: isNarrow ? 4 : 10,
  },
  scoreCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: isVerySmall ? 18 : 20,
    paddingVertical: isVerySmall ? 22 : isSmall ? 26 : 32,
    paddingHorizontal: isVerySmall ? 18 : 22,
    alignItems: 'center',
    width: '100%',
    marginBottom: isVerySmall ? 22 : 32,
  },
  scoreMain: {
    fontSize: isVerySmall ? 40 : isSmall ? 46 : 52,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  scoreLabel: {
    fontSize: isVerySmall ? 13 : 14,
    color: '#9A9A9A',
    marginTop: 4,
    textAlign: 'center',
  },
  divider: {
    width: isVerySmall ? 34 : 40,
    height: 1,
    backgroundColor: '#333333',
    marginVertical: isVerySmall ? 14 : 16,
  },
  scorePct: {
    fontSize: isVerySmall ? 30 : isSmall ? 33 : 36,
    fontWeight: '700',
    color: '#E24B4A',
  },
  retryBtn: {
    backgroundColor: '#E24B4A',
    paddingHorizontal: 24,
    height: isVerySmall ? 50 : 56,
    borderRadius: 28,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  retryText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: isVerySmall ? 15 : 16,
  },
  homeBtn: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 24,
    height: isVerySmall ? 50 : 56,
    borderRadius: 28,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  homeText: {
    color: '#9A9A9A',
    fontWeight: '600',
    fontSize: isVerySmall ? 15 : 16,
    textAlign: 'center',
  },
});