import { Alert, Text, View } from "react-native";
import React from "react";
import LoginForm from "./login-components/LoginForm";
import { stylesLoginScreen } from "./loginStyle";
import Header from "../../components/Header";

type Props = {};

export type Pessoa = {
  login: string;
  password: string;
};

function Login() {
  async function cadastraPessoa(pessoa: Pessoa) {
    Alert.alert("a", "aaaaaaaaaaaaaaa");
  }
  return (
    <View style={stylesLoginScreen.loginContainer}>
      <Header />
      <LoginForm onSubmit={cadastraPessoa} />
    </View>
  );
}

export default Login;
