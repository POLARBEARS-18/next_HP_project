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

const Blog = ({ posts }: BlogStaticProps) => {
  const a = 'a';
  return (
    <Layout title="Blog">
      <ul>{posts && posts.map((post) => <Post key={post.id} post={post} />)}</ul>
    </Layout>
  );
};

export default Blog;
