let step = 1;
let tab1 = "0123456789";
let tab2 = "9876543210";
let finalFin;
let userChoices = [];
let appChoices = [];

function Z_affich(message) {
  const messageDiv = document.getElementById("message");
  messageDiv.textContent = message;
}

function handleEnter(event) {
  if (event.key === "Enter") {
    submitInput();
  }
}

function submitInput() {
  const inputField = document.getElementById("userInput");
  const userInput = inputField.value;

  if (userInput.length !== 4 || isNaN(userInput)) {
    Z_affich("Veuillez entrer exactement 4 chiffres.");
    return;
  }

  userChoices.push(userInput); // Ajout du choix utilisateur
  inputField.value = "";

  if (step === 1) {
    const choix1Int = parseInt(userInput);
    const a = 2;
    const b = 20000;
    finalFin = choix1Int - a + b;
    Z_affich(`La réponse finale est de ${finalFin} ! Prennez ça en note vous aurez besoin de ça à la fin !`);
    addToTable(step, userInput, "—");
    step++;
  } else if (step === 2) {
    const appChoice = solona(tab1, tab2, userInput);
    appChoices.push(appChoice); // Ajout du choix ordinateur
    Z_affich(`Voila mon choix : ${appChoice} !`);
    addToTable(step, userInput, appChoice);
    step++;
  } else if (step === 3) {
    const appChoice = solona(tab1, tab2, userInput);
    appChoices.push(appChoice); // Ajout du choix ordinateur
    Z_affich(`Voila mon dernier choix : ${appChoice} !`);
    addToTable(step, userInput, appChoice);
    step++;
    finalVerification();
  }
}

function solona(tab1, tab2, chiffres) {
  let result = "";
  for (const digit of chiffres) {
    const index = tab1.indexOf(digit);
    result += tab2[index];
  }
  return result;
}

function addToTable(step, userChoice, appChoice) {
  const tableBody = document.getElementById("choicesTableBody");
  const row = document.createElement("tr");

  const stepCell = document.createElement("td");
  stepCell.textContent = `Étape ${step}`;
  const userCell = document.createElement("td");
  userCell.textContent = userChoice;
  const appCell = document.createElement("td");
  appCell.textContent = appChoice;

  row.appendChild(stepCell);
  row.appendChild(userCell);
  row.appendChild(appCell);
  tableBody.appendChild(row);
}

function finalVerification() {
    const confirm = window.confirm("Vous voulez qu'on vérifie le calcul en additionnant ?");
    if (confirm) {
      setTimeout(() => {
        Z_affich(
          `Voici comment faire le calcul :\n\n` +
          `Ton premier choix + Ton deuxième choix + Mon premier choix + Ton dernier choix + Mon dernier choix.\n\n` +
          `Le calcul à faire est :\n\n` +
          `${userChoices[0]} + ${userChoices[1]} + ${appChoices[0]} + ${userChoices[2]} + ${appChoices[1]}\n\n` +
          `Maintenant, combien donne ce calcul ?`
        );
        
        const userResult = prompt("Additionnez tous les chiffres dans le tableau : "+ userChoices[0] +"+"+ userChoices[1] +"+"+ appChoices[0] +"+"+ userChoices[2] +"+"+ appChoices[1] +" = ??? \nCela donne combien ?");
        
        const resultFinal =
          parseInt(userChoices[0]) +
          parseInt(userChoices[1]) +
          parseInt(userChoices[2]) +
          parseInt(appChoices[0]) +
          parseInt(appChoices[1]);
  
        if (parseInt(userResult) === resultFinal) {
          Z_affich(
            `Bravo ! Le total correspond à ce que j'ai deviné au début, soit ${finalFin}, peu importe vos choix !\n Dis-moi comment j'ai fait ?`
          );
        } else {
          Z_affich(
            `Vérifiez votre calcul ! Vous devez avoir : ${finalFin}, soit le résultat que j'ai deviné au début.`
          );
        }
      }, 1500); // Délai de 2 secondes avant l'affichage du message
    } else {
      Z_affich("Merci de votre participation !");
    }
  
    const inputField = document.getElementById("userInput");
    inputField.disabled = true;
  
    // Créer et insérer le bouton dans un conteneur si ce n'est pas déjà fait
    const buttonContainer = document.getElementById("buttonContainer");
    
    // Vérifier si le bouton "Jouer encore" existe déjà
    if (!buttonContainer.querySelector("button")) {
      const replayButton = document.createElement("button");
      replayButton.textContent = "Jouer encore";
      replayButton.onclick = restartGame;
      buttonContainer.appendChild(replayButton);
    }
  }
  
  function restartGame() {
    step = 1;
    userChoices = [];
    appChoices = [];
    finalFin = undefined;
  
    const tableBody = document.getElementById("choicesTableBody");
    tableBody.innerHTML = "";
  
    const inputField = document.getElementById("userInput");
    inputField.disabled = false;
    inputField.value = "";
  
    const buttonContainer = document.getElementById("buttonContainer");
    const replayButton = buttonContainer.querySelector("button");
    if (replayButton) {
      buttonContainer.removeChild(replayButton);
    }
  
    Z_affich("Bienvenue dans le jeu, entrez votre premier choix !");
  }
