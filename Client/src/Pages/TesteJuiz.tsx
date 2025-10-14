import { useEffect, useState } from "react";
import { io } from "socket.io-client";


  const sc = io("http://localhost:3001");

export default function TesteJuiz() {

  const [num, SetNum] = useState<number>();

  useEffect(() => {
    sc.on("score_update", SetNum);
    return () => {
      sc.off("score_update");
    };
  }, []);

  return (
    <>
      <p>{num}</p>
    </>
  );
}
