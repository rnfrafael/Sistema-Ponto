export interface IPessoaCadastroAPI {
  id?: number;
  nome: string;
  cpf: string;
  senha: string;
  jornada_trabalho_id?: number;
}

export interface ILoginPessoa {
  cpf: string;
  senha: string;
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
  data: Date;
}

export interface IBuscaPontos {
  id: number;
  data: Date;
  pessoa_id: number;
}

export interface IGetPessoa {
  id: number;
}
