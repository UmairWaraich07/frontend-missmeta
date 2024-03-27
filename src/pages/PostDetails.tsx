import { Loader } from "@/components/Icons";
import { Carousel } from "@/components/shared";
import Avatar from "@/components/shared/Avatar";
import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { getTimeAgo } from "@/lib/utils";
import {
  useGetMorePostsOfUser,
  useGetPostDetails,
} from "@/tanstack/postQueries";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RelatedPosts } from ".";

const PostDetails = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { data: post, isPending } = useGetPostDetails(postId || "");
  const { data: allRelatedPosts } = useGetMorePostsOfUser(post?.owner._id);

  // remove the current postId from related posts and return 6 objects
  const filteredRelatedPosts = allRelatedPosts
    ?.filter((post: any) => post._id !== postId)
    .slice(0, 6);

  return (
    <div className="post_details-container">
      <div className="hidden md:flex max-w-5xl w-full">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="flex items-center gap-4 justify-start"
        >
          <img
            src={"/assets/icons/back.svg"}
            alt="back"
            width={24}
            height={24}
          />
          <p className="body-medium font-inter lg:base-medium cursor-pointer">
            Back
          </p>
        </Button>
      </div>
      {isPending || !post ? (
        <div className="h-[400px] w-full flex-center">
          <Loader
            className="fill-dark-100 text-dark-100"
            width={100}
            height={100}
          />
        </div>
      ) : (
        <div className="post_details-card">
          {post?.media.length > 1 ? (
            <Carousel media={post?.media} isDetailsPage={true} />
          ) : post.media[0].type === "image" ? (
            <img
              src={post?.media[0].url}
              alt="post image"
              className="post_details-img"
            />
          ) : (
            <video
              className="post_details-img"
              src={post?.media[0].url}
              autoPlay
              muted
              controls
            ></video>
          )}

          <div className="post_details-info">
            <div className="w-full">
              <div className="w-full border-b border-dark-400/50 p-4">
                <Link
                  to={`/profile/${post?.owner._id}`}
                  className="flex items-center gap-3 w-full"
                >
                  <Avatar
                    fullname={post.owner.fullname}
                    username={post.owner.username}
                    profilePicture={post.owner.profilePhoto}
                    className="w-12 h-12 overflow-hidden"
                  />

                  <div className="flex gap-1 flex-col">
                    <p className="base-medium lg:body-bold text-light-1 cursor-pointer">
                      {post?.owner.username}
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
                  </div>
                </Link>
              </div>
              <div className="p-4 w-full font-inter body-regular">
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Omnis, quasi?
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col gap-5 lg:gap-4 p-4 border-t border-dark-400/50 ">
              <PostStats post={post} />
            </div>
          </div>
        </div>
      )}

      {filteredRelatedPosts?.length > 0 && (
        <div className="w-full max-w-[935px] sm:mt-4">
          <hr className="border w-full border-dark-400/10 max-sm:hidden" />

          <h3 className="paragraph-medium w-full my-10 text-gray">
            More posts from{" "}
            <span className="base-medium text-dark-100">
              {post.owner.username}
            </span>
          </h3>
          {!filteredRelatedPosts ? (
            <Loader />
          ) : (
            <RelatedPosts posts={filteredRelatedPosts} />
          )}
        </div>
      )}
    </div>
  );
};

export default PostDetails;
