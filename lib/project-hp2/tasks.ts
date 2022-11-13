import taskJson from './tasks.json';

export type Project2TaskType = typeof taskJson;
const apiBaseUrl = process.env.NEXT_PUBLIC_RESTAPI_URL;

export const getAllTaskData = async () => {
  const res = await fetch(new URL(`${apiBaseUrl}api/list-task/`));
  const tasks = (await res.json()) as Project2TaskType[];
  const staticFilteredTasks = tasks.sort((a, b) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf());

  return staticFilteredTasks;
};

export const getAllTaskIds = async () => {
  const res = await fetch(new URL(`${apiBaseUrl}api/list-task/`));
  const tasks = (await res.json()) as Project2TaskType[];

  return tasks.map((task) => ({
    params: {
      id: String(task.id),
    },
  }));
};

export const getTaskData = async (id: number) => {
  const res = await fetch(new URL(`${apiBaseUrl}api/detail-task/${id}/`));
  const task = (await res.json()) as Project2TaskType;

  return {
    task,
  };
};
