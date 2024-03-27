// import { toggleFollow } from "@/api/followApi";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { QUERY_KEYS } from "./QUERY_KEYS";

// const queryClient = useQueryClient();
// export const useToggleFollow = () => {
//   return useMutation({
//     mutationFn: ({ postId, }: { postId: string }) => toggleFollow(postId),
//     onSuccess: (_, variables) => {
//       queryClient.invalidateQueries({
//         queryKey: [QUERY_KEYS.GET_POST, variables.postId],
//       });
//     },
//   });
// };
