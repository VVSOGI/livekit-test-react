import { VideoPresets } from "livekit-client";
import { setMediaEnabled } from "../../utils";
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
  );
}
