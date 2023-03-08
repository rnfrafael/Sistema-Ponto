import { StyleSheet } from "react-native";

export const stylesLoginScreen = StyleSheet.create({
  loginContainer: {
    width: "100%",
    height: "100%",
    padding: 10,
  },
});

export const stylesLoginForm = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    minWidth: "80%",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});
