import { v4 as uuidv4 } from 'uuid';
import Bingo from '../models/Bingo.js';
const BingoModel = require('../models/bingoModel.js');
const DB = require('./db.js');

export function createCard(callback, callbackOnError) {
  const LIMIT  = 100;
  var i = 0;
  var card = null;
  let bingo = new Bingo();
  while(i < LIMIT) {
    card = BingoModel.card;
    card.id = randomId();
    card.grid = bingo.generateCard();
    if(!isExistingCard(card)) {
      DB.writeOne(card.id, card, "cards", callback, callbackOnError);
      return;
    }
    i++;
  }
  alert("Internal error. Could not generate a new bingo card.");
}

export function deleteCard(id, callback, callbackOnError) {
  DB.deleteOne(id, "cards", callback, callbackOnError);
}

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

function isExistingCard(card) {
  var cards = DB.getAllDocs("cards",
    function(error) {
      alert(error);
    }
  );
  try {
    for(var i = 0; i < cards.length; i++) {
      var compare = cards[i];
      var keys = Object.keys(compare.grid);
      for(var j = 0; j < keys.length; j++) {
        var key = keys[j];
        var compareRow = compare[key];
        var cardRow = card.grid[key];
        var isMatch = true;
        for(var n = 0; n < compareRow.length; n++) {
          if(compareRow[n] !== cardRow[n]) {
            isMatch = false;
            break;
          }
        }
        if(!isMatch) {
          break;
        }
        else {
          return true;
        }
      }
    }
    return false;
  }
  catch(error) {
    alert(error);
  }
}
