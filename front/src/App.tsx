import { useEffect, useState } from "react";
import "./App.css";
import { useVoteStore } from "./store/vote-store";

function App() {
  const {
    step,
    memes,
    selectedMeme,
    finalMeme,
    fetchMemes,
    voteForMeme,
    selectMeme,
    userEmail,
    setUserEmail,
  } = useVoteStore();
  const [localEmail, setLocalEmail] = useState("");

  useEffect(() => {
    if (userEmail && !finalMeme) fetchMemes();
  }, [step, userEmail]);

  if (finalMeme)
    return (
      <div className="flex flex-col items-center p-4">
        <h2 className="text-xl font-bold mb-4">You voted for:</h2>
        <img
          src={finalMeme.url}
          alt={finalMeme.title}
          className="w-64 h-64 rounded-lg shadow-lg"
        />
      </div>
    );
  return (
    <div className="p-4">
      {!userEmail ? (
        <div className="flex flex-col gap-2 mb-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={localEmail}
            onChange={(e) => setLocalEmail(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            onClick={() => {
              if (!localEmail.includes("@")) {
                alert("Please enter a valid email!");
                return;
              }
              setUserEmail(localEmail);
            }}
            className="bg-emerald-500 p-2 rounded"
          >
            Start Voting
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            {memes.map((meme) => (
              <div key={meme._id} className="flex flex-col items-center">
                <img src={meme.url} alt={meme.title} className="w-64 h-64" />
                <button
                  className={`mt-2 px-4 py-2 rounded ${
                    selectedMeme?._id === meme._id
                      ? "bg-emerald-500"
                      : "bg-gray-500"
                  }`}
                  onClick={() => selectMeme(meme._id)}
                >
                  <p className="text-white">
                    {selectedMeme?._id === meme._id ? "Selected" : "Choose"}
                  </p>
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={voteForMeme}
            disabled={!selectedMeme}
            className={`p-2 rounded bg-emerald-500 ${
              selectedMeme ? "" : "cursor-not-allowed"
            }`}
          >
            Vote
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
