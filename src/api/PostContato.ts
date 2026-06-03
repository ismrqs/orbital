import type { ContatoForm } from "../types/ContatoForm";

const API_URL = "https://orbital-java.onrender.com/contato";

export async function postContato(data: ContatoForm): Promise<void> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Erro ao enviar mensagem: ${response.status}`);
  }
}