import styled from "@emotion/styled";
import { useParticipant } from "@livekit/react-components";
import { LocalTrack, Participant, RemoteTrack } from "livekit-client";
import React, { useCallback, useEffect, useState } from "react";
import { VideoRenderer } from "../videoRenderer";

interface Props {
  participant: Participant;
}

const Container = styled.div`
  width: 720px;
  height: 480px;
`;

export default function VideoTest({ participant }: Props) {
  const [videoSize, setVideoSize] = useState<string>("");
  const { isLocal, cameraPublication } = useParticipant(participant);
  const [currentBitrate, setCurrentBitrate] = useState<number>(0);

  const handleResize = useCallback((width: number, height: number) => {
    setVideoSize(`${width}x${height}`);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      let total = 0;
      participant.tracks.forEach((pub) => {
        if (
          pub.track instanceof LocalTrack ||
          pub.track instanceof RemoteTrack
        ) {
          total += pub.track.currentBitrate;
        }
      });
      setCurrentBitrate(total);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (cameraPublication?.track) {
    return (
      <Container>
        <VideoRenderer
          id={"video"}
          track={cameraPublication?.track}
          isLocal={isLocal}
          objectFit={"contain"}
          width={"100%"}
          height={"100%"}
          onSizeChanged={handleResize}
        />

        <div>
          <span>{videoSize}</span>
          {currentBitrate !== undefined && currentBitrate > 0 && (
            <span>&nbsp;{Math.round(currentBitrate / 1024)} kbps</span>
          )}
        </div>
      </Container>
    );
  } else {
    return <>loading</>;
  }
}
