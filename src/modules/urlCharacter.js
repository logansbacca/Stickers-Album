import {getCurrentUser} from './currentUser.js';

const hash = "02e073f6adf82ccac85e3345759bb8d0";
const ts = "1";
const apiKey = "e01d3bd89456ed75be357df6ef25b30f";
const user = getCurrentUser();
const data= JSON.parse(localStorage.getItem(user));
const character= data.favorite;



export const urlCharacter = `https://gateway.marvel.com:443/v1/public/characters?name=${character}&ts=${ts}&apikey=${apiKey}&hash=${hash}`;
