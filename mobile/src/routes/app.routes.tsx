import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator();

import Home from "../screens/Home/HomeScreen";
import Login from "../screens/Login/LoginScreen";
import PontoScreen from "../screens/Ponto/PontoScreen";

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      // Ponto: { userId: string };
      Ponto: { id: number };
      Login: undefined;
    }
  }
}

export function AppRoutes() {
  return (
    <Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen
        name="Ponto"
        component={PontoScreen as any}
        initialParams={{ id: 8 }}
      />
      <Screen name="Login" component={Login} />
    </Navigator>
  );
}
