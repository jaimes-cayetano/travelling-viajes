import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User, createUserWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../firebaseConfig";
import { Alert } from "react-native";

const auth = getAuth(app);

export const authService = {
  signInWithEmail: async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { user: userCredential.user, error: null };
    } catch (error: any) {
      let errorMessage = "Error desconocido";
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "El usuario no está registrado.";
          break;
        case "auth/wrong-password":
          errorMessage = "Contraseña incorrecta.";
          break;
        case "auth/invalid-email":
          errorMessage = "El correo ingresado no es válido.";
          break;
        case "auth/user-disabled":
          errorMessage = "El usuario ha sido deshabilitado.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Demasiados intentos fallidos. Intenta nuevamente en unos minutos.";
          break;
        default:
          errorMessage = "Error al iniciar sesión. Intenta nuevamente.";
      }

      Alert.alert("Error de Inicio", errorMessage, [{ text: "OK" }]);
      return { user: null, error: errorMessage };
    }
  },

  signUpWithEmail: async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return { user: userCredential.user, error: null };
    } catch (error: any) {
      let errorMessage = "Error desconocido al registrarse.";

      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Este correo ya está registrado. Intenta con otro.";
          break;
        case "auth/invalid-email":
          errorMessage = "El correo ingresado no es válido.";
          break;
        case "auth/weak-password":
          errorMessage = "La contraseña es demasiado débil. Usa al menos 6 caracteres.";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "El registro con correo y contraseña está deshabilitado.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Demasiados intentos fallidos. Intenta nuevamente en unos minutos.";
          break;
        default:
          errorMessage = "No se pudo registrar el usuario. Intenta nuevamente.";
      }

      Alert.alert("Error de Registro", errorMessage, [{ text: "OK" }]);

      return { user: null, error: errorMessage };
    }
  },

  signOutUser: async () => {
    await signOut(auth);
  },

  subscribeToAuthChanges: (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
  }
};
