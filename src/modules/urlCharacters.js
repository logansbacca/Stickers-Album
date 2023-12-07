require('dotenv').config();
const hash = "02e073f6adf82ccac85e3345759bb8d0";
const ts = "1";
const apiKey = process.env.API_KEY;


require('dotenv').config();

export const urlCharacters = `https://gateway.marvel.com:443/v1/public/characters?limit=100&ts=${ts}&apikey=${apiKey}&hash=${hash}`;
