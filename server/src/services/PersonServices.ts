import { prisma } from "../db/db";

class PersonService {
  async pegaTodosOsRegistros() {
    console.log(`Pega Pessoas service`);

    const res = await prisma.person.findMany();
    console.log(`Pega Pessoas Service ${res} resultado`);

    return res;
  }

  async pegaUmRegistro(id: number) {
    console.log("pegaUmRegistro Inicio");
    const res = await prisma.person.findUnique({ where: { id } });
    console.log("pegaUmRegistro Após com res: ", res);
    return res;
  }

  async apagaRegistro(id: number) {
    console.log("apagaRegistro Inicio");
    const res = await prisma.person.delete({ where: { id } });
    console.log("apagaRegistro Após com res: ", res);
    return res;
  }
}

export default PersonService;
