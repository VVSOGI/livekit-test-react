import { LiveKitRoom } from "@livekit/react-components";
import { RoomEvent, VideoPresets } from "livekit-client";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { UsernameState } from "../../recoil";
import {
  setMediaEnabled,
  onParticipantDisconnected,
  updateParticipantSize,
} from "../../utils";
import TestingRoom from "../testingRoom";

interface Props {
  url: string;
  token: string;
  numParticipants: number;
  audioEnabled: boolean;
  audioDevice: MediaDeviceInfo;
  videoEnabled: boolean;
  videoDevice: MediaDeviceInfo;
  setNumParticipants: (value: React.SetStateAction<number>) => void;
}

export default function Stream({
  url,
  token,
  numParticipants,
  audioEnabled,
  audioDevice,
  videoEnabled,
  videoDevice,
  setNumParticipants,
}: Props) {
  const [username] = useRecoilState(UsernameState);

  return (
    <>
      <span>{numParticipants}</span>
      <TestingRoom
        url={url}
        token={token}
        roomOptions={{
          adaptiveStream: true,
          dynacast: true,
          videoCaptureDefaults: {
            resolution: VideoPresets["h1440"].resolution,
          },
        }}
        onConnected={async (room) => {
          await setMediaEnabled({
            room,
            audioEnabled,
            audioDevice,
            videoEnabled,
            videoDevice,
          });
        }}
      />
      {/* <LiveKitRoom
        onConnected={(room) => {
          onConnected({
            room,
            audioEnabled,
            audioDevice,
            videoEnabled,
            videoDevice,
          });
          room.on(RoomEvent.ParticipantConnected, () =>
            updateParticipantSize({ room, setNumParticipants })
          );
          room.on(RoomEvent.ParticipantDisconnected, () =>
            onParticipantDisconnected({ room, setNumParticipants })
          );
          updateParticipantSize({ room, setNumParticipants });
        }}
        roomOptions={{
          adaptiveStream: true,
          dynacast: true,
          videoCaptureDefaults: {
            resolution: VideoPresets["h1440"].resolution,
          },
        }}
        url={url}
        token={token}
      /> */}
    </>
  );
}
