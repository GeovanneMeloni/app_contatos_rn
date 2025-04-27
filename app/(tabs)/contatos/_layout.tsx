import { Stack } from 'expo-router';

export default function ContatosLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Lista de Contatos',
        }}
      />
      <Stack.Screen
        name="detalhes"
        options={{
          title: 'Detalhes do Contato',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}