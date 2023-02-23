import { prisma } from "../db/db";
import { JornadaCadastroAPI } from "../interfaces/jornadaCadastroInterface";

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
      console.log("apagaRegistro Inicio");
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
      console.log("apagaRegistro Após com res: ", res);
      return res;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async cadastraJornada({ nome, diasDaJornada }: JornadaCadastroAPI) {
    const res = await prisma.jornadasTrabalho.create({
      data: {
        nome: nome,
        diasDaJornada: {
          create: diasDaJornada,
        },
      },
    });
    console.log(
      "🚀 ~ file: JornadasService.ts:56 ~ HorariosService ~ cadastraJornada ~ res:",
      res
    );
    return res;
  }
}

export default HorariosService;
