import { BASE_URL_API } from "../../utils/vars";
import { ICadastroPessoa } from "./InterfacesCadastroPessoa";

export const cadastrarPessoa = async (dados: ICadastroPessoa) => {
  try {
    const cadastraPessoa = await fetch(`${BASE_URL_API}/pessoas/cadastra`, {
      method: "POST",
      body: JSON.stringify(dados),
      headers: { "Content-Type": "application/json" },
    }).then((d) => d.json());
    console.log(
      "🚀 ~ file: functions.ts:8 ~ cadastrarPessoa ~ cadastraPessoa:",
      cadastraPessoa
    );
    return cadastraPessoa;
  } catch (error) {
    console.log(error);
    return error;
  }
};
