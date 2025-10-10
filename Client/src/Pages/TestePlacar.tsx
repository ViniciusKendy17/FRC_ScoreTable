import { useEffect, useState, type ChangeEvent } from "react";
import { io } from "socket.io-client";

export default function TestePlacar() {
  const [coral, SetCoral] = useState(String);

  const sc = io("http://localhost:3001");
  useEffect(() => {
    sc.on("connect", () => {
      console.log(sc.id);
    });
  }, []);

  const MandarParaPlacar = (e: string) => {};

  return (
    <>
      <input
        type="number"
        value={coral}
        onChange={(e) => MandarParaPlacar(e.target.value)}
      />
    </>
  );
}
