import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

export default function TravellingIAScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const pregunta = "Que la respuesta no sea resumida y directa. " + input;

    try {
      const response = await axios.post(API_URL, {
        contents: [{ parts: [{ text: pregunta }] }],
      });

      const botResponse = response.data?.candidates?.[0]?.content?.parts?.map(part => part.text).join(" ") || "No response";

      const botMessage = { text: botResponse, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [...prev, { text: "Error al obtener respuesta", sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.sender === "user" ? styles.userBubble : styles.botBubble]}>
            <Text style={[styles.messageBubble, item.sender === "user" ? styles.userText : styles.botText]}>
              {item.text}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.chatContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity onPress={sendMessage} disabled={loading}>
          <Ionicons name="send" size={24} color={loading ? "gray" : "#3392FF"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4"
  },
  chatContainer: {
    padding: 10
  },
  messageBubble: {
    padding: 4, borderRadius: 10, marginBottom: 10, maxWidth: "80%"
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#3392FF",
    color: "#fff"
  },
  botBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#ddd"
  },
  userText: {
    color: "#fff"
  },
  botText: {
    color: "#000"
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd"
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    marginRight: 10
  },
});
