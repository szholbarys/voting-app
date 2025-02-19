import { create } from "zustand";

type Meme = {
  _id: string;
  url: string;
  title?: string;
};

type VoteState = {
  step: number;
  memes: Meme[];
  selectedMeme: Meme | null;
  finalMeme: Meme | null;
  userEmail: string;
  setUserEmail: (email: string) => void;
  fetchMemes: () => Promise<void>;
  selectMeme: (memeId: string) => void;
  voteForMeme: () => void;
};

export const useVoteStore = create<VoteState>((set, get) => ({
  step: 0,
  memes: [],
  selectedMeme: null,
  finalMeme: null,
  userEmail: "",
  setUserEmail: (email: string) => set({ userEmail: email }),

  fetchMemes: async () => {
    const res = await fetch("http://localhost:5001/api/memes/random");
    const data: Meme[] = await res.json();
    set({ memes: data, selectedMeme: null });
  },

  selectMeme: (memeId: string) => {
    const meme = get().memes.find((m) => m._id === memeId) || null;
    set({ selectedMeme: meme });
  },

  voteForMeme: async () => {
    const { selectedMeme, userEmail, step } = get();
    if (!selectedMeme) {
      alert("Please select a meme before voting!");
      return;
    }

    await fetch("http://localhost:5001/api/memes/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ memeId: selectedMeme._id, email: userEmail }),
    });

    if (step < 4) {
      set({ step: step + 1, memes: [], selectedMeme: null });
    } else {
      set({ finalMeme: selectedMeme });
    }
  },
}));
