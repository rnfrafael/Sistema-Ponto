import { prisma } from "../db/db";
import {
  IJornadaDaPessoa,
  IPessoaCadastroAPI,
  IRegistraPontoPessoa,
} from "../interfaces/pessoaInterfaceAPI";

class PessoaService {
  async pegaTodosOsRegistros() {
    console.log(`Pega Pessoas service`);

    const res = await prisma.pessoa.findMany();
    console.log(`Pega Pessoas Service ${res} resultado`);

    return res;
  }

  async pegaUmRegistro(id: number) {
    console.log("----------pegaUmRegistro Pessoa Inicio----------");
    const res = await prisma.pessoa.findUnique({ where: { id } });
    console.log("pegaUmRegistro Pessoa Após com res: ---", res);
    return res;
  }

  async apagaRegistro(id: number) {
    console.log("----------apagaRegistro Pessoa Inicio----------");
    const res = await prisma.pessoa.delete({ where: { id } });
    console.log(
      "-------apagaRegistro Pessoa Após com res: ---",
      res,
      " ---------"
    );
    return res;
  }

  async cadastraPessoa({ nome, cpf }: IPessoaCadastroAPI) {
    const res = await prisma.pessoa.create({
      data: {
        nome,
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

  async registraPonto({ id, hora }: IRegistraPontoPessoa) {
    try {
      const res = await prisma.pessoa.update({
        where: { id },
        data: { Pontos: { create: [{ ponto: hora }] } },
      });
      return res;
    } catch (error: any) {
      console.log(error);
      return error;
    }
  }
}

export default PessoaService;
