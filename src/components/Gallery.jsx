import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos";
import {
  FAVOURITES_KEY,
  favouritesReducer,
  loadFavourites,
} from "../state/favouritesReducer";
import SearchBar from "./SearchBar";
import PhotoCard from "./PhotoCard";
import Spinner from "./Spinner";
import Alert from "./Alert";

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos();
  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    [],
    loadFavourites,
  );
  const [query, setQuery] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
    } catch {
      // IGNORE
    }
  }, [favourites]);

  const handleSearchChange = useCallback((e) => setQuery(e.target.value), []);

  const filteredPhotos = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return photos;
    return photos.filter((photo) => photo.author.toLowerCase().includes(q));
  }, [photos, query]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <header className="mb-8">
        <h1 className="text-[28px] font-bold text-text-primary">
          Photo Gallery
        </h1>
        <p className="mt-1 text-[18px] text-text-secondary">
          Browse photos and mark your favourites
        </p>
      </header>

      <SearchBar value={query} onChange={handleSearchChange} />

      {loading && <Spinner />}
      {error && <Alert>{error}</Alert>}

      {!loading && !error && filteredPhotos.length > 0 && (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.includes(photo.id)}
              onToggle={(id) => dispatch({ type: "TOGGLE_FAVOURITE", id })}
            />
          ))}
        </ul>
      )}

      {!loading && !error && filteredPhotos.length === 0 && (
        <div className="rounded-card border border-dashed border-border py-10 text-center">
          <p className="text-[15px] font-semibold text-text-primary">
            No photos found
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            No author matches "{query}".
          </p>
        </div>
      )}
    </main>
  );
}
