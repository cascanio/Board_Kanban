import React, { useState } from "react";
import "./styles.css";

import Navbar from "./components/Navbar/Navbar";
import Tasklist from "./components/Tasklist/Tasklist";

let idAcc = 0;
const generateId = () => {
  idAcc = idAcc + 1;
  return idAcc;
};

const imgbg = require("../src/img/HappyPlanner.jpg");

const divStyle = {
  width: "100%",
  height: "100%",
  backgroundImage: `url(${imgbg})`,
  backgroundSize: "cover"
};

export default function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (title, state) => {
    const newTask = {
      id: generateId(),
      title,
      state
    };
    setTasks((existingTasks) => {
      return [...existingTasks, newTask];
    });
  };

  const updateTask = (id, title, state) => {
    setTasks((existingTasks) => {
      return existingTasks.map((task) => {
        if (task.id === id) {
          return { ...task, title, state };
        } else {
          return task;
        }
      });
    });
  };

  const deleteTask = (id) => {
    setTasks((existingTasks) => {
      return existingTasks.filter((task) => task.id !== id);
    });
  };

  return (
    <div className="App" style={divStyle}>
      <Navbar />
      <div className="container">
        <Tasklist
          title="New Request"
          onAddTask={addTask}
          taskState="Pending"
          tasks={tasks.filter((t) => t.state === "Pending")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
        <Tasklist
          title="In Progress"
          onAddTask={addTask}
          taskState="In Progress"
          tasks={tasks.filter((t) => t.state === "InProgress")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
        <Tasklist
          title="Done"
          onAddTask={addTask}
          taskState="Done"
          tasks={tasks.filter((t) => t.state === "Done")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
      </div>
    </div>
  );
}
