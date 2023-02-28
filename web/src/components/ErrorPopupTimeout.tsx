import { useEffect, useState } from "react";
import ErrorORSuccess from "./ErrorOrSuccess";

export interface IErrorPopupTimeout {
  mensagem?: string;
  data?: Date;
  nome?: string;
  falha?: boolean;
  onClose: Function;
}

function ErrorPopupTimeout({
  mensagem = "Erro",
  data = new Date(),
  nome,
  falha = true,
  onClose,
}: IErrorPopupTimeout) {
  const [visible, setVisible] = useState(true);

  const dataToPtBr = data
    ? Intl.DateTimeFormat("pt-br", {
        dateStyle: "short",
        timeStyle: "medium",
      }).format(data)
    : "";

  // const dataToPtBr = data.toString();

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3 * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return visible ? (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <ErrorORSuccess falha={falha} />

              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {mensagem}
                </h3>

                <div className="mt-2">
                  <p className="text-sm text-gray-500">{nome ? nome : ""}</p>

                  <p className="text-sm text-gray-500 mt-2">{dataToPtBr}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              autoFocus
              type="submit"
              onClick={() => {
                setVisible(false);
                onClose();
              }}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default ErrorPopupTimeout;
