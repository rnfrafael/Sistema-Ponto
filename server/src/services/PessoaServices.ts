import { prisma } from "../db/db";
import {
  IJornadaDaPessoa,
  ILoginPessoa,
  IPessoaCadastroAPI,
  IRegistraPontoPessoa,
} from "../interfaces/pessoaInterfaceAPI";

class PessoaService {
  async pegaTodosOsRegistros() {
    const res = await prisma.pessoa.findMany();
    return res;
  }

  async pegaUmRegistro(id: number) {
    const res = await prisma.pessoa.findUnique({ where: { id } });
    return res;
  }

  async apagaRegistro(id: number) {
    const res = await prisma.pessoa.delete({ where: { id } });

    return res;
  }

  async cadastraPessoa({ nome, cpf, senha }: IPessoaCadastroAPI) {
    try {
      const res = await prisma.pessoa.create({
        data: {
          nome,
          cpf,
          senha,
        },
      });
      return res;
    } catch (error: any) {
      if (error.code === "P2002") throw new Error("Usuário já cadastrado");
      return error.message;
    }
  }

  async logaPessoa({ cpf, senha }: ILoginPessoa) {
    const res = await prisma.pessoa.findUnique({
      where: {
        cpf,
      },
    });
    return res;
  }

  async cadastraJornadaDaPessoa({ pessoa, jornadaTrabalho }: IJornadaDaPessoa) {
    try {
      const res = await prisma.pessoa.update({
        where: { id: pessoa },
        data: {
          jornada_trabalho_id: jornadaTrabalho,
        },
      });
      return res;
    } catch (error: any) {
      if (error.code == "P2025")
        return `Erro na atualização do cadastro da pessoa ${pessoa}, essa pessoa não existe`;
      if (error.code == "P2003")
        return `Erro na atualização do cadastro da pessoa, a jornada ${jornadaTrabalho} não existe`;
      console.log(error);
      return `Erro na atualização de Cadastro de Jornada
      Erro: ${error.code}
      Observar: ${JSON.stringify(error.meta)}`;
    }
  }

  async registraPonto({ id, data }: IRegistraPontoPessoa) {
    try {
      const res = await prisma.pessoa.update({
        where: { id },
        data: { Pontos: { create: [{ ponto: data }] } },
      });
      return res;
    } catch (error: any) {
      console.log(error);
      return error;
    }
  }

  async buscaPontos({
    id,
    diaInicio,
    diaFinal,
  }: {
    id: number;
    diaInicio: Date;
    diaFinal: Date;
  }) {
    try {
      const res = await prisma.pontos.findMany({
        where: {
          pessoa_id: id,
          ponto: {
            lt: diaFinal.toISOString(),
            gt: diaInicio.toISOString(),
          },
        },
      });
      return res;
    } catch (error: any) {
      console.log(error);
      return error;
    }
  }
}

export default PessoaService;
