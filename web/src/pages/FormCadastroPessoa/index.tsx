import { useState, useEffect, useCallback } from "react";
import InputMask from "comigo-tech-react-input-mask";
import { validarCPF } from "../../utils/validaCPF";
import { ErrorPopupTimeout, Loading } from "../../components";
import { BASE_URL_API } from "../../utils/vars";
import clsx from "clsx";
import ErrorMessageInput from "../../components/ErrorMessageInput";
import { cadastrarPessoa } from "./functions";
import { ICadastroPessoa, IJornadas } from "./InterfacesCadastroPessoa";
import { JornadasDeTrabalho } from "./JornadasDeTrabalho";

function FormCadastroPessoa() {
  //----inputs----
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [senha2, setSenha2] = useState("");
  const [jornada, setJornada] = useState("");
  const [jornadasDeTrabalho, setJornadasDeTrabalho] = useState<IJornadas[]>([]);

  const [mensagemErroSenha, setMensagemErroSenha] = useState("");
  const [senhasDiferentes, setSenhasDiferentes] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [tipoDeIconeFalha, setTipoDeIconeFalha] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchJornadas() {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL_API}/jornadas`);
        const data: IJornadas[] = await response.json();
        setJornadasDeTrabalho(data);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    fetchJornadas();
    setIsLoading(false);
  }, []);

  const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
  };

  const handleSenhaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSenha(event.target.value);
    event.target.value.length < 8
      ? setMensagemErroSenha("Senha deve ter pelo menos 8 caracteres")
      : setMensagemErroSenha("");
    event.target.value.length === 0 ? setMensagemErroSenha("") : null;
    if (event.target.value === senha2) {
      setSenhasDiferentes(false);
      return;
    }
    setSenhasDiferentes(true);
  };
  const handleSenha2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSenha2(event.target.value);

    if (event.target.value === senha) {
      setSenhasDiferentes(false);
      return;
    }

    setSenhasDiferentes(true);
  };

  const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(event.target.value);
  };

  const handleJornadaChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setJornada(event.target.value);
    },
    [setJornada]
  );

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!validarCPF(cpf)) {
      setTipoDeIconeFalha(true);
      setShowPopup(true);
      return;
    }

    const dados: ICadastroPessoa = {
      nome,
      cpf,
      senha,
      jornada_trabalho_id: Number(jornada),
    };
    const res = cadastrarPessoa(dados);
    console.log(
      "🚀 ~ file: FormCadastroPessoa.tsx:100 ~ handleSubmit ~ res:",
      res
    );
  };

  const handleReset = () => {
    setNome("");
    setCpf("");
    setSenha("");
    setSenha2("");
    setJornada("");
    setMensagemErroSenha("");
  };

  return !showPopup ? (
    <div className="flex justify-center items-center h-screen">
      {isLoading && <Loading />}
      <div className="bg-gray-200 border rounded-md p-6">
        <form>
          <div className="mb-4">
            <label
              className="block font-medium text-gray-700 mb-2"
              htmlFor="inputNome"
            >
              Nome:
            </label>
            <input
              className="placeholder:text-xs w-full appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
              id="inputNome"
              name="inputNome"
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={handleNomeChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block font-medium text-gray-700 mb-2"
              htmlFor="inputSenha"
            >
              Senha:
            </label>
            <input
              className={clsx(
                "placeholder:text-xs w-full appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring",
                {
                  "border-red-500": senhasDiferentes,
                }
              )}
              id="inputSenha"
              name="inputSenha"
              type="password"
              placeholder="Digite sua Senha"
              value={senha}
              onChange={handleSenhaChange}
              required
            />
            <ErrorMessageInput mensagem={mensagemErroSenha} />
          </div>
          <div className="mb-4">
            <label
              className="block font-medium text-gray-700 mb-2"
              htmlFor="inputSenha2"
            >
              Digite novamente a senha:
            </label>
            <input
              className={clsx(
                "placeholder:text-xs w-full appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring",
                {
                  "border-red-500": senhasDiferentes,
                }
              )}
              id="inputSenha2"
              name="inputSenha2"
              type="password"
              placeholder="Digite sua novamente"
              value={senha2}
              onChange={handleSenha2Change}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block font-medium text-gray-700 mb-2"
              htmlFor="inputCpf"
            >
              CPF:
            </label>

            <InputMask
              mask="999.999.999-99"
              className="placeholder:text-xs w-full appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
              id="inputCpf"
              name="inputCpf"
              type="text"
              value={cpf}
              placeholder="Digite seu CPF"
              onChange={handleCpfChange}
              required
            />
          </div>
          <JornadasDeTrabalho
            jornada={jornada}
            handleJornadaChange={handleJornadaChange}
            jornadasDeTrabalho={jornadasDeTrabalho}
          />
          <div className="flex justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
              type="submit"
              onClick={handleSubmit}
            >
              Enviar
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
              type="reset"
              onClick={handleReset}
            >
              Limpar
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <ErrorPopupTimeout
      falha={tipoDeIconeFalha}
      mensagem="CPF Inválido"
      onClose={() => {
        setCpf("");
        setShowPopup(false);
      }}
    />
  );
}

export default FormCadastroPessoa;
