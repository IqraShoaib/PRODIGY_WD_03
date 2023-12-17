// To Select all the boxs
let boxes = document.querySelectorAll(".box");
// to select reset button
let resetbtn = document.querySelector("#reset-btn");
// to activate new game button
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// playerX or player0 and it changes alternatively
let turn0 = true;

// check or select all winning patterns or win possibilities with 2D arrays like array within array

const winPattterns = [
    [0, 1, 2, 5, 5, 0],
    [0, 3, 6, -5, 15, 90],
    [0, 4, 8, 5, 15, 45],
    [1, 4, 7, 5, 15, 90],
    [2, 5, 8, 15, 15, 90],
    [2, 4, 6, 5, 15, 135],
    [3, 4, 5, 5, 15, 0],
    [6, 7, 8, 5, 25, 0],  
];

const minmax = (state) => {
    // 1) If the state is terminal, return the score from O's perspective
    if (state.isTerminal() === true) {
      if (state.result === 'X') {
        return  -10; 
      } else if (state.result === 'O') {  
        return 10;
      } else {
        return 0;
      }
    } 
}

const resetGame = () => {
    turn0 = true;
    enaableBoxes();
    msgContainer.classList.add("hide");
}

//we want some actions when we press any button the we will avtivate eventlistener:
// then for every individual box we will add a seperate eventlistener.


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        
        if(turn0) {  
             //player0
            box.innerText = "0";
            turn0 = false;
        }
        else {   
            //playerX
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const enaableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `   Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");  
    disableBoxes();
}

const checkWinner = () => {
    for(let pattern of winPattterns) {
             let pos1Val = boxes[pattern[0]].innerText;
             let pos2Val = boxes[pattern[1]].innerText; 
             let pos3Val = boxes[pattern[2]].innerText;
             if (pos1Val != "" && pos2Val != "" && pos3Val != ""){
                if (pos1Val === pos2Val && pos2Val === pos3Val){
                    console.log("Winner", pos1Val);
                    showWinner(pos1Val);
                   
          }
       }
   }
};



newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
