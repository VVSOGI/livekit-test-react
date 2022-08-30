import { createLocalVideoTrack } from "livekit-client";
import {
  SelectVideoDeviceParams,
  ToggleAudioParams,
  ToggleVideoParams,
} from "./types";

export async function toggleVideo({
  videoTrack,
  videoDevice,
  setVideoEnabled,
  setVideoTrack,
}: ToggleVideoParams) {
  if (videoTrack) {
    videoTrack.stop();
    setVideoEnabled(false);
    setVideoTrack(undefined);
  } else {
    const track = await createLocalVideoTrack({
      deviceId: videoDevice?.deviceId,
    });
    setVideoEnabled(true);
    setVideoTrack(track);
  }
}

export function toggleAudio({
  audioEnabled,
  setAudioEnabled,
}: ToggleAudioParams) {
  if (audioEnabled) {
    setAudioEnabled(false);
  } else {
    setAudioEnabled(true);
  }
}

export function selectVideoDevice({
  device,
  videoTrack,
  setVideoDevice,
}: SelectVideoDeviceParams) {
  setVideoDevice(device);
  if (videoTrack) {
    if (
      videoTrack.mediaStreamTrack.getSettings().deviceId === device.deviceId
    ) {
      return;
    }
    // stop video
    videoTrack.stop();
  }
}
