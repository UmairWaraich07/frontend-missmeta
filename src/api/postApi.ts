import api from "./api";

const getGuestFeedPosts = async () => {
  console.log("fetching guest feed");
  try {
    const response = await api.get(`/api/v1/posts/guest-posts`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(`Error on getting the guest feed posts : ${error}`);
  }
};

const getFeedPosts = async (pageParam: number) => {
  console.log(pageParam);
  try {
    console.log("fetching feed posts");
    const response = await api.get(
      `/api/v1/posts/feed-posts?page=${pageParam}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.log(`Error on getting the user feed posts : ${error}`);
  }
};

const getPostDetails = async (postId: string) => {
  try {
    const response = await api.get(`/api/v1/posts/p/${postId}`);
    return response.data.data;
  } catch (error) {
    console.log(`Error on getting the post details : ${error}`);
  }
};

const getMorePostsOfUser = async (userId: string) => {
  try {
    const response = await api.get(`/api/v1/posts/more-posts/${userId}`);
    return response.data.data;
  } catch (error) {
    console.log(`Error on getting the more posts of this user : ${error}`);
  }
};

export { getGuestFeedPosts, getFeedPosts, getPostDetails, getMorePostsOfUser };
