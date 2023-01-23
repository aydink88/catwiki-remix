import { json, type LinksFunction, type LoaderArgs } from '@remix-run/node';
import { useCatch, useLoaderData } from '@remix-run/react';
import Cat from '~/models/CatModel';
import axios from 'axios';
import Stat from '~/models/StatModel';
import { generateRating } from '~/utils';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import swipercssbundle from 'swiper/swiper-bundle.min.css';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: swipercssbundle }];
};

export async function loader({ params }: LoaderArgs) {
  const cat = await Stat.findOne({ catid: params.breedId }).exec();
  if (cat) {
    cat.search_count++;
    await cat.save();
  } else {
    const foundCat = await Cat.findOne({ id: params.breedId });
    if (!foundCat) {
      throw new Response('Not Found', { status: 404 });
    }
    await Stat.create({ cat: foundCat._id, search_count: 1, catid: foundCat.id });
  }

  const breed = await Cat.findOne({ id: params.breedId }).exec();
  if (!breed.image.length) {
    let query_params = {
      breed_ids: params.breedId,
      limit: 8,
      api_key: process.env.API_KEY,
    };
    const response = await axios.get('https://api.thecatapi.com/v1/images/search', {
      params: query_params,
    });
    breed.image = response.data;
    await breed.save();
  }

  return json({ breed });
}
export default function BreedPage() {
  const { breed: cat } = useLoaderData<typeof loader>();

  return (
    <div className="breed-page">
      <div className="catinfo">
        <div className="catinfo__image">
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            {cat.image.map((img) => (
              <SwiperSlide key={img.id}>
                <div>
                  <img src={img.url || '/noimage.png'} alt={img.id} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/*<img src={cat.image?.url || '/noimage.png'} alt={cat.name} />*/}
        </div>
        <div className="catinfo__details">
          <h3>{cat.name}</h3>
          <p>{cat.description}</p>
          <div className="catinfo__properties">
            <ul className="list-flex-start">
              <li>
                <strong>Temperament:</strong>
                <p>{cat.temperament}</p>
              </li>
              <li>
                <strong>Origin:</strong>
                <p>{cat.origin}</p>
              </li>
              <li>
                <strong>Life Span:</strong>
                <p>{cat.life_span}</p>
              </li>
            </ul>
            <ul>
              <li>
                <strong>Adaptability:</strong>
                <div className="catinfo__rating">
                  {generateRating(cat.adaptability).map((item, i) => {
                    return (
                      <span key={i} className={`rating-item ${item ? 'alive' : 'ghost'}`}></span>
                    );
                  })}
                </div>
              </li>
              <li>
                <strong>Affection Level:</strong>
                <div className="catinfo__rating">
                  {generateRating(cat.affection_level).map((item, i) => {
                    return (
                      <span key={i} className={`rating-item ${item ? 'alive' : 'ghost'}`}></span>
                    );
                  })}
                </div>
              </li>
              <li>
                <strong>Child Friendly:</strong>
                <div className="catinfo__rating">
                  {generateRating(cat.child_friendly).map((item, i) => {
                    return (
                      <span key={i} className={`rating-item ${item ? 'alive' : 'ghost'}`}></span>
                    );
                  })}
                </div>
              </li>
              <li>
                <strong>Grooming:</strong>
                <div className="catinfo__rating">
                  {generateRating(cat.grooming).map((item, i) => {
                    return (
                      <span key={i} className={`rating-item ${item ? 'alive' : 'ghost'}`}></span>
                    );
                  })}
                </div>
              </li>
              <li>
                <strong>Intelligence:</strong>
                <div className="catinfo__rating">
                  {generateRating(cat.intelligence).map((item, i) => {
                    return (
                      <span key={i} className={`rating-item ${item ? 'alive' : 'ghost'}`}></span>
                    );
                  })}
                </div>
              </li>
              <li>
                <strong>Health Issues:</strong>
                <div className="catinfo__rating">
                  {generateRating(cat.health_issues).map((item, i) => {
                    return (
                      <span key={i} className={`rating-item ${item ? 'alive' : 'ghost'}`}></span>
                    );
                  })}
                </div>
              </li>
              <li>
                <strong>Social Needs:</strong>
                <div className="catinfo__rating">
                  {generateRating(cat.social_needs).map((item, i) => {
                    return (
                      <span key={i} className={`rating-item ${item ? 'alive' : 'ghost'}`}></span>
                    );
                  })}
                </div>
              </li>
              <li>
                <strong>Stranger Friendly:</strong>
                <div className="catinfo__rating">
                  {generateRating(cat.stranger_friendly).map((item, i) => {
                    return (
                      <span key={i} className={`rating-item ${item ? 'alive' : 'ghost'}`}></span>
                    );
                  })}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="cat__photos"></div>
    </div>
  );
}

export function ErrorBoundary({ error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Breed not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
