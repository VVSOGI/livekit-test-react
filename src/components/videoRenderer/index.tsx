import { Assets, Scene } from "@belivvr/aframe-react";
import {
  StereoscopicCamera,
  StereoscopicVideo,
} from "@belivvr/aframe-react-stereoscopic";
import { Property } from "csstype";
import { Track } from "livekit-client";
import { CSSProperties, useCallback, useEffect, useState } from "react";

export interface VideoRendererProps {
  id: string;
  track: Track;
  isLocal: boolean;
  /**
   * Mirror the video on the y axis.
   * Is `true` by default for local, front-facing (and undetermined facing) media tracks,
   * unless overriden by this setting */
  isMirrored?: boolean;
  objectFit?: Property.ObjectFit;
  className?: string;
  width?: Property.Width;
  height?: Property.Height;
  onSizeChanged?: (width: number, height: number) => void;
}

export const VideoRenderer = ({
  id,
  track,
  isLocal,
  isMirrored,
  objectFit,
  className,
  onSizeChanged,
  width,
  height,
}: VideoRendererProps) => {
  useEffect(() => {
    const videoComponent = document.getElementById("video") as HTMLVideoElement;

    if (!videoComponent) {
      return;
    }

    track.attach(videoComponent);
    videoComponent.srcObject = track.mediaStream as MediaStream;
    videoComponent.muted = true;
    videoComponent.play();

    return () => {
      track.detach(videoComponent);
    };
  }, [track]);

  const handleResize = useCallback((ev: UIEvent) => {
    if (ev.target instanceof HTMLVideoElement) {
      if (onSizeChanged) {
        onSizeChanged(ev.target.videoWidth, ev.target.videoHeight);
      }
    }
  }, []);

  useEffect(() => {
    const videoComponent = document.getElementById("video") as HTMLVideoElement;
    if (videoComponent) {
      videoComponent.addEventListener("resize", handleResize);
    }
    return () => {
      videoComponent?.removeEventListener("resize", handleResize);
    };
  }, []);

  const style: CSSProperties = {
    width: width,
    height: height,
  };

  const isFrontFacingOrUnknown =
    track.mediaStreamTrack?.getSettings().facingMode !== "environment";
  if (
    isMirrored ||
    (isMirrored === undefined && isLocal && isFrontFacingOrUnknown)
  ) {
    style.transform = "rotateY(180deg)";
  }

  if (objectFit) {
    style.objectFit = objectFit;
  }

  return (
    <Scene>
      <Assets>
        <video
          crossOrigin="anonymous"
          id={id}
          className={className}
          style={style}
          autoPlay
          muted
        />
      </Assets>

      <StereoscopicCamera wasdControlsEnabled={false} reverseMouseDrag />
      <StereoscopicVideo src="#video" mode="half" />
    </Scene>
  );
};
