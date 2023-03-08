import { StyleSheet, StatusBar } from "react-native";
export const stylesPontoScreen = StyleSheet.create({
  pontoScreen: {
    backgroundColor: "#EBEBEB",
    height: "100%",
    alignContent: "center",
    justifyContent: "center",
    gap: 50,
    paddingBottom: 100,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 100,
  },
  scrollViewPontoScreen: {},
});

export const stylesHeader = StyleSheet.create({
  headerContainer: {
    padding: 10,
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  photoHeader: {
    marginTop: 20,
    width: 172,
    height: 172,
    borderRadius: 100,
    borderColor: "#FFFFFF",
  },
  nameHeader: {
    width: "100%",

    backgroundColor: "#ECAE48",
    fontSize: 20,
    borderRadius: 10,
    textAlign: "center",
  },
});

export const stylesListaDePontos = StyleSheet.create({
  containerBot: {
    flex: 0.3,
    alignItems: "center",
    flexDirection: "column",
    gap: 10,
  },
  dataBot: { fontSize: 32 },
  horaBot: { fontSize: 32 },
  buttonBot: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    backgroundColor: "#ECAE48",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});
