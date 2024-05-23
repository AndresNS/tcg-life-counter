import { useState } from "react";
import { Player } from "../../common/types";

type CounterProps = {
  player: Player;
  flip?: boolean;
};

enum CounterModes {
  Increment = "increment",
  Decrement = "decrement",
}

const longPressStep = 5;

export default function Counter({
  player: { id, startingLife, backgroundColor },
  flip,
}: CounterProps) {
  const [lifeTotal, setLifeTotal] = useState(Number(startingLife));
  const [isPressed, setIsPressed] = useState({
    increment: false,
    decrement: false,
  });

  const handlePress = (mode: string, step = 1) => {
    switch (mode) {
      case CounterModes.Increment:
        setLifeTotal((prevLifeTotal) => prevLifeTotal + step);
        break;
      case CounterModes.Decrement:
        setLifeTotal((prevLifeTotal) => prevLifeTotal - step);
        break;
      default:
        console.log("Mode not supported");
    }
  };

  return (
    <div
      className={`relative flex-1 w-full rounded-xl flex justify-center items-center ${flip && "rotate-180"} ${backgroundColor}`}
    >
      <span className="text-9xl">{lifeTotal}</span>
      <div className="absolute flex flex-col top-0 bottom-0 left-0 right-0">
        <button
          className="flex-1 text-5xl hover:bg-neutrals-white/20"
          onClick={() => handlePress(CounterModes.Increment)}
        >
          +
        </button>
        <button
          className="flex-1 text-5xl hover:bg-neutrals-white/20"
          onClick={() => handlePress(CounterModes.Decrement)}
        >
          -
        </button>
      </div>
    </div>
  );
}
