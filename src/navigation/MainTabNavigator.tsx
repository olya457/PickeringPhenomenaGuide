import React from 'react';
import { View, Image, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LocationsScreen } from '../screens/locations/LocationsScreen';
import { LocationDetailScreen } from '../screens/locations/LocationDetailScreen';
import { BlogScreen } from '../screens/blog/BlogScreen';
import { BlogDetailScreen } from '../screens/blog/BlogDetailScreen';
import { QuizScreen } from '../screens/quiz/QuizScreen';
import { QuizResultScreen } from '../screens/quiz/QuizResultScreen';
import { TipsScreen } from '../screens/tips/TipsScreen';
import { SavedScreen } from '../screens/saved/SavedScreen';

export type LocationsStackParamList = {
  Locations: undefined;
  LocationDetail: { locationId: number };
};

export type BlogStackParamList = {
  Blog: undefined;
  BlogDetail: { postId: number };
};

export type QuizStackParamList = {
  Quiz: undefined;
  QuizResult: { score: number; total: number };
};

export type TabParamList = {
  LocationsTab: undefined;
  BlogTab: undefined;
  QuizTab: undefined;
  TipsTab: undefined;
  SavedTab: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const LocationsStack = createNativeStackNavigator<LocationsStackParamList>();
const BlogStack = createNativeStackNavigator<BlogStackParamList>();
const QuizStack = createNativeStackNavigator<QuizStackParamList>();

function LocationsNavigator() {
  return (
    <LocationsStack.Navigator>
      <LocationsStack.Screen
        name="Locations"
        component={LocationsScreen}
        options={{
          title: 'Natural Phenomena',
          headerStyle: { backgroundColor: '#0D0D0D' },
          headerTintColor: '#fff',
        }}
      />
      <LocationsStack.Screen
        name="LocationDetail"
        component={LocationDetailScreen}
        options={{ headerShown: false }}
      />
    </LocationsStack.Navigator>
  );
}

function BlogNavigator() {
  return (
    <BlogStack.Navigator>
      <BlogStack.Screen
        name="Blog"
        component={BlogScreen}
        options={{
          title: 'Local Blog',
          headerStyle: { backgroundColor: '#0D0D0D' },
          headerTintColor: '#fff',
        }}
      />
      <BlogStack.Screen
        name="BlogDetail"
        component={BlogDetailScreen}
        options={{ headerShown: false }}
      />
    </BlogStack.Navigator>
  );
}

function QuizNavigator() {
  return (
    <QuizStack.Navigator>
      <QuizStack.Screen
        name="Quiz"
        component={QuizScreen}
        options={{
          title: 'Knowledge Quiz',
          headerStyle: { backgroundColor: '#0D0D0D' },
          headerTintColor: '#fff',
        }}
      />
      <QuizStack.Screen
        name="QuizResult"
        component={QuizResultScreen}
        options={{ headerShown: false }}
      />
    </QuizStack.Navigator>
  );
}

const tabIcons = {
  LocationsTab: require('../assets/icons/locations.png'),
  BlogTab: require('../assets/icons/blog.png'),
  QuizTab: require('../assets/icons/quiz.png'),
  TipsTab: require('../assets/icons/tips.png'),
  SavedTab: require('../assets/icons/saved.png'),
};

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#E24B4A',
        tabBarInactiveTintColor: '#9A9A9A',
        headerStyle: { backgroundColor: '#0D0D0D' },
        headerTintColor: '#fff',
        tabBarIcon: ({ focused, color }) => (
          <View style={[styles.iconWrap, focused && styles.activeIconWrap]}>
            <Image
              source={tabIcons[route.name]}
              style={[styles.icon, { tintColor: color }]}
              resizeMode="contain"
            />
          </View>
        ),
      })}
    >
      <Tab.Screen
        name="LocationsTab"
        component={LocationsNavigator}
        options={{ title: 'Locations', headerShown: false }}
      />
      <Tab.Screen
        name="BlogTab"
        component={BlogNavigator}
        options={{ title: 'Blog', headerShown: false }}
      />
      <Tab.Screen
        name="QuizTab"
        component={QuizNavigator}
        options={{ title: 'Quiz', headerShown: false }}
      />
      <Tab.Screen
        name="TipsTab"
        component={TipsScreen}
        options={{ title: 'Tips' }}
      />
      <Tab.Screen
        name="SavedTab"
        component={SavedScreen}
        options={{ title: 'Saved' }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: Platform.OS === 'android' ? 30 : 20,
    height: 74,
    backgroundColor: '#2A2A2A',
    borderTopWidth: 0,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 37,
    elevation: 0,
    shadowOpacity: 0,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconWrap: {
    backgroundColor: 'rgba(226,75,74,0.14)',
  },
  icon: {
    width: 30,
    height: 30,
  },
});