import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useAuth } from "../context/AuthProvider";
import globalStyles from "../styles";

export default function RegisterScreen({ navigation }) {
  const { signUpWithEmail } = useAuth();
  const [emailLogin, setEmailLogin] = useState({
    email: "",
    password: ""
  });

  const onSubmitLogin = async () => {
    const email = emailLogin.email;
    const password = emailLogin.password;

    signUpWithEmail(email, password);
  };

  return (
    <View style={globalStyles.authContainer}>
      <Image style={globalStyles.authLogo} source={require('../assets/logo.png')} />

      <View style={{ width: "80%", maxWidth: 400 }}>
        <Text style={globalStyles.authTitle}>Sign up now</Text>
        <Text style={globalStyles.authLabel}>
          Completar todos los campos para registrarse
        </Text>

        <TextInput
          style={globalStyles.authInput}
          value={emailLogin.email}
          placeholder="Correo electrónico"
          onChangeText={(text) => setEmailLogin({ ...emailLogin, email: text })}
        />

        <TextInput
          style={globalStyles.authInput}
          secureTextEntry={true}
          placeholder="Contraseña"
          value={emailLogin.password}
          onChangeText={(text) => setEmailLogin({ ...emailLogin, password: text })}
        />

        <Pressable style={globalStyles.authButton} onPress={onSubmitLogin}>
          <Text style={{
            fontFamily: "Montserrat-Bold",
            color: "#fff",
            fontSize: 16
          }}>Sign Up</Text>
        </Pressable>

        <Text style={globalStyles.message}>
          ¿No tienes una cuenta?
          <Text
            onPress={() => navigation.navigate('Login')}
            style={{ color: "#3392FF" }}> Inicia sesión</Text>
        </Text>
      </View>
    </View >
  );
}