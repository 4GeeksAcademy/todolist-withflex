import { useEffect, useState } from "react";
import "./App.css";
import { db } from "../utilities/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

export default function App() {
  {
    /* The below useEffect can be reused in other projects to fetch data from database */
  }
  useEffect(() => {
    const todoReference = collection(db, "todos");
    const getData = async () => {
      const data = await getDocs(todoReference);
      const todos = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(todos);
    };
    getData();
  }, []);

  const [todos, setTodos] = useState([]);

  const [newTodos, setNewTodos] = useState("");

  const addTodo = async (task) => {
    if (!task) return;
    const todoReference = collection(db, "todos");
    await addDoc(todoReference, {
      task: task,
      done: false,
    }).then((docReference) => {
      const newTodos = [
        ...todos,
        { id: docReference.id, task: task, done: false },
      ];
      setTodos(newTodos)
    });
    {
      const newTodoListForAddTodo = [
        ...todos,
        { id: todoReference.id, task: task, done: false },
      ];
      setTodos(newTodoListForAddTodo);
      setNewTodos("");
    }
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    const newTodoListForDeleteTodo = todos.filter((item) => item.id != id);
    setTodos(newTodoListForDeleteTodo);
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
                <input
                  type="text"
                  className={`todoContent ${item.done ? "checkedBoxText" : ""}`}
                  value={item.task}
                  onChange={(event) =>
                    updateTodoText(item.id, event.target.value)
                  }
                  disabled={item.done}
                />
                <button
                  onClick={() => deleteTodo(item.id)}
                  className={`deleteButton ${
                    item.done ? "checkedBoxStyle" : ""
                  }`}
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
