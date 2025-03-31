import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  authContainer: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  authLogo: {
    width: 200,
    height: 200,
    marginBottom: 40
  },
  authTitle: {
    fontFamily: "Montserrat-Bold",
    textAlign: "center",
    fontSize: 32
  },
  authLabel: {
    fontFamily: "Montserrat-Regular",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 40,
  },
  authInput: {
    backgroundColor: "#F7F7F9",
    fontFamily: "Montserrat-Regular",
    padding: 18,
    fontSize: 16,
    borderRadius: 14,
    marginBottom: 10
  },
  authButton: {
    backgroundColor: "#3392FF",
    padding: 18,
    borderRadius: 14,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  message: {
    marginTop: 20,
    textAlign: "center"
  }
});

export default globalStyles;
