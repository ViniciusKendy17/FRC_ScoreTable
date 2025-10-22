import { useState } from "react";
import "../../styles/Login.css";
import { toast } from "react-toastify";
import { toast_pro } from "../../utils/Util";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";

export default function Login() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const nav = useNavigate();
    const [user, SetUser] = useLocalStorage("user");
  

  const FTA_CREDENTIALS = {
    username: "fta",
    password: "frc2025",
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      nome === FTA_CREDENTIALS.username &&
      senha === FTA_CREDENTIALS.password
    ) {
      SetUser('fta');
      toast.success("Login feito com sucesso", toast_pro);

      nav("/");
    } else {
      setErro("Nome ou senha incorretos.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>FTA Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          {erro && <p className="erro">{erro}</p>}
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}
