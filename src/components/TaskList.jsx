import React from 'react'
import Task from './Task'

const TaskList = ({task,removeTask,doneTask}) => {
  return (
    <div>
    <h3 className=" font-bold font-serif text-xl mb-3 text-end mt-5 text-slate-50">
      Task List (Total {task.length}, Done{" "}
      {task.filter((el) => el.isDone).length})
    </h3>
    {task.map((el) => (
      <Task
        removeTask={removeTask}
        doneTask={doneTask}
        key={el.id}
        job={el}
      />
    ))}
  </div>
  )
}

export default TaskList