import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BlogPost } from '../data/blogPosts';

interface Props {
  post: BlogPost;
  onPress: () => void;
}

export function BlogCard({ post, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image source={post.image} style={styles.image} resizeMode="cover" />
      <View style={styles.overlay}>
        <View style={styles.tagRow}>
          {post.tags.slice(0, 2).map((tag: string, i: number) => (
            <View key={i} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.title} numberOfLines={2}>{post.title}</Text>
        <Text style={styles.meta}>{post.author} · {post.date} · {post.readTime}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, overflow: 'hidden', height: 220 },
  image: { width: '100%', height: '100%' },
  overlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, backgroundColor: 'rgba(0,0,0,0.6)' },
  tagRow: { flexDirection: 'row', gap: 6, marginBottom: 8 },
  tag: { backgroundColor: 'rgba(127,119,221,0.8)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20 },
  tagText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  title: { color: '#fff', fontWeight: '700', fontSize: 16, marginBottom: 4, lineHeight: 22 },
  meta: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
});