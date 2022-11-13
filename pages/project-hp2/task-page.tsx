import Link from 'next/link';
import { FC, useEffect } from 'react';
import useSWR from 'swr';
import Layout from '../../components/project-hp2/Layout';
import Task from '../../components/project-hp2/Task';
import TaskFrom from '../../components/project-hp2/TaskFrom';
import StateContextProvider from '../../context/StateContext';
import { getAllTaskData, Project2TaskType } from '../../lib/project-hp2/tasks';

interface getStaticTaskPage {
  staticFilteredTasks: Project2TaskType[];
}

export const getStaticProps = async () => {
  const staticFilteredTasks = await getAllTaskData();

  return {
    props: {
      staticFilteredTasks,
    },
    revalidate: 3,
  };
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`;

const TaskPage: FC<getStaticTaskPage> = ({ staticFilteredTasks }) => {
  const { data: tasks, mutate } = useSWR<Project2TaskType[]>(apiUrl, fetcher, {
    fallbackData: staticFilteredTasks,
  });

  const filteredTasks = tasks?.sort((a, b) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf());

  // キャッシュを更新
  useEffect(() => {
    void mutate();
  }, [mutate]);

  return (
    <StateContextProvider>
      <Layout title="Blog page">
        <TaskFrom taskCreated={mutate} />
        <ul>{filteredTasks && filteredTasks.map((task) => <Task key={task.id} task={task} taskDeleted={mutate} />)}</ul>

        <Link href="/project-hp2/main-page">
          <div className="flex cursor-pointer mt-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 mr-3"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
            <span>Back to main page</span>
          </div>
        </Link>
      </Layout>
    </StateContextProvider>
  );
};

export default TaskPage;
