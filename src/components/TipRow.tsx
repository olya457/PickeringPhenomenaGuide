import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { TravelTip } from '../data/tips';

type Props = {
  tip: TravelTip;
  isFullOpen: boolean;
  onOpenFull: () => void;
  onShare: () => void;
  onSave: () => void;
  isSaved: boolean;
};

const { height, width } = Dimensions.get('window');
const isVerySmall = height < 680;
const isSmall = height < 760;
const isNarrow = width < 370;

export function TipRow({
  tip,
  isFullOpen,
  onOpenFull,
  onShare,
  onSave,
  isSaved,
}: Props) {
  const priorityColor =
    tip.priority === 'Essential'
      ? '#E24B4A'
      : tip.priority === 'Recommended'
        ? '#1D9E75'
        : '#7F77DD';

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.icon}>{tip.icon}</Text>

        <View style={styles.middle}>
          <Text style={styles.title}>{tip.title}</Text>

          <View style={styles.badges}>
            <View
              style={[
                styles.badge,
                {
                  backgroundColor: `${priorityColor}22`,
                  borderColor: priorityColor,
                },
              ]}
            >
              <Text style={[styles.badgeText, { color: priorityColor }]}>
                {tip.priority}
              </Text>
            </View>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>{tip.category}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={onSave}
          style={[styles.saveBtn, isSaved && styles.saveBtnActive]}
          activeOpacity={0.85}
        >
          <Text style={styles.saveIcon}>{isSaved ? '🔖' : '📌'}</Text>
        </TouchableOpacity>
      </View>

      {!isFullOpen && (
        <Text style={styles.description} numberOfLines={3}>
          {tip.description}
        </Text>
      )}

      {isFullOpen && (
        <>
          <Text style={styles.description}>{tip.description}</Text>
          {tip.details.map((detail: string, i: number) => (
            <Text key={i} style={styles.detail}>
              • {detail}
            </Text>
          ))}
        </>
      )}

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.fullBtn, isFullOpen && styles.fullBtnActive]}
          onPress={onOpenFull}
          activeOpacity={0.85}
        >
          <Text style={styles.fullBtnText}>
            {isFullOpen ? 'Hide Full' : 'Open Full'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.shareBtn}
          onPress={onShare}
          activeOpacity={0.85}
        >
          <Text style={styles.shareBtnText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: isVerySmall ? 14 : 16,
    padding: isVerySmall ? 12 : 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: isVerySmall ? 8 : 10,
  },
  icon: {
    fontSize: isVerySmall ? 22 : 26,
    marginTop: 2,
  },
  middle: {
    flex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: isVerySmall ? 14 : isSmall ? 15 : 16,
    marginBottom: 6,
    lineHeight: isVerySmall ? 20 : 22,
  },
  badges: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    backgroundColor: '#222222',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  badgeText: {
    fontSize: isVerySmall ? 10 : 11,
    color: '#9A9A9A',
    fontWeight: '500',
  },
  saveBtn: {
    width: isNarrow ? 34 : 36,
    height: isNarrow ? 34 : 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#232323',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  saveBtnActive: {
    backgroundColor: '#E24B4A',
    borderColor: '#E24B4A',
  },
  saveIcon: {
    fontSize: isVerySmall ? 16 : 18,
  },
  description: {
    color: '#FFFFFF',
    fontSize: isVerySmall ? 13 : 14,
    marginTop: 12,
    marginBottom: 10,
    lineHeight: isVerySmall ? 19 : 20,
  },
  detail: {
    color: '#9A9A9A',
    fontSize: isVerySmall ? 12 : 13,
    marginBottom: 5,
    lineHeight: isVerySmall ? 18 : 19,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  fullBtn: {
    flex: 1,
    minHeight: isVerySmall ? 40 : 44,
    borderRadius: 22,
    backgroundColor: '#E24B4A',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  fullBtnActive: {
    opacity: 0.92,
  },
  fullBtnText: {
    color: '#FFFFFF',
    fontSize: isVerySmall ? 12 : 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  shareBtn: {
    flex: 1,
    minHeight: isVerySmall ? 40 : 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#3A3A3A',
    backgroundColor: '#232323',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  shareBtnText: {
    color: '#FFFFFF',
    fontSize: isVerySmall ? 12 : 13,
    fontWeight: '600',
    textAlign: 'center',
  },
});