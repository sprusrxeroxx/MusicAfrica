/**
 * useSongStore: Creates a global state update for objects and stores it in the database
 * set: A structure for mapping objects 
 * returns: An object with updated state
 */

import {create} from 'zustand';

export const useSongStore = create((set) => ({
    songs: [],
    setSongs: (songs) => set({ songs }),
    createSong: async (newSong) => {
        if(!newSong.artist || !newSong.title || !newSong.image || !newSong.audioUrl || !newSong.lyrics) {
            return {success:false, message:"Please fill in all fields."}
        }
        const res = await fetch("/api/songs", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newSong) // stringifies newObject and takes it as argument
        });
        const data = await res.json();
        set((state) => ({songs:[...state.songs, data.data]})); // Appends new song to end of list
        return { success: true, message: "Song Added successfully." };
    },
    fetchSongs: async () => {
        const res = await fetch("/api/songs");
        const data = await res.json();
        set({ songs: data.data });
    },
    deleteSong: async (pid) => {
        const res = await  fetch(`/api/songs/${pid}`, {
            method: "DELETE",
        });

        const data = await res.json();

        if(!data.success) return { success: false, message: data.message }; // if data deletion is not successful return a false status

        set(state => ({ songs: state.songs.filter(song => song._id !== pid) })); // immediately updates the ui by filtering out deleted product
        return { success: true, message: data.message };
    }
}));