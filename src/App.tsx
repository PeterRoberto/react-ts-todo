import { useState } from "react";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Modal from "./components/Modal";

// Interface
import type { ITask } from "./interfaces/Task";

function App() {
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const deleteTask = (id: number) => {
    setTaskList(
      taskList.filter(task => {
        return task.id !== id
      })
    )
  }

  const editTask = (task: ITask): void => {
    setOpen(true);
    setTaskToUpdate(task);
  }

  const updateTask = (id: number, title: string, difficulty: number) => {
    const updatedTask: ITask = {id, title, difficulty};

    const updatedItems = taskList.map((task) => {
      return task.id === updatedTask.id ? updatedTask : task;
    })

    setTaskList(updatedItems);
    setOpen(false);
  }

  return (   
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-[100px]">
        <section className="middle-content flex-1">
          <TaskForm btnText="Criar tarefa" taskList={taskList} setTaskList={setTaskList} />
          <TaskList taskList={taskList} deleteTask={deleteTask} editTask={editTask} setOpen={setOpen} />
        </section>
      </main>
      <Footer />
      <Modal 
        open={open} 
        setOpen= {setOpen} 
        children={
          <TaskForm 
            btnText="Editar tarefa" 
            taskList={taskList}
            task={taskToUpdate}
            handleUpdate={updateTask}
          />
        }
      />
    </div>
  )
}

export default App
