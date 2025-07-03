import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from './index';
import ScheduleScreen from './ScheduleScreen';
import SettingsScreen from './SettingsScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string = 'list';
          if (route.name === 'List') iconName = 'list';
          if (route.name === 'Schedule') iconName = 'calendar';
          if (route.name === 'Settings') iconName = 'settings';
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#BB86FC',
        tabBarInactiveTintColor: '#888',
        headerShown: false,
      })}
    >
      <Tab.Screen name="List" component={HomeScreen} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
} 