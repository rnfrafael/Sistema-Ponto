import { prisma } from "../db/db";
import { IJornadaCadastro } from "../interfaces/jornadaCadastroInterfaceAPI";

class HorariosService {
  async pegaTodosOsRegistros() {
    const jornadas = await prisma.jornadasTrabalho.findMany({
      include: { diasDaJornada: true },
    });

    return jornadas;
  }

  async pegaUmRegistro(id: number) {
    const jornada = await prisma.jornadasTrabalho.findUnique({
      where: {
        id: id,
      },
      include: {
        diasDaJornada: true,
      },
    });
    return jornada;
  }

  async apagaRegistro(id: number) {
    try {
      const deleteDiasHorarios = prisma.diasDaJornada.deleteMany({
        where: { jornada_trabalho_id: id },
      });
      const deleteJornada = prisma.jornadasTrabalho.delete({
        where: { id: id },
      });
      const res = await prisma.$transaction([
        deleteDiasHorarios,
        deleteJornada,
      ]);
      // await prisma.diasDaJornada.delete({where:})
      return res;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async cadastraJornada({ nome, diasDaJornada }: IJornadaCadastro) {
    const res = await prisma.jornadasTrabalho.create({
      data: {
        nome: nome,
        diasDaJornada: {
          create: diasDaJornada,
        },
      },
    });

    return res;
  }
}

export default HorariosService;
