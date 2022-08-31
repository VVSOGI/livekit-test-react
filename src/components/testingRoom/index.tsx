import { useRoom } from "@livekit/react-components";
import {
  ConnectionState,
  LocalParticipant,
  Room,
  RoomConnectOptions,
  RoomOptions,
} from "livekit-client";
import { useEffect, useState } from "react";

interface Props {
  url: string;
  token: string;
  roomOptions?: RoomOptions;
  connectOptions?: RoomConnectOptions;
  onConnected?: (room: Room) => Promise<void>;
}

export default function TestingRoom({
  roomOptions,
  url,
  token,
  connectOptions,
  onConnected,
}: Props) {
  const [myInfo, setMyInfo] = useState<LocalParticipant | undefined>(undefined);
  const { room, participants, connect } = useRoom(roomOptions);

  useEffect(() => {
    (async () => {
      const connectedRoom = await connect(url, token, connectOptions);
      if (!connectedRoom) {
        return;
      }

      if (onConnected && connectedRoom.state === ConnectionState.Connected) {
        await onConnected(connectedRoom);
      }

      const info = room?.localParticipant;
      setMyInfo(info);
    })();

    return () => {
      if (room?.state !== ConnectionState.Disconnected) {
        room?.disconnect();
      }
    };
  }, []);

  if (room?.state === ConnectionState.Connecting) {
    return <>...loading</>;
  }

  return (
    <div>
      {myInfo ? (
        <>
          <div>내 이름: {myInfo.identity}</div>
          <div>내 sid: {myInfo.sid}</div>
        </>
      ) : null}
      <div>
        유저 리스트
        {participants.map((participant) => {
          return <div key={participant.sid}>{participant.identity}</div>;
        })}
      </div>
    </div>
  );
}
