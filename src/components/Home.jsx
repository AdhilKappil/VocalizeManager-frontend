import React, { useEffect, useState } from 'react';
import { StickyNavbar } from './Navbar';
import { useSelector } from 'react-redux';
import { FaPlay } from "react-icons/fa6";

function Home() {
  const { userInfo } = useSelector((state) => state.auth);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [textToSpeak, setTextToSpeak] = useState("");

  const handleClick = () => {
    let speech = new SpeechSynthesisUtterance();
    speech.text = textToSpeak;
    speech.voice = selectedVoice;
    window.speechSynthesis.speak(speech);
  };

  const handleSelectChange = (event) => {
    const selectedVoiceIndex = event.target.value;
    setSelectedVoice(voices[selectedVoiceIndex]);
  };

  useEffect(() => {
    const populateVoiceList = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0]); // Default to the first voice
      }
    };

    window.speechSynthesis.onvoiceschanged = populateVoiceList;
    populateVoiceList();

    return () => {
      window.speechSynthesis.onvoiceschanged = null; // Cleanup
    };
  }, []);

  return (
    <div>
      <StickyNavbar />
      <div className='w-full h-32'></div>
      <div className='w-full flex justify-center'>
        <div>
          <div className='flex flex-col justify-center items-center mt-[50px]'>
            <h1 className=' textClass'>
              Text Audio <span className='font-bold'>Converter</span>
            </h1>
            <textarea
              className='textarea border rounded-md h-[400px]  bg-cyan-900 p-3 text-yellow-50'
              type='text'
              placeholder='Type your text....'
              value={textToSpeak}
              onChange={(e) => setTextToSpeak(e.target.value)}
            ></textarea><br />
          </div>
          <div className='flex justify-center'>
            <select className='select rounded' onChange={handleSelectChange}>
              {voices.map((voice, index) => (
                <option key={index} value={index}>{voice.name}</option>
              ))}
            </select>
            <button className='bg-cyan-800 text-white p-2 rounded w-[70px] flex' onClick={handleClick}>
              <span className="pr-1 pt-1"><FaPlay /></span>Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
