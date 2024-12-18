import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

export const ImageCarousel = ({ images }) => {
   if (!images || images.length === 0) {
      return null
   }
   return (
      <Carousel>
         <CarouselContent>
            {images.map((image, index) => (
               <CarouselItem key={index}>
                  <div className="h-64  p-4 md:h-80 md:w-[400px]">
                     <img src={image.imageUrl} alt="carousel" className="h-full w-full rounded-lg object-cover" />
                  </div>
               </CarouselItem>
            ))}
         </CarouselContent>
         <CarouselPrevious />
         <CarouselNext />
      </Carousel>
   )
}
