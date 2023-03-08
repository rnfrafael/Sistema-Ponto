import { useState, useEffect } from "react";
import InputMask from "comigo-tech-react-input-mask";
import { validarCPF } from "../../utils/validaCPF";
import { ErrorPopupTimeout, Loading } from "../../components";
import { BASE_URL_API } from "../../utils/vars";

interface IFormCadastroPessoa {
  nome: string;
  cpf: string;
  jornada_trabalho_id: number;
}

interface IJornadaAPI {
  id: number;
  nome: string;
}

function FormCadastroPessoa() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [jornada, setJornada] = useState("");
  const [jornadasDeTrabalho, setJornadasDeTrabalho] = useState<IJornadaAPI[]>(
    []
  );
  const [showPopup, setShowPopup] = useState(false);
  const [tipoDeIconeFalha, setTipoDeIconeFalha] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchJornadas() {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL_API}/jornadas`);
        const data: IJornadaAPI[] = await response.json();
        setJornadasDeTrabalho(data);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    fetchJornadas();
    setIsLoading(false);
  }, []);

  const handleNomeChange = (event: any) => {
    setNome(event.target.value);
  };

  const handleCpfChange = (event: any) => {
    setCpf(event.target.value);
  };

  const handleJornadaChange = (event: any) => {
    setJornada(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (!validarCPF(cpf)) {
      setTipoDeIconeFalha(true);
      setShowPopup(true);
      return;
    }

    const payload = {
      nome,
      cpf,
      jornada_trabalho_id: jornada,
    };
    console.log("Payload:", payload);
    // Aqui você pode enviar as informações para o servidor
    const cadastrarPessoa = async () => {
      try {
        const cadastraPessoa = await fetch(`${BASE_URL_API}/pessoas/cadastra`, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        }).then((d) => d.json());
        console.log(
          "🚀 ~ file: FormCadastroPessoa.tsx:73 ~ cadastraPessoa ~ cadastraPessoa:",
          cadastraPessoa
        );
      } catch (error) {
        console.log(
          "🚀 ~ file: FormCadastroPessoa.tsx:77 ~ cadastrarPessoa ~ error:",
          error
        );
      }
    };
    cadastrarPessoa();
  };

  const handleReset = () => {
    setNome("");
    setCpf("");
    setJornada("");
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
          <div className="mb-4">
            <label
              className="block font-medium text-gray-700 mb-2"
              htmlFor="selectJornada"
            >
              Jornada de trabalho:
            </label>
            <select
              className="text-xs w-full appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
              id="selectJornada"
              name="selectJornada"
              value={jornada}
              onChange={handleJornadaChange}
            >
              <option value="">Selecione uma jornada</option>
              <option value="">Cadastrar depois</option>
              {jornadasDeTrabalho.map((jornada) => (
                <option key={jornada.id} value={jornada.id}>
                  {jornada.nome}
                </option>
              ))}
            </select>
          </div>
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
