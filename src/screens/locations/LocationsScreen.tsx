import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Platform,
  Text,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppContext } from '../../context/AppContext';
import { LocationsStackParamList } from '../../navigation/MainTabNavigator';
import { FilterBar } from '../../components/FilterBar';
import { LocationCard } from '../../components/LocationCard';
import { Location } from '../../data/locations';

type Props = NativeStackScreenProps<LocationsStackParamList, 'Locations'>;

const { height } = Dimensions.get('window');
const isVerySmall = height < 680;
const isSmall = height < 760;

export function LocationsScreen({ navigation }: Props) {
  const { state, dispatch } = useAppContext();
  const { items, selectedCategory } = state.locations;

  const categories: string[] = [
    'All',
    ...Array.from(new Set(items.map((location: Location) => location.category))),
  ];

  const filtered: Location[] =
    selectedCategory === 'All'
      ? items
      : items.filter((location: Location) => location.category === selectedCategory);

  return (
    <View style={styles.container}>
      <View style={styles.topOffset} />

      <View style={styles.contentWrap}>
        <FilterBar
          categories={categories}
          selected={selectedCategory}
          onSelect={(category) =>
            dispatch({ type: 'SET_LOCATION_CATEGORY', payload: category })
          }
        />

        <FlatList
          data={filtered}
          keyExtractor={(item: Location) => String(item.id)}
          renderItem={({ item }) => (
            <LocationCard
              location={item}
              isSaved={state.saved.locationIds.includes(item.id)}
              onPress={() =>
                navigation.navigate('LocationDetail', { locationId: item.id })
              }
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: Platform.OS === 'android' ? 20 : 0,
  },
  topOffset: {
    height: isVerySmall ? 10 : isSmall ? 14 : 18,
  },
  title: {
    color: '#FFFFFF',
    fontSize: isVerySmall ? 24 : isSmall ? 28 : 30,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: isVerySmall ? 14 : 18,
  },
  contentWrap: {
    flex: 1,
    marginTop: -12,
    paddingTop: 8,
  },
  list: {
    paddingHorizontal: isVerySmall ? 12 : 16,
    paddingTop: 8,
    paddingBottom: isVerySmall ? 170 : isSmall ? 180 : 190,
    gap: isVerySmall ? 12 : 16,
  },
});