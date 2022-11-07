let time = document.querySelector("#time");
let startButton = document.querySelector("#start");
let pauseButton = document.querySelector("#pause");
let durationInput = document.querySelector("#durationInput");
let circle = document.querySelector("circle");

let perimeter = circle.getAttribute("r") * 2 * Math.PI;
circle.setAttribute("stroke-dasharray", perimeter);

class Timer {
    #startingTime;
    #durationInput;
    #intervalID;
    #onTick;
    #onStopped;
    #onStart;

    constructor(durationInput , callbacks){
        this.#durationInput = durationInput;
        this.#startingTime = durationInput;
        this.#onTick = callbacks.tickCallback;
        this.#onStopped = callbacks.pauseCallback;
        this.#onStart = callbacks.startCallback;
    }

    set DurationInput(value){
        if (value >= 0){
            this.#durationInput = value;
            this.#startingTime =  this.#durationInput;
        }
    }

    get DurationInput(){
        return this.#durationInput;
    }

    start(){
        if(this.#durationInput === this.#startingTime){
            this.#onStart(this.#startingTime);
        }
                
       if(!this.#intervalID){
        this.#intervalID = setInterval( () => {
            if( parseFloat(this.DurationInput) === 0){
                this.pause();

            }
           
            if(this.#durationInput > 0){
                this.#durationInput = (this.#durationInput - 0.05).toFixed(2);
            }
            this.#onTick(this.#durationInput);
        }, 50)
       }
    }

    pause(){
        clearInterval(this.#intervalID);
        this.#intervalID = undefined;
        this.#onStopped();
    }
}

let duration;

let myTimer = new Timer(durationInput.value,
    {
        startCallback(initialTime) {
            alert(`${initialTime}, i have begun`);
            duration = initialTime;
            
        },

        tickCallback(timeLeft) {
            //update the text
            durationInput.value = timeLeft;
            

            //update the border
            circle.setAttribute("stroke-dashoffset", 
            perimeter * timeLeft / duration - perimeter);
        },

        pauseCallback() {
        }
    });

 durationInput.addEventListener("change", (event) => {
    myTimer.DurationInput = event.target.value;
   
 });

 startButton.addEventListener("click", () => {
    myTimer.start();
});

pauseButton.addEventListener("click", () => {
    myTimer.pause();

});

