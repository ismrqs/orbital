// Campos do formulário de cadastro
export interface CadastroForm {
  nome: string;
  email: string;
  organizacao: string;
  senha: string;
  confirmaSenha: string; // só validação no front, não vai pro Java
}

// O que o Java espera receber no POST /auth/cadastro
export interface UsuarioAPI {
  nome: string;
  email: string;
  organizacao: string;
  senha: string;
}
