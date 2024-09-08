import React, { useState } from "react";
import { cardio } from "ldrs";
import { square } from "ldrs";
import Swal from 'sweetalert2'

const Task = ({ job: { id, task, isDone }, removeTask, doneTask }) => {
  const [delloading, setDelLoading] = useState(false);
  const [doneLoading, setDoneLoading] = useState(false);

  cardio.register();
  square.register();

  const handleRemoveTask = async () => {
    if (confirm("Are you sure want to delete ?")) {
      setDelLoading(true);
      await removeTask(id);
      setDelLoading(false);
    }
  };
  const handleDoneTask = async () => {
    setDoneLoading(true);
    await doneTask(id, isDone);
    setDoneLoading(false);
  };
  return (
    <div className=" text-slate-50 flex justify-between items-center border-2 border-slate-300 p-3 rounded-lg mb-3 last:mb-0">
      <div className=" flex items-center gap-3">
        {doneLoading ? (
          <l-square
            size="15"
            stroke="3"
            stroke-length="0.25"
            bg-opacity="0.1"
            speed="1.2"
            color="white"
          ></l-square>
        ) : (
          <input
            type="checkbox"
            onChange={handleDoneTask}
            checked={isDone}
            className="size-4"
          />
        )}
        <p className={isDone ? "line-through" : ""}>{task}</p>
      </div>
      <button
        onClick={handleRemoveTask}
        className="text-sm bg-red-100 border-2  border-red-100  rounded-lg py-2 text-red-700 px-4"
      >
        {delloading ? (
          <div className="flex gap-1">
            <p>Deleting...</p>
            <l-cardio size="20" stroke="4" speed="2" color="red"></l-cardio>
          </div>
        ) : (
          "Delete"
        )}
      </button>
    </div>
  );
};

export default Task;
