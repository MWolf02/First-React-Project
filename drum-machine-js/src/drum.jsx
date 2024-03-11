import React, { useRef, useState, useEffect } from 'react';

const Drum = (props) => {
  // Destructuring props to extract audioClip
  const { audioClip } = props;
  // Creating a reference to the button element
  const buttonRef = useRef(null);
  // State variable to track whether the button is currently pressed
  const [isPressed, setIsPressed] = useState(false);

  // Function to play the sound associated with the button
  const playSound = (clip) => {
    // Play the audio associated with the button
    document.getElementById(clip.keyTrigger).play().catch(console.error);
    // Update the display with the description of the sound
    document.getElementById("display").innerText = clip.description;
  };

  // Effect hook to handle keydown and keyup events
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check if the pressed key matches the keyTrigger of the current audioClip
      if (e.key.toUpperCase() === audioClip.keyTrigger) {
        // Set the button as pressed
        setIsPressed(true);
        // Play the sound associated with the button
        playSound(audioClip);
      }
    };

    const handleKeyUp = (e) => {
      // Check if the released key matches the keyTrigger of the current audioClip
      if (e.key.toUpperCase() === audioClip.keyTrigger) {
        // Set the button as not pressed
        setIsPressed(false);
      }
    };

    // Add event listeners for keydown and keyup events
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    // Cleanup function to remove event listeners when component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [audioClip.keyTrigger]);

  // Effect hook to set focus on the button when the component mounts or when audioClip changes
  useEffect(() => {
    if (audioClip.keyTrigger === 'Q') {
      // Set focus on the button when the component mounts
      buttonRef.current.focus();
    }
  }, [audioClip.keyTrigger]); // Dependency on audioClip.keyTrigger to re-run the effect when it changes

  // Render the button element
  return (
    <button
      ref={buttonRef}
      // Dynamically set className based on isPressed state
      className={`drum-pad ${isPressed ? 'pressed' : ''}`}
      id={`drum-${audioClip.keyTrigger}`}
      // Event handler to play sound when button is clicked
      onClick={() => playSound(audioClip)}
    >
      {/* Audio element for playing the sound */}
      <audio src={audioClip.url} id={audioClip.keyTrigger} className="clip" />
      {/* Display the key trigger on the button */}
      {audioClip.keyTrigger}
    </button>
  );
};

// Export the Drum component as default
export default Drum;
