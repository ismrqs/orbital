// src/api/PostCadastro.ts

import type { CadastroForm, UsuarioAPI } from "../types/UsuarioType";

const API_URL = import.meta.env.VITE_API_URL ?? "https://orbital-java.onrender.com";

// POST /auth/cadastro
// Envia os dados do formulário para o Java
export async function postCadastro(data: CadastroForm): Promise<void> {
  const body: UsuarioAPI = {
    nome:         data.nome,
    email:        data.email,
    organizacao:  data.organizacao,
    senha:        data.senha,
  };

  const res = await fetch(`${API_URL}/auth/cadastro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const erro = await res.json().catch(() => ({}));
    throw new Error(erro.erro ?? "Não foi possível criar a conta. Tente novamente.");
  }
}
