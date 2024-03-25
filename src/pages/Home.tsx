import PostCard from "@/components/shared/PostCard";
import { RootState } from "@/store/store";
import { useGetFeedPosts, useGetGuestFeedPosts } from "@/tanstack/postQuerires";
import { useSelector } from "react-redux";

const Home = () => {
  const { authStatus } = useSelector((state: RootState) => state.auth);
  const { data: guestFeedPosts } = useGetGuestFeedPosts();
  const { data: feedPosts } = useGetFeedPosts();
  console.log(authStatus);
  console.log(feedPosts);

  return (
    <div className="w-full flex flex-1">
      <div className="common-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          <ul className="flex flex-col flex-1 gap-9 w-full">
            {authStatus
              ? feedPosts?.data?.docs?.map((post: any) => (
                  <li key={post._id} className="flex justify-center w-full">
                    <PostCard post={post} />
                  </li>
                ))
              : guestFeedPosts?.data?.docs?.map((post: any) => (
                  <li key={post._id} className="flex justify-center w-full">
                    <PostCard post={post} />
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
