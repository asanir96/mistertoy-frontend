import * as React from 'react';
import { useState } from 'react'
import { useNavigate, NavLink } from "react-router-dom"
import { useSelector } from 'react-redux';

import { logout, login } from '../store/actions/auth';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service';
import { utilService } from '../services/util.service.js';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import Login from '@mui/icons-material/Login';
import TextField from '@mui/material/TextField';

import { useFormik } from 'formik';
import * as Yup from 'yup';


export function UserMenu() {
    const [userToUpdate, setUserToUpdate] = useState({ username: '', password: '' })
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },

        validationSchema: Yup.object({
            username: Yup.string().trim()
                .required('Required'),
            password: Yup.string()
                .required('Required'),
        }),
        onSubmit: async values => {
            alert(JSON.stringify(values, null, 2));
            try {
                await login({ ...userToUpdate, ...values })
                showSuccessMsg('Logged in!')
                setAnchorEl(null);
                formik.handleReset()
            } catch (err) {
                console.log(err)
                showErrorMsg(`Could not log in`)
            }
        },
    });

    const user = useSelector(storedState => storedState.authModule.user)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const initials = user ? utilService.getUserInitials(user) : null
    function handleClick(ev) {
        setAnchorEl(ev.currentTarget);
    }

    async function handleLogout() {
        try {
            setAnchorEl(null)
            await logout()
        } catch (err) {
            console.log(err)
            showErrorMsg('Could not log out')
        }

    }

    function handleClose() {
        setAnchorEl(null)
    }

    function handleSignupNavigate() {
        formik.handleReset()
        setAnchorEl(null)
        navigate('/signup')
    }

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Login or signup">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        // aria-controls={open ? 'account-menu' : undefined}
                        // aria-haspopup="true"
                        // aria-expanded={open}
                    >
                        <Avatar sx={{ width: 32, height: 32,padding:"0.5em" }}>{user && initials}</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Popover
                className='user-menu'
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {

                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <h3>{user ? user.fullname : 'Login'}</h3>
                <Divider />

                {!user && <form
                    style={{ display: "flex", flexDirection: 'column', paddingBlock: "1em" }}

                    className='login-form'
                    onSubmit={formik.handleSubmit}
                >
                    <TextField
                        style={{ marginInline: "1em" }}
                        className="login-field"
                        id="username"
                        label="username"
                        name="username"
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                    />

                    <TextField
                        style={{ marginInline: "1em" }}
                        className="login-field"
                        id="password"
                        label="password"
                        name="password"
                        type="password"
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                    />

                </form>
                }

                <Divider />

                {user ? <Button
                    style={{ marginInline: "1em", marginBlock: '1em', width: 'min-content' }}

                    variant="contained" onClick={handleLogout}>
                    <Logout
                        style={{ marginInlineEnd: "0.5em" }}

                        fontSize="small" />
                    Logout
                </Button>
                    :
                    <Button
                        style={{ marginInline: "1em", marginBlock: '1em', width: 'min-content' }}
                        variant="contained"
                        onClick={formik.handleSubmit}>
                        <Login fontSize="small"
                            style={{ marginInlineEnd: "0.5em" }}
                        />
                        Login
                    </Button>}

                {!user &&
                    <Button
                        variant="outlined"
                        style={{ marginInline: "1em", marginBlock: '0.4em' }}

                        onClick={handleSignupNavigate}>
                        Signup
                    </Button>}

            </Popover>
        </React.Fragment >
    );
}
