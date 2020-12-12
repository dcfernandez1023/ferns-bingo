class Bingo {
  constructor() {
    this.initializeNums();
  }

  /*
    generates a bingo card (5x5 matrix)
  */
  /*
  generateCard() {
    let card = [[], [], [], [], []];
    let gridSize = 5;
    for(var i = 0; i < gridSize; i++) {
      var row = card[i];
      for(var j = 0; j < gridSize; j++) {
        row.push(this.getColNum(j));
      }
    }
    this.initializeNums();
    card[2][2] = 0;
    console.log(card);
    return card;
  }
  */
  generateCard() {
    let card = {0: [], 1: [], 2: [], 3: [], 4: []};
    let gridSize = 5;
    for(var i = 0; i < gridSize; i++) {
      for(var j = 0; j < gridSize; j++) {
        if(i === 2 && j === 2) {
          card[i].push(0);
          continue;
        }
        card[i].push(this.getColNum(j));
      }
    }
    this.initializeNums();
    return card;
  }

  /*
    gets a random number for the specified column
  */
  getColNum(colNum) {
    let colB = 0; let colI = 1; let colN = 2; let colG = 3; let colO = 4;
    var n;
    if(colNum === colB) {
      n = this.getRandomNum(this.B.length)
      return this.B.splice(n, 1)[0];
    }
    else if(colNum === colI) {
      n = this.getRandomNum(this.I.length)
      return this.I.splice(n, 1)[0];
    }
    else if(colNum === colN) {
      n = this.getRandomNum(this.N.length)
      return this.N.splice(n, 1)[0];
    }
    else if(colNum === colG) {
      n = this.getRandomNum(this.G.length)
      return this.G.splice(n, 1)[0];
    }
    else if(colNum === colO) {
      n = this.getRandomNum(this.O.length)
      return this.O.splice(n, 1)[0];
    }
    return -1;
  }

  /*
    generates a random number between 0 and the specified max
    intended to be used to get a random index to obtain a random number for a bingo column
  */
  getRandomNum(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  /*
    resets number options for each bingo column
    B: 0-15
    I: 16-30
    N: 31-45
    G: 46-60
    O: 61-75
  */
  initializeNums() {
    this.B = []; this.I = []; this.N = []; this.G = []; this.O = [];
    let BLimit = 15; let ILimit = 30; let NLimit = 45; let GLimit = 60; let OLimit = 75;
    for(var i = 1; i < 76; i++) {
      if(i <= BLimit) {
        this.B.push(i);
      }
      else if(i <= ILimit) {
        this.I.push(i);
      }
      else if(i <= NLimit) {
        this.N.push(i);
      }
      else if(i <= GLimit) {
        this.G.push(i);
      }
      else if(i <= OLimit) {
        this.O.push(i);
      }
    }
  }
}

export default Bingo;
