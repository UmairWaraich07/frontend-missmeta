import api from "./api";

const toggleSaved = async (postId: string) => {
  try {
    const response = await api.post(
      `/api/v1/saveds/toggle/${postId}`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log(`Error on toggling the saved post, ${error}`);
  }
};

const getUserSavedPosts = async () => {
  try {
    const response = await api.post(`/api/v1/saveds/user-saveds`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(`Error on getting the user saved posts, ${error}`);
  }
};

export { toggleSaved, getUserSavedPosts };
