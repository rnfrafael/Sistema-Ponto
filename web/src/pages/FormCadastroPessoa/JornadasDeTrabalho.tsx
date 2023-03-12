import React from "react";
import { IJornadas } from "./InterfacesCadastroPessoa";

type Props = {
  jornada: string;
  handleJornadaChange: any;
  jornadasDeTrabalho: IJornadas[];
};

export const JornadasDeTrabalho = ({
  jornada,
  jornadasDeTrabalho,
  handleJornadaChange,
}: Props) => {
  return (
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
        {jornadasDeTrabalho.map((jornada) => (
          <option key={jornada.id} value={jornada.id}>
            {jornada.nome}
          </option>
        ))}
      </select>
    </div>
  );
};
