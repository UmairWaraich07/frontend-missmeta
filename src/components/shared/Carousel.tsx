import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const PostCarousel = ({ media, isDetailsPage = false }: any) => {
  return (
    <div>
      <Carousel>
        <CarouselContent
          className={`${
            isDetailsPage
              ? "h-[550px] xl:h-[580px] md:max-w-[482px] w-full"
              : null
          }`}
        >
          {media.map((file: any) => (
            <CarouselItem key={file._id}>
              {file.type === "image" ? (
                <img
                  src={file.url}
                  alt="post image"
                  className="post_details-img"
                />
              ) : (
                <video
                  className="post_details-img"
                  src={file.url}
                  autoPlay
                  muted
                  controls
                ></video>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default PostCarousel;
