<div align="center">

# Orbital - Space Connect

<img src="https://img.shields.io/badge/Status-Concluído-brightgreen?style=for-the-badge" />
<img src="https://img.shields.io/badge/Curso-ADS-blueviolet?style=for-the-badge" />
<img src="https://img.shields.io/badge/Institui%C3%A7%C3%A3o-FIAP-red?style=for-the-badge" />
<img src="https://img.shields.io/badge/Semestre-2%C2%BA-orange?style=for-the-badge" />

</div>

---

## 📋 Descrição

A **Orbital** é uma plataforma web de gestão de risco orbital desenvolvida como projeto acadêmico da Global Solution 2026 na FIAP. A aplicação permite que operadores de satélites monitorem sua frota em tempo real, visualizem alertas de colisão, calculem manobras de desvio e acompanhem o status de cada satélite com base em dados orbitais.

O sistema classifica automaticamente o nível de risco de cada satélite em três categorias, **Normal**, **Atenção** e **Crítico**, utilizando cálculos baseados em altitude, tipo de órbita e inclinação orbital. Para satélites em risco, a plataforma calcula a manobra de desvio necessária, indicando o delta-V mínimo em m/s e a janela de tempo para execução.

O front-end em React consome uma API REST desenvolvida em Java com Quarkus, que por sua vez executa os modelos de classificação de risco e cálculo de manobra internamente.

---

## 🚀 Tecnologias utilizadas

| Tecnologia | Função |
|---|---|
| ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) | Biblioteca principal de UI |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) | Tipagem estática do JavaScript |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) | Bundler e servidor de desenvolvimento |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white) | Estilização utilitária |
| ![Java](https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white) | API REST (back-end) |
| ![Render](https://img.shields.io/badge/Render-46E3B7?style=flat-square&logo=render&logoColor=black) | Hospedagem da API Java |
| ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white) | Deploy do front-end |
| ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white) | Prototipagem e design |
| ![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white) | Controle de versão |
| ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white) | Repositório remoto |

---

## 📁 Estrutura de pastas

```
orbital/
└── src/
    ├── api/                          # Funções de chamada à API Quarkus
    │   ├── GetAlertas.ts
    │   ├── GetDashboard.ts           # GET /satelites e /alertas (dashboard)
    │   ├── GetSatelite.ts            # GET /satelites/:noradId
    │   ├── PostCadastro.ts
    │   ├── PostContato.ts
    │   ├── PostManobra.ts
    │   └── PutSatelite.ts            # PUT /satelites/:noradId
    │
    ├── assets/
    │   ├── background.jpg
    │   ├── crono1.png
    │   ├── crono2.png
    │   ├── crono3.png
    │   └── logo.png
    │
    ├── pages/
    │   ├── auth/                     # Páginas de autenticação (públicas)
    │   │   ├── Login.tsx
    │   │   └── Cadastro.tsx
    │   │
    │   ├── components/               # Componentes reutilizáveis
    │   │   ├── Badge.tsx
    │   │   ├── Footer.tsx
    │   │   ├── Header.tsx
    │   │   ├── HeaderPrivado.tsx     # Header das páginas autenticadas
    │   │   ├── InputField.tsx        # Campo de formulário com label e erro
    │   │   ├── Menu.tsx
    │   │   ├── ModalWrapper.tsx      # Wrapper padrão de modais
    │   │   ├── StatBox.tsx           # Métrica com label e valor colorido
    │   │   └── TitlePage.tsx
    │   │
    │   ├── private/                  # Páginas protegidas (requerem login)
    │   │   ├── Alerta.tsx
    │   │   ├── Configuracoes.tsx
    │   │   ├── Dashboard.tsx
    │   │   ├── FrotaLista.tsx
    │   │   └── SateliteDetalhe.tsx
    │   │
    │   ├── utils/
    │   │   └── inputStyle.tsx        # Estilos base de inputs compartilhados
    │   │
    │   ├── Contato.tsx
    │   ├── Faq.tsx
    │   ├── Home.tsx
    │   ├── QuemSomos.tsx
    │   └── Sobre.tsx
    │
    ├── types/                        # Interfaces TypeScript
    │   ├── AlertaType.ts
    │   ├── ContatoForm.ts
    │   ├── DashboardTypes.ts
    │   ├── Satelite.ts
    │   └── UsuarioType.ts
    │
    ├── App.tsx                       # Rotas e proteção de páginas privadas
    ├── App.css
    ├── index.css
    └── main.tsx
```

