import { Link } from "react-router-dom";

const fallbackByDestination = {
  Morocco: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80"
};

export default function ListingCard({ item, type, meta }) {
  const fallbackImage =
    fallbackByDestination[item.destination] ||
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80";

  return (
    <article className="listing-card glass-card">
      <img
        src={item.image || fallbackImage}
        alt={item.title || item.name || item.airline}
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = fallbackImage;
        }}
      />
      <div className="listing-content">
        <div className="listing-top">
          <div>
            <h3>{item.title || item.name || item.airline}</h3>
            <p>{meta}</p>
          </div>
          <strong>${item.price || item.pricePerNight}</strong>
        </div>
        <div className="tag-row">
          {item.duration && <span>{item.duration}</span>}
          {item.rating && <span>{item.rating} rating</span>}
          {item.classType && <span>{item.classType}</span>}
          {item.roomsAvailable !== undefined && <span>{item.roomsAvailable} rooms left</span>}
        </div>
        <Link to={`/booking/${type}/${item._id}`} className="button secondary">
          Book Now
        </Link>
      </div>
    </article>
  );
}
