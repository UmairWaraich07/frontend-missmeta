import { useState } from "react";

interface PostStatsProps {
  postId?: string;
  userId?: string;
  post: any;
  totalComments?: number;
  isExplorePage?: boolean;
}

const PostStats = ({ isExplorePage = false, post }: PostStatsProps) => {
  const [isSaved, setIsSaved] = useState(post?.post.isSaved);
  const [isLiked, setIsLiked] = useState(post?.post.isLiked);
  console.log(post?.post.isSaved);

  const handleLike = async () => {
    setIsLiked(true);
  };

  const handleSaved = async () => {
    setIsSaved(true);
  };

  return (
    <div
      className={`${
        !isExplorePage && "w-full"
      } flex justify-between  gap-2 items-center z-20 `}
    >
      <div className="flex items-center w-full gap-4">
        <div className="flex gap-2">
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
          <p className="small-medium lg:base-medium">{post?.post.likesCount}</p>
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
