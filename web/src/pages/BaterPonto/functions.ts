import { quatroUltimosDigitosCpfSemHifen } from "../../utils/validaCPF";
import { BASE_URL_API } from "../../utils/vars";
import {
  IPessoaAPI,
  IPessoasIdECpf,
  IRegistraPontoPOST,
} from "./baterPontoInterfaces";

export async function fetchRegistraPonto(dados: IRegistraPontoPOST) {
  const options = {
    method: "POST",
    body: JSON.stringify({ data: dados.data }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  console.log(dados.data);

  const pontoRegistrado = await fetch(
    `${BASE_URL_API}/pessoas/${dados.id}/registrar_ponto`,
    options
  ).then((d) => d.json());

  return pontoRegistrado;
}

export function testaSenha(senha: string, pessoasPonto: IPessoasIdECpf[]) {
  const pessoa = pessoasPonto.find((pessoa) => {
    return pessoa.senhaCpf === senha;
  });
  return pessoa ? pessoa : false;
}

export async function fetchPessoas() {
  const response = await fetch(`${BASE_URL_API}/pessoas`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const pessoasFetch: IPessoaAPI[] = await response.json();
  const pessoasIdECpf: IPessoasIdECpf[] = pessoasFetch.map((pessoa) => {
    const cpfSemHifen4UltimosDigitos = quatroUltimosDigitosCpfSemHifen(
      pessoa.cpf
    );
    return {
      id: pessoa.id,
      senhaCpf: cpfSemHifen4UltimosDigitos,
      nome: pessoa.nome,
      cpf: pessoa.cpf,
    };
  });
  return pessoasIdECpf;
}
