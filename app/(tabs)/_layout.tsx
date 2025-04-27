import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="/contatos/"
        options={{
          title: 'Contatos',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="list-alt" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="/cadastro"
        options={{
          title: 'Cadastro',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person-add" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="/mapa"
        options={{
          title: 'Mapa',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="map" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}