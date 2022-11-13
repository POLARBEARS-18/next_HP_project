import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';
import Layout from '../../components/project-hp2/Layout';

const cookie = new Cookies();

const MainPage = () => {
  const router = useRouter();
  const logout = () => {
    cookie.remove('access_token', { path: '/' });
    void router.push('/');
  };
  return (
    <Layout title="Main page">
      <div className="mb-10">
        <Link href="/project-hp2/blog-page" legacyBehavior>
          <a className="bg-indigo-500 mr-8 hover:bg-indigo-600 text-white px-4 py-12 rounded">
            Visit Blog by SSG + ISR
          </a>
        </Link>
        <Link href="/project-hp2/task-page" legacyBehavior>
          <a className="bg-gray-500 mr-8 hover:bg-gray-600 text-white px-4 py-12 rounded">Visit Blog by SSG + ISR</a>
        </Link>
      </div>
      {/* <Image
        onClick={logout}
        src="/logout.svg"
        alt="logout"
        width={42}
        height={16}
        className="mt-10 cursor-pointer w-6 h-6"
      /> */}
      <svg
        onClick={logout}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6 mt-10 cursor-pointer"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
        />
      </svg>
    </Layout>
  );
};

export default MainPage;
