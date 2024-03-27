import { getUserSavedPosts, toggleSaved } from "@/api/saveApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "./QUERY_KEYS";

export const useToggleSaved = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId }: { postId: string }) => toggleSaved(postId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST, variables.postId],
      });
    },
  });
};

export const useGetUserSavedPosts = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_SAVED_POSTS, userId],
    queryFn: () => getUserSavedPosts(),
  });
};
