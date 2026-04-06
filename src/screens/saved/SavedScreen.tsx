import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../../context/AppContext';
import { LocationCard } from '../../components/LocationCard';
import { Location } from '../../data/locations';
import { TravelTip } from '../../data/tips';

export function SavedScreen() {
  const navigation = useNavigation<any>();
  const { state, dispatch } = useAppContext();
  const { tab } = state.saved;

  const savedLocations: Location[] = state.locations.items.filter(
    (l: Location) => state.saved.locationIds.includes(l.id)
  );

  const savedTips: TravelTip[] = state.tips.items.filter(
    (t: TravelTip) => state.saved.tipIds.includes(t.id)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Your bookmarked favorites</Text>

      <View style={styles.tabs}>
        {(['Locations', 'Tips'] as const).map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tab, tab === t && styles.tabActive]}
            onPress={() => dispatch({ type: 'SET_SAVED_TAB', payload: t })}
            activeOpacity={0.85}
          >
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
              {t} ({t === 'Locations' ? savedLocations.length : savedTips.length})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {tab === 'Locations' ? (
        <FlatList
          data={savedLocations}
          keyExtractor={(item: Location) => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.locationWrap}>
              <LocationCard
                location={item}
                isSaved={true}
                onPress={() =>
                  navigation.navigate('LocationsTab', {
                    screen: 'LocationDetail',
                    params: { locationId: item.id },
                  })
                }
              />

              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() =>
                  dispatch({ type: 'TOGGLE_LOCATION_SAVED', payload: item.id })
                }
                activeOpacity={0.85}
              >
                <Text style={styles.removeBtnText}>Remove from favorites</Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.empty}>No saved locations yet</Text>
          }
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={savedTips}
          keyExtractor={(item: TravelTip) => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.tipCard}>
              <View style={styles.tipHeader}>
                <Text style={styles.tipIcon}>{item.icon}</Text>

                <View style={styles.tipMeta}>
                  <Text style={styles.tipTitle}>{item.title}</Text>

                  <View style={styles.badgeRow}>
                    <View
                      style={[
                        styles.badge,
                        {
                          backgroundColor:
                            item.priority === 'Essential'
                              ? 'rgba(226,75,74,0.15)'
                              : item.priority === 'Recommended'
                                ? 'rgba(29,158,117,0.15)'
                                : 'rgba(127,119,221,0.15)',
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.badgeText,
                          {
                            color:
                              item.priority === 'Essential'
                                ? '#E24B4A'
                                : item.priority === 'Recommended'
                                  ? '#1D9E75'
                                  : '#7F77DD',
                          },
                        ]}
                      >
                        {item.priority}
                      </Text>
                    </View>

                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{item.category}</Text>
                    </View>
                  </View>
                </View>
              </View>

              <Text style={styles.tipBody} numberOfLines={3}>
                {item.description}
              </Text>

              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() =>
                  dispatch({ type: 'TOGGLE_TIP_SAVED', payload: item.id })
                }
                activeOpacity={0.85}
              >
                <Text style={styles.removeBtnText}>Remove from favorites</Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.empty}>No saved tips yet</Text>
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  subtitle: {
    color: '#9A9A9A',
    fontSize: 13,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  tabs: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  tab: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
  },
  tabActive: {
    borderColor: '#E24B4A',
    backgroundColor: 'rgba(226,75,74,0.1)',
  },
  tabText: {
    color: '#9A9A9A',
    fontSize: 14,
  },
  tabTextActive: {
    color: '#E24B4A',
    fontWeight: '600',
  },
  list: {
    padding: 16,
    gap: 12,
    paddingBottom: 120,
  },
  empty: {
    color: '#5F5E5A',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 15,
  },
  locationWrap: {
    gap: 10,
  },
  tipCard: {
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
  },
  tipHeader: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  tipIcon: {
    fontSize: 28,
  },
  tipMeta: {
    flex: 1,
  },
  tipTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 6,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 6,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
    backgroundColor: '#222',
  },
  badgeText: {
    fontSize: 11,
    color: '#9A9A9A',
  },
  tipBody: {
    color: '#9A9A9A',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 12,
  },
  removeBtn: {
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(226,75,74,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(226,75,74,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeBtnText: {
    color: '#E24B4A',
    fontSize: 14,
    fontWeight: '600',
  },
});