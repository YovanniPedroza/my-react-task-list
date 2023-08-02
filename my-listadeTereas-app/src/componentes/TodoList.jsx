import React, { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([
    // { id: 1, text: "Tarea 1", completed: false },
    // { id: 2, text: "Tarea 2", completed: false },
    // { id: 3, text: "Tarea 3", completed: false },
    // Agrega más tareas si lo deseas
  ]);

  const [newTodoText, setNewTodoText] = useState("");

  const handleAddTodo = () => {
    if (newTodoText.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        text: newTodoText.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setNewTodoText("");
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id, newText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const handleToggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div>
      {/* <h2>Lista de Tareas:</h2> */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="text"
              value={todo.text}
              onChange={(e) => handleEditTodo(todo.id, e.target.value)}
            />
            <button onClick={() => handleDeleteTodo(todo.id)}>Eliminar</button>
            <button onClick={() => handleToggleComplete(todo.id)}>
              {todo.completed ? "Pendiente" : "Completada"}
            </button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Ingrese una nueva tarea"
        />
        <button onClick={handleAddTodo}>Nueva Tarea</button>
      </div>
    </div>
  );
}

export default TodoList;
