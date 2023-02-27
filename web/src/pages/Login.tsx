import { useState } from "react";

function Login() {
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleUser(e: any) {
    setUser(e.target.value);
  }
  function handlePassword(e: any) {
    setPassword(e.target.value);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    console.log(`Input user: ${user}`);
    console.log(`Input password: ${password}`);
  }

  function handleReset() {
    setUser("");
    setPassword("");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-gray-200 border rounded-md p-6">
        <div className="mb-4">
          <label
            className="block font-medium text-gray-700 mb-2"
            htmlFor="username"
          >
            Usuário:
          </label>
          <input
            className="placeholder:text-xs appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
            id="username"
            name="username"
            type="text"
            placeholder="Digite seu nome de usuário"
            value={user}
            onChange={handleUser}
          />
        </div>
        <div className="mb-6">
          <label
            className="block font-medium text-gray-700 mb-2"
            htmlFor="password"
          >
            Senha:
          </label>
          <input
            className="placeholder:text-xs appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
            id="password"
            name="password"
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={handlePassword}
          />
        </div>
        <div className="flex justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={handleSubmit}
          >
            Entrar
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="reset"
            onClick={handleReset}
          >
            Limpar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
