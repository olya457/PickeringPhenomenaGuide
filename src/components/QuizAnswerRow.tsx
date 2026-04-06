
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

type AnswerState = 'idle' | 'correct' | 'wrong';

interface Props { text: string; state: AnswerState; onPress: () => void }

const BG: Record<AnswerState, string> = {
  idle: '#1A1A1A',
  correct: 'rgba(29,158,117,0.2)',
  wrong: 'rgba(226,75,74,0.2)',
};
const BORDER: Record<AnswerState, string> = {
  idle: 'rgba(255,255,255,0.1)',
  correct: '#1D9E75',
  wrong: '#E24B4A',
};

export function QuizAnswerRow({ text, state, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.row, { backgroundColor: BG[state], borderColor: BORDER[state] }]}
      onPress={onPress}
      disabled={state !== 'idle'}
    >
      <Text style={styles.text}>{text}</Text>
      {state === 'correct' && <Text style={{ color: '#1D9E75' }}>✓</Text>}
      {state === 'wrong' && <Text style={{ color: '#E24B4A' }}>✗</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderRadius: 12, borderWidth: 1 },
  text: { color: '#fff', fontSize: 15 },
});