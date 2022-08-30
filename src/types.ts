import { LocalVideoTrack } from "livekit-client";

export interface ToggleVideoParams {
  videoTrack: LocalVideoTrack | undefined;
  videoDevice: MediaDeviceInfo | undefined;
  setVideoEnabled: (value: React.SetStateAction<boolean>) => void;
  setVideoTrack: (
    value: React.SetStateAction<LocalVideoTrack | undefined>
  ) => void;
}

export interface ToggleAudioParams {
  audioEnabled: boolean;
  setAudioEnabled: (value: React.SetStateAction<boolean>) => void;
}

export interface SelectVideoDeviceParams {
  device: MediaDeviceInfo;
  videoTrack: LocalVideoTrack | undefined;
  setVideoDevice: (
    value: React.SetStateAction<MediaDeviceInfo | undefined>
  ) => void;
}
