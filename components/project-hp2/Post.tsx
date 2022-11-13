import Link from 'next/link';
import { Project2PostType } from '../../lib/project-hp2/posts';

export interface PostProps {
  post: Project2PostType;
}

const Post = ({ post }: PostProps) => (
  <div>
    <span>{post.id}</span>
    {' : '}
    <Link href={`/project-hp2/posts/${post.id}`}>
      <span className="cursor-pointer text-white border-b border-gray-500 hover:bg-gray-600">{post.title}</span>
    </Link>
  </div>
);

export default Post;
