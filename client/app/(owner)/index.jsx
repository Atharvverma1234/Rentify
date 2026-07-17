// client/app/(owner)/index.jsx
import { View, Text, TouchableOpacity } from 'react-native';
import useAuthStore from '../../store/authStore';

export default function Dashboard() {
  const { user, logout } = useAuthStore();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#0F2D55', marginBottom: 8 }}>
        Welcome, {user?.name} 👋
      </Text>
      <Text style={{ color: '#64748B', marginBottom: 32 }}>
        Owner Dashboard — Week 2 content coming soon
      </Text>
      <TouchableOpacity
        onPress={logout}
        style={{ backgroundColor: '#FEE2E2', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 }}
      >
        <Text style={{ color: '#B91C1C', fontWeight: '600' }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}   