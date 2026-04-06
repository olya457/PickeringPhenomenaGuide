
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props { label: string; isSelected: boolean; onPress: () => void }

export function TagChip({ label, isSelected, onPress }: Props) {
  return (
    <TouchableOpacity style={[styles.chip, isSelected && styles.selected]} onPress={onPress}>
      <Text style={[styles.text, isSelected && styles.textSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, backgroundColor: '#1A1A1A', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  selected: { backgroundColor: 'rgba(226,75,74,0.15)', borderColor: '#E24B4A' },
  text: { color: '#9A9A9A', fontSize: 13, fontWeight: '500' },
  textSelected: { color: '#E24B4A' },
});