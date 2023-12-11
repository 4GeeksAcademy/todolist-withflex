import { useState } from "react";
import "./App.css";

export default function App() {
  {
    /*For a useState: todos is getter, setTodos is setter */
  }
  const [todos, setTodos] = useState([
    {
      id: 1,
      task: "Enter your To-Do Above",
      done: false,
    },
  ]);

  const [newTodos, setNewTodos] = useState("");

  {/* Added "else if" statement to apply window.confirm to prompt confirmation of adding blank To-Do
and set task to "" to enter blank To-Do */}
  const addTodo = (text) => {
    if (text) {
      const newTodoListForAddTodo = [
        ...todos,
        { id: todos.length + 1, task: text, done: false },
      ];
      setTodos(newTodoListForAddTodo);
      setNewTodos("");
    } else if (
      window.confirm(
        "You did not enter any text. Do you still want to add a blank item?"
      )
    ) {
      const newTodoListForAddTodo = [
        ...todos,
        { id: todos.length + 1, task: "", done: false },
      ];
      setTodos(newTodoListForAddTodo);
    }
  };

  /* Added "if" statement to apply window.confirm to prompt confirmation of deleting To-Do */
  const deleteTodo = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const newTodoListForDeleteTodo = todos.filter((item) => item.id != id);
      setTodos(newTodoListForDeleteTodo);
    }
  };

  const updateTodoText = (id, task) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, task };
      } else {
        return todo;
      }
    });
    setTodos(newTodos);
  };

  const updateCheckboxStatus = (id, checked) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done: checked };
        } else {
          return todo;
        }
      })
    );
  };

  /* Created preventDefault variable since there is no backend for form*/
  /* prettier-ignore */
  const preventDefault = (e) => {e.preventDefault()};

  return (
    <>
      <div className="todoListContainer">
        <h3>To-Do List {"-->"}</h3>
        <div className="newTodoContainer">
          {/* Wrapped input and button inside Form tag to make the input field work with the enter key */}
          <form onSubmit={preventDefault}>
            <input
              value={newTodos}
              placeholder="Enter Text Here"
              onChange={(event) => setNewTodos(event.target.value)}
            />
            <button onClick={() => addTodo(newTodos)} className="addButton">
              Add
            </button>
          </form>
        </div>

        <ul className="todoList">
          {todos.map((item) => {
            return (
              <li
                key={item.id}
                className={`todoListItem ${item.done ? "checkedBoxStyle" : ""}`}
              >
                <input
                  type="checkbox"
                  value={item.done}
                  onChange={(event) =>
                    updateCheckboxStatus(item.id, event.target.checked)
                  }
                />
                {/* Replaced below Span tag with Input tag to make the created To-Do modifiable */}
                {/* prettier-ignore */}
                <input
                  /* Added conditional operator to className to add striketext css value to Input Text if checkbox is checked */
                  type="text"
                  className={`todoContent ${item.done ? 'checkedBoxText' : ''}`}
                  value={item.task}
                  onChange={(event) => updateTodoText(item.id, event.target.value)}
                  disabled={item.done}
                  />
                {/* prettier-ignore */}
                <button
                /* Add disabled attribute to button to disable Delete button if checkbox is checked */
                  onClick={() => deleteTodo(item.id)}
                  className={`deleteButton ${item.done ? "checkedBoxStyle" : ""}`}
                  disabled={item.done}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export function Todo() {}
