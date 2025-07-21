import "./App.css";
import TodoList from "./Components/Pages/TodoList";
import { TodosContext } from "./Components/Contexts/todosContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const initialTodos = [
  {
    id: uuidv4(),
    title: "Reding a Book",
    details: "this is the difference",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Reding a  lettre",
    details: "this is the difference",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Reding a Book",
    details: "this is the difference",
    isCompleted: false,
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);
  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#032464ff",
        height: "100vh",
        direction: "rtl",
      }}
    >
      <TodosContext.Provider value={{ todos, setTodos }}>
        <TodoList />
      </TodosContext.Provider>
    </div>
  );
}

export default App;
