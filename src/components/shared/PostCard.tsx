import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import PostStats from "./PostStats";
import { Carousel } from ".";
import { getTimeAgo } from "@/lib/utils";

const PostCard = (post: any) => {
  console.log(post.post);
  // console.log({ post });
  return (
    <div className="post-card border-b border-dark-100/30 pb-6">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/${post?.post.owner?.username}`}>
            <div>
              <Avatar
                fullname={post?.post.owner?.fullname}
                username={post?.post.owner?.username}
                profilePicture={post?.post.owner?.profilePhoto}
                className="w-12 h-12 overflow-hidden"
              />
            </div>
          </Link>

          <Link to={`/profile/`} className="flex flex-col cursor-pointer">
            <p className="base-medium lg:body-bold text-light-1 cursor-pointer">
              {post?.post.owner?.username}
            </p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular ">
                {getTimeAgo(post?.post.createdAt)}
              </p>
              •
              <p className="subtle-semibold lg:small-regular">
                {post?.post.location}
              </p>
            </div>
          </Link>
        </div>
      </div>

      <div>
        <div className="small-medium lg:base-medium py-3">
          <p className="line-clamp-1">{post.caption}</p>
        </div>

        <Carousel media={post?.post.media} />
      </div>

      <PostStats />
    </div>
  );
};

export default PostCard;
