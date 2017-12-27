/*
    Name: Nuo Chen
    Section: AF
    Date: 04/18/2017
    This is the javascript file for the speedreader, a computer program that 
    helps with RSVP: rapid serial visual presentation
*/

(function() { //Module Pattern
    
    'use strict';
    
    var $ = function(id) { return document.getElementById(id); };
    var timer = null;
    var textarray = null;
    var index = 0;
    var interval = 0; 
    
    // This is the windows onload function that gets called when the window 
    // finishes loading.
    window.onload = function() {
        
        interval = $("selection").value;
        
        $("selection").onchange = speedChange; 
        
        $("start").onclick = start;
        
        $("stop").onclick = stop; 
        
        var elements = document.getElementsByName("size");
        for(var i=0; i < elements.length; i++){
            elements[i].onclick = function() {
                $("speedreading").style.fontSize = this.value;
            }
        }
        
    }
    
    // This function processes the input text so that the input text string is
    // separated based on the white spaces and stored into an array. After the 
    // input text string gets separated, if the resulting string ends with a 
    // punctuation character: comma, period, exclamation point, question mark, 
    // semicolon or colon, the last punctuation character is removed and a identical
    // copy of the same string is inserted into the array. For example:
    // if the input text string is "Hello, my name is potato!",
    // the resulting array would be ["Hello", "Hello", "my", "name", "is", "potato", "potato"]
    function processArray() {
        textarray = $("input").value.split(/[ \t\n]+/);
        var punc = [",", ".", "!", "?", ";", ":"];            
        for (var i = 0; i < textarray.length; i++) {
            var wordlength = textarray[i].length;
            for (var j = 0; j < punc.length; j++) {
                if (textarray[i].charAt(wordlength - 1) == punc[j]) {
                    
                    textarray[i] = textarray[i].substring(0, wordlength - 1);
                    textarray.splice(i + 1, 0, textarray[i]);
                    i = i + 1;
                }
            }
        }    
    }
    
    // This function is called when a different option of the dropdown menu is selected
    // This function updates the time interval based on the chosen dropdown menu
    // option. 
    function speedChange() {
        clearInterval(timer);
        interval = this.value;
        if ($("start").disabled) {
            changeTime();
        }
    }

    // This function starts the timer so that another function gets called every
    // x milliseconds. 
    function changeTime() {
        timer = setInterval(read, parseInt(interval));
    }   
    
    // This function will display each frame of the text animation based on the 
    // given text array. A new element from the array is displayed in the div box
    // everytime this function gets called, when there are no more elements in the array
    // it calls another function stop. 
    function read() {
        if (index < textarray.length) {
            $("speedreading").innerHTML = textarray[index];
            index = index + 1;
        } else {
            stop();
        }
    }
    
    // This function handles the event when the start button is clicked, it disables
    // the "start" button, enables the "stop" button and starts text animation. 
    function start() {
        processArray();
        $("start").disabled = true;
        $("stop").disabled = false;
        changeTime();
    }

    // This function handles the event when the stop button is clicked or when 
    // the text animation is finished (after finish displaying all the elements inside
    // the array). This function enables the "start" button and disables the "stop"
    // button. In addition, this function clears the timer and resets the index of 
    // the array, and clears the displaying box. 
    function stop() {
        $("start").disabled = false;
        $("stop").disabled = true;
        
        $("speedreading").innerHTML = "";
        clearInterval(timer);
        timer = null;
        index = 0;
    }
    
})(); //End Module