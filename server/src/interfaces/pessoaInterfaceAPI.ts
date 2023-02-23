export interface IPessoaCadastroAPI {
  id?: number;
  nome: string;
  cpf: string;
  jornada_trabalho_id?: number;
}
export interface IPessoaAPI {
  id: number;
  nome: string;
  cpf: string;
  jornada_trabalho_id?: number;
}

export interface IJornadaDaPessoa {
  pessoa: number;
  jornadaTrabalho: number;
}

export interface IRegistraPontoPessoa {
  id: number;
  hora: Date;
}
