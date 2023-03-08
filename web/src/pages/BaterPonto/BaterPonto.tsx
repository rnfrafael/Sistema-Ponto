import { useEffect, useState } from "react";
import { ErrorPopupTimeout, Loading } from "../../components/";

import {
  IErrorPopupTimeoutMessage,
  IPessoaAPI,
  IPessoasIdECpf,
} from "./baterPontoInterfaces";

import { fetchPessoas, fetchRegistraPonto, testaSenha } from "./functions";

function BaterPonto() {
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [pessoasPonto, setPessoasPonto] = useState<IPessoasIdECpf[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupProps, setShowPopupProps] =
    useState<IErrorPopupTimeoutMessage>({});

  //Ao carregar página busca pessoas/fetch e popula na memoria
  useEffect(() => {
    try {
      fetchPessoas().then((result) => {
        setPessoasPonto(result);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleButtonClick = (value: number) => {
    if (inputValue.length < 4) {
      setInputValue(inputValue + value);
    }
  };

  //Teste de senha se é válido ou não
  useEffect(() => {
    if (inputValue.length === 4) {
      const res = testaSenha(inputValue, pessoasPonto);
      if (res) {
        setShowPopupProps({
          mensagem: "Ponto efetuado",
          nome: res.nome,
          data: new Date(),
          falha: false,
        });
        const payload = {
          id: res.id,
          data: new Date(),
        };
        fetchRegistraPonto(payload);
      } else {
        setShowPopupProps({
          mensagem: "Erro na senha, ponto não efetuado",
          falha: true,
          data: new Date(),
        });
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
          mensagem={showPopupProps.mensagem}
          data={showPopupProps.data}
          nome={showPopupProps.nome}
          falha={showPopupProps.falha}
          onClose={() => {
            setShowPopup(false);
          }}
        />
      )}
    </div>
  );
}

export default BaterPonto;
