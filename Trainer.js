var checkBox = document.getElementById("checkbox");
let AUFs =["", "U2", "U", "U'"];
let AUF;
var running = false;
var interval;
var decimal = 0;
var sec = 0;
var min = 0;
var cs = 0;
var decimalOut = document.getElementById("decimal");
var secOut = document.getElementById("sec");
var minOut = document.getElementById("min");
var colon = document.getElementById("colon");
var timesOut = document.getElementById("timeOut");
var timesList = document.getElementById("timeList");
var clearAll = document.getElementById("clear");
var timesDisplay = new Array();
var csTimes = new Array();
var avAll = 0;
var avAllOut = document.getElementById("overallAv");
var best = 999999999999999999;
var bestOut = document.getElementById("fastest");
var worst = 0;
var numSolves = 0;
var total = 0;
var numSolvesOut = document.getElementById("solveNum");

let scrambles = [["R", "U", "R'", "U", "R", "U2", "R'"], ["R2", "D", "R'", "U2", "R", "D'", "R'", "U2", "R'"], ["S","R", "U", "R'", "U'", "R'", "F", "R", "f'"], ["R'", "U", "R'", "U'", "R3", "U'", "R'", "U", "R", "U", "R2"], ["R'", "U", "R'", "U'", "y", "R'", "F'", "R2'", "U'", "R'", "U", "R'", "F", "R", "F"]];
let inverseMove;
let inverseScramble = [];
var oppositemove = {
  //Normal moves
  "R": "R'", "R'": "R", "R2":"R2", "R2'":"R2", "U": "U'", "U'": "U", "U2": "U2", "U2'":"U2", "L": "L'", "L'": "L", "L2":"L2", "L2'":"L2", "D": "D'", "D'": "D", "D2": "D2", "D2'": "D2", "F": "F'", "F'": "F", "F2": "F2", "F2'": "F2", "B": "B'", "B'": "B", "B2": "B2", "B2'":"B2", "R3": "R", "R3'": "R'", "U3": "U", "U3'": "U'", "L3": "L", "L3'": "L'", "D3": "D", "D3'": "D'", "F3": "F", "F3'": "F'", "B3": "B", "B3'": "B'",
  //Wide moves
  "r": "r'", "r'": "r", "r2":"r2", "r2'":"r2", "u": "u'", "u'": "u", "u2": "u2", "u2'":"u2", "l": "l'", "l'": "l", "l2":"l2", "l2'":"l2", "d": "d'", "d'": "d", "d2": "d2", "d2'": "d2", "f": "f'", "f'": "f", "f2": "f2", "f2'": "f2", "b": "b'", "b'": "b", "b2": "b2", "b2'":"b2", "r3": "r", "r3'": "r'", "u3": "u", "u3'": "u'", "l3": "l", "l3'": "l'", "d3": "d", "d3'": "d'", "f3": "f", "f3'": "f'", "b3": "b", "b3'": "b'",
  //Slice moves
  "M":"M'", "M'":"M", "M2": "M2", "M2'": "M2", "E":"E'", "E'":"E", "E2": "E2", "E2'": "E2", "S":"S'", "S'":"S", "S2": "S2", "S2'": "S2", "M3": "M", "M3'": "M'", "E3": "E", "E3'": "E'", "S3": "S", "S3'": "S'",
  //Rotations
  "x":"x'", "x'": "x", "x2": "x2", "x2'":"x2", "y":"y'", "y'": "y", "y2": "y2", "y2'":"y2", "z":"z'", "z'": "z", "z2": "z2", "z2'":"z2", "x3":"x", "x3'": "x'", "y3":"y", "y3'": "y'","z3":"z", "z3'": "z'"
};
var animationmove = {
  //Normal moves
  "R": "R", "R'": "R-", "R2":"R2", "R2'":"R2-", "U": "U", "U'": "U-", "U2": "U2", "U2'":"U2-", "L": "L", "L'": "L-", "L2":"L2", "L2'":"L2-", "D": "D", "D'": "D-", "D2": "D2", "D2'": "D2-", "F": "F", "F'": "F-", "F2": "F2", "F2'": "F2-", "B": "B", "B'": "B-", "B2": "B2", "B2'":"B2-", "R3": "R3", "R3'": "R3-", "U3": "U3", "U3'": "U3-", "L3": "L3", "L3'": "L3-", "D3": "D3", "D3'": "D3-", "F3": "F3", "F3'": "F3-", "B3": "B3", "B3'": "B3-",
  //Wide moves
  "r": "r", "r'": "r-", "r2":"r2", "r2'":"r2-", "u": "u", "u'": "u-", "u2": "u2", "u2'":"u2-", "l": "l", "l'": "l-", "l2":"l2", "l2'":"l2-", "d": "d", "d'": "d-", "d2": "d2", "d2'": "d2-", "f": "f", "f'": "f-", "f2": "f2", "f2'": "f2-", "b": "b", "b'": "b-", "b2": "b2", "b2'":"b2-", "r3": "r3", "r3'": "r3-", "u3": "u3", "u3'": "u3-", "l3": "l3", "l3'": "l3-", "d3": "d3", "d3'": "d3-", "f3": "f3", "f3'": "f3-", "b3": "b3", "b3'": "b3-",
  //Slice moves
  "M":"M", "M'":"M-", "M2": "M2", "M2'": "M2-", "E":"E", "E'":"E-", "E2": "E2", "E2'": "E2-", "S":"S", "S'":"S-", "S2": "S2", "S2'": "S2-", "M3": "M3", "M3'": "M-", "E3": "E3", "E3'": "E3-", "S3": "S3", "S3'": "S3-",
  //Rotations
  "x":"x", "x'": "x-", "x2": "x2", "x2'":"x2-", "y":"y", "y'": "y-", "y2": "y2", "y2'":"y2-", "z":"z", "z'": "z-", "z2": "z2", "z2'":"z2-", "x3":"x3", "x3'": "x3-", "y3":"y3", "y3'": "y3-","z3":"z3", "z3'": "z3-"
};
let alg;
let reverseScramble;
let move;
let animationScramble =[];
let string = "Animation";

