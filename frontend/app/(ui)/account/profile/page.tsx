'use client';

import axios from "axios";
import User from "@/models/user";
import {useEffect, useState} from "react";
import {getCurrentUserAction} from "@/app/actions/getCurrentUserAction";

export default function Page() {
    // user state
    const [user, setUser] = useState<User | null>(null);
    // fetch user data
    useEffect(() => {
         getCurrentUserAction().then(
                (response) => {
                    console.log('getCurrentUserAction = ', response)
                    setUser(User.fromJson(response.data))
                }
            ).catch((error) => {
                console.error('Error fetching user data:', error
         )
            })
         }, []);

    return (
        <div>
            <h1>Profile Page</h1>
            {user ? (
                <div>
                    <h2>{user.firstName} {user.lastName}</h2>
                    <p>{user.email}</p>
                </div>
            ) : (
                <p>Please log in to see your profile.</p>
            )}
        </div>
    );
}