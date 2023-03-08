import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Pessoa } from "../LoginScreen";
import { stylesLoginForm } from "../loginStyle";

interface LoginFormProps {
  onSubmit: ({ login, password }: Pessoa) => any;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    onSubmit({ login, password });
  };

  return (
    <View style={stylesLoginForm.container}>
      <TextInput
        style={stylesLoginForm.input}
        placeholder="Dgiite seu CPF"
        value={login}
        onChangeText={setLogin}
      />
      <TextInput
        style={stylesLoginForm.input}
        placeholder="Digite sua senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={stylesLoginForm.button} onPress={handleSubmit}>
        <Text style={stylesLoginForm.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;
