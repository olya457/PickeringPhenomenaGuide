
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props { count: number; current: number; activeColor: string }

export function PageIndicator({ count, current, activeColor }: Props) {
  return (
    <View style={styles.row}>
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} style={[
          styles.dot,
          i === current ? [styles.activeDot, { backgroundColor: activeColor }] : styles.inactiveDot,
        ]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 6, alignItems: 'center', justifyContent: 'center' },
  dot: { height: 6, borderRadius: 3 },
  activeDot: { width: 20 },
  inactiveDot: { width: 6, backgroundColor: 'rgba(255,255,255,0.3)' },
});