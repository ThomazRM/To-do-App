"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTodos,
  addTodoAsync,
  toggleTodoAsync,
  removeTodoAsync,
  updateTodoAsync
} from "./todosSlice";

export default function TodoList() {
  const [input, setInput] = useState("");
  const { items: todos, loading, error } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAdd = () => {
    if (input.trim()) {
      dispatch(addTodoAsync(input));
      setInput("");
    }
  };

  const [filter, setFilter] = useState("all"); // "all" | "pending" | "completed"
  const [filterLoading, setFilterLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "pending") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // "all"
  });

  const fetchFilteredTodos = async (filterType) => {
    if (filterType === filter) return;

    setFilterLoading(true);

    try {
      // Simula uma chamada de API para buscar todos filtrados
      console.log(`Buscando todos com filtro: ${filterType}`);

      // Simula delay de rede
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Em uma implementação real, você faria:
      // const response = await fetch(`http://localhost:4000/todos?completed=${filterType === 'completed'}`);
      // const data = await response.json();

      setFilter(filterType);
      console.log(`Filtro aplicado: ${filterType}`);
    } catch (error) {
      console.error("Erro ao aplicar filtro:", error);
    } finally {
      setFilterLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">
        Lista de tarefas
      </h2>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite uma tarefa..."
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Adicionar
        </button>
      </div>

      {/*  carregamento */}
      {(loading || filterLoading) && (
        <p className="text-gray-500 mt-4 text-center">Carregando...</p>
      )}

      {/*  erro */}
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      <div className="flex gap-2 justify-center mt-4">
        <button
          onClick={() => fetchFilteredTodos("all")}
          disabled={filterLoading}
          className={`px-3 py-1 rounded transition-all ${
            filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
          } ${
            filterLoading ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => fetchFilteredTodos("pending")}
          disabled={filterLoading}
          className={`px-3 py-1 rounded transition-all ${
            filter === "pending" ? "bg-blue-600 text-white" : "bg-gray-200"
          } ${
            filterLoading ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
          }`}
        >
          Pendentes
        </button>
        <button
          onClick={() => fetchFilteredTodos("completed")}
          disabled={filterLoading}
          className={`px-3 py-1 rounded transition-all ${
            filter === "completed" ? "bg-blue-600 text-white" : "bg-gray-200"
          } ${
            filterLoading ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
          }`}
        >
          Concluídas
        </button>
      </div>

      <ul className="mt-6 space-y-3">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-2"
          >
            {editingId === todo.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    dispatch(updateTodoAsync({ id: todo.id, text: editText }));
                    setEditingId(null);
                  }
                }}
                className="flex-1 border px-2 py-1 rounded mr-2"
                autoFocus
              />
            ) : (
              <span
                onClick={() => dispatch(toggleTodoAsync(todo.id))}
                className={`flex-1 cursor-pointer ${
                  todo.completed
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                }`}
              >
                {todo.text}
              </span>
            )}

            <div className="flex gap-2">
              {editingId === todo.id ? (
                <button
                  onClick={() => {
                    dispatch(updateTodoAsync({ id: todo.id, text: editText }));
                    setEditingId(null);
                  }}
                  className="text-green-500 hover:text-green-700 transition"
                >
                  💾
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditingId(todo.id);
                    setEditText(todo.text);
                  }}
                  className="text-blue-500 hover:text-blue-700 transition"
                >
                  ✏️
                </button>
              )}

              <button
                onClick={() => dispatch(removeTodoAsync(todo.id))}
                className="text-red-500 hover:text-red-700 transition"
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
