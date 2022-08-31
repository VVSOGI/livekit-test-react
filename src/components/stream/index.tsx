import { LiveKitRoom } from "@livekit/react-components";
import { RoomEvent, VideoPresets } from "livekit-client";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  setMediaEnabled,
  onParticipantDisconnected,
  updateParticipantSize,
} from "../../utils";
import TestingRoom from "../testingRoom";

interface Props {
  url: string;
  token: string;
  audioEnabled: boolean;
  audioDevice: MediaDeviceInfo;
  videoEnabled: boolean;
  videoDevice: MediaDeviceInfo;
}

export default function Stream({
  url,
  token,
  audioEnabled,
  audioDevice,
  videoEnabled,
  videoDevice,
}: Props) {
  return (
    <>
      <TestingRoom
        url={url}
        token={token}
        roomOptions={{
          adaptiveStream: true,
          dynacast: true,
          publishDefaults: {
            simulcast: true,
            videoCodec: "h264",
          },
          videoCaptureDefaults: {
            resolution: VideoPresets.h1440,
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
