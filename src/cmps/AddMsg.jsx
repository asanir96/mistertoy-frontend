
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import { addToyMsg } from '../store/actions/toy';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { showSuccessMsg } from "../services/event-bus.service"

export function AddMsg({ toy }) {
    const formik = useFormik({
        initialValues: {
            msgTxt: '',
        },

        validationSchema: Yup.object({
            msgTxt: Yup.string().trim()
                .min(0, 'Must be at least 1 character')
                .required('Required'),
        }),

        onSubmit: async values => {
            alert(JSON.stringify(values, null, 2));
            try {
                await addToyMsg(values, toy._id)
                showSuccessMsg('Toy saved!')
                navigate('/toy')

            } catch (err) {
                console.log(err)
                showErrorMsg(`Could not save toy`)
            }
        },
    });

    return <form className='add-msg'>
        <TextField
            className='add-msg-txt'
            id="msgTxt"
            label="Enter a text message"
            name="msgTxt"
            variant="outlined"
            onBlur={formik.handleBlur}
            value={formik.values.msgTxt}
            onChange={formik.handleChange}
            error={formik.touched.msgTxt && Boolean(formik.errors.msgTxt)}
            helperText={formik.touched.msgTxt && formik.errors.msgTxt} />
        <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={formik.handleSubmit}>
            Send
        </Button>

    </form>




}