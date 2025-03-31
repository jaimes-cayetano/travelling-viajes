import { Button, SafeAreaView, Text, View } from "react-native";
import { AuthProvider, useAuth } from "../context/AuthProvider";


export default function HomeScreen() {
  const { logout } = useAuth();

  return (
    <SafeAreaView>
      <View>
        <Text>Bienvenido a travelling viajes</Text>
        <Button onPress={logout} title="Salir" />
      </View>
    </SafeAreaView>
  );
}