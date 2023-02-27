export interface IJornadaCadastro {
  id?: number;
  nome: string;
  diasDaJornada: IDiasDaJornadaAPI[];
}

interface IDiasDaJornadaAPI {
  id?: number;
  hora: Date;
  dia_da_semana: number;
  jornada_trabalho_id?: number;
}

export interface IGetJornada {
  id: number;
}
