import Layout from '../../components/project1/Layout';
import Posts from '../../components/project1/Post';
import { getAllPostsData, PostType } from '../../lib/project-hp1/posts';

interface BlogStaticProps {
  posts: PostType[];
}

export const getStaticProps = async () => {
  const posts = await getAllPostsData();
  return {
    props: {
      posts,
    },
  };
};

const Blog = ({ posts }: BlogStaticProps) => (
  <Layout title="Blog">
    <ul className="m-10">{posts && posts.map((post) => <Posts key={post.id} post={post} />)}</ul>
  </Layout>
);

export default Blog;
