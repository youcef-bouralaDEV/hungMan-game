let letterHolder = document.querySelector(".letters");
let letters = document.querySelectorAll(".letters span");
let lettersGuess = document.querySelector(".letters-guess");
let result = document.querySelector(".result");
let counterElement = document.querySelector(".counter span");
let hangmanDraw = document.querySelector(".hangman-draw");
let btn = document.querySelector(".btn");

let counter=0;
let max= 8;
let randomWord;
let rightGuesses = [];
let wrongGuesses = [];
let rightWord = ["algeria","brazil", "england", "germany","ma"];
let letterFrom = "abcdefghigklmnopqrstvyxyz";
let interval ;

let arrayLetter = Array.from(letterFrom);

for (let i = 0; i < arrayLetter.length; i++) {
     let character = document.createElement("span");
     character.dataset.id = arrayLetter[i];
     let characterText = document.createTextNode(arrayLetter[i]);
         character.appendChild(characterText);
         letterHolder.appendChild(character);
 }

   function handleInput() {
     reset()
     let randomIndex = Math.floor(Math.random() * rightWord.length);
     randomWord = rightWord[randomIndex];
     for (let j = 0; j < randomWord.length; j++) {
       let span = document.createElement("span");
       span.className = randomWord[j];
       lettersGuess.appendChild(span);
   }
  

 }


letterHolder.addEventListener("click", (e) => {
     let chosenLetter = e.target.dataset.id;
     let letterFound = false;
  
     for (let i = 0; i < randomWord.length; i++) {
         if (randomWord[i] === chosenLetter && !rightGuesses.includes(chosenLetter)) {
           let spanElements = lettersGuess.querySelectorAll(`span:nth-of-type(${i + 1})`);
           spanElements.forEach((span) => {
             span.innerHTML = chosenLetter.toUpperCase();
         });
            rightGuesses.push(chosenLetter);
           letterFound = true;
        }
    }
    
     if (!letterFound) {
       wrongGuesses.push(chosenLetter);
       counter++;
       counterElement.innerHTML = counter ;
       hangmanDraw.classList.add(`wrong-${counter}`)
     }
     showResult()
   });

 function showResult(){
  if(rightGuesses.length === randomWord.length){
      letterHolder.classList.add("stop-clicking");
      result.classList.add("popup");
      result.innerHTML =`<p>You win !</p>` ;
      btn.style.display = "block" 
   }
   else if(wrongGuesses.length >=max){
     result.innerHTML =`<p>Game Over the word is :<br>${randomWord}</p>`;
     letterHolder.classList.add("stop-clicking") ;
     result.classList.add("popup") ;
     btn.style.display = "block"

   }
 }

   btn.addEventListener("click", handleInput);



  function reset(){
     rightGuesses= []
     wrongGuesses= []
     counter= 0 ;
     counterElement.innerHTML = counter
     lettersGuess.innerHTML = ""
     letterHolder.classList.remove("stop-clicking") ;
     result.classList.remove("popup") ;
     result.innerHTML = "" ;
     hangmanDraw.className='hangman-draw' ;
     btn.style.display = "none" 
  

  
   }

   handleInput()




