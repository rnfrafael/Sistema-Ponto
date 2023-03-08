import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Loading } from "../../components/Loading";
import { AntDesign } from "@expo/vector-icons";
import { ListaPontos } from "./ponto-screen-components/ListaPontos";
import { TopPontoScreen } from "./ponto-screen-components";
import { stylesListaDePontos, stylesPontoScreen } from "./pontoStyle";

interface PontosBatidosFetch {
  id: number;
  ponto: Date;
  pessoa_id: number;
}

type PropsPontoScreen = {
  id: number;
};

export default function PontoScreen({ id }: PropsPontoScreen) {
  const [loading, setLoading] = useState(true);
  const [pontosBatidos, setPontosBatidos] = useState<Date[]>([]);
  const [pontosBatidosFetch, setPontosBatidosFetch] =
    useState<PontosBatidosFetch[]>();
  const [horaAtual, setHoraAtual] = useState(
    dayjs().format("HH:mm:ss").toString()
  );

  //*----------------------------------------------useEffect
  useEffect(() => {
    fetchPontosBatidos();
  }, []);

  useEffect(() => {
    const atualizaHora = setTimeout(() => {
      setHoraAtual(dayjs().format("HH:mm:ss").toString());
    }, 1000 * 1);
  }, [horaAtual]);

  useEffect(() => {
    const atualizaPontos = setTimeout(() => {
      fetchPontosBatidos(false);
    }, 1000 * 60 * 10);
  }, [pontosBatidos]);

  //*//*----------------------------------------------Functions
  async function fetchPontosBatidos(mostrarLoading = true) {
    try {
      setLoading(mostrarLoading);
      const res: PontosBatidosFetch[] = await fetch(
        `https://ponto-server.rafonte.dev/pessoas/${id}/busca_pontos?data=${dayjs().toISOString()}`
      ).then((d) => d.json());
      setPontosBatidosFetch(res);
      setPontosBatidos(res.map((ponto) => ponto.ponto));
    } catch (error) {
      Alert.alert("Ops", "Não foi possível carregar pontos batidos");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function registrarPonto() {
    try {
      setLoading(true);
      const res = await fetch(
        `https://ponto-server.rafonte.dev/pessoas/${id}/registrar_ponto`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "post",
          body: JSON.stringify({
            data: dayjs().toString(),
          }),
        }
      ).then((d) => d.json());
      fetchPontosBatidos();
      Alert.alert("Registrado", `Ponto registrado para ${res.nome}`);
    } catch (error) {
      Alert.alert("Ops", "Não foi possível carregar pontos batidos");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  //*-----loading ------
  if (loading) {
    return <Loading />;
  }

  //*------------------------------------------------Princial-------------------------------------------------------------
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={stylesPontoScreen.scrollViewPontoScreen}
    >
      <View style={stylesPontoScreen.pontoScreen}>
        {/* TOPO */}
        <TopPontoScreen
          name="Rafael Fontenele"
          photoUrl="../../../../assets/avatar.jpg"
        />
        {/* MID */}
        <ListaPontos pontosBatidos={pontosBatidos} />
        {/* BOT */}
        <View style={stylesListaDePontos.containerBot}>
          <Text style={stylesListaDePontos.dataBot}>
            {dayjs().format("DD/MM/YYYY").toString()}
          </Text>
          <Text style={stylesListaDePontos.horaBot}>{horaAtual}</Text>

          {/* BATER PONTO */}
          <TouchableOpacity
            onPress={registrarPonto}
            style={stylesListaDePontos.buttonBot}
            activeOpacity={0.7}
          >
            <AntDesign name="clockcircleo" size={28} />
            <Text style={{ fontSize: 28 }}>Bater Ponto</Text>
          </TouchableOpacity>

          {/* Reconhecimento Facial  */}
          <TouchableOpacity
            style={stylesListaDePontos.buttonBot}
            activeOpacity={0.7}
          >
            <AntDesign name="camera" size={28} />

            <Text style={{ fontSize: 28 }}>Rec Facial</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
