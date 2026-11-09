import { userService } from "../services/user.service.js";

import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"

import { SET_ISLOADING } from "../store/reducers/toy.reducer"
import { store } from "../store/store.js";

import Chip from '@mui/material/Chip';
import { Avatar } from "@mui/material";
import { FeedbackList } from "../cmps/FeedbackList.jsx";
export function UserDetails() {
    const isLoading = useSelector(storedState => storedState.toyModule.isLoading)
    const [user, setUser] = useState(null)
    const [reviews, setReviews] = useState(null)

    const { userId } = useParams()


    useEffect(() => {
        loadUser()
    }, [])

    async function loadUser() {
        try {
            store.dispatch({ type: SET_ISLOADING, isLoading: true })
            const selectedUser = await userService.getById(userId)
            setUser(selectedUser)
            setReviews(selectedUser.toyReviews)
        } catch (err) {
            showErrorMsg('Something went wrong')
            navigate('/toy')
        } finally {
            store.dispatch({ type: SET_ISLOADING, isLoading: false })
        }
    }



    if (!user || isLoading) return <div>Loading...</div>

    return <section className="user-details details-layout">

        <section className="user-info">
            <Avatar/>
            <h2>{user.fullname}</h2>
            <Chip className='role-chip' label={user.isAdmin?'Admin':'Member'} sx={{ marginInline: '0.25em' }} />
        </section>

        <section className="toy-msgs">

            <h3>Reviews</h3>

            <FeedbackList
                isReviews={true}
                feedbacks={reviews || []} />
        </section>
    </section>

}