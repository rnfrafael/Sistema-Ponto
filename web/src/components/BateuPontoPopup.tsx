import { useEffect, useState } from "react";
interface IPropsPopup {
  nome?: string;
  data?: Date;
  mensagem?: string;
  callback: Function;
}
function BateuPontoPopup({ mensagem, data, nome, callback }: IPropsPopup) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      callback();
    }, 3 * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return visible ? (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg">
        <p>{mensagem ? mensagem : "ERRO"}</p>
        <p>{data ? data.toString() : null}</p>
        <p>{nome ? nome : null}</p>
        <button
          className="mt-4 py-2 px-4 bg-gray-500 text-white rounded-lg"
          onClick={() => {
            setVisible(false);
            callback();
          }}
        ></button>
      </div>
    </div>
  ) : null;
}

export default BateuPontoPopup;
