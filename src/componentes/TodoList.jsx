import React, { useState, useEffect } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodoDescription, setNewTodoDescription] = useState("");

  const handleAddTodo = () => {
    if (newTodoDescription.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        description: newTodoDescription.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setNewTodoDescription("");
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodoDescription = (id, newDescription) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, description: newDescription } : todo
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

  // Guardar tareas en el localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Recuperar tareas del localStorage al cargar el componente
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []); // <- Deja el arreglo de dependencias vacío para que se ejecute solo una vez al cargar el componente

  return (
    <div className="App">
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="text"
              value={todo.description}
              onChange={(e) => handleEditTodoDescription(todo.id, e.target.value)}
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
          value={newTodoDescription}
          onChange={(e) => setNewTodoDescription(e.target.value)}
          placeholder="Ingrese una nueva tarea"
        />
        <button onClick={handleAddTodo}>Nueva Tarea</button>
      </div>
    </div>
  );
}

export default TodoList;