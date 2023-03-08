import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { styles } from "./homeStyle";
import Header from "../../components/Header";

export default function Home() {
  return (
    <>
      <View style={styles.container}>
        <Header />
        <Text style={{ color: "#fff" }}>
          Open up App.tsx to start working on your app!
        </Text>
        <StatusBar style="auto" />
      </View>
    </>
  );
}
