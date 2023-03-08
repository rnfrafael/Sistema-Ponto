import { ActivityIndicator, StyleSheet, View } from "react-native";

export function Loading() {
  return (
    <View style={style.loading}>
      <ActivityIndicator />
    </View>
  );
}

const style = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
