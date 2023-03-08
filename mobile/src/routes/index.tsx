import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";

export function Routes() {
  return (
    <View style={style.routes}>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </View>
  );
}

const style = StyleSheet.create({
  routes: {
    flex: 1,
    backgroundColor: "#09090a",
  },
});
