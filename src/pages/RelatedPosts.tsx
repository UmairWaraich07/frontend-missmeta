import { useNavigate } from "react-router-dom";

const RelatedPosts = ({ posts }: any) => {
  const navigate = useNavigate();
  return (
    <div className="w-full grid grid-cols-3 gap-1 items-center justify-start">
      {posts.map((post: any) => (
        <div
          key={post._id}
          onClick={() => navigate(`../p/${post._id}`)}
          className="max-w-[309px] max-h-[386px] cursor-pointer"
        >
          <img
            src={post.media[0].url}
            alt="Post Image"
            className="w-full h-full object-cover cursor-pointer"
          />
        </div>
      ))}
    </div>
  );
};

export default RelatedPosts;
