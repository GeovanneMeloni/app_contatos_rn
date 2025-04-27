"use client"

import { useEffect, useRef, useState } from "react"
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native"
import MapView, { Marker, PROVIDER_GOOGLE, type Region } from "react-native-maps"
import { Feather } from "@expo/vector-icons"
import { useRouter } from "expo-router"

export default function MapScreen() {
  const router = useRouter()
  const mapRef = useRef<MapView>(null)
  const [region, setRegion] = useState<Region>({
    latitude: -23.68,
    longitude: -46.45,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  })

  const addresses = [
    { latitude: -23.6922562, longitude: -46.4512495, title: "Estação Guapituba", description: "Estação de trem no centro da cidade de Mauá" },
    { latitude: -23.6685783, longitude: -46.4616357, title: "Estação Mauá", description: "Estação de trem no bairro Guapituba de Mauá" },
  ]

  useEffect(() => {
    // Fit map to show all markers with padding
    if (mapRef.current && addresses.length > 0) {
      setTimeout(() => {
        mapRef.current?.fitToCoordinates(addresses, {
          edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
          animated: true,
        })
      }, 500)
    }
  }, [])

  return (
    <View className="flex-1">
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
        showsUserLocation
        showsMyLocationButton
        showsCompass
        showsScale
        showsBuildings
        showsTraffic
        showsIndoors
      >
        {addresses.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}
            description={marker.description}
          >
            <View className="bg-blue-600 p-2 rounded-full">
              <Feather name="map-pin" size={20} color="white" />
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Header */}
      <View className="absolute top-12 left-0 right-0 px-4">
        <View className="bg-white rounded-xl shadow-lg p-4">
          <Text className="text-xl font-bold text-gray-800 mb-1">Estações próximas</Text>
          <Text className="text-gray-600">Encontre estações de trem na região</Text>
        </View>
      </View>

      {/* Location Cards */}
      <View className="absolute bottom-8 left-0 right-0 px-4">
        <View className="bg-white rounded-xl shadow-lg overflow-hidden">
          {addresses.map((address, index) => (
            <TouchableOpacity
              key={index}
              className={`p-4 flex-row items-center ${index < addresses.length - 1 ? "border-b border-gray-100" : ""}`}
              onPress={() => {
                mapRef.current?.animateToRegion(
                  {
                    latitude: address.latitude,
                    longitude: address.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  },
                  1000,
                )
              }}
            >
              <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center mr-3">
                <Feather name="map-pin" size={18} color="#3b82f6" />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-gray-800">{address.title}</Text>
                <Text className="text-gray-500 text-sm">{address.description}</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Back Button */}
      <TouchableOpacity
        className="absolute top-12 left-4 w-10 h-10 bg-white rounded-full items-center justify-center shadow-md"
        onPress={() => router.push("/contatos")}
      >
        <Feather name="arrow-left" size={20} color="#3b82f6" />
      </TouchableOpacity>
    </View>
  )
}

// We need to use StyleSheet for the map since className doesn't work well with it
const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
})
