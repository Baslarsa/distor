import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { useAudioPlayer } from "../AudioPlayerContext";
import {
  AiFillFastBackward,
  AiFillFastForward,
  AiFillPauseCircle,
  AiFillPlayCircle,
} from "react-icons/ai";
import exampleCoverImage from "../assets/example-cover-art.webp";

const AudioPlayerWithWaveform: React.FC = () => {
  const { currentSong } = useAudioPlayer();
  const waveSurferRef = useRef<WaveSurfer>();

  // Initialize Wavesurfer
  useEffect(() => {
    waveSurferRef.current = WaveSurfer.create({
      container: "#waveform",
      waveColor: "rgba(255, 255, 255, 0.553)",
      progressColor: "rgba(238, 238, 238, 0.498)",
      cursorColor: "white",
      barGap: 3,
      height: 70,
      barWidth: 3,
      cursorWidth: 1,
      backend: "MediaElement", // Ensures the use of HTML5 Audio
    });

    return () => {
      waveSurferRef.current?.destroy();
    };
  }, []);

  // Load the audio file into both Howler and Wavesurfer when the URL changes
  useEffect(() => {
    if (!currentSong?.audio_src) return;

    waveSurferRef.current?.seekTo(0);
    waveSurferRef.current?.load(currentSong.audio_src);
  }, [currentSong?.audio_src]);

  useEffect(() => {
    waveSurferRef?.current?.on("ready", () => {
      waveSurferRef?.current?.play();
    });
  }, []);
  const playPause = () => {
    waveSurferRef.current?.playPause();
  };

  const [currentTime, setCurrentTime] = useState(0);
  const { isPlaying, setIsPlaying } = useAudioPlayer();

  waveSurferRef?.current?.on("audioprocess", () => {
    setCurrentTime(waveSurferRef.current?.getCurrentTime() || 0);
  });

  waveSurferRef?.current?.on("play", () => {
    setIsPlaying(true);
  });
  waveSurferRef?.current?.on("pause", () => {
    setIsPlaying(false);
  });

  waveSurferRef?.current?.on("finish", () => {
    if (isPlaying) {
      playPause();
    }
  });

  const duration = waveSurferRef?.current?.getDuration() || 0;

  const formatTime = (currentTime: number, duration: number) => {
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    const minutesDuration = Math.floor(duration / 60);
    const secondsDuration = Math.floor(duration % 60);
    return `${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds} / ${minutesDuration}:${
      secondsDuration < 10 ? "0" : ""
    }${secondsDuration}`;
  };

  return (
    <div
      className={`absolute ${
        currentSong ? "bottom-3 flex" : "bottom-[-100%] hidden"
      } bottom-3 left-3 right-3 px-2 bg-black items-center py-2 rounded-lg transition-all duration-500 shadow-lg shadow-black/50`}
    >
      <div className="flex items-center gap-2 mx-2 relative">
        <div className="w-24 h-24 ">
          <img className="w-full object-cover" src={exampleCoverImage} />
        </div>
      </div>
      <div className="overflow-hidden w-64">
        <div className="flex text-gray-400 text-center whitespace-nowrap marquee-text">
          <p>
            <strong>{currentSong?.artist.name}</strong>
            {" - " + currentSong?.name}
          </p>
          &nbsp; &nbsp; &nbsp;
          <p>
            <strong>{currentSong?.artist.name}</strong>
            {" - " + currentSong?.name}
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 mx-4">
          <AiFillFastBackward className="h-10 w-10 cursor-pointer text-white" />
          <div className="flex justify-center items-center">
            {isPlaying ? (
              <AiFillPauseCircle
                className="h-12 w-12 cursor-pointer text-white"
                onClick={playPause}
              />
            ) : (
              <AiFillPlayCircle
                className="h-12 w-12 cursor-pointer text-white"
                onClick={playPause}
              />
            )}
          </div>
          <AiFillFastForward className="h-10 w-10 cursor-pointer text-white" />
        </div>
        <div className="text-white text-center">
          {formatTime(currentTime, duration)}
        </div>
      </div>
      <div id="waveform" className="w-full px-2"></div>
    </div>
  );
};

export default AudioPlayerWithWaveform;
