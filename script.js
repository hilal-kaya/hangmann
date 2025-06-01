const letterpart = document.getElementById("letter-part");
const optionspart = document.getElementById("options-part");
const userInputSection = document.getElementById("user-input-section");
const newGamepart = document.getElementById("new-game-part");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");
document.getElementById("game-music").play();

//categories
let options = {
  animals: [
    "lion", "zebra", "turtle", "dog", "parrot", "eagle", "elephant", "bear",
    "fox", "dolphin", "kangaroo", "raccoon", "panther", "otter", "hedgehog",
    "penguin", "leopard", "giraffe", "alligator", "chameleon", "rhino",
    "koala", "wolf", "camel", "jaguar", "octopus", "whale", "flamingo",
    "hamster", "rabbit", "badger", "swan", "sloth"
  ],
  countries: [
    "turkey", "japan", "germany", "brazil", "egypt", "france", "italy", "india",
    "canada", "australia", "sweden", "argentina", "thailand", "portugal", "greece",
    "norway", "denmark", "chile", "colombia", "indonesia", "iran", "mexico",
    "poland", "peru", "southafrica", "russia", "finland", "ireland", "nepal",
    "pakistan", "vietnam", "ukraine", "hungary", "switzerland"
  ],
  jobs: [
    "doctor", "teacher", "engineer", "chef", "police", "lawyer", "veterinarian",
    "pilot", "driver", "tailor", "firefighter", "scientist", "actor", "architect", "barber",
    "dentist", "pharmacist", "nurse", "mechanic", "electrician", "plumber", "farmer",
    "journalist", "psychologist", "translator", "programmer", "photographer",
    "receptionist", "cashier", "designer", "accountant", "developer", "biologist"
  ],
  foods: [
    "pizza", "baklava", "dumpling", "kebab", "soup", "menemen", "delight", "bagel",
    "olive", "burrito", "lasagna", "hummus", "sushi", "croissant",
    "hamburger", "spaghetti", "noodles", "sandwich", "risotto", "salad",
    "steak", "pancake", "waffle", "toast", "paella", "taco", "falafel",
    "chocolate", "cheesecake", "brownie", "donut", "yogurt", "curry"
  ],
  objects: [
    "chair", "table", "mirror", "phone", "computer", "bag", "book", "pen", "lamp",
    "notebook", "backpack", "keyboard", "remote", "bicycle",
    "glasses", "scissors", "pillow", "blanket", "clock", "umbrella", "wallet",
    "bottle", "camera", "microwave", "toothbrush", "helmet", "flashlight",
    "monitor", "charger", "printer", "stapler", "calendar", "thermometer"
  ],
  advanced: [
    "mythology", "quarantine", "criticism", "strategy", "psychology",
    "geopolitics", "paradigm", "aristocracy", "contractor", "artisan", "mediation",
    "synonym", "forecaster", "integration", "innovation", "hypothesis", "phenomenon",
    "biodiversity", "sustainability", "meridian", "philosophy", "entrepreneurship",
    "globalization", "nanotechnology", "cybersecurity", "cryptocurrency",
    "neurology", "cinematography", "rationalism", "metaphor", "anthropology",
    "revolution", "sociology", "transparency", "infrastructure", "collaboration"
  ]
};

//counters
let winCount = 0;
let count = 0;
let guessedWord = "";

