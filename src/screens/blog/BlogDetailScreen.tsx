import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Share,
  Platform,
  Dimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppContext } from '../../context/AppContext';
import { BlogStackParamList } from '../../navigation/MainTabNavigator';
import { BlogPost } from '../../data/blogPosts';

type Props = NativeStackScreenProps<BlogStackParamList, 'BlogDetail'>;

const { height } = Dimensions.get('window');
const isVerySmall = height < 680;
const isSmall = height < 760;

export function BlogDetailScreen({ route, navigation }: Props) {
  const { state } = useAppContext();

  const post: BlogPost | undefined = state.blog.items.find(
    (p: BlogPost) => p.id === route.params.postId
  );

  if (!post) return null;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${post.title}\n\n${post.content}`,
      });
    } catch {}
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Image source={post.image} style={styles.heroImage} resizeMode="cover" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
            <Text style={styles.shareIcon}>↗</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{post.title}</Text>

        <Text style={styles.meta}>
          {post.author} · {post.date} · {post.readTime}
        </Text>

        <View style={styles.tagRow}>
          {post.tags.map((tag: string, i: number) => (
            <View key={i} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.excerpt}>{post.excerpt}</Text>
        <Text style={styles.body}>{post.content}</Text>

        <View style={styles.bottomSpace} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  scrollContent: {
    paddingBottom: 104,
  },
  heroImage: {
    width: '100%',
    height: isVerySmall ? 250 : isSmall ? 280 : 320,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: isVerySmall ? 12 : 16,
    paddingTop: Platform.OS === 'android' ? 44 : isVerySmall ? 48 : 52,
  },
  iconBtn: {
    minWidth: isVerySmall ? 40 : 42,
    height: isVerySmall ? 40 : 42,
    backgroundColor: 'rgba(0,0,0,0.58)',
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  shareBtn: {
    minWidth: isVerySmall ? 40 : 42,
    height: isVerySmall ? 40 : 42,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: isVerySmall ? 20 : 22,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  shareIcon: {
    fontSize: isVerySmall ? 18 : 20,
    color: '#111111',
    fontWeight: '700',
  },
  content: {
    paddingHorizontal: isVerySmall ? 14 : 16,
    paddingTop: isVerySmall ? 16 : 18,
  },
  title: {
    fontSize: isVerySmall ? 26 : isSmall ? 30 : 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: isVerySmall ? 32 : 38,
  },
  meta: {
    fontSize: isVerySmall ? 12 : 13,
    color: '#9A9A9A',
    marginBottom: 12,
    lineHeight: isVerySmall ? 18 : 20,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  tagText: {
    color: '#7F77DD',
    fontSize: isVerySmall ? 11 : 12,
    fontWeight: '600',
  },
  excerpt: {
    fontSize: isVerySmall ? 15 : 16,
    color: '#FFFFFF',
    fontStyle: 'italic',
    marginBottom: 16,
    lineHeight: isVerySmall ? 22 : 24,
  },
  body: {
    fontSize: isVerySmall ? 15 : 16,
    color: '#A2A2A2',
    lineHeight: isVerySmall ? 25 : 28,
  },
  bottomActions: {
    marginTop: 24,
  },
  bottomButton: {
    height: isVerySmall ? 48 : 52,
    borderRadius: 26,
    backgroundColor: '#FF7A7A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButtonText: {
    color: '#FFFFFF',
    fontSize: isVerySmall ? 18 : 20,
    fontWeight: '700',
  },
  bottomSpace: {
    height: isVerySmall ? 30 : 40,
  },
});