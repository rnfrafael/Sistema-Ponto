class UtilsCPF {
  static validarCPF(cpf: string) {
    cpf = cpf.replace(/[^\d]+/g, ""); // remove tudo que não é número
    if (cpf.length !== 11) return false;

    // calcula o primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let digitoVerificador1 = 11 - (soma % 11);
    if (digitoVerificador1 > 9) digitoVerificador1 = 0;

    // calcula o segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let digitoVerificador2 = 11 - (soma % 11);
    if (digitoVerificador2 > 9) digitoVerificador2 = 0;

    // verifica se os dígitos verificadores são iguais aos dois últimos dígitos do CPF
    return (
      digitoVerificador1 === parseInt(cpf.charAt(9)) &&
      digitoVerificador2 === parseInt(cpf.charAt(10))
    );
  }

  static padronizaCPF(cpf: string) {
    cpf = cpf.replace(/[^\d]+/g, "");
    cpf =
      cpf.substring(0, 3) +
      "." +
      cpf.substring(3, 6) +
      "." +
      cpf.substring(6, 9) +
      "-" +
      cpf.substring(9, 11);
    return cpf;
  }
}
/*
export function validarCPF(cpf: string) {
  cpf = cpf.replace(/[^\d]+/g, ""); // remove tudo que não é número
  if (cpf.length !== 11) return false;

  // calcula o primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let digitoVerificador1 = 11 - (soma % 11);
  if (digitoVerificador1 > 9) digitoVerificador1 = 0;

  // calcula o segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  let digitoVerificador2 = 11 - (soma % 11);
  if (digitoVerificador2 > 9) digitoVerificador2 = 0;

  // verifica se os dígitos verificadores são iguais aos dois últimos dígitos do CPF
  return (
    digitoVerificador1 === parseInt(cpf.charAt(9)) &&
    digitoVerificador2 === parseInt(cpf.charAt(10))
  );
}

export function padronizaCPF(cpf: string) {
  cpf = cpf.replace(/[^\d]+/g, "");
  cpf =
    cpf.substring(0, 3) +
    "." +
    cpf.substring(3, 6) +
    "." +
    cpf.substring(6, 9) +
    "-" +
    cpf.substring(9, 11);
  return cpf;
}
*/
export default UtilsCPF;
