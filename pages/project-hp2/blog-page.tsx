import Link from 'next/link';
import { FC } from 'react';
import Layout from '../../components/project-hp2/Layout';
import Post from '../../components/project-hp2/Post';
import { getAllPostsData, Project2PostType } from '../../lib/project-hp2/posts';

interface getStaticBlogPage {
  filteredPosts: Project2PostType[];
}

export const getStaticProps = async () => {
  const filteredPosts = await getAllPostsData();
  return {
    props: {
      filteredPosts,
    },
    revalidate: 3,
  };
};

const BlogPage: FC<getStaticBlogPage> = ({ filteredPosts }) => (
  <Layout title="Blog page">
    <ul>{filteredPosts && filteredPosts.map((post) => <Post key={post.id} post={post} />)}</ul>
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
);

export default BlogPage;
