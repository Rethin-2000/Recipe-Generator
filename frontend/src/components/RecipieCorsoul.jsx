import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';


const latestRecipes = [
  {
    id: 1,
    title: 'Spaghetti Bolognese',
    description: 'Rich meat sauce with Italian herbs',
    image: 'https://images.pexels.com/photos/27650917/pexels-photo-27650917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 2,
    title: 'Vegan Buddha Bowl',
    description: 'Healthy and colorful with quinoa and veggies',
    image: 'https://www.veganfoodandliving.com/wp-content/uploads/2018/09/vegan-winter-moroccan-buddha-bowl.jpg',
  },
  {
    id: 3,
    title: 'Classic Margherita Pizza',
    description: 'Fresh tomatoes, basil, and mozzarella',
    image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 4,
    title: 'Chicken Curry',
    description: 'Spicy and flavorful Indian-style curry',
    image: 'https://images.pexels.com/photos/9792458/pexels-photo-9792458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 5,
    title: 'Chocolate Lava Cake',
    description: 'Molten center with a crisp outer shell',
    image: 'https://images.pexels.com/photos/1366710/pexels-photo-1366710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

const RecipeCarousel = () => {
  return (
    <section className="w-full h-[80vh] rounded-2xl overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {latestRecipes.map((recipe) => (
          <SwiperSlide key={recipe.id}>
            <div
              className="h-full w-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${recipe.image})` }}
            >
              <div className="absolute inset-0  bg-opacity-50 flex flex-col justify-center items-center text-white px-4 text-center">
                <h2 className="text-4xl font-bold mb-2">{recipe.title}</h2>
                <p className="text-lg max-w-xl">{recipe.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default RecipeCarousel;
