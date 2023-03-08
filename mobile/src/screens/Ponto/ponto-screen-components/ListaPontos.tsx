import dayjs from "dayjs";
import { StyleSheet, Text, View } from "react-native";

export function ListaPontos({ pontosBatidos = [] }: { pontosBatidos: Date[] }) {
  function entradaSaida(index: number) {
    return index == 0
      ? "Entrada 1"
      : index == 1
      ? "Saída 1"
      : index == 2
      ? "Entrada 2"
      : index == 3
      ? "Saída 2"
      : index == 4
      ? "Entrada 3"
      : index == 5
      ? "Saída 3"
      : "";
  }
  return (
    <View style={styles.listaPontosContainer}>
      {pontosBatidos.map((ponto, i) => {
        let dataJs = dayjs(ponto).format("HH:mm:ss").toString();
        return (
          <View key={(i + 1) * 500} style={styles.horasEntradas}>
            <Text key={i} style={styles.horas}>
              {dataJs}
            </Text>
            <Text key={ponto.toString()} style={styles.horas}>
              {entradaSaida(i)}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  listaPontosContainer: {
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    gap: 5,
  },

  horas: {
    width: "45%",
    backgroundColor: "#FDCF83",
    borderRadius: 10,
    paddingLeft: 20,
    textAlignVertical: "center",
    height: 40,
  },
  horasEntradas: {
    height: 40,
    flexDirection: "row",
    gap: 5,
  },
});
