import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function BackButton() {
  const { goBack } = useNavigation();
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
      <Feather size={32} name="arrow-left" color={"#838383"} />
    </TouchableOpacity>
  );
}
