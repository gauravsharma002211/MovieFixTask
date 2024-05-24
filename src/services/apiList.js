export const apiKey = process.env.EXPO_PUBLIC_API_KEY;

export default class Apis {
  movies = `discover/movie?api_key=${apiKey}`;
  filters = `genre/movie/list?api_key=${apiKey}`;
}
