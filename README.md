# Photo Gallery

A React photo gallery that loads photos from the [Picsum Photos API](https://picsum.photos/), lets you search by author, and lets you mark favourites that survive a page refresh.

Built with React, Vite and Tailwind CSS only. No component libraries.

## Features

- Fetches 30 photos on load, with a loading spinner and an error message if the request fails
- Responsive grid: 1 column on mobile, 2 on tablet (768px and up), 4 on desktop (1024px and up)
- Each card shows the photo, the author name and a heart button
- Real-time search by author. It filters the data already fetched, so typing makes no API call
- Favourites toggle with the heart button, managed with `useReducer` and saved to `localStorage`

## Tech stack

- React (functional components and hooks only)
- Vite
- Tailwind CSS v4

## Getting started

Requires Node.js 20.19+ or 22.12+.

```bash
git clone https://github.com/Generally-general/photo-gallery
cd photo-gallery
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

Other scripts:

```bash
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

## Project structure

```
src/
├── main.jsx
├── index.css
├── App.jsx
├── hooks/
│   └── useFetchPhotos.js
├── state/
│   └── favouritesReducer.js
└── components/
    ├── Gallery.jsx
    ├── SearchBar.jsx
    ├── PhotoCard.jsx
    ├── HeartIcon.jsx
    ├── Spinner.jsx
    └── Alert.jsx
```

## How it works

**Data fetching.** `useFetchPhotos` fetches the photo list once on mount and returns `{ photos, loading, error }`. A non-OK response or a network failure sets `error` and stops loading. An `AbortController` cancels the request if the component unmounts.

**Favourites.** `favouritesReducer` handles one action, `TOGGLE_FAVOURITE`, which adds or removes a photo id. `useReducer` loads the saved list from `localStorage` on first render, and an effect writes the list back whenever it changes. The storage key is `photo-gallery:favourites`.

**Search.** The input is controlled. `useCallback` keeps the change handler the same function between renders, and `SearchBar` is wrapped in `React.memo` so it does not re-render when only the favourites change. `useMemo` computes the filtered list from `photos` and `query`, so it is recalculated only when one of them changes.

**Images.** Cards load `https://picsum.photos/id/{id}/400/300` instead of the API's full-size `download_url`, to keep the 30 images light.

## Styling

Styling uses Tailwind utility classes with a small set of design tokens defined in `src/index.css` under `@theme`: a single primary blue (`#2563EB`), semantic success, warning and danger colours, neutral surface, border and text colours, and `standard` and `card` border radii. Errors are shown in an alert box rather than inline text.

## Notes and limitations

- Favourites are stored per browser. They are not synced across devices, and they are lost if site data is cleared.
- If `localStorage` is unavailable (for example, some private modes), the app still works but favourites will not persist.
- There is no retry button on error; reloading the page fetches again.
- Search matches the author name only, by case-insensitive substring.