import {
  getFeedPosts,
  getGuestFeedPosts,
  getMorePostsOfUser,
  getPostDetails,
} from "@/api/postApi";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./QUERY_KEYS";

export const useGetGuestFeedPosts = (userId: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_GUEST_POSTS],
    queryFn: () => getGuestFeedPosts(),
    enabled: !userId,
  });
};

export const useGetFeedPosts = (userId: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_FEED_POSTS, userId],
    queryFn: () => getFeedPosts(1),
    enabled: !!userId,
  });
};

export const useGetPostDetails = (postId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST, postId],
    queryFn: () => getPostDetails(postId),
  });
};

export const useGetMorePostsOfUser = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MORE_USER_POSTS, userId],
    queryFn: () => getMorePostsOfUser(userId),
    enabled: !!userId,
  });
};
