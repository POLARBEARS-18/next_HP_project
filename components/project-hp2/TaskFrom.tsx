import { FC, FormEvent, useContext } from 'react';
import { KeyedMutator } from 'swr';
import Cookies from 'universal-cookie';
import { StateContext } from '../../context/StateContext';
import { Project2TaskType } from '../../lib/project-hp2/tasks';

interface TaskFromProps {
  taskCreated: KeyedMutator<Project2TaskType[]>;
}

const cookie = new Cookies();
const apiBaseUrl = process.env.NEXT_PUBLIC_RESTAPI_URL;

const TaskFrom: FC<TaskFromProps> = ({ taskCreated }) => {
  const { selectedTask, setSelectedTask } = useContext(StateContext);

  const create = async (e: FormEvent<HTMLFormElement>) => {
    const getCookie = cookie.get('access_token') as string;

    e.preventDefault();
    await fetch(`${apiBaseUrl}api/tasks/`, {
      method: 'POST',
      body: JSON.stringify({ title: selectedTask.title }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${getCookie}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        alert('JWT Token not valid');
      }
    });
    setSelectedTask({ id: 0, title: '' });
    void taskCreated();
  };

  const update = async (e: FormEvent<HTMLFormElement>) => {
    const getCookie = cookie.get('access_token') as string;

    e.preventDefault();
    await fetch(`${apiBaseUrl}api/tasks/${selectedTask.id}/`, {
      method: 'PUT',
      body: JSON.stringify({ title: selectedTask.title }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${getCookie}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        alert('JWT Token not valid');
      }
    });
    setSelectedTask({ id: 0, title: '' });
    void taskCreated();
  };

  return (
    <div>
      <form onSubmit={selectedTask.id !== 0 ? update : create}>
        <input
          value={selectedTask.title}
          onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })}
          type="text"
          className="text-black mb-8 px-2 py-1"
        />
        <button type="submit" className="bg-gray-500 ml-2 hover:bg-gray-600 text-sm px-2 py-1 rounded uppercase">
          {selectedTask.id !== 0 ? 'update' : 'create'}
        </button>
      </form>
    </div>
  );
};

export default TaskFrom;
