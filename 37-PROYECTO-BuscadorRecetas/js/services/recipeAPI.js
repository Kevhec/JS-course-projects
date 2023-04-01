const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/'

/**
 * 
 * @param {String} ENDPOINT 
 * @param  {...String} PARAMS 
 * @returns {Promise} API JSON
 */
export async function fetchRecipes (ENDPOINT, ...PARAMS) {
  const res = await fetch(BASE_URL + ENDPOINT + PARAMS)
  const resJSON = await res.json()
  return resJSON
}