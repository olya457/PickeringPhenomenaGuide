
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const COLORS: Record<string, string> = {
  easy: '#1D9E75', medium: '#EF9F27', hard: '#E24B4A',
};

interface Props { difficulty: string }

export function DifficultyBadge({ difficulty }: Props) {
  const color = COLORS[difficulty.toLowerCase()] ?? '#9A9A9A';
  return (
    <View style={[styles.badge, { backgroundColor: color + '22', borderColor: color }]}>
      <Text style={[styles.text, { color }]}>{difficulty.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20, borderWidth: 1 },
  text: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
});