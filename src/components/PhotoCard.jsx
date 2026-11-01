import HeartIcon from "./HeartIcon";

export default function PhotoCard({ photo, isFavourite, onToggle }) {
  return (
    <li className="overflow-hidden rounded-card border border-border bg-surface shadow-sm transition-all duration-300 hover:border-primary hover:shadow-md">
      <img
        src={`https://picsum.photos/id/${photo.id}/400/300`}
        alt={`Photo by ${photo.author}`}
        width="400"
        height="300"
        loading="lazy"
        className="aspect-4/3 w-full bg-muted object-cover"
      />
      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <p className="truncate text-[13px] font-medium text-text-primary">
          {photo.author}
        </p>
        <button
          type="button"
          onClick={() => onToggle(photo.id)}
          aria-pressed={isFavourite}
          aria-label={
            isFavourite ? "Remove from favourites" : "Add to favourites"
          }
          className={`rounded-full p-2 transition-all duration-300 hover:bg-primary/10 hover:text-primary ${
            isFavourite ? "text-primary" : "text-text-muted"
          }`}
        >
          <HeartIcon filled={isFavourite} />
        </button>
      </div>
    </li>
  );
}
