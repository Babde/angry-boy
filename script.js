
// VARIABLES 

var score = 0

let multiObjet = {
    prix: 10,
    nombre:1,
    multiplicateur:1,
    augmenter(){
      ++this.multiplicateur;
      ++this.nombre;
    },
    calprix(){
      this.prix = this.prix*2;
    }
}

let autoclicObjet = {...multiObjet}


let multiplicateur = 1;
let multibutton = document.getElementById("multiplier");
let bonusActif=false;
let prixaffichage = document.getElementsByClassName("prix")[0];
let compteur = document.getElementsByClassName("compteur")[0];
let affichage = document.getElementById("affichage");
let prixAutoClicker = document.getElementsByClassName("prixAutoClicker")[0];
let combienAC = document.getElementsByClassName("combienAC")[0];



// CHANGEMENT IMAGES de joel
document.querySelector("#joel").addEventListener("mousedown", sourisEnBas)
document.querySelector("#joel").addEventListener("mouseup", sourisEnHaut)

function sourisEnBas() {
    let joel = document.querySelector("#joel")     
    result = images.find(element => element.min <= score && element.max > score)
    joel.src= result.mousedown;
}

function sourisEnHaut() {
    let joel = document.querySelector("#joel");
    result = images.find(element => element.min <= score && element.max > score)
    joel.src= result.mouseup;
}

let images = [
    { mouseup: "image/1.png", mousedown: "image/1.2.png", min: 0, max: 50 },
    { mouseup: "image/2.png", mousedown: "image/2.2.png", min: 50, max: 100 },
    { mouseup: "image/3.png", mousedown: "image/3.2.png", min: 100, max: 200 },
    { mouseup: "image/4.png", mousedown: "image/4.2.png", min: 200, max: 300 },
    { mouseup: "image/5.png", mousedown: "image/5.2.png", min: 300, max: 400 },
];


document.querySelector("#joel").addEventListener("click", mettreaJourMonResult)


// SON AU CLICK 

function audio(){

    audioClic.play()

}

const audioClic = new Audio('sonclic.mp3');
document.querySelector('#joel').addEventListener('click', audio);

// MUSIQUE AMBIANCE

function audioFond(){

    audioAmbiance.play()

}

const audioAmbiance = new Audio('musiquefond.mp3');
document.querySelector('#musique').addEventListener('click', audioFond);

var buttonstate=0;
function onoff(element)
{
  buttonstate= 1 - buttonstate;
  var blabel, bstyle, bcolor;
  if(buttonstate)
  {
    blabel="on";
    // bstyle="gray";
    bcolor="green";
    audioAmbiance.volume = 0;

  }
  else
  {
    blabel="OFF";
    bstyle="lightgray";
    bcolor="gray";
    audioAmbiance.volume = 1;
  }
  var child=element.firstChild;
  child.style.background=bstyle;
  child.style.color=bcolor;
  child.innerHTML=blabel;
}




// MISE A JOUR SCORE 

function mettreaJourMonResult() {
    score = score+ multiObjet.multiplicateur
    // document.querySelector("#result").innerHTML = "Score : " + score; 
    
    actualisationAffichage()
}

function actualisationAffichage(){
    affichage.innerText = "Score : " + score;   
    if(score >= multiObjet.prix){
        document.getElementById('multiplier').style.opacity=1;
    } else {
        document.getElementById('multiplier').style.opacity=0;
    }
    if(score >= autoclicObjet.prix){
        document.getElementById('autoclickerCTA').style.opacity=1;
    }else {
        document.getElementById('autoclickerCTA').style.opacity=0;
    }    
}

// MULTIPLICATEUR 

function game(base) {
    let achete = score >= base.prix
    if (achete) {
        score = score - base.prix;
        base.calprix();
        base.augmenter();
        multiplicateur = base.multiplicateur;
        if  (bonusActif==true){
          multiplicateur = multiplicateur*2;
        }
        
    }
    return achete
}

function refreshMultiplicateur(){
    prixaffichage.innerText = multiObjet.prix;
    compteur.innerText ="x " + multiObjet.nombre;
    affichage.innerText = "Score : " + score;
}


document.querySelector("#multiplier").addEventListener("click", () => {game(multiObjet); refreshMultiplicateur(); pluiePierre()})


// AUTOCLICKER 

function refreshAutoClicker(){
    prixAutoClicker.innerText = autoclicObjet.prix;
    combienAC.innerText ="x " + autoclicObjet.nombre;
    affichage.innerText = "Score : " + score;
}

function autoclic(){

    achete = game(autoclicObjet);
    refreshAutoClicker();
    if(achete) {
        setInterval(mettreaJourMonResult,1000);
    }
}

document.querySelector("#autoclickerCTA").addEventListener("click", autoclic)

// ANIMATION PLUIE PIERRE

function pluiePierre() {

    const NB_PIERRE = 20;
    
    for (let index = 0; index < NB_PIERRE; index++) {
        const element = document.createElement('img');
        element.src = './image/pierre.png'
        element.className = 'pierre'
        x = Math.round(Math.random() * 100)
        y = Math.round(Math.random() * 10)
        element.style.left = x + 'vw';
        element.style.top = y + 'vh';
        document.querySelector('body').appendChild(element)
    }
}









