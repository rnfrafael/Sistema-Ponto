import {
  IJornadaDaPessoa,
  IPessoaCadastroAPI,
  IRegistraPontoPessoa,
} from "../interfaces/pessoaInterfaceAPI";
import { PessoaService } from "../services";
import { UtilsCPF } from "../utils/";
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
    if (!UtilsCPF.validarCPF(registro.cpf)) {
      throw new Error("CPF inválido");
    }
    registro.cpf = UtilsCPF.padronizaCPF(registro.cpf); // salva todos os CPF no formato xxx.xxx.xxx-xx
    const res1 = await pessoaService.cadastraPessoa(registro);
    return res1;
  }

  static async cadastraJornadaDaPessoa(registro: IJornadaDaPessoa) {
    const res1 = await pessoaService.cadastraJornadaDaPessoa(registro);
    return res1;
  }

  static async registraPonto(dados: IRegistraPontoPessoa) {
    console.log(
      "🚀 ~ file: PessoaController.ts:36 ~ PessoaController ~ registraPonto ~ dados:",
      dados.data
    );
    const res1 = await pessoaService.registraPonto(dados);
    return res1;
  }

  static async deletaPessoa(id: number) {
    const res1 = await pessoaService.apagaRegistro(id);
    return res1;
  }
}

export default PessoaController;
