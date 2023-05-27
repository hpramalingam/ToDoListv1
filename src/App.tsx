import { useState } from "react";
import Heading from "./components/Heading";

document.querySelector("*").style.backgroundColor = "#81b4de";

function App() {
  interface toDos {
    id: number;
    text: string;
    completed: boolean;
  }

  const [input, setInput] = useState("");
  const [list, setList] = useState<toDos[]>([
    { id: 1, text: "Become a Super Saiyan", completed: false },
    { id: 2, text: "Evade the IRS", completed: false },
  ]);

  const handleButtonClick = () => {
    let temp: toDos = { id: Date.now(), text: input, completed: false };
    setList([...list, temp]);
    setInput("");
  };

  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.body.style.backgroundColor = "#333333";
      document.querySelector("button").style.backgroundColor = "#81b4de";
      document.querySelector("*").style.backgroundColor = "#333333";
    } else {
      setTheme("light");
      document.body.style.backgroundColor = "#81b4de";
      document.querySelector("button").style.backgroundColor = "lightsalmon";
      document.querySelector("*").style.backgroundColor = "#81b4de";
    }
  };

  const handleToggle = (id: number) => {
    setList(
      list.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  return (
    <div className={`${theme}`}>
      <div className="flex items-center justify-center mt-3">
        <label className="switch">
          <input
            type="checkbox"
            id="js-theme-switch"
            className="theme-switcher"
            onChange={toggleTheme}
          ></input>
          <span className="slider round"></span>
        </label>
      </div>

      <Heading>To Do List</Heading>

      <input
        type="text"
        onChange={(e) => setInput(e.currentTarget.value)}
      ></input>
      <button className="AddButton" type="submit" onClick={handleButtonClick}>
        Add
      </button>
      <ul className="bulletless">
        {list.map((toDos) => (
          <li
            key={toDos.id}
            onClick={() => handleToggle(toDos.id)}
            style={{
              textDecoration: toDos.completed ? "line-through" : "none",
            }}
          >
            {toDos.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
