// Importing CSS styles for the App
import "./App.css";
// Importing the Drum component
import Drum from "./drum";

// Array of audio clips with their details
const audioClips = [
  {
    keyTrigger: "Q",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    description: "Heater 1",
  },
  {
    keyTrigger: "W",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    description: "Heater 2",
  },
  {
    keyTrigger: "E",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    description: "Heater 3",
  },
  {
    keyTrigger: "A",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    description: "Heater 4",
  },
  {
    keyTrigger: "S",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    description: "Clap",
  },
  {
    keyTrigger: "D",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    description: "Open HH",
  },
  {
    keyTrigger: "Z",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    description: "Kick n' Hat",
  },
  {
    keyTrigger: "X",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    description: "Kick",
  },
  {
    keyTrigger: "C",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    description: "Closed HH",
  },
];

// App component
function App() {
  // Function to play audio when a key is pressed
  const playAudio = (e) => {
    // Find the audio clip corresponding to the pressed key
    const clip = audioClips.find(
      (clip) => clip.keyTrigger === e.key.toUpperCase()
    );
    // If no clip is found, return
    if (!clip) return;
    // Play the audio associated with the clip
    document.getElementById(clip.keyTrigger).play().catch(console.error);
    // Set focus on the corresponding drum button
    document.getElementById("drum-" + clip.keyTrigger).focus();
    // Update the display with the description of the clip
    document.getElementById("display").innerText = clip.description;
  };

  // Rendering the App component
  return (
    <div className="container" id="drum-machine" onKeyDown={playAudio}>
      <h1>FCC Drum Machine</h1>
      <div className="whole-drum">
        {/* Rendering Drum component for each audio clip */}
        {audioClips.map((clip) => (
          <Drum audioClip={clip} key={clip.keyTrigger} />
        ))}
      </div>
      {/* Display area for clip description */}
      <div id="display"></div>
    </div>
  );
}

// Exporting the App component as default
export default App;
