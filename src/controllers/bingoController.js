import { v4 as uuidv4 } from 'uuid';
import Bingo from '../models/Bingo.js';
const BingoModel = require('../models/bingoModel.js');
const DB = require('./db.js');

function randomId() {
  const LEN = 10;
  var id;
  var random1 = "";
  var random2 = new Date().getTime().toString();
  var uid = uuidv4();
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for(var i = 0; i < LEN; i++) {
    random1 = random1 + characters.charAt(Math.floor(Math.random() * characters.length));
  }
  id = uid + random1 + random2;
  return id;
}

export function createCard(callback, callbackOnError) {
  let bingo = new Bingo();
  let card = BingoModel.card;
  card.id = randomId();
  card.grid = bingo.generateCard();
  DB.writeOne(card.id, card, "cards", callback, callbackOnError);
}
