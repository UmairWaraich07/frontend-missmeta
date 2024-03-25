import { getFeedPosts, getGuestFeedPosts } from "@/api/postApi";
import { useQuery } from "@tanstack/react-query";

export const useGetGuestFeedPosts = () => {
  return useQuery({
    queryKey: ["guestposts"],
    queryFn: () => getGuestFeedPosts(),
  });
};

export const useGetFeedPosts = () => {
  return useQuery({
    queryKey: ["feedposts"],
    queryFn: () => getFeedPosts(),
  });
};
