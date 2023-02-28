export interface IPessoaAPI {
  id: number;
  nome: string;
  cpf: string;
  jornada_trabalho_id?: number;
}
export interface IPessoasIdECpf {
  id: number;
  senhaCpf: string;
  nome: string;
  cpf: string;
}

export interface IRegistraPontoPOST {
  id: number;
  data: Date;
}
