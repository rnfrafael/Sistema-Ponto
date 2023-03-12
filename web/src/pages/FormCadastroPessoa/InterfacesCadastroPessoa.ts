export interface ICadastroPessoa {
  nome: string;
  senha: string;
  cpf: string;
  jornada_trabalho_id?: number;
}

export interface IJornadas {
  id: number;
  nome: string;
}
