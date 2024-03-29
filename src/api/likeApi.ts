import api from "./api";

const toggleLike = async (postId: string) => {
  try {
    const response = await api.post(
      `/api/v1/likes/toggle/${postId}`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log(`Error on toggling the post like, ${error}`);
  }
};

const getUserLikedPosts = async () => {
  try {
    const response = await api.get(`/api/v1/likes/user-liked`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.log(`Error on getting the user liked posts, ${error}`);
  }
};

const getPostLikesCount = async (postId: string) => {
  try {
    const response = await api.get(`/api/v1/likes/p/likes/${postId}`, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    console.log(`Error on getting the post likes count, ${error}`);
  }
};
const getPostLikes = async (postId: string) => {
  try {
    const response = await api.get(`/api/v1/likes/p/${postId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(`Error on getting the posts likes, ${error}`);
  }
};

export { toggleLike, getUserLikedPosts, getPostLikes, getPostLikesCount };
