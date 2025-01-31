import { useState } from "react";
import {
  Printer,
  CirclePlus,
  Settings,
  BookOpenText,
  Pencil,
  Camera,
  Dumbbell,
  Trash,
} from "lucide-react";
import Logo from "./assets/logo.svg";
import "./App.css";
import "./variables.css";

let nextId = 0;

function App() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [icon, setIcon] = useState("");

  const [habits, setHabits] = useState([
    {
      name: "Workout",
      description: "Work on those muscles!",
      icon: Dumbbell,
      color: "",
    },
    {
      name: "Photography",
      description: "Take a nice picture every day.",
      icon: Camera,
      color: "",
    },
    {
      name: "Reading",
      description: "At least fifteen minutes of reading.",
      icon: BookOpenText,
      color: "",
    },
  ]);

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
    const Icon = habit.icon;
    return (
      <li className="habit" key={habit.id}>
        <div className="habit__header">
          <Icon className="habit__icon" color="currentColor" strokeWidth="2" />
          <div className="habit__text">
            <h2>{habit.name}</h2>
            <p>{habit.description}</p>
          </div>
          <div className="habit__buttons">
            <button
              onClick={() => {
                setHabits(habits.filter((a) => a.id !== habit.id));
              }}
            >
              <Pencil size={24} color="currentColor" />
              Edit
            </button>
            <button
              onClick={() => {
                setHabits(habits.filter((a) => a.id !== habit.id));
              }}
            >
              <Trash size={24} color="currentColor" />
              Delete
            </button>
          </div>
        </div>
        {Grid()}
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
                  style={{
                    backgroundColor: "var(--color-grey-200)",
                    border: "2px solid #0e0e0e",
                  }}
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
        <div className="logoText">
          <a href="#" className="logo">
            <Logo></Logo>
          </a>
          <p>Create beautiful printouts for tracking your habits</p>
        </div>

        <ul className="links">
          <li>
            <button onClick={() => {}}>
              <CirclePlus size={24} color="currentColor" />
              Add
            </button>
          </li>
          <li>
            <button onClick={() => {}}>
              <Settings size={24} color="currentColor" />
              Settings
            </button>
          </li>
          <li>
            <button onClick={() => {}}>
              <Printer size={24} color="currentColor" />
              Print
            </button>
          </li>
        </ul>
      </header>
    );
  };

  return (
    <>
      <Header />
      <ul className="habits">{habits.map((habit) => Habit(habit))}</ul>
    </>
  );
}

export default App;
