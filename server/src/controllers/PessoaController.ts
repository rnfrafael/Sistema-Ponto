import {
  IJornadaDaPessoa,
  IPessoaCadastroAPI,
  IRegistraPontoPessoa,
} from "../interfaces/pessoaInterfaceAPI";
import { PessoaService } from "../services";
const pessoaService = new PessoaService();

class PessoaController {
  static async pegaTodasAsPessoas() {
    const res = await pessoaService.pegaTodosOsRegistros();
    return res;
  }

  static async pegaPessoaPorId(id: number) {
    const res = await pessoaService.pegaUmRegistro(id);
    return res;
  }

  static async cadastraPessoa(registro: IPessoaCadastroAPI) {
    const res1 = await pessoaService.cadastraPessoa(registro);
    return res1;
  }

  static async cadastraJornadaDaPessoa(registro: IJornadaDaPessoa) {
    const res1 = await pessoaService.cadastraJornadaDaPessoa(registro);
    return res1;
  }

  static async registraPonto(dados: IRegistraPontoPessoa) {
    const res1 = await pessoaService.registraPonto(dados);
    return res1;
  }

  static async deletaPessoa(id: number) {
    const res1 = await pessoaService.apagaRegistro(id);
    return res1;
  }
}

export default PessoaController;
