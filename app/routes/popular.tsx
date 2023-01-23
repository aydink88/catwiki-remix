import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import Stat from '~/models/StatModel';

export async function loader() {
  const popular = await Stat.find().sort({ search_count: 'desc' }).populate('cat').limit(10);
  return json(popular);
}

export default function Popular() {
  const popular = useLoaderData();

  return (
    <div className="popular">
      <h1 className="title title-medium">Top 10 most searched breeds</h1>
      <div className="popular__results">
        {popular.map(({ cat }, i) => {
          return (
            <div className="popinfo" key={cat.id}>
              <div className="popinfo__image image-small">
                <img src={cat.image?.url || '/noimage.png'} alt={cat.name} />
              </div>
              <div className="popinfo__details">
                <Link to={`/breed/${cat.id}`}>
                  <h3 className="title title-big">
                    {i + 1}. {cat.name}
                  </h3>
                </Link>
                <p>{cat.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
