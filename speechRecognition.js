if ("webkitSpeechRecognition" in window) {
  let speechRecognition = new webkitSpeechRecognition();
  let final_transcript = "";
  let length = 0;
  var storedEvent;
  let interim_transcript = "";


  speechRecognition.continuous = true;
  speechRecognition.interimResults = true;
  speechRecognition.lang = ['en-US', 'United States']

  speechRecognition.onstart = () => {
    document.querySelector("#status").style.display = "block";
  };
  speechRecognition.onerror = () => {
    document.querySelector("#status").style.display = "none";
    console.log("Speech Recognition Error");
  };
  speechRecognition.onend = () => {
    document.querySelector("#status").style.display = "none";
    console.log("Speech Recognition Ended");
  };

  speechRecognition.onresult = (event) => {
    interim_transcript = "";
    length = event.results.length;
    storedEvent = event;

    for (let i = event.resultIndex; i < length; ++i) {
      if (event.results[i].isFinal) {

          
        final_transcript += event.results[i][0].transcript;
        if (final_transcript.split(" ").includes("stop") || final_transcript.split(" ").includes("end")) { 
            speechRecognition.stop();
            final_transcript = "";
            interim_transcript = "";
        }
        
        if (final_transcript.split(" ").includes("clear")) { 
            final_transcript = "";
            interim_transcript = "";
        }

      //   if (final_transcript.split(" ").includes("clear the board")) { 
      //     console.log("in clear the board");
      //     final_transcript = "";
      //     interim_transcript = "";
      //     clearBoard(board);
      //     drawGrid();
      // }
        
        if (final_transcript.split(" ").includes("undo")) { 
            console.log("In undo");
            final_transcript = "";
            interim_transcript = "";
        }
        
        if (final_transcript.split(" ").includes("drop")) { 
            console.log("In drop");
            if (final_transcript.split(" ").includes("one")) {
                console.log("Drop column one");
               
                //call turn function
                takeTurnPrompt(board, turn, "1");
               
                final_transcript = "";
                interim_transcript = "";

            } else if (final_transcript.split(" ").includes("two") || final_transcript.split(" ").includes("to")) {
                console.log("Drop column two");
                
                takeTurnPrompt(board, turn, "2");

                final_transcript = "";
                interim_transcript = "";

            } else if (final_transcript.split(" ").includes("three") || final_transcript.split(" ").includes("3")) {
                console.log("Drop column three");
                
                takeTurnPrompt(board, turn, "3");

                final_transcript = "";
                interim_transcript = "";
            
              } else if (final_transcript.split(" ").includes("four") || final_transcript.split(" ").includes("for")) {
                console.log("Drop column four");
               
                takeTurnPrompt(board, turn, "4");

                final_transcript = "";
                interim_transcript = "";
          
              } else if (final_transcript.split(" ").includes("five") || final_transcript.split(" ").includes("5")) {
                console.log("Drop column five");
            
                takeTurnPrompt(board, turn, "5");

                final_transcript = "";
                interim_transcript = "";
            
              } else if (final_transcript.split(" ").includes("Six") || final_transcript.split(" ").includes("6")) {
                console.log("Drop column six");
               
                takeTurnPrompt(board, turn, "6");

                final_transcript = "";
                interim_transcript = "";
            
              } else if (final_transcript.split(" ").includes("seven")) {
                console.log("Drop column seven");
               
                takeTurnPrompt(board, turn, "7");

                final_transcript = "";
                interim_transcript = "";
            } else {
                console.log("Invalid column to drop into. Please try again!");

                takeTurnPrompt(board, turn, "");

                final_transcript = "";
                interim_transcript = "";
            }
            
        }
        
        
        // if (final_transcript.split(" ").includes("")) { 
        //     console.log("In drop");
        // }
        
      } else {
         // Voice commands occasionally working
        interim_transcript += event.results[i][0].transcript;
        // INPUT COMMANDS HERE 
        
      }
    }
    
    // Writes to box 
    document.querySelector("#final").innerHTML = final_transcript;
    document.querySelector("#interim").innerHTML = interim_transcript;
  };

  document.querySelector("#start").onclick = () => {
    document.querySelector("#final").innerHTML = "";
    final_transcript = "";
    interim_transcript = "";
    speechRecognition.start();
  };
  document.querySelector("#stop").onclick = () => {
    speechRecognition.stop();
  };
  document.querySelector("#clear").onclick = () => {
     document.querySelector("#final").innerHTML = "";
     final_transcript = "";
     interim_transcript = "";
  };
  
} else {
  console.log("Speech Recognition Not Available");
}
