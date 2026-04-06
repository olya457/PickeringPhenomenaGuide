
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props { icon: string; label: string }

export function StatPill({ icon, label }: Props) {
  return (
    <View style={styles.pill}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: { flexDirection: 'column', alignItems: 'center', backgroundColor: '#1A1A1A', padding: 10, borderRadius: 12, minWidth: 80 },
  icon: { color: '#9A9A9A', fontSize: 16, marginBottom: 4 },
  label: { color: '#fff', fontSize: 12, fontWeight: '600', textAlign: 'center' },
});