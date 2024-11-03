import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from './src/Logger';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'db.json');

const mapCountryData = (country) => ({
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
    flag: country.flags.png,
    id: country.cca3,
    deleted: false,
    originalIndex: country.cca3,
});

const fetchAndSeedData = async () => {
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countries = response.data.map(mapCountryData);

        const dbData = { country: countries };
        fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

        logger.info('Database updated successfully');
    } catch (error) {
        logger.error('Error fetching or writing data: ' + error);
    }
};
fetchAndSeedData();
