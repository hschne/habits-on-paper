import { useState } from "react";
import "./App.css";

let nextId = 0;

function App() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [icon, setIcon] = useState("");

  const [habits, setHabits] = useState([]);

  const Wizard = () => {
    return (
      <>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <select
          value={icon} // ...force the select's value to match the state variable...
          onChange={(e) => setIcon(e.target.value)} // ... and update the state variable on any change!
        >
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="orange">Orange</option>
        </select>
        <button
          onClick={() => {
            setHabits([
              ...habits,
              {
                id: nextId++,
                name: name,
                description: description,
                color: color,
                icon: icon,
              },
            ]);
          }}
        >
          Add
        </button>
      </>
    );
  };

  const Habit = (habit) => {
    return (
      <li key={habit.id}>
        <h2>{habit.name}</h2>
        <p>{habit.description}</p>
        <p>{habit.color}</p>
        <p>{habit.icon}</p>
        {Grid()}
        <button
          onClick={() => {
            setHabits(habits.filter((a) => a.id !== habit.id));
          }}
        >
          Edit
        </button>
        <button
          onClick={() => {
            setHabits(habits.filter((a) => a.id !== habit.id));
          }}
        >
          Delete
        </button>
      </li>
    );
  };

  const Grid = () => {
    return (
      <div className="grid-container">
        <div className="grid-wrapper">
          {Array.from({ length: 7 }, (_, rowIndex) => (
            <div key={`row-${rowIndex}`} className="grid-row">
              {Array.from({ length: 52 }, (_, colIndex) => (
                <div
                  key={`cell-${rowIndex}-${colIndex}`}
                  className="grid-box"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const Header = () => {
    return (
      <header>
        <a href="#" className="logo">
          LOGO
        </a>

        <ul className="links">
          <li>
            <a href="#">GitHub</a>
          </li>
          <li>
            <a href="about">About</a>
          </li>
        </ul>
      </header>
    );
  };

  return (
    <>
      <Header />
      {Wizard()}
      <ul>{habits.map((habit) => Habit(habit))}</ul>
    </>
  );
}

export default App;
