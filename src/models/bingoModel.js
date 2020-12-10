//model for an actual bingo card
export const card = {
  id: "",
  grid: {}
}

//this will persist in local storage until user requests new cards
export const selectedGrid = {
  id: []
}

export const headers = [
  {value: "B", color: "#196F3D"},
  {value: "I", color: "#CB4335"},
  {value: "N", color: "#196F3D"},
  {value: "G", color: "#CB4335"},
  {value: "O", color: "#196F3D"},
]
