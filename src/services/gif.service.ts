import type { Gif, GifRating } from '../models/gif.interface';
import type {
    GiphyGif,
    GiphyResponse,
} from '../models/giphy-response.interface';
const API_BASE_URL = 'https://api.giphy.com/v1/gifs';
const RESULT_LIMIT = 12;
type GiphyEndpoint = 'trending' | 'search';
function getApiKey(): string {
    const apiKey = import.meta.env.VITE_GIPHY_API_KEY;
    if (!apiKey) {
        throw new Error(
            'Falta VITE_GIPHY_API_KEY en .env.local.',
        );
    }
    return apiKey;
}
function isGifRating(value: string): value is GifRating {
    return value === 'g' || value === 'pg' || value === 'pg-13';
}