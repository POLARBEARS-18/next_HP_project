import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from 'react';
import { Project2TaskType } from '../lib/project-hp2/tasks';

interface StateContextProps {
  children: ReactNode;
}

type TaskContext = Pick<Project2TaskType, 'id' | 'title'>;

interface StateContextType {
  selectedTask: TaskContext;
  setSelectedTask: Dispatch<SetStateAction<TaskContext>>;
}

// const initialState = {
//   selectedTask: {
//     id: 0,
//     title: '',
//   },
//   setSelectedTask: {
//     id: 0,
//     title: '',
//   },
// };

export const StateContext = createContext({} as StateContextType);

const StateContextProvider: FC<StateContextProps> = (props) => {
  const { children } = props;
  const [selectedTask, setSelectedTask] = useState({ id: 0, title: '' });

  return <StateContext.Provider value={{ selectedTask, setSelectedTask }}>{children}</StateContext.Provider>;
};

export default StateContextProvider;
