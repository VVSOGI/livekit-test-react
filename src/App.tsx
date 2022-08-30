import "@livekit/react-components/dist/index.css";
import axios from "axios";
import { ReactElement, useEffect, useState } from "react";
import {
  AudioSelectButton,
  LiveKitRoom,
  VideoRenderer,
  VideoSelectButton,
} from "@livekit/react-components";
import { createLocalVideoTrack, LocalVideoTrack } from "livekit-client";

function App() {
  const [token, setToken] = useState(null);
  const [videoTrack, setVideoTrack] = useState<LocalVideoTrack>();
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [audioDevice, setAudioDevice] = useState<MediaDeviceInfo>();
  const [videoDevice, setVideoDevice] = useState<MediaDeviceInfo>();

  const url = "ws://localhost:7880";

  const canStream = token && url && audioDevice && videoDevice;

  const toggleVideo = async () => {
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
  };

  const toggleAudio = () => {
    if (audioEnabled) {
      setAudioEnabled(false);
    } else {
      setAudioEnabled(true);
    }
  };

  const selectVideoDevice = (device: MediaDeviceInfo) => {
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
  };

  let videoElement: ReactElement;
  if (videoTrack) {
    videoElement = <VideoRenderer track={videoTrack} isLocal={true} />;
  } else {
    videoElement = <div className="placeholder" />;
  }

  useEffect(() => {
    // enable video by default
    createLocalVideoTrack({
      deviceId: videoDevice?.deviceId,
    }).then((track) => {
      setVideoEnabled(true);
      setVideoTrack(track);
    });
  }, [videoDevice]);

  useEffect(() => {
    (async () => {
      const { data: accessToken } = await axios.get(
        "http://localhost:4000/access-token",
        {
          params: {
            participantName: "benny",
            roomName: "benny-room",
          },
        }
      );

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
                onClick={toggleAudio}
                onSourceSelected={setAudioDevice}
              />
              <VideoSelectButton
                isEnabled={videoTrack !== undefined}
                onClick={toggleVideo}
                onSourceSelected={selectVideoDevice}
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
