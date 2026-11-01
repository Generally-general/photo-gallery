export const FAVOURITES_KEY = 'photo-gallery:favourites'

export function loadFavourites() {
  try {
    const parsed = JSON.parse(localStorage.getItem(FAVOURITES_KEY))
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE':
      return state.includes(action.id)
        ? state.filter((id) => id !== action.id)
        : [...state, action.id]
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}