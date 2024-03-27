import { Skeleton } from "@/components/ui/skeleton";

const HomeSkeleton = () => {
  return (
    <div className="w-full flex flex-1">
      <div className="common-container">
        <div className="home-posts">
          {/* <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2> */}
          <ul className="flex flex-col flex-1 max-sm:gap-4 gap-9 w-full">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item}>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full " />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
                <Skeleton className="h-[480px] w-full max-w-[100%] mt-4" />
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomeSkeleton;
