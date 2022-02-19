// constants
var typeWait = 14000;
var selfAdjectives = ["Aspiring Programmer","Student","Advocate","Web Developer","Story-teller"];

// global variables
var shifting;
var shifting;
var selfAdjectivestack = [selfAdjectives[3]];
var currentType;
var sIndex;
// functions
function infiniteShift(index){
    // when you add the next string to the stack, it will delete what is currently being displayed
    selfAdjectivestack.push(selfAdjectives[index]);
    // quickly destroy the Typed object after, so our next one isn't competing with it (and any other previous ones)
    currentType.destroy();
    // adding the true parameter pops the first item of the selfAdjectivestack
    // leaving it with only the current string (header text)
    runTyped(true);
    //var cursor0 = document.getElementsByClassName("typed-cursor")[0];
    // so they run concurrently
    shiftSlides();
    // subtract 1000 off the timeout, since transitions take 1 second.
    shifting = setTimeout(function() {
        sIndex+=1;
        infiniteShift((index+1)%selfAdjectives.length);
    },typeWait);
}
function runTyped(doPop){
    // use the global variable selfAdjectivestack, so that other programs can modify it while in use
    var options = {
        strings: selfAdjectives,
        typeSpeed:50,
        backSpeed:50,
        loop:true
    };
    // adding the true parameter pops the first item of the selfAdjectivestack
    // leaving it with only the current string (header text)
    if (doPop){
        options.onStringTyped = function(){
            selfAdjectivestack.pop(0);
        };
    }
    // set the global variable currentType to the new instance of this object,
    // so another function can destroy it later (before it is replaced)
    currentType = new Typed("#selfAdjective", options);
}
// init code
$(document).ready(function() {
    // SLIDES INIT
    // type out the first company name
    runTyped();
    // set the first index to 3 becuase I don't even know.
    // whatever, it works. For some reason there's an offset, and I tried to accomodate that,
    // but apparently the only way to make it work is to start on the 4th item (with an index of 0)
    var sIndex = 3;
    infiniteShift(sIndex);
    // prevent shifting while the user isn't on the tab/window.
    // effectively preventing multiple shifts when the user returns
    $(window).blur(function() {
        clearTimeout(shifting);
        console.log("cleared")
    });
    $(window).focus(function(){
        shifting = setTimeout(function(){
            var ci = sIndex+1;
            if (ci < 0){
                ci = selfAdjectives.length + ci;
            } else{
                ci = ci % selfAdjectives.length;
            }
            sIndex = ci;
            infiniteShift(ci);
        },typeWait);
    });
    
});
