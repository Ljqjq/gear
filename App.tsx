import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import MainTabs from './app/(tabs)/MainTabs';

export default function App() {
  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
} 