import React, { useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppContext } from '../../context/AppContext';
import { QuizStackParamList } from '../../navigation/MainTabNavigator';
import { QuizQuestion } from '../../data/questions';

type Props = NativeStackScreenProps<QuizStackParamList, 'Quiz'>;

const { height, width } = Dimensions.get('window');
const isVerySmall = height < 680;
const isSmall = height < 760;
const isNarrow = width < 370;

const bottomSafeSpace =
  Platform.OS === 'ios'
    ? isVerySmall ? 150 : 170
    : isVerySmall ? 130 : 145;

export function QuizScreen({ navigation }: Props) {
  const { state, dispatch } = useAppContext();
  const { questions, currentIndex, score, selectedAnswer, isFinished } = state.quiz;

  const shuffledQuestions = useMemo(() => {
    const cloned = [...questions];
    for (let i = cloned.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
    }
    return cloned.slice(0, 10);
  }, [questions]);

  useEffect(() => {
    if (isFinished) {
      navigation.replace('QuizResult', {
        score,
        total: shuffledQuestions.length,
      });
    }
  }, [isFinished]);

  const q: QuizQuestion = shuffledQuestions[currentIndex];
  if (!q) return null;

  const getColor = (i: number) => {
    if (selectedAnswer === null) return '#1A1A1A';
    if (i === q.correctAnswer) return 'rgba(29,158,117,0.25)';
    if (i === selectedAnswer) return 'rgba(226,75,74,0.25)';
    return '#1A1A1A';
  };

  const getBorder = (i: number) => {
    if (selectedAnswer === null) return 'rgba(255,255,255,0.1)';
    if (i === q.correctAnswer) return '#1D9E75';
    if (i === selectedAnswer) return '#E24B4A';
    return 'rgba(255,255,255,0.1)';
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.inner}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <View style={styles.topBar}>
        <Text style={styles.progress}>
          Question {currentIndex + 1} of {shuffledQuestions.length}
        </Text>
        <Text style={styles.score}>Score: {score}</Text>
      </View>

      <View style={styles.progressBarBg}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${((currentIndex + 1) / shuffledQuestions.length) * 100}%` },
          ]}
        />
      </View>

      <Text style={styles.question}>{q.question}</Text>

      <View style={styles.answers}>
        {q.options.map((option, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.answerBtn,
              { backgroundColor: getColor(i), borderColor: getBorder(i) },
            ]}
            onPress={() => dispatch({ type: 'SELECT_ANSWER', payload: i })}
            disabled={selectedAnswer !== null}
          >
            <Text style={styles.answerText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedAnswer !== null && (
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => dispatch({ type: 'NEXT_QUESTION' })}
        >
          <Text style={styles.nextText}>
            {currentIndex + 1 === shuffledQuestions.length
              ? 'See Results'
              : 'Next Question →'}
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  inner: {
    paddingHorizontal: isVerySmall ? 12 : 16,
    paddingTop: Platform.OS === 'android' ? 16 : 14,
    paddingBottom: bottomSafeSpace,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progress: { color: '#9A9A9A' },
  score: { color: '#1D9E75', fontWeight: '600' },
  progressBarBg: {
    height: 5,
    backgroundColor: '#1A1A1A',
    borderRadius: 999,
    marginBottom: 18,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#E24B4A',
    borderRadius: 999,
  },
  question: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 20,
  },
  answers: { gap: 10 },
  answerBtn: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  answerText: { color: '#fff' },
  nextBtn: {
    backgroundColor: '#E24B4A',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  nextText: { color: '#fff', fontWeight: '700' },
});