import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(auth)/login"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  );
}