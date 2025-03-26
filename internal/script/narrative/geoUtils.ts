// /Users/dan/code/crude-cards/internal/script/narrative/geoUtils.ts

import { geocode } from 'opencage-api-client';
import { Config } from './config';

export class GeoUtils {
    public static getRandomCoordinates() {
        const minLat = -90.0;
        const maxLat = 90.0;
        const minLon = -180.0;
        const maxLon = 180.0;

        const latitude = Math.random() * (maxLat - minLat) + minLat;
        const longitude = Math.random() * (maxLon - minLon) + minLon;

        return { latitude, longitude };
    }

    public static async getLocationDetails(latitude: number, longitude: number) {
        try {
            const apiKey = Config.ensure('OPENCAGE_API_KEY');
            const response = await geocode({
                q   : `${latitude},${longitude}`,
                key : apiKey,
            });

            if (response.results.length > 0) {
                const result = response.results[0];
                const components = result.components;

                return {
                    planet    : components.planet || '',
                    continent : components.continent || '',
                    country   : components.country || '',
                    region    : components.state || components.province || components.region || '',
                    formatted : result.formatted,
                };
            } else {
                throw new Error('No results found');
            }
        } catch (error) {
            console.error('Error fetching location details:', error);

            return null;
        }
    }
}
