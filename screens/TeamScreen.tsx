import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Card, Text, Avatar } from "react-native-paper";

const teamMembers = [
  {
    id: "1",
    name: "Jhon Alexis Jaimes Cayetano",
    career: "Ingeniería de Software con IA",
    semester: "VI",
    senatiID: "001441097",
  },
  {
    id: "2",
    name: "Ivan Barboza Carrasco",
    career: "Ingeniería de Software con IA",
    semester: "VI",
    senatiID: "001441097",
  },
];

export default function TeamScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Equipo del Proyecto</Text>

      <Text style={styles.description}>
        Este trabajo fue realizado para un entregable del curso de{" "}
        <Text style={styles.highlight}>Desarrollo de Aplicaciones Móviles II</Text>,
        a cargo del profesor <Text style={styles.highlight}>Remigio Huarcaya</Text>.
      </Text>

      <FlatList
        data={teamMembers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.header}>
                <Avatar.Text size={48} label={item.name[0]} style={styles.avatar} />
                <Text style={styles.name}>{item.name}</Text>
              </View>
              <Text style={styles.info}>🎓 {item.career}</Text>
              <Text style={styles.info}>📚 Semestre: {item.semester}</Text>
              <Text style={styles.info}>🆔 Senati ID: {item.senatiID}</Text>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0056FF",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    color: "#444",
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  highlight: {
    fontWeight: "bold",
    color: "#0056FF",
  },
  card: {
    marginBottom: 12,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#ffffff",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    backgroundColor: "#0056FF",
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  info: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
});
