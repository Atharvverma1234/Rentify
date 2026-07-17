// client/app/(auth)/login.jsx
import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  Alert, ActivityIndicator, KeyboardAvoidingView, Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import useAuthStore from '../../store/authStore';

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading }    = useAuthStore();
  const router                  = useRouter();

  const handleLogin = async () => {
    if (!email || !password) return Alert.alert('Error', 'Please fill in all fields');
    try {
      await login(email.trim(), password);
      // Root _layout.jsx handles navigation automatically based on role
    } catch {
      Alert.alert('Login Failed', 'Incorrect email or password');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#FFFFFF' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 28 }}>

        {/* Header */}
        <Text style={{ fontSize: 36, fontWeight: '800', color: '#0F2D55', textAlign: 'center', marginBottom: 4 }}>
          HRMS
        </Text>
        <Text style={{ fontSize: 15, color: '#64748B', textAlign: 'center', marginBottom: 40 }}>
          House Rent Management System
        </Text>

        {/* Email */}
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#334155', marginBottom: 6 }}>Email</Text>
        <TextInput
          style={{
            borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12,
            paddingHorizontal: 16, paddingVertical: 13, fontSize: 15,
            color: '#0F172A', marginBottom: 16
          }}
          placeholder="owner@example.com"
          placeholderTextColor="#94A3B8"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password */}
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#334155', marginBottom: 6 }}>Password</Text>
        <TextInput
          style={{
            borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12,
            paddingHorizontal: 16, paddingVertical: 13, fontSize: 15,
            color: '#0F172A', marginBottom: 28
          }}
          placeholder="Your password"
          placeholderTextColor="#94A3B8"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleLogin}
          disabled={isLoading}
          style={{
            backgroundColor: '#1D4ED8', borderRadius: 12,
            paddingVertical: 15, alignItems: 'center', marginBottom: 16
          }}
        >
          {isLoading
            ? <ActivityIndicator color="#FFFFFF" />
            : <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700' }}>Login</Text>
          }
        </TouchableOpacity>

        {/* Register Link */}
        <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
          <Text style={{ textAlign: 'center', color: '#1D4ED8', fontSize: 14 }}>
            New owner? Register here
          </Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  );
}