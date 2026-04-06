
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface Props { isSaved: boolean; onToggle: () => void }

export function BookmarkButton({ isSaved, onToggle }: Props) {
  return (
    <TouchableOpacity onPress={onToggle}>
      <Text style={{ fontSize: 22, color: isSaved ? '#EF9F27' : '#9A9A9A' }}>
        {isSaved ? '🔖' : '🏷'}
      </Text>
    </TouchableOpacity>
  );
}