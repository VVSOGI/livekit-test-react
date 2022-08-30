import {
  AudioSelectButton,
  VideoSelectButton,
} from "@livekit/react-components";
import { Box, Button, TextField } from "@mui/material";
import { LocalVideoTrack } from "livekit-client";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import getAccessToken from "../../api/getAccessToken";
import { AccessTokenState, UsernameState } from "../../recoil";
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
  const [, setToken] = useRecoilState(AccessTokenState);
  const [username, setUsername] = useRecoilState(UsernameState);
  const [roomname, setRoomname] = useState("");

  const handleGetToken = async () => {
    const accessToken = await getAccessToken(username, roomname);
    setToken(accessToken);
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          "& > :not(style)": { m: 1, width: "40ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          onChange={(e) => setUsername(e.target.value)}
          id="standard-basic"
          label="User Name"
          variant="standard"
        />
        <TextField
          onChange={(e) => setRoomname(e.target.value)}
          id="standard-basic"
          label="Room Name"
          variant="standard"
        />
        <Button onClick={handleGetToken} variant="outlined">
          토큰 받기
        </Button>
      </Box>
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
    </>
  );
}
