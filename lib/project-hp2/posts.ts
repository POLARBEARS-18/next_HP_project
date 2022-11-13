import postJson from './posts.json';

export type Project2PostType = typeof postJson;
const apiBaseUrl = process.env.NEXT_PUBLIC_RESTAPI_URL;

export const getAllPostsData = async () => {
  const res = await fetch(new URL(`${apiBaseUrl}api/list-post/`));
  const posts = (await res.json()) as Project2PostType[];
  const filteredPosts = posts.sort((a, b) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf());
  return filteredPosts;
};
export const getAllPostIds = async () => {
  const res = await fetch(new URL(`${apiBaseUrl}api/list-post/`));
  const posts = (await res.json()) as Project2PostType[];

  return posts.map((post) => ({
    params: {
      id: String(post.id),
    },
  }));
};

export const getPostData = async (id: number) => {
  const res = await fetch(new URL(`${apiBaseUrl}api/detail-post/${id}/`));
  const post = (await res.json()) as Project2PostType;

  return {
    post,
  };
};
