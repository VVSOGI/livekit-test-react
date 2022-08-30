import {
  AudioSelectButton,
  VideoSelectButton,
} from "@livekit/react-components";
import { LocalVideoTrack } from "livekit-client";
import React from "react";
import { selectVideoDevice, toggleAudio, toggleVideo } from "../../utils";

interface Props {
  audioEnabled: boolean;
  videoTrack: LocalVideoTrack | undefined;
  videoDevice: MediaDeviceInfo | undefined;
  setAudioEnabled: (value: React.SetStateAction<boolean>) => void;
  setAudioDevice: (audioDevice: MediaDeviceInfo) => void;
  setVideoEnabled: (value: React.SetStateAction<boolean>) => void;
  setVideoTrack: (
    value: React.SetStateAction<LocalVideoTrack | undefined>
  ) => void;
  setVideoDevice: (
    value: React.SetStateAction<MediaDeviceInfo | undefined>
  ) => void;
}

export default function Prepare({
  audioEnabled,
  videoDevice,
  videoTrack,
  setAudioEnabled,
  setAudioDevice,
  setVideoEnabled,
  setVideoTrack,
  setVideoDevice,
}: Props) {
  return (
    <div className="controlSection">
      <div>
        <AudioSelectButton
          isMuted={!audioEnabled}
          onClick={() => toggleAudio({ audioEnabled, setAudioEnabled })}
          onSourceSelected={setAudioDevice}
        />
        <VideoSelectButton
          isEnabled={videoTrack !== undefined}
          onClick={() =>
            toggleVideo({
              videoTrack,
              videoDevice,
              setVideoEnabled,
              setVideoTrack,
            })
          }
          onSourceSelected={(device) => {
            selectVideoDevice({ device, videoTrack, setVideoDevice });
          }}
        />
      </div>
    </div>
  );
}
