import { Image, Text, View } from "react-native";
import { stylesHeader } from "../pontoStyle";

interface IPropsTop {
  name: string;
  photoUrl: string;
}
export default function TopPontoScreen({ name, photoUrl }: IPropsTop) {
  return (
    <View style={stylesHeader.headerContainer}>
      <Image
        style={stylesHeader.photoHeader}
        source={require("../../../../assets/avatar.jpg")}
      ></Image>
      <Text style={stylesHeader.nameHeader}>{name}</Text>
    </View>
  );
}
