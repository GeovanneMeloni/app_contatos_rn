import { useState } from "react"
import {
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native"
import { useRouter } from "expo-router"
import api, { setAuthToken } from "@/api/api"

export default function Login() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const entrar = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos")
      return
    }

    setIsLoading(true)
    try {
      /* const { data } = await api.post("/usuarios/login", { email, senha })
      console.log(data)
      setAuthToken(data.token) */
      router.push("/contatos")
    } catch (err) {
      Alert.alert("Erro ao entrar", "Verifique suas credenciais e tente novamente")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 p-8 bg-white">
          <View className="items-center mb-12 mt-10">
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/1534/1534938.png" }}
              className="w-32 h-32 mb-6"
            />
            <Text className="text-3xl font-bold text-blue-800 mb-2">Bem-vindo</Text>
            <Text className="text-gray-500 text-center">Faça login para acessar seus contatos</Text>
          </View>

          <View className="mb-6">
            <Text className="text-gray-700 mb-2 font-medium ml-1">Email</Text>
            <TextInput
              placeholder="Digite seu email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              className="border border-gray-300 p-4 rounded-xl mb-4 bg-gray-50 text-gray-800"
            />

            <Text className="text-gray-700 mb-2 font-medium ml-1">Senha</Text>
            <TextInput
              placeholder="Digite sua senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
              className="border border-gray-300 p-4 rounded-xl bg-gray-50 text-gray-800"
            />
          </View>

          <TouchableOpacity
            onPress={entrar}
            disabled={isLoading}
            className={`p-4 rounded-xl shadow-md mb-4 ${isLoading ? "bg-blue-400" : "bg-blue-600"}`}
          >
            <Text className="text-white font-bold text-center text-lg">{isLoading ? "Entrando..." : "Entrar"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/cadastro")}
            className="p-4 rounded-xl border-2 border-blue-600"
          >
            <Text className="text-blue-600 font-bold text-center text-lg">Criar conta</Text>
          </TouchableOpacity>

          <TouchableOpacity className="mt-6 self-center">
            <Text className="text-blue-600 text-center">Esqueceu sua senha?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
