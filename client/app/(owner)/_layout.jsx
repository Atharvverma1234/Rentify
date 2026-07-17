// client/app/(owner)/_layout.jsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function OwnerLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#1D4ED8', headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="rooms"
        options={{
          title: 'Rooms',
          tabBarIcon: ({ color }) => <Ionicons name="bed" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="tenants"
        options={{
          title: 'Tenants',
          tabBarIcon: ({ color }) => <Ionicons name="people" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="payments"
        options={{
          title: 'Payments',
          tabBarIcon: ({ color }) => <Ionicons name="cash" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'AI Chat',
          tabBarIcon: ({ color }) => <Ionicons name="chatbubble-ellipses" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}