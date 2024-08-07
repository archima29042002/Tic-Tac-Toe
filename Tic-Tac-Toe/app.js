// For access the buttons
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX , playerO
let count = 0; //To draw

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // console.log("box was clicked");
        if (turnO) {
            //playerO
            box.innerText = "X";
            turnO = false;
        } else {
            //playerX
            box.innerText = "O";
            turnO = true;
        }
        box.disabled = true;
        count++;
        
        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
          gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = `Game was Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
  };

  
const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText ="";
    }
}

const showWinner =(Winner) => {
    msg.innerText = `Congratulations!! Winner is ${Winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        // console.log(pattern[0], pattern[1], pattern[2]);
        // console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText);

        let position1 = boxes[pattern[0]].innerText;
        let position2 = boxes[pattern[1]].innerText;
        let position3 = boxes[pattern[2]].innerText;

        if(position1 != "" && position2 != "" && position3 != ""){
            if(position1 === position2 && position2 === position3){
                // console.log("Winner!!", position1);
                showWinner(position1);
                return true;
            }
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

