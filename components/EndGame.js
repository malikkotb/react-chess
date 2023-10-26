

export default function EndGame() {

    function restart() {
        window.location.reload();
    }

    return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md">
        <p>This is your alert message.</p>
        <button onClick={restart} className="p-2 border rounded-xl bg-white text-black">Restart</button>
      </div>
    </div>
  );
}
