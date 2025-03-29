/* eslint-disable */
"use client"; // Ensure it's a client component

import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import UserCard from "./UserSendMoneyCard";
import { allUsers } from "../app/lib/actions/allUsers";
import { getSession } from "next-auth/react"; // Correct way to get session in client components
// Define User Type
interface User {
    id: string;
    name: string | null;
    email: string | null;
}

export default function SearchUser() {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [search, setSearch] = useState<string>("");
    const [loading,setLoading]=useState(true)
    // Fetch users and filter out the current user
    useEffect(() => {
        const fetchData = async () => {
            const session:any = await getSession(); // Correct client-side session fetch
            if (!session || !session?.user?.id) return;

            const allUsersData: User[] = await allUsers(); // Fetch all users
            const filtered = allUsersData.filter(user => user.email !== session?.user?.email); // Exclude current user
            setUsers(filtered);
            setFilteredUsers(filtered); // Show all by default
            setLoading(false)
        };

        fetchData();
    }, []);

    // Handle search immediately (without debounce)
    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearch(query);

        if (!query) {
            setFilteredUsers(users); // Show all users when search is empty
        } else {
            setFilteredUsers(users.filter(user => user.name && user.name.toLowerCase().startsWith(query))); // Filter users by name
        }
    };
if(loading){
    return    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
    {/* Animated Spinner */}
    <div className="w-16 h-16 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>

    {/* Loading Text with Fading Effect */}
    <p className="mt-4 text-lg font-medium animate-pulse">Loading...</p>
  </div>
}
    return (
        <div className="max-w-3xl mx-auto mt-5">
            {/* Title */}
            <h2 className="text-xl font-semibold text-white mb-3">Send Money</h2>

            {/* Search Bar */}
            <div className="relative">
                <input
                    type="text"
                    value={search}
                    onChange={onSearchChange}
                    placeholder="Search user..."
                    className="w-full p-3 pl-4 pr-10 rounded-lg border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>

            {/* User List */}
            <div className="flex flex-col items-center mt-4 space-y-3">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <UserCard key={user.id} name={user?.name as string} email={user.email as string} />
                    ))
                ) : (
                    <p className="text-gray-300 text-center mt-4">No users found</p>
                )}
            </div>
        </div>
    );
}
