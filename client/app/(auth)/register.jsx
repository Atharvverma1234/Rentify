// client/app/(auth)/register.jsx
import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  Alert, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import useAuthStore from '../../store/authStore';

const Field = ({ label, value, onChangeText, placeholder, keyboard = 'default', secure = false }) => (
  <View style={{ marginBottom: 16 }}>
    <Text style={{ fontSize: 14, fontWeight: '600', color: '#334155', marginBottom: 6 }}>{label}</Text>
    <TextInput
      style={{
        borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12,
        paddingHorizontal: 16, paddingVertical: 13, fontSize: 15, color: '#0F172A'
      }}
      placeholder={placeholder}
      placeholderTextColor="#94A3B8"
      keyboardType={keyboard}
      autoCapitalize="none"
      secureTextEntry={secure}
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);

export default function Register() {
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [phone, setPhone]       = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const { register, isLoading } = useAuthStore();
  const router                  = useRouter();

  const handleRegister = async () => {
    if (!name || !email || !password)
      return Alert.alert('Error', 'Name, email, and password are required');
    if (password !== confirm)
      return Alert.alert('Error', 'Passwords do not match');
    if (password.length < 6)
      return Alert.alert('Error', 'Password must be at least 6 characters');
    try {
      await register(name.trim(), email.trim(), password, phone.trim());
      // Root layout redirects automatically
    } catch (err) {
      Alert.alert('Registration Failed', err.response?.data?.message || 'Please try again');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#FFFFFF' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 28 }}>

        <Text style={{ fontSize: 28, fontWeight: '800', color: '#0F2D55', textAlign: 'center', marginBottom: 4 }}>
          Create Account
        </Text>
        <Text style={{ fontSize: 14, color: '#64748B', textAlign: 'center', marginBottom: 32 }}>
          Register as a property owner
        </Text>

        <Field label="Full Name *"        value={name}     onChangeText={setName}     placeholder="Your full name" />
        <Field label="Email *"            value={email}    onChangeText={setEmail}    placeholder="owner@example.com" keyboard="email-address" />
        <Field label="Phone"              value={phone}    onChangeText={setPhone}    placeholder="9876543210" keyboard="phone-pad" />
        <Field label="Password *"         value={password} onChangeText={setPassword} placeholder="Min 6 characters" secure />
        <Field label="Confirm Password *" value={confirm}  onChangeText={setConfirm}  placeholder="Repeat password" secure />

        <TouchableOpacity
          onPress={handleRegister}
          disabled={isLoading}
          style={{
            backgroundColor: '#1D4ED8', borderRadius: 12,
            paddingVertical: 15, alignItems: 'center', marginTop: 8, marginBottom: 16
          }}
        >
          {isLoading
            ? <ActivityIndicator color="#FFFFFF" />
            : <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700' }}>Register</Text>
          }
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ textAlign: 'center', color: '#1D4ED8', fontSize: 14 }}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}