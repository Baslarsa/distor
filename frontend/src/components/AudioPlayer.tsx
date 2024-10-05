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
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";

const AudioPlayerWithWaveform: React.FC = () => {
  const { currentSong } = useAudioPlayer();
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const waveSurferRef = useRef<WaveSurfer>();
  const [isLoading, setIsLoading] = useState(false);

  // Store listeners in refs to properly unsubscribe later
  const audioProcessListener = useRef<() => void>();
  const playListener = useRef<() => void>();
  const pauseListener = useRef<() => void>();
  const finishListener = useRef<() => void>();

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

  // Fetch the stream from the backend and load it into WaveSurfer
  useEffect(() => {
    const loadStream = async () => {
      if (!currentSong?.audio_src) return;

      try {
        setIsLoading(true);
        const response = await fetch(currentSong.audio_src);
        if (!response.ok) {
          throw new Error("Failed to fetch the audio stream");
        }
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        waveSurferRef.current?.seekTo(0);
        waveSurferRef.current?.load(audioUrl);
      } catch (error) {
        console.error("Error loading audio stream:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStream();
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

  useEffect(() => {
    if (isPlaying) {
      waveSurferRef?.current?.play();
    } else {
      waveSurferRef?.current?.pause();
    }
  }, [isPlaying]);

  // Subscribe to events and properly unsubscribe
  useEffect(() => {
    if (waveSurferRef.current) {
      audioProcessListener.current = () => {
        setCurrentTime(waveSurferRef.current?.getCurrentTime() || 0);
      };
      playListener.current = () => {
        setIsPlaying(true);
        setShowAudioPlayer(true);
      };
      pauseListener.current = () => {
        setIsPlaying(false);
      };
      finishListener.current = () => {
        setIsPlaying(false);
      };

      // Add event listeners
      waveSurferRef.current.on("audioprocess", audioProcessListener.current);
      waveSurferRef.current.on("play", playListener.current);
      waveSurferRef.current.on("pause", pauseListener.current);
      waveSurferRef.current.on("finish", finishListener.current);
    }

    // Unsubscribe from events on cleanup
    return () => {
      if (waveSurferRef.current) {
        waveSurferRef.current.un("audioprocess", audioProcessListener.current!);
        waveSurferRef.current.un("play", playListener.current!);
        waveSurferRef.current.un("pause", pauseListener.current!);
        waveSurferRef.current.un("finish", finishListener.current!);
      }
    };
  }, [isPlaying]);

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
        showAudioPlayer ? "translate-y-0" : "translate-y-[100%]"
      } flex bottom-3 transform left-3 right-3 px-2 bg-black items-center py-2 rounded-lg transition-all duration-500 shadow-lg shadow-black/50`}
    >
      <div
        className="bg-white text-black px-12 right-[50%] top-0 transform translate-y-[-100%] translate-x-[50%] absolute cursor-pointer rounded-sm"
        onClick={() => setShowAudioPlayer(!showAudioPlayer)}
      >
        {showAudioPlayer ? <HiOutlineChevronDown /> : <HiOutlineChevronUp />}
      </div>
      <div className="flex items-center gap-2 mx-2 relative">
        <div className="w-24 h-24 ">
          <img
            className="w-full object-cover"
            src={
              (currentSong?.cover_art_src && currentSong?.cover_art_src) ||
              exampleCoverImage
            }
          />
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
