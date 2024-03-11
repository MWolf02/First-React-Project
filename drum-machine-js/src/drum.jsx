import React, { useRef, useEffect } from 'react';

const Drum = (props) => {
  const { audioClip } = props;
  const buttonRef = useRef(null);

  const playSound = (clip) => {
    document.getElementById(clip.keyTrigger).play().catch(console.error);
    document.getElementById("display").innerText = clip.description;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toUpperCase() === audioClip.keyTrigger) {
        playSound(audioClip);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [audioClip.keyTrigger]);

  return (
    <button
      ref={buttonRef}
      className="drum-pad"
      id={`drum-${audioClip.keyTrigger}`}
      onClick={() => playSound(audioClip)}
    >
      <audio src={audioClip.url} id={audioClip.keyTrigger} className="clip" />
      {audioClip.keyTrigger}
    </button>
  );
};

export default Drum;

