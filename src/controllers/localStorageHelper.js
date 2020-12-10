export function initializeStorage() {
  if(window.localStorage.getItem("bingoMetaData") === null || window.localStorage.getItem("bingoMetaData") === undefined) {
    window.localStorage.setItem("bingoMetaData", []);
  }
  if(window.localStorage.getItem("bingoData") === null || window.localStorage.getItem("bingoData") === undefined) {
    window.localStorage.setItem("bingoData", []);
  }
}

export function updateCards(newCards) {
  window.localStorage.setItem("bingoData", JSON.stringify(newCards));
}

export function getCards() {
  let cards = window.localStorage.getItem("bingoData");
  if(cards === undefined || cards === null || cards.trim().length === 0) {
    return [];
  }
  return JSON.parse(cards);
}
