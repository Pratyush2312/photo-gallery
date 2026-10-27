import React, { useCallback, useMemo, useState } from "react";
import { useFetchPhotos } from "../hooks/useFetchPhotos";
import { useFavourites } from "../hooks/useFavourites";
const PhotoGallery = () => {
  const [search, setSearch] = useState("");
  const { state } = useFetchPhotos();
  const { favourites, toggleFavourite } = useFavourites();
  const handleSearch = useCallback((e) => setSearch(e.target.value));
  const filteredImages = useMemo(() => {
    return state.images.filter((img) =>
      img.author.toLowerCase().includes(search.toLowerCase()),
    );
  }, [state.images, search]);
  if (state.loading) return <p>Loading images...</p>;
  if (state.error) return <p>Error: {String(state.error)}</p>;
  return (
    <div className="flex flex-col">
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search photos by author"
        className="mb-4 rounded border p-2"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 min-h-screen">
        {filteredImages.length === 0 ? (
          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-gray-900">
              No photos found
            </h2>
            <button onClick={()=>setSearch('')} className="border rounded-2xl border-none bg-red-500 text-white py-3">Clear Search</button>
          </div>
        ) : (
          filteredImages.map((img) => {
            const isFavourite = favourites.some((image) => image.id === img.id);
            return (
              <div key={img.id}>
                <img
                  src={img.download_url}
                  alt={img.author}
                  className="border rounded-xl border-none w-full h-48 object-cover"
                />
                <div className="flex justify-between px-2">
                  <h1>{img.author}</h1>
                  <button onClick={() => toggleFavourite(img)}>
                    <i
                      className={
                        isFavourite
                          ? "ri-heart-fill text-red-500"
                          : "ri-heart-line text-gray-700"
                      }
                    />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default PhotoGallery;
