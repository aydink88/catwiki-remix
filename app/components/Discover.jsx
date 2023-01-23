import { Link, useOutletContext } from '@remix-run/react';

export default function Discover() {
  const { discover: cats } = useOutletContext();

  return (
    <div className="discover">
      <p className="title title-small">Most Searched Breeds</p>
      <div className="line"></div>
      <div className="discover__title">
        {cats?.length ? (
          <h3 className="title title-big">{cats.length} Breeds For you to discover</h3>
        ) : null}
        <Link to="/popular" className="link-cta">
          SEE MORE <span> &rarr;</span>
        </Link>
      </div>
      <div className="discover__items">
        {cats.map((cat) => {
          return (
            <Link key={cat.id} to={`/breed/${cat.breeds[0].id}`}>
              <div className="discover-item">
                <div className="discover-image">
                  <img src={cat.url || '/noimage.png'} alt={cat.id} />
                </div>
                <p>{cat.breeds[0].name}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
