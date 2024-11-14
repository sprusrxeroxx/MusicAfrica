/**
 * useusertore: Creates a global state update for objects and stores it in the database
 * set: A structure for mapping objects 
 * returns: An object with updated state
 */

import {create} from 'zustand';
import {useNavigate} from 'react-router-dom';

export const useUserStore = create((set) => ({
    user: [],
    setUser: (users) => set({ users }),
    createUser: async (newUser) => {
        if(!newUser.username || !newUser.email || !newUser.password) {
            return {success:false, message:"Please fill in all fields."}
        }
        const res = await fetch("/api/users/register", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newUser) // stringifies newObject and takes it as argument
        });
        const data = await res.json();
        set((state) => ({user:[...state.user, data.data]})); // Appends new User to end of 
        return { success: true, message: "User Added successfully." };
    },
    // fetchuser: async () => {
    //     const res = await fetch("/api/user");
    //     const data = await res.json();
    //     set({ user: data.data });
    // },
    // deleteUser: async (pid) => {
    //     const res = await  fetch(`/api/user/${pid}`, {
    //         method: "DELETE",
    //     });

    //     const data = await res.json();

    //     if(!data.success) return { success: false, message: data.message }; // if data deletion is not successful return a false status

    //     set(state => ({ user: state.user.filter(User => User._id !== pid) })); // immediately updates the ui by filtering out deleted product
    //     return { success: true, message: data.message };
    // },
    // updateUser: async (pid, updatedUser) => {
    //     const res = await fetch(`/api/user/${pid}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(updatedUser),
    //     });
    //     const data = await res.json();
    //     if (!data.success) return { success: false, message: data.message };
        
    //     // immidiately updates the state in ui if changed
    //     set(state => ({ 
    //         user: state.user.map((User) => (User._id === pid ? data.data : User)),
    //     }));
    //     return { success: true, message: data.message };
    // },
}));