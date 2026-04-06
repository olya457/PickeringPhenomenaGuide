import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Location } from '../data/locations';

interface Props {
  location: Location;
  isSaved: boolean;
  onPress: () => void;
}

const { height } = Dimensions.get('window');
const isVerySmall = height < 680;
const isSmall = height < 760;

export function LocationCard({ location, isSaved, onPress }: Props) {
  return (
    <View style={styles.card}>
      <Image source={location.image} style={styles.image} resizeMode="cover" />

      {isSaved && (
        <View style={styles.savedBadge}>
          <Text style={styles.savedIcon}>🔖</Text>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.category}>{location.category}</Text>
        <Text style={styles.name}>{location.name}</Text>
        <Text style={styles.desc} numberOfLines={2}>
          {location.description}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.meta}>📅 {location.bestSeason}</Text>
          <Text style={styles.diff}>{location.details.difficulty}</Text>
        </View>

        <TouchableOpacity
          style={styles.openButton}
          onPress={onPress}
          activeOpacity={0.85}
        >
          <Text style={styles.openButtonText}>Open</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: isVerySmall ? 18 : 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  image: {
    width: '100%',
    height: isVerySmall ? 170 : isSmall ? 180 : 190,
  },
  savedBadge: {
    position: 'absolute',
    top: isVerySmall ? 10 : 12,
    right: isVerySmall ? 10 : 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  savedIcon: {
    fontSize: isVerySmall ? 16 : 18,
  },
  content: {
    padding: isVerySmall ? 12 : isSmall ? 13 : 14,
  },
  category: {
    color: '#E24B4A',
    fontSize: isVerySmall ? 12 : 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  name: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: isVerySmall ? 17 : isSmall ? 18 : 19,
    marginBottom: 6,
  },
  desc: {
    color: '#9A9A9A',
    fontSize: isVerySmall ? 13 : 14,
    lineHeight: isVerySmall ? 18 : 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  meta: {
    color: '#5F5E5A',
    fontSize: isVerySmall ? 12 : 13,
    flex: 1,
    marginRight: 10,
  },
  diff: {
    fontSize: isVerySmall ? 12 : 13,
    fontWeight: '600',
    color: '#1D9E75',
  },
  openButton: {
    alignSelf: 'flex-start',
    minWidth: isVerySmall ? 96 : 108,
    height: isVerySmall ? 40 : 44,
    paddingHorizontal: isVerySmall ? 18 : 22,
    borderRadius: 999,
    backgroundColor: '#E24B4A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  openButtonText: {
    color: '#FFFFFF',
    fontSize: isVerySmall ? 14 : 15,
    fontWeight: '700',
  },
});