import React, { useEffect, useState } from "react";
import Heading from "./components/Heading";
import CreateTask from "./components/CreateTask";
import TaskList from "./components/TaskList";
import SkeletonLoader from "./components/SkeletonLoader";
import Navbar from "./Navbar";

const App = () => {
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  

  const addTask = async (newTask) => {
    setSending(true);

    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
    const data = await res.json();
    console.log(data);
    setTask([...task, data]);
    setSending(false);
  };

  const fetchTask = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    setTask(data);
    setLoading(false);
  };
  const removeTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    const data = await res.text();

    // console.log(data);

    setTask(task.filter((task) => task.id !== id));
  };
  const doneTask = async (id, currentState) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isDone: !currentState }),
    });

    const data = await res.json();

    console.log(data);

    setTask(task.map((task) => (task.id === id ? data : task)));
  };

  useEffect(() => {
    fetchTask();
  }, []);
  return (
    <div className="min-h-screen items-center justify-center p-5 bg-sky-950">
      <Navbar/>
      <Heading />
      <CreateTask addTask={addTask} sending={sending} />
      <TaskList task={task} removeTask={removeTask} doneTask={doneTask} />
      {loading && <SkeletonLoader/>
        }
    </div>
  );
};

export default App;
