import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ClockButton() {
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigate("Ponto", { id: 8 })}
    >
      <Feather size={32} name="clock" color={"#838383"} />
    </TouchableOpacity>
  );
}
