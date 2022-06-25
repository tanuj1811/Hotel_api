import useFetch from '../../hooks/useFetch'
import './featuredProperties.css'

const FeaturedProperties = () => {
  const { data, loading } = useFetch('/hotels?featured=true&limit=4')
  const img = [
    'https://cf.bstatic.com/xdata/images/hotel/max1280x900/232902339.jpg?k=3947def526b8af0429568b44f9716e79667d640842c48de5e66fd2a8b776accd&o=&hp=1',
    'https://i0.wp.com/theluxurytravelexpert.com/wp-content/uploads/2014/03/trump-hotel-chicago-illinois-usa.jpg',
    'https://ucarecdn.com/4a0b6ae6-30af-4595-9532-9c1a34608441/-/resize/601x326/',
    'https://us.123rf.com/450wm/tele52/tele521902/tele52190200004/116598290-vector-isometric-bedroom.jpg?ver=6',
  ]

  return (
    <div className="fp">
      {loading ? (
        'Loading'
      ) : (
        <>
          {data.length !== 0 &&
            data.map((item) => {
              return (
                <div className="fpItem" key={item._id}>
                  <img
                    src={item.photos[0] || img[Math.floor(Math.random() * 4)]}
                    alt=""
                    className="fpImg"
                  />
                  <span className="fpName">{item.name}</span>
                  <span className="fpCity">{item.city}</span>
                  <span className="fpPrice">
                    Starting from ${item.cheapestPrice}
                  </span>
                  <div className="fpRating">
                    <button>{item.rating || 'NA'}</button>
                    <span>{item.rating && 'Excellent'}</span>
                  </div>
                </div>
              )
            })}
        </>
      )}
    </div>
  )
}

export default FeaturedProperties
