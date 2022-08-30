import "@livekit/react-components/dist/index.css";
import { useEffect, useState } from "react";
import {
  AudioSelectButton,
  LiveKitRoom,
  VideoSelectButton,
} from "@livekit/react-components";
import { createLocalVideoTrack, LocalVideoTrack } from "livekit-client";
import { selectVideoDevice, toggleAudio, toggleVideo } from "./utils";
import getAccessToken from "./api/getAccessToken";

function App() {
  const [token, setToken] = useState(null);
  const [videoTrack, setVideoTrack] = useState<LocalVideoTrack>();
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [audioDevice, setAudioDevice] = useState<MediaDeviceInfo>();
  const [videoDevice, setVideoDevice] = useState<MediaDeviceInfo>();

  const url = "ws://localhost:7880";

  const canStream = token && url && audioDevice && videoDevice;

  useEffect(() => {
    // enable video by default
    (async () => {
      const track = await createLocalVideoTrack({
        deviceId: videoDevice?.deviceId,
      });
      setVideoEnabled(true);
      setVideoTrack(track);
    })();
  }, [videoDevice]);

  useEffect(() => {
    (async () => {
      const accessToken = await getAccessToken("benny", "benny-room");
      setToken(accessToken);
    })();
  }, []);

  if (token) {
    return (
      <>
        {canStream ? (
          <LiveKitRoom url={url} token={token} />
        ) : (
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
        )}
      </>
    );
  }

  return <>hello world!</>;
}

export default App;
