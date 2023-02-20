import { PersonService } from "../services/";
const personService = new PersonService();

class PersonController {
  static async pegaTodasAsPessoas() {
    const res = await personService.pegaTodosOsRegistros();
    return res;
  }

  static async pegaPessoaPorId(id: number) {
    const res = await personService.pegaUmRegistro(id);
    return res;
  }
}

export default PersonController;
