import { Button } from "@/components/ui/button";
import { RootState } from "@/store/store";
import { useGetFeedPosts, useGetGuestFeedPosts } from "@/tanstack/postQueries";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HomeSkeleton } from "..";
import { PostCard } from "@/components/shared";

const Home = () => {
  const { authStatus, userData } = useSelector(
    (state: RootState) => state.auth
  );
  const { data: guestFeedPosts, isPending: isFetchingGuestFeedPosts } =
    useGetGuestFeedPosts(userData?._id);
  const { data: feedPosts, isPending: isFetchingFeedPosts } = useGetFeedPosts(
    userData?._id
  );

  const isLoading = authStatus ? isFetchingFeedPosts : isFetchingGuestFeedPosts;

  console.log(authStatus);
  console.log({ feedPosts });
  // console.log(guestFeedPosts);

  return isLoading ? (
    <HomeSkeleton />
  ) : (
    <div className="w-full flex flex-1">
      <div className="common-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          <ul className="flex flex-col flex-1 max-sm:gap-4 gap-9 w-full">
            {authStatus ? (
              feedPosts?.data?.docs?.length > 0 ? (
                feedPosts?.data?.docs?.map((post: any) => (
                  <li key={post._id} className="flex justify-center w-full">
                    <PostCard post={post} />
                  </li>
                ))
              ) : (
                <p>Follow contestants to see their posts</p>
              )
            ) : (
              guestFeedPosts?.data?.docs?.map((post: any) => (
                <li key={post._id} className="flex justify-center w-full">
                  <PostCard post={post} />
                </li>
              ))
            )}
          </ul>
        </div>
        {!authStatus && guestFeedPosts && (
          <div className="mt-2">
            <Dialog>
              <DialogTrigger className="px-5 p-2 rounded-md primary-gradient text-light-900 font-medium">
                Load more posts
              </DialogTrigger>
              <DialogContent className="bg-light-900 border-light-2 border">
                <DialogHeader className="flex-center">
                  <DialogTitle className="mb-6">
                    Login or Register to continue
                  </DialogTitle>
                  <div className="flex-center gap-6">
                    <Link to="/login">
                      <Button className="primary-gradient text-light-900 w-[100px] font-medium">
                        Login
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button className="border-2 border-dark-100 w-[100px] font-medium">
                        Register
                      </Button>
                    </Link>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
