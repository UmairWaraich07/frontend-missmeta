import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import PostStats from "./PostStats";
import { Carousel } from ".";
import { getTimeAgo } from "@/lib/utils";

const PostCard = ({ post }: any) => {
  return (
    <div className="post-card max-sm:border-none border-b border-dark-100/30 pb-6">
      <div className="flex-between">
        <div className="flex items-center gap-3 max-xs:px-4">
          <Link to={`/${post?.owner?.username}`}>
            <div>
              <Avatar
                fullname={post?.owner?.fullname}
                username={post?.owner?.username}
                profilePicture={post?.owner?.profilePhoto}
                className="w-12 h-12 overflow-hidden"
              />
            </div>
          </Link>

          <Link to={`/p/${post._id}`} className="flex flex-col cursor-pointer ">
            <p className="base-medium lg:base-bold text-light-1 cursor-pointer">
              {post?.owner?.username}
            </p>
            <div className="flex items-center gap-3 text-light-3 text-left">
              <p className="small-regular text-gray ">
                {getTimeAgo(post?.createdAt)}
              </p>

              <p className="subtle-semibold lg:body-regular flex items-center justify-center gap-2">
                {post.location && (
                  <span className="h-[5px] w-[5px] rounded-full bg-gray" />
                )}
                {post?.location}
              </p>
            </div>
          </Link>
        </div>
      </div>

      <div className="mt-4">
        {post?.media.length > 1 ? (
          <Carousel media={post?.media} />
        ) : post.media[0].type === "image" ? (
          <img
            src={post?.media[0].url}
            alt="post image"
            className="post-card_img"
          />
        ) : (
          <video
            className="post-card_img"
            src={post?.media[0].url}
            autoPlay
            muted
            controls
          ></video>
        )}
      </div>
      <PostStats post={post} />
      <div className="flex items-center gap-3 max-xs:px-4">
        <Link to={`/${post.owner.username}`}>
          <h4 className="font-semibold cursor-pointer">
            {post.owner.username}
          </h4>
        </Link>
        <Link to={`/p/${post._id}`}>
          <div className="paragraph-regular font-inter flex items-center justify-center">
            <p className="line-clamp-1">{post.caption}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
