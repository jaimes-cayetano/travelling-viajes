import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuth } from "../context/AuthProvider";

export default function HomeScreen() {
  const { logout } = useAuth();
  const [destinos, setDestinos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "destinos"));
        const destinosList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setDestinos(destinosList);
      } catch (error) {
        console.error("Error al obtener destinos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinos();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F8F9FA", padding: 20 }}>
      {/* Header */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <TouchableOpacity>
          <Ionicons name="menu" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, color: "#555" }}>Travelling Viajes</Text>
        <TouchableOpacity onPress={logout} style={{ padding: 5 }}>
          <Ionicons name="log-out-outline" size={30} />
        </TouchableOpacity>

      </View>

      <Text style={{ fontSize: 26, fontWeight: "bold", marginTop: 10 }}>¿A dónde quieres ir?</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0056FF" style={{ marginTop: 20 }} />
      ) : (
        <>
          {/* Destino Destacado */}
          {destinos.length > 0 && (
            <View style={{ marginTop: 20, alignItems: "center" }}>
              <Image
                source={{ uri: destinos[0].imagen }}
                style={{ width: "100%", height: 200, borderRadius: 20 }}
              />
              <View style={{ position: "absolute", bottom: 15, left: 20 }}>
                <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>{destinos[0].nombre}</Text>
                <Text style={{ color: "#ddd", fontSize: 14 }}>{destinos[0].pais}</Text>
              </View>
            </View>
          )}

          {/* Categorías */}
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            {["Popular", "Lago", "Playa", "Montaña"].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: item === "Popular" ? "#0056FF" : "#E0E0E0",
                  paddingVertical: 8,
                  paddingHorizontal: 15,
                  borderRadius: 20,
                  marginRight: 10,
                }}
              >
                <Text style={{ color: item === "Popular" ? "#fff" : "#000" }}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Listado de Destinos */}
          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginTop: 20 }}>
            {destinos.slice(1).map((destino) => (
              <View key={destino.id} style={{ backgroundColor: "#fff", padding: 10, margin: 4, borderRadius: 10, width: "47%" }}>
                <Image source={{ uri: destino.imagen }} style={{ width: "100%", height: 150, borderRadius: 10 }} />
                <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 5 }}>{destino.nombre}</Text>
                <Text style={{ color: "#555" }}>{destino.pais}</Text>
                <Text style={{ fontSize: 12, color: "#777", marginTop: 3 }}>{destino.descripcion}</Text>
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}