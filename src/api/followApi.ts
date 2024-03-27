import api from "./api";

const toggleFollow = async (postId: string) => {
  try {
    const response = await api.post(
      `/api/v1/follows/toggle/${postId}`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Erron on  toggling follow: ${error}`);
  }
};

export { toggleFollow };
