import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';


function App() {

  const [ toggle , handleToggle ] = useState(false);
  const [ toggle1 , handleToggle1 ] = useState(true);
  const [installPrompt , setInstallPrompt] = useState(null);

  useEffect( () => {
    console.log("Listening for Install prompt");
    window.addEventListener('beforeinstallprompt',e=>{
      // For older browsers
      e.preventDefault();
      console.log("Install Prompt fired");
      setInstallPrompt(e);
      console.log(e);
      // See if the app is already installed, in that case, do nothing
      if((window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true){
        return false;
      }
      
      handleToggle(true);
                  
      // Set the state variable to make button visible
    })
    
  },[]);

  const installApp = async() => {
    if(!installPrompt) return false;
    handleToggle(false);
    handleToggle1(false);
    installPrompt.prompt();
    let outcome = await installPrompt.userChoice;    
    if(outcome.outcome === 'accepted'){
      console.log("App Installed")
    }
    else{
      console.log("App not installed");
    }
    // Remove the event reference
    setInstallPrompt(null);
    // Hide the button
    
  }

  return (
    <div className="App">
      <header className="App-header">
        {
          toggle && toggle1 ?
          <button onClick={installApp} className="add-button">Saran</button> 
          :
          null
        }        
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
