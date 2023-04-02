const BASE_URL = 'https://pixabay.com/api/?'
const KEY = '34972994-841a002826ce26b95d2dc0999'

export async function fetchImages (query, page = 1) {
  const queryParam = `&q=${query}`
  const orderParam = `&order=popular`
  const perPageParam = '&per_page=20'
  const pageParam = `&page=${page}`

  try {
    const res = await fetch(BASE_URL + `key=${KEY}` + queryParam + orderParam + perPageParam + pageParam)
    const json = await res.json()
    return json
  } catch (error) {
    console.error(error)
  }
}