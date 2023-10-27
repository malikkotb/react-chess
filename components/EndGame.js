import useMyStore from "../app/(store)/store";

export default function EndGame() {
    const { currentPlayer } = useMyStore();
    function restart() {
        window.location.reload();
    }

    return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md flex flex-col justify-center">
        <p className="text-2xl">{currentPlayer} Won</p>
        <button onClick={restart} className="p-2 mt-4 border rounded-xl bg-white text-black">Restart</button>
      </div>
    </div>
  );
}
