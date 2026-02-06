// Interface
import type { ITask } from "../interfaces/Task"

// Icons
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";


type Props = {
  taskList: ITask[];
  deleteTask(id: number): void;
  editTask(task: ITask): void;
  setOpen(value: boolean): void;
}

const TaskList = ({ taskList, deleteTask, editTask }: Props) => {
  return (
    <>
    <div className="flex min-h-full flex-col justify-center px-6 pb-12 lg:px-8">
      {taskList.length > 0 ? (
        <>
        <h2 className="font-bold text-center text-2xl">Suas tarefas:</h2>
        {taskList.map((task) => (
          <div key={task.id} className="border-b-1 pb-5 mb-5 flex  justify-between mt-5 w-full w-sm sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex justify-center flex-col">
              <h4 className="mb-2 font-bold text-xl">{task.title}</h4>
              <p className="">Dificuldade: {task.difficulty}</p>
            </div>
            <div className=" ml-2">
              <span 
                className="cursor-pointer w-[30px] mb-2 h-[35px] flex justify-center items-center bg-black"
                onClick={() => editTask(task)}
              >
                <PencilSquareIcon className="h-6 w-6 text-white" />
              </span>
              <span 
                className="cursor-pointer w-[30px] h-[35px] flex justify-center items-center bg-black"
                onClick={() => deleteTask(task.id)}
              >
                <TrashIcon className="h-6 w-6 text-white" />
              </span>
            </div>
          </div>
        ))}
        </>
      ) : (
        <p className="text-center mb-10">Não há tarefas cadastradas...</p>
      )}
    </div>
    </>
  )
}

export default TaskList