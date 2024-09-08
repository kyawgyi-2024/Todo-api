import React, { useState } from "react";
import { lineSpinner } from "ldrs";

const CreateTask = ({ addTask, sending }) => {
  const [job, setJob] = useState("");
  lineSpinner.register();

  const handleOnChange = (event) => {
    setJob(event.target.value);
  };

  const handleAddTaskBtn = () => {
    if (job.trim()) {
      const newTask = {
        task: job,
        isDone: false,
      };
      addTask(newTask);
      setJob("");
    } else {
      alert("Please enter a task !");
    }
  };
  return (
    <div className="  rounded-lg flex mt-5 mb-3 bg-slate-400">
      <input
        type="text"
        className=" text-slate-50 bg-gray-700 flex-grow disabled:bg-gray-50 disabled:opacity-50 border-2 border-slate-300  rounded-l-lg p-2"
        value={job}
        onChange={handleOnChange}
        disabled={sending}
        placeholder="Write your new task"
      />
      <button
        onClick={handleAddTaskBtn}
        disabled={sending}
        className=" bg-slate-500 text-slate-50 border-2 disabled:opacity-50 border-slate-300  rounded-r-lg py-2 px-4"
      >
        {sending ? (
          <div className="flex gap-1">
            <p>Sending...</p>
            <l-line-spinner
            size="20"
            stroke="3"
            speed="1"
            color="black"
          ></l-line-spinner>
          </div>
        ) : (
          "Add Task"
        )}
      </button>
    </div>
  );
};

export default CreateTask;

