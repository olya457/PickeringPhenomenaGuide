import React, { useEffect } from 'react';
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

  useEffect(() => {
    if (isFinished) {
      navigation.replace('QuizResult', {
        score,
        total: questions.length,
      });
    }
  }, [isFinished, navigation, score, questions.length]);

  const q: QuizQuestion | undefined = questions[currentIndex];

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
          Question {currentIndex + 1} of {questions.length}
        </Text>
        <Text style={styles.score}>Score: {score}</Text>
      </View>

      <View style={styles.progressBarBg}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${((currentIndex + 1) / questions.length) * 100}%` },
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
            activeOpacity={0.9}
          >
            <Text style={styles.answerText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedAnswer !== null && (
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => dispatch({ type: 'NEXT_QUESTION' })}
          activeOpacity={0.9}
        >
          <Text style={styles.nextText}>
            {currentIndex + 1 === questions.length
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
    gap: 10,
  },
  progress: {
    color: '#9A9A9A',
    fontSize: isVerySmall ? 13 : 14,
    flexShrink: 1,
  },
  score: {
    color: '#1D9E75',
    fontWeight: '600',
    fontSize: isVerySmall ? 13 : 14,
  },
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
    fontSize: isVerySmall ? 18 : isSmall ? 19 : 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 20,
    lineHeight: isVerySmall ? 26 : 28,
  },
  answers: {
    gap: 10,
  },
  answerBtn: {
    paddingVertical: isVerySmall ? 13 : 14,
    paddingHorizontal: isNarrow ? 12 : 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  answerText: {
    color: '#fff',
    fontSize: isVerySmall ? 14 : 15,
    lineHeight: isVerySmall ? 20 : 22,
  },
  nextBtn: {
    backgroundColor: '#E24B4A',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  nextText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: isVerySmall ? 15 : 16,
  },
});