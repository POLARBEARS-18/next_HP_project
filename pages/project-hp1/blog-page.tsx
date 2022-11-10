import Layout from '../../components/Layout';
import Post from '../../components/Post';
import { getAllPostsData, PostType } from '../../lib/posts';

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
    <ul className="m-10">{posts && posts.map((post) => <Post key={post.id} post={post} />)}</ul>
  </Layout>
);

export default Blog;
