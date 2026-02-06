import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";

// Interface
import type { ITask } from "../interfaces/Task";

type Props = {
    btnText: string;
    taskList: ITask[];
    setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>
    task?: ITask | null;
    handleUpdate?(id: number, title: string, difficulty: number): void;
}

const TaskForm = ({btnText, taskList, setTaskList, task, handleUpdate}: Props) => {
    const [id, setId] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const [difficulty, setDifficulty] = useState<number>(0);

    useEffect(() => {
        if(task) {
            setId(task.id)
            setTitle(task.title)
            setDifficulty(task.difficulty)
        }
    }, [task]);


    const addTaskHandler: React.ComponentProps<'form'>['onSubmit'] = (e) => {
        e.preventDefault();

        if(handleUpdate) {
            handleUpdate(id, title, difficulty);
        } else {
            const id = Math.floor(Math.random() * 1000);
            const newTask: ITask = {id, title, difficulty};

            setTaskList!([...taskList, newTask]);
            setTitle('');
            setDifficulty(0);
        }

        
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === "title") {
            setTitle(e.target.value);
        } else {
           setDifficulty(parseInt(e.target.value)); 
        }
    }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 pb-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            O que você vai fazer?
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={addTaskHandler} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                        Título
                    </label>
                    <div className="mt-2">
                        <input
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Título da tarefa"
                            required
                            autoComplete="title"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            value={title || ''}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="m-0 flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                        Dificuldade
                    </label>
                </div>
                <div className="mt-2">
                    <input
                        id="difficulty"
                        name="difficulty"
                        type="text"
                        placeholder="Dificuldade da tarefa"
                        required
                        autoComplete="difficulty"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        value={difficulty || ''}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="cursor-pointer flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        value={btnText}
                    >
                        {btnText}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default TaskForm