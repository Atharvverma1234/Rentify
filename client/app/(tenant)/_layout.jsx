// client/app/(tenant)/_layout.jsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TenantLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#0D9488', headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
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