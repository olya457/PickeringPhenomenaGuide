import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppContext } from '../../context/AppContext';
import { LocationsStackParamList } from '../../navigation/MainTabNavigator';
import { Location } from '../../data/locations';

type Props = NativeStackScreenProps<LocationsStackParamList, 'LocationDetail'>;

const { height } = Dimensions.get('window');
const isVerySmall = height < 680;
const isSmall = height < 760;

export function LocationDetailScreen({ route, navigation }: Props) {
  const { state, dispatch } = useAppContext();

  const location: Location | undefined = state.locations.items.find(
    (item: Location) => item.id === route.params.locationId
  );

  if (!location) {
    return null;
  }

  const isSaved = state.saved.locationIds.includes(location.id);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Image source={location.image} style={styles.heroImage} resizeMode="cover" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() =>
            dispatch({ type: 'TOGGLE_LOCATION_SAVED', payload: location.id })
          }
        >
          <Text style={styles.actionIcon}>{isSaved ? '🔖' : '📌'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.category}>{location.category}</Text>
        <Text style={styles.title}>{location.name}</Text>
        <Text style={styles.vibe}>{location.vibe}</Text>

        <View style={styles.pills}>
          <View style={styles.pill}>
            <Text style={styles.pillText}>📅 {location.bestSeason}</Text>
          </View>
          <View style={styles.pill}>
            <Text style={styles.pillText}>⬆ {location.details.difficulty}</Text>
          </View>
          <View style={styles.pill}>
            <Text style={styles.pillText}>⏱ {location.details.duration}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.body}>{location.description}</Text>

        <Text style={styles.sectionTitle}>Phenomenon</Text>
        <Text style={styles.body}>{location.details.phenomenon}</Text>

        <Text style={styles.sectionTitle}>When to Visit</Text>
        <Text style={styles.body}>{location.details.whenToVisit}</Text>

        <Text style={styles.sectionTitle}>Highlights</Text>
        {location.details.highlights.map((highlight: string, index: number) => (
          <Text key={index} style={styles.listItem}>
            • {highlight}
          </Text>
        ))}

        <Text style={styles.sectionTitle}>Safety Tips</Text>
        {location.details.safetyTips.map((tip: string, index: number) => (
          <Text key={index} style={styles.listItem}>
            • {tip}
          </Text>
        ))}

        <Text style={styles.sectionTitle}>Coordinates</Text>
        <Text style={styles.coordinates}>{location.coordinates}</Text>

        <Text style={styles.sectionTitle}>Address</Text>
        <Text style={styles.body}>{location.address}</Text>

        <Text style={styles.sectionTitle}>Access Info</Text>
        <Text style={styles.body}>{location.details.accessInfo}</Text>

        <View style={styles.bottomSpace} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    paddingTop: Platform.OS === 'android' ? 20 : 0,
  },
  scrollContent: {
    paddingBottom: isVerySmall ? 160 : isSmall ? 170 : 180,
  },
  heroImage: {
    width: '100%',
    height: isVerySmall ? 220 : isSmall ? 250 : 280,
  },
  header: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 20 : 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: isVerySmall ? 12 : isSmall ? 14 : 16,
    paddingTop: isVerySmall ? 42 : isSmall ? 48 : 52,
  },
  iconButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    paddingHorizontal: isVerySmall ? 9 : 10,
    paddingVertical: isVerySmall ? 7 : 8,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: isVerySmall ? 18 : 20,
  },
  actionIcon: {
    fontSize: isVerySmall ? 18 : 20,
  },
  content: {
    paddingHorizontal: isVerySmall ? 12 : isSmall ? 14 : 16,
    paddingTop: isVerySmall ? 12 : 16,
  },
  category: {
    color: '#E24B4A',
    fontSize: isVerySmall ? 12 : 13,
    fontWeight: '600',
    marginTop: isVerySmall ? 4 : 8,
    marginBottom: 4,
  },
  title: {
    fontSize: isVerySmall ? 22 : isSmall ? 24 : 26,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  vibe: {
    fontSize: isVerySmall ? 12 : 13,
    color: '#7F77DD',
    fontStyle: 'italic',
    marginBottom: isVerySmall ? 14 : 16,
  },
  pills: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: isVerySmall ? 16 : 20,
  },
  pill: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: isVerySmall ? 10 : 12,
    paddingVertical: isVerySmall ? 5 : 6,
    borderRadius: 20,
  },
  pillText: {
    color: '#9A9A9A',
    fontSize: isVerySmall ? 12 : 13,
  },
  sectionTitle: {
    fontSize: isVerySmall ? 16 : 17,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: isVerySmall ? 18 : 20,
    marginBottom: 8,
  },
  body: {
    fontSize: isVerySmall ? 14 : 15,
    color: '#9A9A9A',
    lineHeight: isVerySmall ? 20 : 22,
  },
  listItem: {
    fontSize: isVerySmall ? 13 : 14,
    color: '#9A9A9A',
    marginBottom: 6,
    lineHeight: isVerySmall ? 18 : 20,
  },
  coordinates: {
    fontSize: isVerySmall ? 13 : 14,
    color: '#9A9A9A',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  bottomSpace: {
    height: isVerySmall ? 100 : isSmall ? 110 : 120,
  },
});