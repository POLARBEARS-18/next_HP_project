import postJson from './posts.json';

const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

export type PostType = typeof postJson;

export const getAllPostsData = async () => {
  const res = await fetch(new URL(apiUrl));
  const posts = (await res.json()) as PostType[];
  return posts;
};

export const getAllPostIds = async () => {
  const res = await fetch(new URL(apiUrl));
  const posts = (await res.json()) as PostType[];

  return posts.map((post) => ({
    params: {
      id: String(post.id),
    },
  }));
};

export const getPostData = async (id: number) => {
  const res = await fetch(new URL(`${apiUrl}/${id}/`));
  const post = (await res.json()) as PostType;

  return {
    post,
  };
};
