import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Platform,
  Share,
} from 'react-native';
import { useAppContext } from '../../context/AppContext';
import { FilterBar } from '../../components/FilterBar';
import { TipRow } from '../../components/TipRow';
import { TravelTip } from '../../data/tips';

const { height } = Dimensions.get('window');
const isVerySmall = height < 680;
const isSmall = height < 760;

export function TipsScreen() {
  const { state, dispatch } = useAppContext();
  const { items, selectedCategory } = state.tips;

  const [fullId, setFullId] = useState<number | null>(null);

  const categories: string[] = [
    'All',
    'Transportation',
    'Safety',
    'Equipment',
    'Timing',
    'Photography',
    'General',
  ];

  const filtered: TravelTip[] =
    selectedCategory === 'All'
      ? items
      : items.filter((t: TravelTip) => t.category === selectedCategory);

  const handleOpenFull = (id: number) => {
    if (fullId === id) {
      setFullId(null);
      return;
    }

    setFullId(id);
  };

  const handleShare = async (tip: TravelTip) => {
    try {
      const detailsText = tip.details.map((detail) => `• ${detail}`).join('\n');

      await Share.share({
        message: `${tip.title}\n\n${tip.description}\n\n${detailsText}`,
      });
    } catch {}
  };

  return (
    <View style={styles.container}>
      <FilterBar
        categories={categories}
        selected={selectedCategory}
        onSelect={(cat) => dispatch({ type: 'SET_TIP_CATEGORY', payload: cat })}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item: TravelTip) => String(item.id)}
        renderItem={({ item }) => (
          <TipRow
            tip={item}
            isFullOpen={fullId === item.id}
            onOpenFull={() => handleOpenFull(item.id)}
            onShare={() => handleShare(item)}
            onSave={() => dispatch({ type: 'TOGGLE_TIP_SAVED', payload: item.id })}
            isSaved={state.saved.tipIds.includes(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    paddingTop: Platform.OS === 'android' ? 20 : 0,
  },
  list: {
    paddingHorizontal: isVerySmall ? 12 : 16,
    paddingTop: isVerySmall ? 8 : 12,
    paddingBottom: isVerySmall ? 180 : isSmall ? 200 : 220,
    gap: isVerySmall ? 8 : 10,
  },
});