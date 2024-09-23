import { useState } from "react";
import mobilePatternDivider from "./images/pattern-divider-mobile.svg";
import desktopPatternDivider from "./images/pattern-divider-desktop.svg";
import iconDice from "./images/icon-dice.svg";

function App() {
  // Initialize state with default advice text and ID
  const [advice, setAdvice] = useState({
    text: "It is easy to sit up and take notice, what's difficult is getting up and taking action.",
    id: 117,
  });

  const fetchAdvice = async () => {
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      const data = await response.json();
      // Update state with both advice text and ID
      setAdvice({ text: data.slip.advice, id: data.slip.id });
    } catch (error) {
      console.error("Error fetching advice:", error);
      // Handle error state
      setAdvice({ text: "Oops! Something went wrong.", id: "" });
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-Dark-Blue ">
      <div className="max-w-[22rem] mx-auto relative bg-Dark-Grayish-Blue px-6 py-10 rounded-lg text-center flex flex-col gap-4 justify-center items-center">
        <h1 className="text-xs tracking-widest font-bold text-Neon-Green uppercase">
          Advice <span>#{advice.id}</span>
        </h1>
        <q className="text-Light-Cyan manrope-800 font-bold text-xl">
          {advice.text}
        </q>
        <img
          src={mobilePatternDivider}
          alt="mobile pattern divider"
          className="md:hidden my-4"
        />
        <img
          src={desktopPatternDivider}
          alt="desktop pattern divider"
          className="hidden md:block my-4"
        />
        <div
          className="absolute -bottom-5 z-10 rounded-full bg-Neon-Green flex justify-center items-center p-3 hover:cursor-pointer hover:shadow-[0px_0px_30px_10px_rgba(82,255,168,0.3)] transition-shadow duration-300 ease-in-out"
          onClick={fetchAdvice}
        >
          <img
            src={iconDice}
            width={20}
            height={20}
            alt="this is an icon of a dice"
          />
        </div>
      </div>
    </main>
  );
}

export default App;
