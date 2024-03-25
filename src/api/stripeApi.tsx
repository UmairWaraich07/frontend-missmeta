import api from "./api";

const stripeCheckoutSession = async () => {
  try {
    const response = await api.post(
      `/api/v1/subscriptions/subscribe`,
      {},
      {
        withCredentials: true,
      }
    );
    return response?.data;
  } catch (error) {
    console.log(`Error on subscribing contestant : ${error}`);
  }
};
const checkSubscription = async () => {
  try {
    const response = await api.get(`/api/v1/subscriptions/check`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(`Error on checking subscription for contestant : ${error}`);
  }
};

export { stripeCheckoutSession, checkSubscription };
