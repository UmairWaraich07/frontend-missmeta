import { RootState } from "@/store/store";
import { useGetPostLikesCount, useToggleLike } from "@/tanstack/likeQueries";
import { useToggleSaved } from "@/tanstack/savedQueries";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface PostStatsProps {
  postId?: string;
  userId?: string;
  post: any;
  totalComments?: number;
  isExplorePage?: boolean;
}

const PostStats = ({ isExplorePage = false, post }: PostStatsProps) => {
  const [isSaved, setIsSaved] = useState(post?.isSaved);
  const [isLiked, setIsLiked] = useState(post?.isLiked);
  const { authStatus } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const toggleLike = useToggleLike();
  const toggleSaved = useToggleSaved();
  const { data: likesCount, isPending } = useGetPostLikesCount(post?._id);

  const handleLike = async () => {
    if (!authStatus) {
      navigate("/login?message=you need to login first");
    }
    setIsLiked(!isLiked);

    const response = await toggleLike.mutateAsync({ postId: post._id });
    console.log(response);
    if (response) {
      console.log("Like toggled successfully");
    }
    if (toggleLike.isError) {
      setIsLiked(false);
    }
  };

  const handleSaved = async () => {
    if (!authStatus) {
      navigate("/login?message=you need to login first");
    }
    setIsSaved(!isSaved);

    const response = await toggleSaved.mutateAsync({ postId: post._id });
    console.log(response);
    if (response) {
      console.log("Saved toggled successfully");
    }
    if (toggleSaved.isError) {
      console.log(toggleSaved.error.message);
      setIsLiked(false);
    }
  };

  return (
    <div
      className={`${
        !isExplorePage && "w-full"
      } flex justify-between  gap-2 mt-3 items-center z-20 max-xs:px-4 `}
    >
      <div className="flex items-center w-full gap-4">
        <div className="flex items-center gap-2">
          <img
            src={`${
              isLiked
                ? "/assets/icons/heart-fill.svg"
                : "/assets/icons/heart.svg"
            }`}
            alt="like"
            width={28}
            height={28}
            className="cursor-pointer"
            onClick={handleLike}
          />
          <p className="body-medium lg:base-medium">{likesCount}</p>
        </div>
      </div>

      {!isExplorePage && (
        <div className="flex gap-2">
          <img
            src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
            alt="share"
            width={28}
            height={28}
            className="cursor-pointer"
            onClick={handleSaved}
          />
        </div>
      )}
    </div>
  );
};

export default PostStats;
