import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'

function App() {
  useEffect(() => { 
    async function getImages() {
      try {
      

        const res = await fetch("https://picsum.photos/v2/list?limit=30");


        const data = await res.json();

        console.log("Images:", data);
      } catch (error) {
        console.error("Fetch failed:", error);
      }
    }

    getImages();
  },[])
  return (
    <div>Hello</div>
  )
}

export default App
