import { useState } from "react";
import { logaPessoa } from "./functions";
import { ILogaPessoa } from "./InterfacesLogin";
import InputMask from "comigo-tech-react-input-mask";

function Login() {
  const [cpf, setCpf] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  function handleCpf(e: any) {
    setCpf(e.target.value);
  }
  function handleSenha(e: any) {
    setSenha(e.target.value);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    const dados: ILogaPessoa = { cpf, senha };

    logaPessoa(dados);
  }

  function handleReset() {
    setCpf("");
    setSenha("");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-gray-200 border rounded-md p-6">
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-2" htmlFor="cpf">
            Usuário(CPF):
          </label>
          <InputMask
            mask="999.999.999-99"
            className="placeholder:text-xs appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
            id="cpf"
            name="cpf"
            type="text"
            placeholder="Digite seu CPF aqui"
            value={cpf}
            onChange={handleCpf}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block font-medium text-gray-700 mb-2"
            htmlFor="password"
          >
            Senha:
          </label>
          <input
            className="placeholder:text-xs appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
            id="password"
            name="password"
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={handleSenha}
          />
        </div>
        <div className="flex justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={handleSubmit}
          >
            Entrar
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="reset"
            onClick={handleReset}
          >
            Limpar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
