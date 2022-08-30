import { useEffect } from "react";
import axios from "axios";

function App() {
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
    })();
  }, []);

  return <>hello world!</>;
}

export default App;
