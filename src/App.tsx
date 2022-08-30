import "@livekit/react-components/dist/index.css";
import { useEffect, useState } from "react";
import { createLocalVideoTrack, LocalVideoTrack } from "livekit-client";
import Prepare from "./components/prepare";
import Stream from "./components/stream";
import { useRecoilState } from "recoil";
import { AccessTokenState } from "./recoil";

function App() {
  const [token] = useRecoilState(AccessTokenState);
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

export default App;
