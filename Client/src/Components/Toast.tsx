import "../App.css";

export default function Toast({ msg }: { msg: string }) {
  return (
    <>
      <div
        style={{
          padding: "10px",
          backgroundColor: "white",
          borderRadius: "5px",
        }}
      >
        <h3>{msg}</h3>
      </div>
    </>
  );
}
