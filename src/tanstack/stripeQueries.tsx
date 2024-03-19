import { checkSubscription, stripeCheckoutSession } from "@/api/stripeApi";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useStripeCheckoutSession = () => {
  return useMutation({
    mutationFn: () => stripeCheckoutSession(),
  });
};

export const useCheckSubscription = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["checkSubscription", userId],
    queryFn: () => checkSubscription(),
    enabled: !!userId,
  });
};
