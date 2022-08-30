import "@livekit/react-components/dist/index.css";
import { useEffect, useState } from "react";
import { createLocalVideoTrack, LocalVideoTrack } from "livekit-client";
import getAccessToken from "./api/getAccessToken";
import Prepare from "./components/prepare";
import Stream from "./components/stream";

function App() {
  const [token, setToken] = useState(null);
  const [videoTrack, setVideoTrack] = useState<LocalVideoTrack>();
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [audioDevice, setAudioDevice] = useState<MediaDeviceInfo>();
  const [videoDevice, setVideoDevice] = useState<MediaDeviceInfo>();
  const [numParticipants, setNumParticipants] = useState(0);

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
          <Stream
            url={url}
            token={token}
            numParticipants={numParticipants}
            audioEnabled={audioEnabled}
            audioDevice={audioDevice}
            videoEnabled={videoEnabled}
            videoDevice={videoDevice}
            setNumParticipants={setNumParticipants}
          />
        ) : (
          <Prepare
            audioEnabled={audioEnabled}
            videoDevice={videoDevice}
            videoTrack={videoTrack}
            setAudioEnabled={setAudioEnabled}
            setAudioDevice={setAudioDevice}
            setVideoEnabled={setVideoEnabled}
            setVideoTrack={setVideoTrack}
            setVideoDevice={setVideoDevice}
          />
        )}
      </>
    );
  }

  return <>hello world!</>;
}

export default App;
