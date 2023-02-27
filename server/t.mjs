function padronizaCPF(cpf) {
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

console.log(padronizaCPF("03252379309"));
