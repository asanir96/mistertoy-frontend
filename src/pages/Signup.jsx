
import { useState } from "react"
import {useNavigate } from "react-router-dom"

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

import TextField from '@mui/material/TextField';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { signup } from "../store/actions/auth"

export function Signup() {
    const [userToUpdate, setUserToUpdate] = useState({ username: '', password: '' })
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            fullname: '',
            username: '',
            password: ''
        },

        validationSchema: Yup.object({
            fullname: Yup.string().trim()
                .required('Required'),
            username: Yup.string().trim()
                .required('Required'),
            password: Yup.string()
                .required('Required'),
        }),

        onSubmit: async values => {
            alert(JSON.stringify(values, null, 2));
            try {
                await signup({ ...userToUpdate, ...values })
                showSuccessMsg('Signed up succesfully!')
                navigate('/toy')

            } catch (err) {
                console.log(err)
                showErrorMsg(`Could not sign up`)
            }
        },
    });


    return <section className="signup">
        <h3>Signup</h3>
        <form
            onSubmit={formik.handleSubmit}>

            <TextField
                className="edit-item"
                id="fullname"
                label="fullname"
                name="fullname"
                onBlur={formik.handleBlur}
                value={formik.values.fullname}
                onChange={formik.handleChange}
                error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                helperText={formik.touched.fullname && formik.errors.fullname || `Enter full name`}
            />
            <TextField
                className="edit-item"
                id="username"
                label="username"
                name="username"
                onBlur={formik.handleBlur}
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username || `Enter username`}
            />

            <TextField
                className="edit-item"
                id="password"
                label="password"
                name="password"
                onBlur={formik.handleBlur}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password || `Enter password`}
            />


            <input disabled={Object.keys(formik.errors).length > 0} type="submit" value="Save" />
        </form>
    </section>

}