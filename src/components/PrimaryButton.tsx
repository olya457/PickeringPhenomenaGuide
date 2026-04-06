
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface Props { title: string; color: string; onPress: () => void }

export function PrimaryButton({ title, color, onPress }: Props) {
  return (
    <TouchableOpacity style={[styles.btn, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.text}>{title} →</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: { padding: 16, borderRadius: 28, alignItems: 'center' },
  text: { color: '#fff', fontWeight: '700', fontSize: 16 },
});