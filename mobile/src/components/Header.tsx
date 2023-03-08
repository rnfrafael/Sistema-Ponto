import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import BackButton from "./BackButton";
import ClockButton from "./ClockButton";

type Props = {};

type nav = {
  navigate: (value: string, params?: Object) => void;
  goBack: () => void;
};

const Header = (props: Props) => {
  const { navigate, goBack } = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <BackButton />
      <TouchableOpacity
        onPress={() => {
          navigate("Login");
        }}
        activeOpacity={0.7}
      >
        <Text style={{ fontSize: 16, color: "white" }}>Login</Text>
      </TouchableOpacity>
      <ClockButton />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 20 : 50,
    gap: 30,
  },
});
