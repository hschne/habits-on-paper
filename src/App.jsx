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
        <button
          onClick={() => {
            setHabits([...habits, { id: nextId++, name: name }]);
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
        {Grid()}
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

  return (
    <>
      {Wizard()}
      <ul>{habits.map((habit) => Habit(habit))}</ul>
    </>
  );
}

export default App;
