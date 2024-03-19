import api from "./api";

const stripeCheckoutSession = async () => {
  try {
    const response = await api.post(`/subscriptions/subscribe`);
    return response?.data;
  } catch (error) {
    console.log(`Error on subscribing contestant : ${error}`);
  }
};
const checkSubscription = async () => {
  try {
    const response = await api.get(`/subscriptions/check`);
    return response.data;
  } catch (error) {
    console.log(`Error on checking subscription for contestant : ${error}`);
  }
};

export { stripeCheckoutSession, checkSubscription };
