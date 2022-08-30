import axios from "axios";

export default async function getAccessToken(
  participantName: string,
  roomName: string
) {
  const { data } = await axios.get("http://localhost:4000/access-token", {
    params: {
      participantName: participantName,
      roomName: roomName,
    },
  });

  return data;
}