---

## 🖥️ Como Usar

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- npm ou yarn
- Git

### Instalação e execução local

```bash
# Clone o repositório
git clone https://github.com/ismrqs/orbital.git

# Acesse a pasta do projeto
cd orbital

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Script
`npm run dev` = Inicia o servidor de desenvolvimento

### 🔗 Links do projeto

| Recurso | Link |
|---|---|
| 📂 Repositório GitHub | [github.com/ismrqs/orbital](https://github.com/ismrqs/orbital) |
| 🎥 Vídeo no YouTube | [https://youtu.be/uy4iI2kJzMw](https://youtu.be/uy4iI2kJzMw) |
| ☁️ Deploy na Vercel | https://orbital-vert.vercel.app/ |

---

## 🖼️ Imagens do projeto

<div align="center">

| Home | Central de alertas |
|:---:|:---:|
| <img width="1365" height="799" alt="Image" src="https://github.com/user-attachments/assets/5dcc8d7e-eca4-47ff-89fc-dfebb6ab9b1f" /> | <img width="1365" height="1227" alt="Image" src="https://github.com/user-attachments/assets/33c1bc44-8aa2-4120-be36-69daf4a22a55" /> |

| Meus satélites | Satelites/:id |
|:---:|:---:|
| <img width="1364" height="759" alt="Image" src="https://github.com/user-attachments/assets/0fa0eec7-0608-466b-9b3c-2ae0b67cbf86" />| <img width="1365" height="744" alt="Image" src="https://github.com/user-attachments/assets/18dfa65d-36b7-4329-9c84-7f8970288557" /> |

</div>

---

## 👥 Autores e créditos

Projeto desenvolvido por estudantes do **2º semestre de Análise e Desenvolvimento de Sistemas na FIAP**.

<br>

<table align="center">
  <tr>
    <td align="center">
      <img width="452" height="452" alt="Image" src="https://github.com/user-attachments/assets/43a61b7d-51d5-4331-aec0-b4b7dbc46ca0" />
      <b>Isabely Marques da Silva</b><br/>
      RM 566663<br/><br/>
      <a href="https://www.linkedin.com/in/isabely-marques/">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white" />
      </a>
      <a href="https://github.com/ismrqs">
        <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white" />
      </a>
    </td>
    <td align="center">
      <img width="460" height="460" alt="Image" src="https://github.com/user-attachments/assets/786e9762-5d32-463a-8d53-b89100c59705" />
      <b>Luana Alves de Oliveira</b><br/>
      RM 566621<br/><br/>
      <a href="https://www.linkedin.com/in/luana-oliveira-moonnax/">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white" />
      </a>
      <a href="https://github.com/Moonnax">
        <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white" />
      </a>
    </td>
    <td align="center">
      <img width="452" height="452" alt="Image" src="https://github.com/user-attachments/assets/45ec17f9-9e13-4401-be09-095cb59b5547" />
      <b>Mateus Ribeiro Azevedo</b><br/>
      RM 566630<br/><br/>
      <a href="https://www.linkedin.com/in/mateus-ribeiro-azevedo-a39a13269/">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white" />
      </a>
      <a href="https://github.com/mateus-ribeiro-dev">
        <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white" />
      </a>
    </td>
  </tr>
</table>

---

## 📬 Contato

Tem dúvidas, sugestões ou quer saber mais sobre o projeto?

- 💼 LinkedIn de cada integrante (links acima)
- 🐙 GitHub do projeto: [github.com/ismrqs/orbital](https://github.com/ismrqs/orbital)

---

<div align="center">

Desenvolvido com 💙 pela equipe Orbital — FIAP Global Solution - 2° semestre em ADS

</div>
