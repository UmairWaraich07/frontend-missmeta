import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const PostCarousel = ({ media }: any) => {
  return (
    <div>
      <Carousel>
        <CarouselContent>
          {media.map((file: any) => (
            <CarouselItem>
              <img src={file.url} alt="post image" className="post-card_img" />
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
