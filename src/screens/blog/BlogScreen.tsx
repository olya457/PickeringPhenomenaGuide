import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  Share,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppContext } from '../../context/AppContext';
import { BlogStackParamList } from '../../navigation/MainTabNavigator';
import { BlogPost } from '../../data/blogPosts';

type Props = NativeStackScreenProps<BlogStackParamList, 'Blog'>;

const { height, width } = Dimensions.get('window');
const isVerySmall = height < 680;
const isSmall = height < 760;

export function BlogScreen({ navigation }: Props) {
  const { state } = useAppContext();
  const { items } = state.blog;

  const displayed: BlogPost[] = [...items].sort(
    (a: BlogPost, b: BlogPost) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleShare = async (post: BlogPost) => {
    try {
      await Share.share({
        message: `${post.title}\n\n${post.excerpt}\n\n${post.author} · ${post.date} · ${post.readTime}`,
      });
    } catch {}
  };

  const renderItem = ({ item }: { item: BlogPost }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} resizeMode="cover" />

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>

        <Text style={styles.cardMeta}>
          {item.author} · {item.date} · {item.readTime}
        </Text>

        <Text style={styles.cardExcerpt} numberOfLines={isVerySmall ? 3 : 4}>
          {item.excerpt}
        </Text>

        <View style={styles.tagRow}>
          {item.tags.slice(0, isVerySmall ? 2 : 3).map((tag: string, index: number) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.openButton}
            onPress={() => navigation.navigate('BlogDetail', { postId: item.id })}
          >
            <Text style={styles.openButtonText}>Open</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.shareButton}
            onPress={() => handleShare(item)}
          >
            <Text style={styles.shareButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={displayed}
        keyExtractor={(item: BlogPost) => String(item.id)}
        renderItem={renderItem}
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
    paddingTop: isVerySmall ? 10 : 14,
    paddingBottom: isVerySmall ? 120 : 140,
    gap: isVerySmall ? 12 : 16,
  },
  card: {
    width: '100%',
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#151515',
    borderWidth: 1,
    borderColor: '#232323',
  },
  cardImage: {
    width: '100%',
    height: isVerySmall ? 190 : isSmall ? 220 : 240,
  },
  cardContent: {
    paddingHorizontal: isVerySmall ? 14 : 18,
    paddingTop: isVerySmall ? 14 : 18,
    paddingBottom: isVerySmall ? 16 : 18,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: isVerySmall ? 24 : isSmall ? 28 : 30,
    fontWeight: '700',
    marginBottom: 8,
  },
  cardMeta: {
    color: '#8E8E93',
    fontSize: isVerySmall ? 12 : 13,
    marginBottom: 10,
  },
  cardExcerpt: {
    color: '#B8B8B8',
    fontSize: isVerySmall ? 15 : 16,
    lineHeight: isVerySmall ? 22 : 24,
    marginBottom: 14,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#1D1D1D',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagText: {
    color: '#7F77DD',
    fontSize: isVerySmall ? 11 : 12,
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 2,
  },
  openButton: {
    flex: 1,
    height: isVerySmall ? 46 : 50,
    borderRadius: 25,
    backgroundColor: '#E84E4E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  openButtonText: {
    color: '#FFFFFF',
    fontSize: isVerySmall ? 18 : 20,
    fontWeight: '700',
  },
  shareButton: {
    minWidth: width < 370 ? 96 : 112,
    height: isVerySmall ? 46 : 50,
    borderRadius: 25,
    backgroundColor: '#232323',
    borderWidth: 1,
    borderColor: '#3A3A3A',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: isVerySmall ? 15 : 16,
    fontWeight: '600',
  },
});