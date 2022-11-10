import Link from 'next/link';
import { PostType } from '../lib/posts';

export interface PostProps {
  post: PostType;
}

const Posts = ({ post }: PostProps) => (
  <div>
    <span>{post.id}</span>
    {' : '}
    <Link href={`/project-hp1/posts/${post.id}`}>
      <span className="cursor-pointer text-blue-500 border-b border-blue-500 hover:bg-gray-200">{post.title}</span>
    </Link>
  </div>
);

export default Posts;
