
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';

import { FeedBackRating } from './FeedbackRating';
export function FeedbackForm({ toy, addFunc, initialValues, validationSchema }) {

    const valueName = Object.keys(initialValues)[0]
    console.log('valueName', valueName)
    const formik = useFormik({
        initialValues,
        validationSchema,

        onSubmit: async values => await addFunc(values),
    });

    return <form className='add-msg'>

        <TextField
            className='add-msg-txt'
            id={valueName}
            label="Enter a text message"
            name={valueName}
            variant="standard"
            onBlur={formik.handleBlur}
            value={formik.values[valueName]}
            onChange={formik.handleChange} />

        {valueName === 'txt' &&
            <FeedBackRating
                rating={formik.values.rating}
                handleChange={formik.handleChange} />}

        <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={formik.handleSubmit}>
            Send
        </Button>

    </form>




}