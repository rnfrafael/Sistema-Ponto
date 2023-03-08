import { StatusBar } from "react-native";
import Header from "./src/components/Header";
import { Routes } from "./src/routes";
import Login from "./src/screens/Login/LoginScreen";

export default function App() {
  return (
    <>
      <Routes />
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
    </>
  );
}
