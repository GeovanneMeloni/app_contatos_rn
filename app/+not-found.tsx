import { Link, Stack } from "expo-router"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { Image } from "react-native"

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <ThemedView className="flex-1 items-center justify-center p-8 bg-gradient-to-b from-blue-50 to-white">
        <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/6195/6195678.png" }} className="w-40 h-40 mb-6" />
        <ThemedText type="title" className="text-3xl font-bold text-blue-800 mb-3 text-center">
          Página não encontrada
        </ThemedText>
        <ThemedText className="text-gray-600 text-center mb-8 text-lg">
          Desculpe, não conseguimos encontrar a página que você está procurando.
        </ThemedText>
        <Link href="/(auth)/login" asChild>
          <ThemedView className="bg-blue-600 px-8 py-4 rounded-full shadow-lg">
            <ThemedText type="link" className="text-white font-bold text-lg">
              Voltar para o início
            </ThemedText>
          </ThemedView>
        </Link>
      </ThemedView>
    </>
  )
}
