import { useEffect, useState } from "react"
import { View, Text, FlatList, Image, ActivityIndicator, Alert, TouchableOpacity, RefreshControl } from "react-native"
import { Link, useNavigation } from "expo-router"
import { Feather } from "@expo/vector-icons"
import { deleteContato, getContatos } from "@/api/services/contato"

export default function ListarContatos() {
  const [contatos, setContatos] = useState<Contato[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const navigation = useNavigation()

  const carregarContatos = async () => {
    try {
      setLoading(true)
      const data = await getContatos()
      setContatos(data)
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os contatos.")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await carregarContatos()
  }

  const handleDelete = async (id: string) => {
    Alert.alert("Confirmar exclusão", "Tem certeza que deseja excluir este contato?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteContato(id)
            setContatos(contatos.filter((c) => c._id !== id))
            Alert.alert("Sucesso", "Contato excluído com sucesso!")
          } catch (error) {
            Alert.alert("Erro", "Não foi possível excluir o contato.")
          }
        },
      },
    ])
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", carregarContatos)
    carregarContatos()
    return unsubscribe
  }, [])

  if (loading && !refreshing) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="mt-4 text-gray-600">Carregando contatos...</Text>
      </View>
    )
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-blue-600 pt-12 pb-4 px-5 rounded-b-3xl shadow-md">
        <Text className="text-white text-2xl font-bold mb-2">Meus Contatos</Text>
        <Text className="text-blue-100">{contatos.length} contatos encontrados</Text>
      </View>

      <FlatList
        data={contatos}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ padding: 16 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#3b82f6"]} />}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center py-20">
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/6598/6598519.png" }}
              className="w-24 h-24 opacity-50 mb-4"
            />
            <Text className="text-gray-500 text-lg">Nenhum contato encontrado</Text>
            <TouchableOpacity onPress={carregarContatos} className="mt-4 bg-blue-600 px-4 py-2 rounded-lg">
              <Text className="text-white">Tentar novamente</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => (
          <View className="bg-white rounded-xl p-4 mb-3 shadow-sm flex-row items-center">
            {item.foto !== "#" ? (
              <Image source={{ uri: item.foto }} className="w-16 h-16 rounded-full" />
            ) : (
              <View className="w-16 h-16 rounded-full bg-blue-100 justify-center items-center">
                <Text className="text-blue-800 font-bold text-xl">{getInitials(item.nome)}</Text>
              </View>
            )}

            <View className="ml-4 flex-1">
              <Text className="font-bold text-lg text-gray-800">{item.nome}</Text>
              <Text className="text-gray-500">{item.telefone}</Text>
              <Text className="text-gray-500 text-sm">{item.email}</Text>
            </View>

            <View className="flex-row space-x-2">
              <TouchableOpacity
                onPress={() => navigation.navigate("detalhes", { id: item._id })}
                className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center"
              >
                <Feather name="eye" size={18} color="#3b82f6" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("formulario", { id: item._id })}
                className="w-10 h-10 rounded-full bg-green-100 items-center justify-center"
              >
                <Feather name="edit-2" size={18} color="#10b981" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleDelete(item._id)}
                className="w-10 h-10 rounded-full bg-red-100 items-center justify-center"
              >
                <Feather name="trash-2" size={18} color="#ef4444" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Link href="/cadastro" asChild>
        <TouchableOpacity className="absolute right-6 bottom-6 w-16 h-16 bg-blue-600 rounded-full items-center justify-center shadow-lg">
          <Feather name="plus" size={24} color="white" />
        </TouchableOpacity>
      </Link>
    </View>
  )
}
