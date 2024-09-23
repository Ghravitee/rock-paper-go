// import { useState } from "react";
// import mobilePatternDivider from "./images/pattern-divider-mobile.svg";
// import desktopPatternDivider from "./images/pattern-divider-desktop.svg";
// import { FaInfinity } from "react-icons/fa";

// function App() {
//   // Initialize state with default advice text and ID
//   const [advice, setAdvice] = useState({
//     text: "It is easy to sit up and take notice, what's difficult is getting up and taking action.",
//     id: 117,
//   });

//   const fetchAdvice = async () => {
//     try {
//       const response = await fetch("https://api.adviceslip.com/advice");
//       const data = await response.json();
//       // Update state with both advice text and ID
//       setAdvice({ text: data.slip.advice, id: data.slip.id });
//     } catch (error) {
//       console.error("Error fetching advice:", error);
//       // Handle error state
//       setAdvice({ text: "Oops! Something went wrong.", id: 0 });
//     }
//   };

//   return (
//     <main className="flex items-center justify-center min-h-screen bg-Dark-Blue ">
//       <div className="max-w-[22rem] mx-auto relative bg-Dark-Grayish-Blue px-6 py-10 rounded-lg text-center flex flex-col gap-4 justify-center items-center">
//         <h1 className="text-xs tracking-widest font-bold text-Neon-Green uppercase">
//           Advice <span>#{advice.id}</span>
//         </h1>
//         <q className="text-Light-Cyan manrope-800 font-bold text-xl">
//           {advice.text}
//         </q>
//         <img
//           src={mobilePatternDivider}
//           alt="mobile pattern divider"
//           className="md:hidden my-4"
//         />
//         <img
//           src={desktopPatternDivider}
//           alt="desktop pattern divider"
//           className="hidden md:block my-4"
//         />
//         <div
//           className="absolute -bottom-5 z-10 rounded-full bg-Neon-Green flex justify-center items-center p-3 hover:cursor-pointer hover:shadow-[0px_0px_30px_10px_rgba(82,255,168,0.3)] transition-shadow duration-300 ease-in-out"
//           onClick={fetchAdvice}
//         >
//           <FaInfinity />
//         </div>
//       </div>
//     </main>
//   );
// }

// export default App;

// import React, { useState } from "react";
// import rock from "../src/images/rock.png";
// import paper from "../src/images/paper.png";
// import scissors from "../src/images/scissors.png";

// const App = () => {
//   const [userChoice, setUserChoice] = useState("");
//   const [computerChoice, setComputerChoice] = useState("");
//   const [result, setResult] = useState("");

//   const choices = ["Rock", "Paper", "Scissors"];

//   const handleUserChoice = (choice: string) => {
//     setUserChoice(choice);
//     generateComputerChoice();
//     determineWinner(choice);
//   };

//   const generateComputerChoice = () => {
//     const randomIndex = Math.floor(Math.random() * choices.length);
//     const computerPick = choices[randomIndex];
//     setComputerChoice(computerPick);
//     return computerPick;
//   };

//   const determineWinner = (userPick: string) => {
//     const computerPick = generateComputerChoice();

//     if (userPick === computerPick) {
//       setResult("It's a tie!");
//     } else if (
//       (userPick === "Rock" && computerPick === "Scissors") ||
//       (userPick === "Paper" && computerPick === "Rock") ||
//       (userPick === "Scissors" && computerPick === "Paper")
//     ) {
//       setResult("You win!");
//     } else {
//       setResult("Computer wins!");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-Dark-Blue ">
//       <div className="max-w-[22rem] mx-auto relative bg-Dark-Grayish-Blue px-6 py-10 rounded-lg text-center flex flex-col gap-4 justify-center items-center">
//         <h1>Rock Paper Scissors</h1>

//         <div>
//           <p>Choose your weapon:</p>
//           <div>
//             {choices.map((choice, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleUserChoice(choice)}
//                 style={{
//                   margin: "10px",
//                   padding: "10px 20px",
//                   fontSize: "16px",
//                 }}
//               >
//                 {choice}
//               </button>
//             ))}
//           </div>
//         </div>

//         {userChoice && computerChoice && (
//           <div style={{ marginTop: "20px" }}>
//             <p>
//               <strong>Your choice:</strong> {userChoice}
//             </p>
//             <p>
//               <strong>Computer's choice:</strong> {computerChoice}
//             </p>
//             <p>
//               <strong>Result:</strong> {result}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useState } from "react";
import rockImg from "../src/images/rock.png";
import paperImg from "../src/images/paper.png";
import scissorsImg from "../src/images/scissors.png";
import Confetti from "react-confetti"; // Import Confetti
import { useWindowSize } from "react-use"; // To dynamically set the size of Confetti

