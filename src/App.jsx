import { useState, useRef } from "react";
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
import { COLORS } from "./Colors";
import logo from "./assets/logo.svg";
import "./HabitModal.css";
import "./App.css";
import "./variables.css";

let nextId = 0;

function App() {
  const [editingHabit, setEditingHabit] = useState(null);
  const modalRef = useRef(null);
  const [habits, setHabits] = useState([
    {
      id: nextId++,
      name: "Workout",
      description: "Work on those muscles!",
      icon: Dumbbell,
      color: COLORS.RED,
    },
    {
      id: nextId++,
      name: "Photography",
      description: "Take a nice picture every day.",
      icon: Camera,
      color: COLORS.BLUE,
    },
    {
      id: nextId++,
      name: "Reading",
      description: "At least fifteen minutes of reading.",
      icon: BookOpenText,
      color: COLORS.GREEN,
    },
  ]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState(COLORS.SLATE);
  const [icon, setIcon] = useState("Dumbbell");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSaveHabit({
      name,
      description,
      color,
      icon: eval(icon), // Note: Using eval here is not ideal but works for this demo
    });
  };

  const icons = {
    Dumbbell,
    Camera,
    BookOpenText,
    Pencil,
  };

  const handleSaveHabit = (habit) => {
    if (editingHabit) {
      setHabits(
        habits.map((h) =>
          h.id === editingHabit.id ? { ...habit, id: editingHabit.id } : h,
        ),
      );
    } else {
      setHabits([...habits, { ...habit, id: nextId++ }]);
    }
    modalRef.current.close();
    setEditingHabit(null);
  };

  const handleEditHabit = (habit) => {
    console.log("EDITING!");
    setEditingHabit(habit);
    setName(habit.name);
    setDescription(habit.description);
    setColor(habit.color);
    setIcon(Object.keys(icons).find((key) => icons[key] === habit.icon));
    modalRef.current.showModal();
  };

  const handleAddHabit = () => {
    console.log("ADDING!");
    setEditingHabit(null);
    setName("");
    setDescription("");
    setColor(COLORS.SLATE);
    setIcon("Dumbbell");
    modalRef.current.showModal();
  };

  const handleDeleteHabit = (habitId) => {
    setHabits(habits.filter((h) => h.id !== habitId));
  };
  const HabitModal = () => {
    return (
      <dialog ref={modalRef} className="habit-modal">
        <form onSubmit={handleSubmit}>
          <h2>{editingHabit ? "Edit Habit" : "New Habit"}</h2>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="icon">Icon</label>
            <select
              id="icon"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
            >
              {Object.keys(icons).map((iconName) => (
                <option key={iconName} value={iconName}>
                  {iconName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="color">Color</label>
            <div className="color-options">
              {Object.entries(COLORS).map(([name, value]) => (
                <label key={name} className="color-option">
                  <input
                    type="radio"
                    name="color"
                    value={value}
                    checked={color === value}
                    onChange={(e) => setColor(e.target.value)}
                  />
                  <span
                    className="color-swatch"
                    style={{ backgroundColor: value }}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={() => modalRef.current.close()}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </dialog>
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
            <button onClick={() => handleEditHabit(habit)}>
              <Pencil size={24} color="currentColor" />
              Edit
            </button>
            <button onClick={() => handleDeleteHabit(habit.id)}>
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
            <img src={logo} className="logo" alt="Habits on Paper logo" />
          </a>
          <p>Create beautiful printouts for tracking your habits</p>
        </div>

        <ul className="links">
          <li>
            <button onClick={handleAddHabit}>
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
      <HabitModal />
    </>
  );
}

export default App;
