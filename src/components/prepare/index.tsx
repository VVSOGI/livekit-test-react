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
      <Button
        onClick={async () => {
          const audioDevice = {
            deviceId:
              "16c528d6c36dc3f1f080b4ed5e1c74344d16fe5b4532e8c96e5f5641b4bc4d8a",
            kind: "audioinput",
            label: "MacBook Pro 마이크 (Built-in)",
            groupId:
              "1e91ac80f0e7ce2635073ec4dd1c0c2f8bfe6e1c9d4b0c31a8807b03b3f0bc04",
          } as MediaDeviceInfo;
          const videoDevice = {
            deviceId:
              "bc20f7b69b5bbf6eb80657a1ec55aa4b77e0f35659c45889c376f6c92ffc446e",
            kind: "videoinput",
            label: "FaceTime HD Camera",
            groupId:
              "87f208a8d539b99254a9b2401216f51c0d7f6e005055fbfb885b12aee1bac207",
          } as MediaDeviceInfo;
          setAudioDevice(audioDevice);
          setVideoDevice(videoDevice);
          const accessToken = await getAccessToken("streamer", "1234");
          setToken(accessToken);
        }}
      >
        스트리머빠른시작
      </Button>
      <Button
        onClick={async () => {
          const audioDevice = {
            deviceId:
              "16c528d6c36dc3f1f080b4ed5e1c74344d16fe5b4532e8c96e5f5641b4bc4d8a",
            kind: "audioinput",
            label: "MacBook Pro 마이크 (Built-in)",
            groupId:
              "1e91ac80f0e7ce2635073ec4dd1c0c2f8bfe6e1c9d4b0c31a8807b03b3f0bc04",
          } as MediaDeviceInfo;
          const videoDevice = {
            deviceId:
              "bc20f7b69b5bbf6eb80657a1ec55aa4b77e0f35659c45889c376f6c92ffc446e",
            kind: "videoinput",
            label: "FaceTime HD Camera",
            groupId:
              "87f208a8d539b99254a9b2401216f51c0d7f6e005055fbfb885b12aee1bac207",
          } as MediaDeviceInfo;
          setAudioDevice(audioDevice);
          setVideoDevice(videoDevice);
          const accessToken = await getAccessToken("benny", "1234");
          setToken(accessToken);
        }}
      >
        유저빠른시작
      </Button>
    </>
  );
}
