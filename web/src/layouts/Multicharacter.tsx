import { Button } from "@/components/ui/button";
import ArrowLeftIcon from "@/icons/ArrowLeftIcon";
import ArrowRightIcon from "@/icons/ArrowRightIcon";
import BankIcon from "@/icons/BankIcon";
import BriefcaseIcon from "@/icons/BriefcaseIcon";
import MoneyIcon from "@/icons/MoneyIcon";
import { PlayerDataProps } from "@/types/playerdata";
import { fetchNui } from "@/utils/fetchNui";
import React, { useCallback, useEffect, useRef, useState } from "react";

type props = {
  setShowRegister: React.Dispatch<React.SetStateAction<boolean>>;
  showRegister: boolean;
  playerData: PlayerDataProps[];
};

const Multicharacter = (props: props) => {
  const hoverSoundRef = useRef(new Audio("audio/hoversound.wav"));
  const [loading, setLoading] = useState(false);
  const playSound = () => {
    hoverSoundRef.current.currentTime = 0;
    hoverSoundRef.current.play();
  };

  const [dataIndex, setIndex] = useState(0);

  const handlePrevCharacter = () => {
    if (dataIndex > 0) {
      playSound();
      setIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleNextCharacter = () => {
    if (dataIndex < props.playerData.length - 1) {
      playSound();
      setIndex(prevIndex => prevIndex + 1);
    }
  };

  const currentCharacter = props.playerData[dataIndex];
  const isFirstCharacter = dataIndex === 0;
  const isLastCharacter = dataIndex === props.playerData.length - 1;


  const onCharacterChange = useCallback(async (dataIndex: number) => {
    setLoading(true);
    await fetchNui<boolean>('characterChange', props.playerData[dataIndex]).then(() => {
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    });
  }, [props.playerData]);

  useEffect(() => {
    console.log(dataIndex)
    onCharacterChange(dataIndex);
  }, [dataIndex, onCharacterChange]);

  return (
    <div className="flex justify-center items-center mr-3 w-[40%] px-4 flex-col">
      <div className="font-bold text-3xl">
        {props.playerData[dataIndex] && props.playerData[dataIndex]?.firstname}{" "}
        {(props.playerData[dataIndex] &&
          props.playerData[dataIndex]?.lastname) ||
          "Multicharacter"}
      </div>
      {currentCharacter && (
        <div className="flex flex-row justify-between items-center gap-8 rounded px-2 py-1">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center bg-foreground/30 rounded">
              <BankIcon />
            </div>
            <span>$ {currentCharacter.bank}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center bg-foreground/30 rounded">
              <MoneyIcon />
            </div>
            <span>$ {currentCharacter.cash}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center bg-foreground/30 rounded">
              <BriefcaseIcon />
            </div>
            <span>{currentCharacter.job}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center bg-foreground/30 rounded">
              <BriefcaseIcon />
            </div>
            <span>
              {currentCharacter.firstname} {currentCharacter.lastname}
            </span>
          </div>
        </div>
      )}
      {props.playerData.length > 1 && (
        <div className="flex justify-center items-center gap-2 ">
          <Button disabled={loading || isFirstCharacter} onClick={() => handlePrevCharacter()} size={'icon'} className="bg-foreground/30 text-foreground hover:bg-foreground/50">
            <ArrowLeftIcon />
          </Button>
          <span>Select Character</span>
          <Button disabled={loading || isLastCharacter} onClick={() => handleNextCharacter()} size={'icon'} className="bg-foreground/30 text-foreground hover:bg-foreground/50">
            <ArrowRightIcon />
          </Button>
        </div>
      )}

      <Button
        disabled={loading}
        onMouseEnter={playSound}
        variant={"ghost"}
        className="hover:bg-transparent focus:bg-transparent hover:scale-110 font-bold text-lg"
      >
        Play
      </Button>
      <Button
        onMouseEnter={playSound}
        onClick={() => props.setShowRegister(!props.showRegister)}
        variant={"ghost"}
        className="hover:bg-transparent focus:bg-transparent hover:scale-110 font-bold text-lg"
      >
        Create New Character
      </Button>
    </div>
  );
};

export default Multicharacter;
