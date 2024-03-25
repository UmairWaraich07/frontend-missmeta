import api from "./api";

const getGuestFeedPosts = async () => {
  try {
    const response = await api.get(`/api/v1/posts/guest-posts`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(`Error on getting the guest feed posts : ${error}`);
  }
};

const getFeedPosts = async () => {
  try {
    const response = await api.get(`/api/v1/posts/feed-posts`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.log(`Error on getting the user feed posts : ${error}`);
  }
};

export { getGuestFeedPosts, getFeedPosts };
