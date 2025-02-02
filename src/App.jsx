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
  Brain,
  Coffee,
  Code,
  Compass,
  Gamepad2,
  Heart,
  Laptop,
  Leaf,
  Palette,
  PenTool,
  Bike,
  Soup,
  Sun,
  Swords,
  Target,
  Trees,
  Trophy,
  Zap,
} from "lucide-react";
import { COLORS } from "./Colors";
import logo from "./assets/logo.svg";
import "./HabitModal.css";
import "./IconPicker.css";
import "./App.css";
import "./variables.css";

let nextId = 0;

function App() {
  const [editingHabit, setEditingHabit] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    description: "",
  });
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

    // Reset errors
    setErrors({
      name: "",
      description: "",
    });

    // Validate inputs
    let hasErrors = false;
    const newErrors = {
      name: "",
      description: "",
    };

    if (!name.trim()) {
      newErrors.name = "Name is required";
      hasErrors = true;
    } else if (name.length > 30) {
      newErrors.name = "Name must be less than 30 characters";
      hasErrors = true;
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
      hasErrors = true;
    } else if (description.length > 100) {
      newErrors.description = "Description must be less than 100 characters";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    // If validation passes, save the habit
    handleSaveHabit({
      name,
      description,
      color,
      icon: eval(icon),
    });
  };

  const icons = {
    Dumbbell,
    Camera,
    BookOpenText,
    Pencil,
    Brain,
    Coffee,
    Code,
    Compass,
    Gamepad2,
    Heart,
    Laptop,
    Leaf,
    Palette,
    PenTool,
    Bike,
    Soup,
    Sun,
    Swords,
    Target,
    Trees,
    Trophy,
    Zap,
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
    setModalOpen(false);
    setEditingHabit(null);
  };

  const handleEditHabit = (habit) => {
    setEditingHabit(habit);
    setName(habit.name);
    setDescription(habit.description);
    setColor(habit.color);
    setIcon(Object.keys(icons).find((key) => icons[key] === habit.icon));
    setModalOpen(true);
  };

  // Update handleAddHabit
  const handleAddHabit = () => {
    setEditingHabit(null);
    setName("");
    setDescription("");
    setColor(COLORS.SLATE);
    setIcon("Dumbbell");
    setModalOpen(true);
  };

  const handleDeleteHabit = (habitId) => {
    setHabits(habits.filter((h) => h.id !== habitId));
  };
  const HabitModal = () => {
    return (
      <dialog
        open={modalOpen}
        className="habit-modal"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setModalOpen(false);
          }
        }}
      >
        <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
          <h2>{editingHabit ? "Edit Habit" : "New Habit"}</h2>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? "error" : ""}
              required
            />
            {errors.name && (
              <span className="error-message">{errors.name}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={errors.description ? "error" : ""}
              required
            />
            {errors.description && (
              <span className="error-message">{errors.description}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="icon">Icon</label>
            <div className="icon-options">
              {Object.entries(icons).map(([iconName, IconComponent]) => (
                <label key={iconName} className="icon-option">
                  <input
                    type="radio"
                    name="icon"
                    value={iconName}
                    checked={icon === iconName}
                    onChange={(e) => setIcon(e.target.value)}
                  />
                  <span className="icon-preview">
                    <IconComponent size={24} />
                    <span className="icon-name">{iconName}</span>
                  </span>
                </label>
              ))}
            </div>
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
            <button type="button" onClick={() => setModalOpen(false)}>
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
