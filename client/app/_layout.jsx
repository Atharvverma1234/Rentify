// client/app/_layout.jsx
import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import useAuthStore from '../store/authStore';

export default function RootLayout() {
  const { user, isLoading, restoreSession } = useAuthStore();
  const router   = useRouter();
  const segments = useSegments();

  // Restore saved session on app start
  useEffect(() => {
    restoreSession();
  }, []);

  // Redirect based on auth state + role
  useEffect(() => {
    if (isLoading) return;  // wait until session is known

    const inAuth = segments[0] === '(auth)';

    if (!user && !inAuth) {
      // Not logged in → go to login
      router.replace('/(auth)/login');
    } else if (user?.role === 'owner' && segments[0] !== '(owner)') {
      // Owner → owner tabs
      router.replace('/(owner)');
    } else if (user?.role === 'tenant' && segments[0] !== '(tenant)') {
      // Tenant → tenant tabs
      router.replace('/(tenant)');
    }
  }, [user, isLoading]);

  return <Stack screenOptions={{ headerShown: false }} />;
}