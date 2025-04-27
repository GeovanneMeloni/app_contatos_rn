import { useEffect, useState } from "react"
import {
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native"
import { router, useGlobalSearchParams } from "expo-router"
import { Feather } from "@expo/vector-icons"
import { addContato, getContatoById, updateContato } from "@/api/services/contato"

export default function Cadastro() {
  const [id, setId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [dados, setDados] = useState<Contato>({
    _id: "",
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
    foto: "#",
  })

  const [errors, setErrors] = useState({
    nome: false,
    email: false,
    telefone: false,
    endereco: false,
  })

  const local = useGlobalSearchParams()

  const handleObterDados = async (id: string) => {
    try {
      setIsFetching(true)
      const data = await getContatoById(id)
      setDados(data)
    } catch (error) {
      Alert.alert("Erro", "Não foi possível encontrar o contato.")
    } finally {
      setIsFetching(false)
    }
  }

  const handleChange = (field: keyof Contato, value: string) => {
    setDados((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: false }))
    }
  }

  const validateForm = () => {
    const newErrors = {
      nome: !dados.nome,
      email: !dados.email || !/\S+@\S+\.\S+/.test(dados.email),
      telefone: !dados.telefone,
      endereco: !dados.endereco,
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some(Boolean)
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert("Erro", "Por favor, corrija os campos destacados")
      return
    }

    setIsLoading(true)
    try {
      if (id) {
        await updateContato(id, dados)
        Alert.alert("Sucesso", "Contato editado com sucesso.")
      } else {
        await addContato(dados)
        Alert.alert("Sucesso", "Contato adicionado com sucesso.")
      }
      router.back()
    } catch (error) {
      Alert.alert("Erro", `Não foi possível ${id ? "editar" : "adicionar"} o contato.`)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (local.id && typeof local.id == "string") {
      setId(local.id)
      handleObterDados(local.id)
    }
  }, [])

  if (isFetching) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="mt-4 text-gray-600">Carregando dados...</Text>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-gray-50">
        <View className="flex-1 p-6">
          <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <Text className="text-2xl font-bold text-gray-800 mb-6">{id ? "Editar Contato" : "Novo Contato"}</Text>

            <View className="mb-4">
              <Text className="text-gray-700 mb-2 font-medium ml-1">Nome</Text>
              <View className="flex-row items-center">
                <View className="bg-blue-100 w-10 h-10 rounded-l-lg items-center justify-center">
                  <Feather name="user" size={18} color="#3b82f6" />
                </View>
                <TextInput
                  className={`flex-1 p-2.5 bg-white border-y border-r rounded-r-lg ${
                    errors.nome ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Nome completo"
                  value={dados.nome}
                  onChangeText={(value) => handleChange("nome", value)}
                />
              </View>
              {errors.nome && <Text className="text-red-500 text-xs mt-1 ml-1">Nome é obrigatório</Text>}
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-2 font-medium ml-1">Email</Text>
              <View className="flex-row items-center">
                <View className="bg-blue-100 w-10 h-10 rounded-l-lg items-center justify-center">
                  <Feather name="mail" size={18} color="#3b82f6" />
                </View>
                <TextInput
                  className={`flex-1 p-2.5 bg-white border-y border-r rounded-r-lg ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="email@exemplo.com"
                  value={dados.email}
                  onChangeText={(value) => handleChange("email", value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              {errors.email && <Text className="text-red-500 text-xs mt-1 ml-1">Email válido é obrigatório</Text>}
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-2 font-medium ml-1">Telefone</Text>
              <View className="flex-row items-center">
                <View className="bg-blue-100 w-10 h-10 rounded-l-lg items-center justify-center">
                  <Feather name="phone" size={18} color="#3b82f6" />
                </View>
                <TextInput
                  className={`flex-1 p-2.5 bg-white border-y border-r rounded-r-lg ${
                    errors.telefone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="(00) 00000-0000"
                  value={dados.telefone}
                  onChangeText={(value) => handleChange("telefone", value)}
                  keyboardType="phone-pad"
                />
              </View>
              {errors.telefone && <Text className="text-red-500 text-xs mt-1 ml-1">Telefone é obrigatório</Text>}
            </View>

            <View className="mb-6">
              <Text className="text-gray-700 mb-2 font-medium ml-1">Endereço</Text>
              <View className="flex-row items-center">
                <View className="bg-blue-100 w-10 h-10 rounded-l-lg items-center justify-center">
                  <Feather name="map-pin" size={18} color="#3b82f6" />
                </View>
                <TextInput
                  className={`flex-1 p-2.5 bg-white border-y border-r rounded-r-lg ${
                    errors.endereco ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Rua, número, bairro, cidade"
                  value={dados.endereco}
                  onChangeText={(value) => handleChange("endereco", value)}
                />
              </View>
              {errors.endereco && <Text className="text-red-500 text-xs mt-1 ml-1">Endereço é obrigatório</Text>}
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={isLoading}
              className={`p-4 rounded-xl shadow-md ${isLoading ? "bg-blue-400" : "bg-blue-600"}`}
            >
              <Text className="text-white font-bold text-center text-lg">{isLoading ? "Salvando..." : "Salvar"}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => router.back()} className="p-4 rounded-xl border border-gray-300 bg-white">
            <Text className="text-gray-700 font-medium text-center">Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
