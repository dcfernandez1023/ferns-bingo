import { v4 as uuidv4 } from 'uuid';
import Bingo from '../models/Bingo.js';
const BingoModel = require('../models/bingoModel.js');
const DB = require('./db.js');
const localStorageHelper = require('./localStorageHelper.js');

export async function createCard(callback, callbackOnError) {
  try {
    const LIMIT = 100;
    var i = 0;
    var card;
    let bingo = new Bingo();

    DB.getAllDocs("cards",
      function(error) {
        alert(error);
      }
    ).then(snapshot => {
      var allCards = [];
      snapshot.forEach(doc => {
        allCards.push(doc.data());
      });
/*
      var cards = localStorageHelper.getCards();
      card = cards[i];
      card.id = "yo!";
      if(!isExistingCard(card, allCards)) {
        DB.writeOne(card.id, card, "cards", callback, callbackOnError);
        return;
      }
      callbackOnError("Internal error. Could not generate a new bingo card.")
      updateDuplicateLog();
      return;
*/
      while(i < LIMIT) {
        card = BingoModel.card;
        card.id = randomId();
        card.grid = bingo.generateCard();
        if(!isExistingCard(card, allCards)) {
          DB.writeOne(card.id, card, "cards", callback, callbackOnError);
          return;
        }
        i++;
      }
      updateDuplicateLog();
      callbackOnError("Internal error. Could not generate a new bingo card.");
    }).catch(error => {
      console.log(error);
      callbackOnError("Internal error. Could not generate a new bingo card.");
    });
  }
  catch(error) {
    console.log(error);
    callbackOnError("Internal error. Could not generate a new bingo card.")
  }
}

export function deleteCard(id, callback, callbackOnError) {
  DB.deleteOne(id, "cards", callback, callbackOnError);
}

export function deleteAllCards(cards, callback, callbackOnError) {
  for(var i = 0; i < cards.length; i++) {
    DB.deleteOne(cards[i].id, "cards",
      function() {
        return;
      },
      callbackOnError
    );
  }
  callback();
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

function isExistingCard(card, allCards) {
  for(var i = 0; i < allCards.length; i++) {
    var compare = allCards[i];
    var len = Object.keys(compare.grid).length;
    for(var j = 0; j < len; j++) {
      var compareRow = compare.grid[j];
      var cardRow = card.grid[j];
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

function updateDuplicateLog() {
  console.log("here");
  DB.getOne("duplicateLog", "cardAnalytics",
    function(error) {
      console.log(error);
    }
  ).then(doc => {
    var data;
    if(doc.data().duplicateCounter === undefined) {
      data = {duplicateCounter: 1};
    }
    else {
      data = doc.data();
      var count = data.duplicateCounter + 1;
      data.duplicateCounter = count;
    }
    console.log(data.duplicateCounter);
    DB.writeOne("duplicateLog", data, "cardAnalytics",
      function() {
        return;
      },
      function(error) {
        console.log(error);
      }
    );
  }).catch(error => {
    console.log(error);
  });
}