generateScramble();
animation();

function pickRandomCase(){
//sets the variable "alg" to a  random number between 0 and the length of scrambles
alg = Math.floor(Math.random() * scrambles.length);

}

function reverseTheScramble(){
//reverses the item "alg" in scrambles
reverseScramble = [...scrambles[alg]].reverse();
}

function inverseTheScramble(){
inverseScramble = [];

for (let i = 0; i < reverseScramble.length; i++) {
  inverseMove = oppositemove[reverseScramble[i]];
  inverseScramble.push(inverseMove);
}
}

function addAUF(){

    if(checkBox.checked == true){
      AUF=Math.floor(Math.random() * 4)
      inverseScramble.unshift(AUFs[AUF]);
    }
}

function generateScramble(){
   pickRandomCase();
        reverseTheScramble();
        inverseTheScramble();
        addAUF();
        document.getElementById("scramble").innerText = inverseScramble.join(" ");
}

function showAlg(){
document.getElementById("alg").innerText = scrambles[alg].join(" ");
}

function hideAlg(){
  document.getElementById("alg").innerText = " ";
}

function animationHide(){
  animationScramble = [];
}

function animation(){
  animationHide();
for (let i = 0; i < scrambles[alg].length; i++) {
  move = animationmove[scrambles[alg][i]];
  animationScramble.push(move);


}
 let animationmoves = string.link("alg.cubing.net/?type=alg&alg=" + animationScramble.join("_") + "&type=alg");

document.getElementById("animation").innerHTML = animationmoves;
}

function timer() {
  decimal++;
  cs++; //counts time in centiseconds
  decimalOut.innerHTML = decimal;
  if (decimal >= 100) {
    decimal = 0;
    sec++;

    if (sec > 59) {
      sec = 0;
      min++;
      colon.innerHTML = ":";
      minOut.innerHTML = min;
    }
    if (sec <= 9 && min > 0) {
      sec = "0" + sec;
    }
    secOut.innerHTML = sec;
  }

  if (decimal <= 9) {
    decimal = '0' + decimal;
    decimalOut.innerHTML = decimal;
  }

}

document.onkeyup = function(e){
    e = e || window.event;
    var key = e.which || e.KeyCode;
    if(key===32){
        run();
    }
}

function run() {
  if (!running) {
    decimal = 0;
    sec = 0;
    min = 0;
    cs = 0;
    secOut.innerHTML = "0";
    minOut.innerHTML = "";
    colon.innerHTML = "";
    running = true;
    scramble = "";
    interval = setInterval(timer, 10);
  } else if (running) {
    running = false;
    clearInterval(interval);
    timesDisplay.push(" " + timesOut.innerHTML);
    csTimes.push(cs);
    timesList.innerHTML = timesDisplay;
    calculateStats();
    hideAlg();
    animationHide();
  }
}

clearAll.onclick = clearTimes;

function clearTimes() {
  numSolves = 0;
  numSolvesOut.innerHTML = "Solves: " + numSolves;
  best = 99999999999;
  bestOut.innerHTML = "Best: ";
  worst = 0;
  avAll = 0;
  total = 0;
  avAllOut.innerHTML = "Average: ";
  timesDisplay = [];
  csTimes = [];
  timesList.innerHTML = timesDisplay;
}

function calculateStats() {
  numSolves++;
  total = 0;
  numSolvesOut.innerHTML = "Solves: " + numSolves;
  for (var x = 0; x < csTimes.length; x++) {
    if (csTimes[x] < best) {
      best = csTimes[x];
    }
    if (csTimes[x] > worst) {
      worst = csTimes[x];
    }
    total += csTimes[x];
  }
  avAll = total / numSolves;
  avAllOut.innerHTML = "Average: " + formatTime(avAll);
  bestOut.innerHTML = "Best: " + formatTime(best);
  generateScramble();
}

function formatTime(t) {
  //m = minute, s = second, c = centisecond
  var m = 0,
    s = 0,
    c = 0,
    out = "";
  m = Math.floor(t / 6000);
  t = t % 6000;
  s = Math.floor(t / 100);
  t = t % 100;
  c = Math.floor(t);
  if (m < 1) {
    m = "";
  } else {
    m = m + ":";
    if (s < 10) {
      s = "0" + s;
    }
  }
  if (c < 10) {
    c = "0" + c;
  }

  out = "" + m + s + "." + c;
  return out;
}