//Option keys
const displayOptions = () => {
  optionspart.innerHTML += `<h3>Please select a category: </h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionspart.appendChild(buttonCon);
};

//disable buttons
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  //all category buttons disable
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });
  //disable letters
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGamepart.classList.remove("hide");
};

//create word
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  //selected buton
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });
  //delete previous word and show letter part
  letterpart.classList.remove("hide");
  userInputSection.innerText = "";
  let optionArray = options[optionValue];
  //select random word
  guessedWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  guessedWord = guessedWord.toUpperCase();
  //swap _ with dashes
  let displayItem = guessedWord.replace(/./g, '<span class="dashes"> _ </span>');
  //show span elements
  userInputSection.innerHTML = displayItem;
};
const music = document.getElementById('game-music');
const toggleBtn = document.getElementById('toggle-music');

let isPlaying = true;


music.play();

toggleBtn.addEventListener('click', function () {
    if (!isPlaying) {
        music.muted = false;
        music.play();
        toggleBtn.textContent = "⏸ Stop Music";
    } else {
        music.pause();
        toggleBtn.textContent = "⊳ Play Music";
    }
    isPlaying = !isPlaying;
});



//begining functiomn 
const initializer = () => {
  stopSwing(); // ➕ stop swinging
  userInputSection.innerText = "";

  winCount = 0;
  count = 0;
  resultText.innerHTML = "";
  //remove previous contents
  optionspart.innerHTML = "";
  letterpart.classList.add("hide");
  newGamepart.classList.add("hide");
  letterpart.innerHTML = "";
  //create letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    //ASCII to character
    button.innerText = String.fromCharCode(i);
    //letter click event
    button.addEventListener("click", () => {
      let charArray = guessedWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      //If the word contains a letter, replace it, otherwise increase the incorrect counter
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          if (char === button.innerText) {
            // _ swap letter
            dashes[index].innerText = char;
            // increase win counter
            winCount += 1;
            //If all letters are found win the game
            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>WIN!!</h2><p>Word: <span>${guessedWord}</span></p>`;
              blocker();
            }
          }
        });
      } else {
        //increase incorrect counter
        count += 1;
        //draw hangman
        drawMan(count);
        //lose the game with 6 mistakes
        
        if (count == 6) {
          startSwing();

          setTimeout(() => {
            resultText.innerHTML = `<h2 class='lose-msg'>FAILED!!</h2><p>Word: <span>${guessedWord}</span></p>`;
            blocker();
          }, 2000); 
        }
        
      }
      //disable clicked letter
      button.disabled = true;
    });
    letterpart.append(button);
  }
  displayOptions();
  //statr canvas
  let { initialDrawing } = canvasCreator();
  initialDrawing();
};

const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;
  //line drawing function
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };
  //draw head
  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };
  //draw body
  const body = () => {
    drawLine(70, 40, 70, 80);
  };
  //draw left arm
  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };
  //draw right arm
  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };
  //draw left leg
  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };
  //draw right leg
  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };
  //draw initial frame
  const initialDrawing = () => {
    //clear canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //underline
    drawLine(10, 130,130, 130);
    //left line 
    drawLine(10, 10, 10, 131);
    //top line 
    drawLine(10, 10, 70, 10);
    //hanger line
    drawLine(70, 10, 70,20);
  };
  return { initialDrawing, head,body, leftArm, rightArm, leftLeg, rightLeg };
};

//draw man
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      
      break;
    default:
      break;
  }
};

const drawHangingMan = (context) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  head();
  body();
  leftArm();
  rightArm();
  leftLeg();
  rightLeg();
};

let swingAngle = 0;
let swingDirection = 1;
let swingInterval = null;

const startSwing = () => {
  if (swingInterval) return;

  let context = canvas.getContext("2d");
  let { initialDrawing } = canvasCreator();

  swingInterval = setInterval(() => {
    swingAngle += swingDirection * 1;

    if (swingAngle > 5 || swingAngle < -5) {
      swingDirection *= -1;
    }
    // Clear all contents
    context.setTransform(1, 0, 0, 1, 0, 0); // Reset
    context.clearRect(0, 0, canvas.width, canvas.height);

    // drawn
    initialDrawing();

    context.translate(70, 20); // Center according to the hanger end
    context.rotate((swingAngle * Math.PI) / 180);
    context.translate(-70, -20);

    drawHangingMan(context); // draw the hanging man

    context.setTransform(1, 0, 0, 1, 0, 0); // Reset
  }, 50);
  
};
const stopSwing = () => {
  if (swingInterval) {
    clearInterval(swingInterval);
    swingInterval = null;
    swingAngle = 0;
  }
};
//start new game
newGameButton.addEventListener("click", initializer);
newGameButton.addEventListener("click", () => {
  initializer();

});

window.onload = initializer;
