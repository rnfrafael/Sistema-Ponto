import { useEffect, useState } from "react";
import BateuPontoPopup from "../components/BateuPontoPopup";
import ErrorPopupTimeout from "../components/ErrorPopupTimeout";

import Loading from "../components/Loading";

import { quatroUltimosDigitosCpfSemHifen } from "../utils/validaCPF";
import { BASE_URL_API } from "../utils/vars";

interface IPessoaAPI {
  id: number;
  nome: string;
  cpf: string;
  jornada_trabalho_id?: number;
}
interface IPessoasIdECpf {
  id: number;
  senhaCpf: string;
  nome: string;
  cpf: string;
}

interface IPropsPopup {
  nome?: string;
  data?: Date;
  mensagem?: string;
  callback?: Function;
}

function BaterPonto() {
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [pessoasPonto, setPessoasPonto] = useState<IPessoasIdECpf[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupMessage, setShowPopupMessage] = useState<IPropsPopup>({});

  const testaSenha = (senha: string) => {
    const pessoa = pessoasPonto.find((pessoa) => {
      return pessoa.senhaCpf === senha;
    });
    return pessoa ? pessoa : false;
  };

  //Ao carregar página busca pessoas/fetch
  useEffect(() => {
    try {
      const fetchPessoas = async () => {
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
        setPessoasPonto(pessoasIdECpf);
        setLoading(false);
      };
      fetchPessoas();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleButtonClick = (value: number) => {
    if (inputValue.length < 4) {
      setInputValue(inputValue + value);
    }
  };

  //Teste de senha
  useEffect(() => {
    if (inputValue.length === 4) {
      const res = testaSenha(inputValue);
      if (res) {
        setShowPopupMessage({
          mensagem: "Ponto efetuado",
          nome: res.nome,
          data: new Date(),
        });
      } else {
        setShowPopupMessage({ mensagem: "Erro na senha" });
      }
      setShowPopup(true);
      setInputValue("");
    }
  }, [inputValue]);

  const handleReset = () => {
    setInputValue("");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {loading ? (
        <Loading />
      ) : !showPopup ? (
        <div className="flex justify-center items-center ">
          <div className="bg-gray-200 border rounded-md p-6">
            <form>
              <div className="mb-4">
                <label
                  className="block font-medium text-gray-700 mb-2"
                  htmlFor="inputNumber"
                >
                  Senha (4 ultimos digitos do CPF):
                </label>
                <input
                  className="w-full placeholder:text-xs appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                  id="inputNumber"
                  name="inputNumber"
                  type="text"
                  placeholder="Digite um número com 4 dígitos"
                  value={inputValue}
                  readOnly
                />
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
                  <button
                    key={value}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                    type="button"
                    onClick={() => handleButtonClick(value)}
                  >
                    {value}
                  </button>
                ))}
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded col-span-3"
                  type="button"
                  onClick={() => handleButtonClick(0)}
                >
                  0
                </button>
              </div>
              <div className="flex flex-col justify-between ">
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
        </div>
      ) : (
        <ErrorPopupTimeout
          mensagem={showPopupMessage.mensagem}
          data={showPopupMessage.data}
          nome={showPopupMessage.nome}
          onClose={() => {
            setShowPopup(false);
          }}
        />
      )}
    </div>
  );
}

export default BaterPonto;