const App = () => {
  const [userChoice, setUserChoice] = useState<{
    name: string;
    img: string;
  } | null>(null);
  const [computerChoice, setComputerChoice] = useState<{
    name: string;
    img: string;
  } | null>(null);
  const [result, setResult] = useState("");
  const [userWins, setUserWins] = useState(0);
  const [computerWins, setComputerWins] = useState(0);
  const [roundsPlayed, setRoundsPlayed] = useState(0); // Track total rounds played
  const [gameOver, setGameOver] = useState(false); // Flag to determine if the game is over

  const { width, height } = useWindowSize(); // Get window dimensions for Confetti

  // Array of choices with images
  const choices = [
    { name: "Rock", img: rockImg },
    { name: "Paper", img: paperImg },
    { name: "Scissors", img: scissorsImg },
  ];

  const handleUserChoice = (choice: { name: string; img: string }) => {
    if (!gameOver) {
      setUserChoice(choice);
      const computerPick = generateComputerChoice();
      determineWinner(choice.name, computerPick.name);
    }
  };

  const generateComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerPick = choices[randomIndex];
    setComputerChoice(computerPick);
    return computerPick;
  };

  const determineWinner = (userPick: string, computerPick: string) => {
    if (userPick === computerPick) {
      setResult("It's a tie!");
    } else if (
      (userPick === "Rock" && computerPick === "Scissors") ||
      (userPick === "Paper" && computerPick === "Rock") ||
      (userPick === "Scissors" && computerPick === "Paper")
    ) {
      setResult("You win!");
      setUserWins((prevWins) => {
        const newWins = prevWins + 1;
        if (newWins === 3) {
          setGameOver(true);
          setResult("You won the game!");
        }
        return newWins;
      });
    } else {
      setResult("Computer wins!");
      setComputerWins((prevWins) => {
        const newWins = prevWins + 1;
        if (newWins === 3) {
          setGameOver(true);
          setResult("Computer won the game!");
        }
        return newWins;
      });
    }

    setRoundsPlayed((prevRounds) => prevRounds + 1); // Increment total rounds played
  };

  const resetGame = () => {
    setUserWins(0);
    setComputerWins(0);
    setRoundsPlayed(0);
    setGameOver(false);
    setResult("");
    setUserChoice(null);
    setComputerChoice(null);
  };

  return (
    <div className="flex items-center justify-center lg:min-h-screen bg-Dark-Blue overflow-hidden">
      {gameOver && <Confetti width={width} height={height} />}{" "}
      {/* Add Confetti when game over */}
      <div className="max-w-[22rem] md:max-w-[25rem] mx-auto relative bg-Dark-Grayish-Blue px-6 py-8 rounded-lg text-center flex flex-col gap-4 justify-center items-center">
        <h1 className="cabin font-bold text-white text-lg md:text-3xl">
          Rock - Paper - Scissors
        </h1>

        <div className="">
          <p className="cabin font-bold text-white text-lg md:text-2xl mb-2">
            Choose your weapon
          </p>
          <div className="flex justify-center">
            {choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleUserChoice(choice)}
                className="border border-gray-500 rounded-lg m-[10px] p-3 hover:border-Neon-Green group"
              >
                <img
                  src={choice.img}
                  alt={choice.name}
                  width={80}
                  height={80}
                  className="group-hover:scale-110 transition-all duration-300"
                />
                <p className="playpen-sans font-semibold text-lg text-white ">
                  {choice.name}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Display Choices and Result */}
        {userChoice && computerChoice && (
          <div className="mt-6">
            <div className="flex justify-center items-center gap-2">
              <p className="text-white playpen-sans text-xl">
                <strong className="cabin">Your choice:</strong>{" "}
                {userChoice.name}
              </p>
              <img
                src={userChoice.img}
                alt={userChoice.name}
                width={40}
                height={40}
              />
            </div>
            <div className="flex justify-center items-center gap-2">
              <p className="text-white playpen-sans text-xl">
                <strong className="cabin">Computer's choice:</strong>{" "}
                {computerChoice.name}
              </p>
              <img
                src={computerChoice.img}
                alt={computerChoice.name}
                width={40}
                height={40}
              />
            </div>

            <p className="text-white playpen-sans text-xl">
              <strong className="cabin">Result:</strong> {result}
            </p>
          </div>
        )}

        {/* Win Tracker */}
        <div className="mt-2">
          <p className="text-white playpen-sans text-lg">
            <strong>User Wins:</strong> {userWins}
          </p>
          <p className="text-white playpen-sans text-lg">
            <strong>Computer Wins:</strong> {computerWins}
          </p>
          <p className="text-white playpen-sans text-lg">
            <strong>Rounds Played:</strong> {roundsPlayed} / 5
          </p>
        </div>

        {/* Display Reset Button when Game Over */}
        {gameOver && (
          <div className="mt-4">
            <button
              onClick={resetGame}
              className="bg-Neon-Green text-white cabin font-bold text-lg py-2 px-4 rounded-lg"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
