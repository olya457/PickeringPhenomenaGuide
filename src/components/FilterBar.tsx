import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';

type Props = {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
};

const { height } = Dimensions.get('window');
const isVerySmall = height < 680;
const isSmall = height < 760;

export function FilterBar({ categories, selected, onSelect }: Props) {
  return (
    <View style={styles.wrap}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => {
          const active = selected === category;

          return (
            <TouchableOpacity
              key={category}
              activeOpacity={0.85}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => onSelect(category)}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 10,
    minHeight: isVerySmall ? 52 : 58,
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: isVerySmall ? 12 : 16,
    paddingRight: isVerySmall ? 24 : 28,
    gap: 12,
    alignItems: 'center',
    paddingVertical: 6,
  },
  chip: {
    minHeight: isVerySmall ? 40 : 46,
    paddingHorizontal: isVerySmall ? 16 : 20,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#3A3A3A',
    backgroundColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: {
    borderColor: '#FF5A5A',
    backgroundColor: '#171010',
  },
  chipText: {
    color: '#AFAFAF',
    fontSize: isVerySmall ? 14 : isSmall ? 15 : 16,
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#FF5A5A',
  },
});