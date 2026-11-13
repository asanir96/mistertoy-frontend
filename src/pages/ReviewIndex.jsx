import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FloatingAddBtn } from "../cmps/FloatingAddBtn";

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { reviewService } from "../services/review.service";

import { FeedbackList } from "../cmps/FeedbackList";
import { ReviewFilter } from "../cmps/ReviewFilter";

export function ReviewIndex() {
    const [reviews, setReviews] = useState(null)
    const [queryOptions, setQueryOptions] = useState(reviewService.getDefaultQueryOptions())
    const isLoading = useSelector(storedState => storedState.toyModule.isLoading)
    const user = useSelector(storedState => storedState.authModule.user)
    const navigate = useNavigate()


    useEffect(() => {
        loadReviews(queryOptions)
    }, [queryOptions])


    async function loadReviews(queryOptions) {
        try {
            const reviews = await reviewService.query(queryOptions)
            setReviews(reviews)
        } catch (err) {
            showErrorMsg('Could not load reviews')
            navigate('/');
        }
    }


    function onSetQueryOptions(queryOptions) {
        setQueryOptions(queryOptions)
    }


    return <section className="reviews main-layout full position-relative">

        <ReviewFilter
            queryOptions={queryOptions}
            onSetQueryOptions={onSetQueryOptions} />


        {isLoading ?
            <div className="loader position-absolute"></div> :

            reviews?.length ?

                <FeedbackList
                    isReviews={false}
                    feedbacks={reviews || []} /> :

                <div>No Review found...</div>


        }
        {user && user.isAdmin && <FloatingAddBtn />}
    </section>
}