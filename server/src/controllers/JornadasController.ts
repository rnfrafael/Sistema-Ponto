import { JornadaCadastroAPI } from "../interfaces/jornadaCadastroInterface";
import { JornadasService } from "../services";

const jornadaService = new JornadasService();

class JornadasController {
  static async pegaTodasAsJornadas() {
    const res = await jornadaService.pegaTodosOsRegistros();
    return res;
  }

  static async pegaJornada(id: number) {
    const res1 = await jornadaService.pegaUmRegistro(id);
    return res1;
  }
  static async cadastraJornada(registro: JornadaCadastroAPI) {
    const res1 = await jornadaService.cadastraJornada(registro);
    return res1;
  }
  static async deletaJornada(id: number) {
    const res1 = await jornadaService.apagaRegistro(id);
    return res1;
  }
}

export default JornadasController;
