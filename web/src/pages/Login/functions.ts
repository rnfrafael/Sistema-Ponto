import { BASE_URL_API } from "../../utils/vars";
import { ILogaPessoa } from "./InterfacesLogin";

export const logaPessoa = async (dados: ILogaPessoa) => {
  console.log("🚀 ~ file: functions.ts:5 ~ logaPessoa ~ dados:", dados);
  try {
    const res = await fetch(BASE_URL_API + "/pessoas/logar", {
      body: JSON.stringify(dados),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then((d) => d.json());
    console.log("🚀 ~ file: Login.tsx:27 ~ handleSubmit ~ res:", res);
  } catch (error) {
    console.log(error);
  } finally {
  }
};
