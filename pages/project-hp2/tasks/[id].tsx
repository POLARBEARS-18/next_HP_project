import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import useSWR from 'swr';
import Layout from '../../../components/project-hp2/Layout';
import { getAllTaskIds, getTaskData, Project2TaskType } from '../../../lib/project-hp2/tasks';

interface TaskStaticProps {
  params: Project2TaskType;
}

type TaskId = Pick<Project2TaskType, 'id'>;

interface StaticTask extends TaskId {
  staticTask: Project2TaskType;
}

export const getStaticPaths = async () => {
  const paths = await getAllTaskIds();

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }: TaskStaticProps) => {
  const { task: staticTask } = await getTaskData(params.id);
  return {
    props: {
      id: staticTask.id,
      staticTask,
    },
    revalidate: 3,
  };
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/`;

const Post: FC<StaticTask> = ({ staticTask, id }) => {
  const router = useRouter();
  const { data: task, mutate } = useSWR<Project2TaskType>(`${apiUrl}${id}`, fetcher, {
    fallbackData: staticTask,
  });

  // キャッシュを更新
  useEffect(() => {
    void mutate();
  }, [mutate]);

  if (router.isFallback || !task) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title={task.title}>
      <p className="m-4">
        {'ID : '}
        {task.id}
      </p>
      <p className="mb-4 text-xl font-bold">{task.title}</p>
      <p className="px-12"> {task.created_at}</p>
      <Link href="/project-hp2/task-page">
        <div className="flex cursor-pointer mt-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="mr-3 w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
          </svg>
          <span>Back to blog-page</span>
        </div>
      </Link>
    </Layout>
  );
};

export default Post;
