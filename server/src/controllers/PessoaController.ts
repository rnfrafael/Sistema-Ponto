import {
  IJornadaDaPessoa,
  ILoginPessoa,
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

  static async logaPessoa({ cpf, senha }: ILoginPessoa) {
    if (!UtilsCPF.validarCPF(cpf)) {
      throw new Error("CPF inválido");
    }
    cpf = UtilsCPF.padronizaCPF(cpf); // salva todos os CPF no formato xxx.xxx.xxx-xx
    const res = await pessoaService.logaPessoa({ cpf, senha });

    if (senha === res?.senha) return "Usuário encotrado";

    return "ERRO, usuario ou senha inválidos";
  }

  static async cadastraJornadaDaPessoa(registro: IJornadaDaPessoa) {
    const res1 = await pessoaService.cadastraJornadaDaPessoa(registro);
    return res1;
  }

  static async registraPonto(dados: IRegistraPontoPessoa) {
    const res = await pessoaService.registraPonto(dados);
    return res;
  }

  static async buscaPontos({
    id,
    diaInicio,
    diaFinal,
  }: {
    id: number;
    diaInicio: Date;
    diaFinal: Date;
  }) {
    const res1 = await pessoaService.buscaPontos({ id, diaInicio, diaFinal });
    return res1;
  }

  static async deletaPessoa(id: number) {
    const res1 = await pessoaService.apagaRegistro(id);
    return res1;
  }
}

export default PessoaController;
