import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Buscar tarefas
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const res = await fetch("https://68c9e429ceef5a150f664615.mockapi.io/todos");
  return res.json();
});

export const updateTodoAsync = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, text }) => {
    const resGet = await fetch(`https://68c9e429ceef5a150f664615.mockapi.io/todos/${id}`);
    const todo = await resGet.json();

    const res = await fetch(`https://68c9e429ceef5a150f664615.mockapi.io/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...todo, text }),
    });

    return res.json();
  }
);

// Adicionar tarefa
export const addTodoAsync = createAsyncThunk("todos/addTodo", async (text) => {
  const res = await fetch("https://68c9e429ceef5a150f664615.mockapi.io/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, completed: false }),
  });
  return res.json();
});

// Remover tarefa
export const removeTodoAsync = createAsyncThunk(
  "todos/removeTodo",
  async (id) => {
    await fetch(`https://68c9e429ceef5a150f664615.mockapi.io/todos/${id}`, { method: "DELETE" });
    return id;
  }
);

// Alternar concluído
export const toggleTodoAsync = createAsyncThunk(
  "todos/toggleTodo",
  async (id) => {
    const resGet = await fetch(`https://68c9e429ceef5a150f664615.mockapi.io/todos/${id}`);
    const todo = await resGet.json();
    const res = await fetch(`https://68c9e429ceef5a150f664615.mockapi.io/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...todo, completed: !todo.completed }),
    });
    return res.json();
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.loading = false;
        state.error = "Erro ao carregar tarefas.";
      })

      // ADD
      .addCase(addTodoAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addTodoAsync.rejected, (state) => {
        state.loading = false;
        state.error = "Erro ao adicionar tarefa.";
      })

      // REMOVE
      .addCase(removeTodoAsync.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload);
      })

      // TOGGLE
      .addCase(toggleTodoAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })

      .addCase(updateTodoAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      });
  },
});

export default todosSlice.reducer;
