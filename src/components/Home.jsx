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
      <div style={{ background: 'linear-gradient(45deg, #010758, #490d61)'}} className='h-screen'>
        <StickyNavbar />
      <div className='w-full flex justify-center'>
        <div>
          <div className='flex flex-col justify-center items-center mt-[50px]'>
            <h1 className='text-white' style={{fontSize:'45px', fontWeight:'500px'}}>
              Text To Speech <span style={{color:'#ff2963'}}>Converter</span>
            </h1>
            <textarea style={{background:'#403d84'}}
              className='textarea rounded-md h-[250px] w-[500px] p-3 text-yellow-50 mt-10 outline-none'
              type='text'
              placeholder='Type your text....'
              value={textToSpeak}
              onChange={(e) => setTextToSpeak(e.target.value)}
            ></textarea><br />
          </div>
          <div className='flex justify-center space-x-8 mt-4'>
            <select className='select rounded-2xl text-white' onChange={handleSelectChange} style={{background:'#403d84'}}>
              {voices.map((voice, index) => (
                <option key={index} value={index}>{voice.name}</option>
              ))}
            </select>
            <button style={{background:'#ff2963'}} className=' text-white p-2 rounded-2xl w-[100px] flex' onClick={handleClick}>
              <span className="pr-1 pt-1"><FaPlay /></span>Listen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
