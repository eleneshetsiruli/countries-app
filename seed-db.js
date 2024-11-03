import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Buffer } from 'buffer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'db.json');

const fetchImageAsBase64 = async (url) => {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const base64Flag = Buffer.from(response.data, 'binary').toString(
            'base64',
        );
        return `data:image/png;base64,${base64Flag}`;
    } catch (error) {
        console.error('Error fetching flag image:', error);
        return '';
    }
};

const mapCountryData = async (country) => ({
    name: {
        en: country.name.common,
        ka: '',
    },
    population: String(country.population),
    capital: {
        en: country.capital?.[0] || 'N/A',
        ka: '',
    },
    rating: 0,
    flag: await fetchImageAsBase64(country.flags.png),
    id: country.cca3,
    deleted: false,
    originalIndex: country.cca3,
});

const fetchAndSeedData = async () => {
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countries = await Promise.all(response.data.map(mapCountryData));

        const dbData = { country: countries };
        fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
    } catch (error) {
        console.error('Error fetching or writing data: ' + error);
    }
};
fetchAndSeedData();
