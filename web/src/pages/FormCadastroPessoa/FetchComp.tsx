import { useQuery } from "@tanstack/react-query";

import ErrorPopupTimeout from "../../components/ErrorPopupTimeout";
import Loading from "../../components/Loading";

import apiClient from "../../utils/axios";
type Props = {};

export const FetchComp = ({}: Props) => {
  async function fetchFn() {
    return await apiClient.get("jornadas");
  }
  const { isLoading, isSuccess, isError, data, error, refetch } = useQuery({
    queryKey: ["jornadas"],
    queryFn: fetchFn,
    retry: 3,
  });

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <ErrorPopupTimeout
        nome="Erro busca de jornadas"
        mensagem="Ocorreu algum erro ao buscar jornadas, tente novamente mais tarde ou cadastre sem a jornada definida"
        falha={true}
        onClose={() => {
          console.log("abc");
        }}
      />
    );

  // if (isSuccess) return ({data.map((jornada) => (
  //   <option key={jornada.id} value={jornada.id}>
  //     {jornada.nome}
  //   </option>
  // ))});

  return <div></div>;
};
