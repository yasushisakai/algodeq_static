/**
 * Created by 03983 on 14/03/25.
 */

//variables neede for three.js
var canvas, camera, scene, renderer, controls, clock, projector;

// globals
var unitSize = 1820;
var unitHeight = 3000;
var resolution = 8;
var unitLength = unitSize * resolution;

var maxFloor = 4; // include RF level;

//////////
// helper function for sequential frame
/////////

function zeroAdd(num) {

    if (num < 10)return "0000" + num;
    else if (num < 100)return "000" + num;
    else if (num < 1000)return "00" + num;
    else if (num < 10000)return "0" + num;
    else return "" + num;

}


function shuffle(array) {
    //shuffles the array
    var m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
}


