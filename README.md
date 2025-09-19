# 📝 To-do App

Aplicação web de lista de tarefas construída com **Next.js 15**, **React 19**, **Redux Toolkit** e **Tailwind CSS 4**. O projeto consome uma API hospedada no MockAPI para persistir dados e demonstra como organizar um fluxo completo de CRUD com gerenciamento de estado global no App Router do Next.

> Projeto desenvolvido para estudos e portfólio, destacando boas práticas de front-end moderno, UX responsiva e integração com serviços externos.

---

## 🚀 Demo
- Produção: [to-do-app-zeta-ebon.vercel.app](https://to-do-app-zeta-ebon.vercel.app/)

---


## ✨ Principais funcionalidades
- ➕ Adicionar novas tarefas com persistência remota.
- ✅ Alternar tarefas entre **concluídas** e **pendentes**.
- ✏️ Edição inline dos textos de cada tarefa.
- 🗑️ Exclusão imediata dos itens.
- 🔍 Filtros de visualização: **Todas**, **Pendentes** e **Concluídas**.
- 🔄 Feedback visual de carregamento e tratamento de erros.
- 🌐 Integração com MockAPI e suporte opcional a `json-server` local.


---

## 🧱 Arquitetura e stack
| Camada | Detalhes |
| --- | --- |
| Framework | [Next.js 15](https://nextjs.org/) (App Router, renderização híbrida, roteamento de arquivos). |
| UI | [React 19](https://react.dev/) com componentes funcionais e hooks. |
| Estado Global | [Redux Toolkit](https://redux-toolkit.js.org/) com `createSlice`, `createAsyncThunk` e `react-redux`. |
| Estilização | [Tailwind CSS 4](https://tailwindcss.com/) para utilitários responsivos. |
| API | [MockAPI](https://mockapi.io/) para persistir tarefas. Repositório inclui `json-server` para uso local opcional. |

### Fluxo de dados
1. O componente `TodoList` solicita as tarefas via `fetchTodos` quando montado.
2. As ações assíncronas (`addTodoAsync`, `toggleTodoAsync`, `removeTodoAsync`, `updateTodoAsync`) comunicam com a API.
3. O slice `todosSlice` atualiza `items`, `loading` e `error` conforme o ciclo de vida das promises.
4. O `Provider` do Redux envolve toda a aplicação em `src/app/layout.js`, garantindo acesso global ao estado.

---

## 🔌 Endpoints da API
- **Base remota (MockAPI)**: `https://68c9e429ceef5a150f664615.mockapi.io/todos`
  - `GET /todos` – Lista todas as tarefas.
  - `POST /todos` – Cria uma tarefa (`{ text, completed }`).
  - `PUT /todos/:id` – Atualiza texto ou status.
  - `DELETE /todos/:id` – Remove tarefa.
- **API local opcional** (via `json-server`): execute `npm run api` para subir em `http://localhost:4000/todos` usando o arquivo `db.json` incluído.

> Ajuste o arquivo `src/features/todos/todosSlice.js` caso queira apontar para a API local durante o desenvolvimento.

---

## ✅ Pré-requisitos
- Node.js 18.17 ou superior.
- npm 9+ (ou compatível com sua versão do Node).

---

## 🛠️ Como rodar localmente
```bash
# Clone o repositório
git clone https://github.com/ThomazRM/To-do-App.git

# Entre na pasta
cd To-do-App

# Instale as dependências
npm install

# (Opcional) Suba a API local em outro terminal
npm run api

# Inicie o servidor de desenvolvimento
npm run dev
```
A aplicação ficará disponível em `http://localhost:3000`.

---

## 📂 Estrutura do projeto
```
src/
├── app/
│   ├── layout.js        # Provider do Redux e estilos globais
│   └── page.js          # Entrada principal com o componente TodoList
├── features/
│   └── todos/
│       ├── TodoList.js  # UI e interações
│       └── todosSlice.js# Lógica de estado e chamadas à API
└── store/
    └── store.js         # Configuração do Redux Toolkit
```

---


Desenvolvido para estudos e aprimoramento contínuo.
