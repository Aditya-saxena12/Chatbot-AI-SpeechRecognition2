import "./App.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import { useState } from "react";

//functional app component 
const App = () => {
  //state variables
  const [textToCopy, setTextToCopy] = useState();  //State for text to copy
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 1000,  //clipboard success message duration
  });

  //commands for speech recognition
  const commands = [
    {
      command: "change text colour to *",
      callback: (color) => {
        document.body.style.color = color;
      },
    },
    {
      command: 'Play trailer',
      callback: () => {
        window.location.href = 'https://youtu.be/upDhKSx7P7E?si=9AtHGC7LKOjgHB3P';
      },
    },
    {
      command: 'Play music',
      callback: () => {
        window.location.href = 'https://youtu.be/Md1WZl4DBXY?si=29T1pUnqa3l0Yl2L';
      },
    },
    {
      command: 'Tell me the news',
      callback: () => {
        window.location.href = 'https://timesofindia.indiatimes.com/news';
      },
    },
    {
      command: 'I want to book rail ticket',
      callback: () => {
        window.location.href = 'https://www.irctc.co.in/nget/train-search';
      },
    },
    {
      command: 'update weather condition',
      callback: () => {
        window.location.href = 'https://weather.com/en-IN/weather/tenday/l/994eccb7ebcadf1f11f1ff328b1233369ccf827e6f9aeefeb50bec67231748fc';
      },
    },
    {
      command: 'I want to eat',
      callback: () => {
        window.location.href = 'https://www.zomato.com/';
      },
    },
    {
      command: 'I want to see movie',
      callback: () => {
        window.location.href = 'https://www.pvrcinemas.com/';
      },
    },
    {
      command: "reset text colour",
      callback: () => {
        document.body.style.color = `#000`;
      },
    },
  ];

  //function to start listening for speech
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });

    // Get transcript and browser support status from useSpeechRecognition hook
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition({commands});

  // If browser does not support speech recognition, return null
  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  //rendering the component
  return (
    <>
      <div className="container">
        <h2>AI Chatbot</h2>
        <br />
        <p>
          Converts speech to text and follow the command that you'll give
        </p>

        <div className="main-content" onClick={() => setTextToCopy(transcript)}>
          {transcript}
        </div>

        <div className="btn-style">
          <button onClick={setCopied}>
            {isCopied ? "Copied!" : "Copy to clipboard"}
          </button>
          <button onClick={startListening}>Start Listening</button>
          <button onClick={SpeechRecognition.stopListening}>
            Stop Listening
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
