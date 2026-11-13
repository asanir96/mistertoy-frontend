import { toyService } from "../services/toy.service"
import { reviewService } from "../services/review.service.js"
import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from 'react-router-dom'
import { showErrorMsg } from "../services/event-bus.service"
import { FeedbackList } from "../cmps/FeedbackList"
import { FeedbackForm } from "../cmps/FeedbackForm"
import { useSelector } from "react-redux"
import { InStockLabel } from "../cmps/InStockChip"
import Chip from '@mui/material/Chip';
import { addToyMsg } from '../store/actions/toy';
import * as Yup from 'yup';
import { showSuccessMsg } from "../services/event-bus.service"
import { SET_ISLOADING } from "../store/reducers/toy.reducer"
import { store } from "../store/store.js";
import { utilService } from "../services/util.service.js"

const PLACEHOLDER_URL = '../src/assets/img/horse-toys-icon.png'

const reviewValidationSchema = Yup.object({
    txt: Yup.string().trim()
        .min(0, 'Must be at least 1 character')
        .required('Required'),
    rating: Yup.number()
})

const msgValidationSchema = Yup.object({
    msgTxt: Yup.string().trim()
        .min(0, 'Must be at least 1 character')
        .required('Required'),
})


export function ToyDetails() {
    const user = useSelector(storedState => storedState.authModule.user)
    const isLoading = useSelector(storedState => storedState.toyModule.isLoading)
    const [toy, setToy] = useState(null)
    const [reviews, setReviews] = useState(null)

    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [])

    async function loadToy() {
        try {
            store.dispatch({ type: SET_ISLOADING, isLoading: true })
            const selectedToy = await toyService.getById(toyId)
            setToy(selectedToy)
            setReviews(selectedToy.toyReviews)
        } catch (err) {
            showErrorMsg('Something went wrong')
            navigate('/toy')
        } finally {
            store.dispatch({ type: SET_ISLOADING, isLoading: false })
        }
    }


    async function addMsg(values) {
        try {
            await addToyMsg(values, toyId)
            showSuccessMsg('Message saved!')

        } catch (err) {
            console.log(err)
            showErrorMsg(`Could not save message`)
        }
    }

    async function addToyReview(values) {
        const { txt, rating } = values
        const review = {
            by: {
                _id: user._id,
                fullname: user.fullname
            },
            txt,
            rating,
            createdAt: Date.now(),
            _id: utilService.makeId()
        }

        try {
            setReviews(prev => [...prev, review])

            const reviewToAdd = {
                txt,
                rating,
                toyId
            }
            const addedReview = await reviewService.add(reviewToAdd)

            setReviews(prev =>
                prev.map(item =>
                    item._id === review._id
                        ? { ...item, ...addedReview }
                        : item
                )
            );
            console.log('reviews', reviews)

            showSuccessMsg('Review saved!')

        } catch (err) {
            setReviews(prev => prev.filter(currReview => currReview._id !== review._id))
            console.log(err)
            showErrorMsg(`Could not save review`)
        }
    }

    async function deleteToyReview(reviewId) {
        const removedReview = reviews.find(review => review._id === reviewId)

        try {
            setReviews(prev => prev.filter(review => review._id !== reviewId))
            await reviewService.remove(reviewId)
            showSuccessMsg('Review removed!')

        } catch (err) {
            setReviews(prev => [...prev, removedReview])
            console.log(err)
            showErrorMsg(`Could not save review`)
        }
    }


    if (!toy || isLoading) return <div>Loading...</div>

    return <section className="toy-details details-layout">

        {toy.imgUrl ?
            <img src={toy.imgUrl} alt="" /> :
            <img src={PLACEHOLDER_URL} alt="" />}

        <section className="details-info">

            <h3>{toy.name}</h3>

            <p className="toy-price">
                <span>${toy.price.toLocaleString()}</span>
            </p>

            <InStockLabel
                inStock={toy.inStock}
                style={{ fontSize: '0.7em', padding: '0 1px' }} />

            {toy.labels && <div>Categories: {toy.labels.map(label => {
                return <Chip label={label} sx={{ marginInline: '0.25em' }} />
            })}</div>}

        </section>

        <section className="toy-msgs">

            <h3>Reviews</h3>

            <FeedbackList
                isReviews={true}
                feedbacks={reviews || []}
                onRemoveFunc={deleteToyReview} />

            {user && <FeedbackForm
                toy={toy}
                addFunc={addToyReview}
                initialValues={{ txt: '', rating: 1 }}
                validationSchema={reviewValidationSchema} />}

        </section>

        <section className="toy-msgs">

            <h3>Discussion</h3>

            <FeedbackList
                isReviews={false}
                feedbacks={toy.msgs || []} />

            {user && <FeedbackForm
                toy={toy}
                addFunc={addMsg}
                initialValues={{ msgTxt: '' }}
                validationSchema={msgValidationSchema} />}

        </section>

    </section>

}