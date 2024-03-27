import {
  getPostLikes,
  getPostLikesCount,
  getUserLikedPosts,
  toggleLike,
} from "@/api/likeApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "./QUERY_KEYS";

export const useToggleLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId }: { postId: string }) => toggleLike(postId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_LIKES_COUNT, variables.postId],
      });
    },
  });
};

export const useGetUserLikedPosts = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_LIKED_POSTS, userId],
    queryFn: () => getUserLikedPosts(),
  });
};

export const useGetPostLikes = (postId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_LIKES, postId],
    queryFn: () => getPostLikes(postId),
  });
};

export const useGetPostLikesCount = (postId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_LIKES_COUNT, postId],
    queryFn: () => getPostLikesCount(postId),
    enabled: !!postId,
  });
};
