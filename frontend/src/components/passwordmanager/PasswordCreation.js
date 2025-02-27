import React, {useState} from "react";
import {Grid, Modal, useMediaQuery} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import FormTextInput from "../generic/FormTextInput";
import createPostRequest from "../generic/CreatePostRequest";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PasswordGeneration from "./PasswordGeneration";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const PasswordCreation = ({ closeModal, addPassword }) => {
    const desktop = useMediaQuery('(min-width:600px)');

    const [open, setOpen] = useState(false);
    const onOpen = () => setOpen(true);

    const [showPassword, setShowPassword] = useState(true);
    const toggleShowPassword = () => setShowPassword(!showPassword);

    const [title, setTitle] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [website, setWebsite] = useState('');

    const changeTitle = (e) => {
        setTitle(e.target.value);
    }

    const changeUsername = (e) => {
        setUsername(e.target.value);
    }

    const changePassword = (e) => {
        setPassword(e.target.value);
    }

    const changeWebsite = (e) => {
        setWebsite(e.target.value);
    }

    const clearInput = () => {
        document.getElementById('Title').value = "";
        document.getElementById('Username').value = "";
        document.getElementById('Password').value = "";
        document.getElementById('Website').value = "";

        setTitle("");
        setUsername("");
        setPassword("");
        setWebsite("");
    }

    const onSubmit = (e) => {
        e.preventDefault();

        fetch('/api/createPassword', createPostRequest({
                title: title,
                username: username,
                managed_password: password,
                website: website
            }))
            .then((response) => response.json())
            .then((data) => addPassword(data));

        clearInput();
        closeModal();
    }

    const inputPasswordGenerated = (password) => {
        document.getElementById('Password').value = password;
        setPassword(password);
    }

    return (
        <form onSubmit={ onSubmit }>
            <Grid container spacing={2}>
                <Grid item xs={12} align="center">
                    <div className="center">
                        <h1>
                            Create Login
                        </h1>
                    </div>
                    <CloseIcon onClick={ closeModal } className="top-right" />
                </Grid>
                <Grid item xs={12} align="center">
                    <div className="center" style={{padding: "10px"}}>
                        <FormTextInput label="Title" placeHolder="Title..." inputType="text" onChange={ (e) => changeTitle(e) } divClasses="form-text-padding" labelClasses="form-text-padding" />
                    </div>
                </Grid>
                <Grid item xs={12} align="center">
                    <div className="center" style={{padding: "10px"}}>
                        <FormTextInput label="Username" placeHolder="Username..." inputType="text" onChange={ (e) => changeUsername(e) }  divClasses="form-text-padding" labelClasses="form-text-padding"/>
                    </div>
                </Grid>
                <Grid item xs={12} align="center">
                    <div className="center" style={{padding: "10px"}}>
                        <FormTextInput
                            label="Password"
                            placeHolder="Password..."
                            inputType={ showPassword ? "text": "password" }
                            onChange={ (e) => changePassword(e) }
                            divClasses="form-text-padding"
                            labelClasses="form-text-padding"
                        />
                        {
                            showPassword ?
                            <VisibilityIcon className="iconBtn" onClick={ () => toggleShowPassword() } style={{ float: 'right'}} />:
                            <VisibilityOffIcon className="iconBtn" onClick={ () => toggleShowPassword() } style={{ float: 'right'}} />
                        }
                        <AutoStoriesIcon className="iconBtn" onClick={ onOpen } style={{float: 'right'}}/>
                    </div>
                </Grid>
                <Grid item xs={12} align="center">
                    <div className="center" style={{padding: "10px"}}>
                        <FormTextInput label="Website" placeHolder="Website..." inputType="text" onChange={ (e) => changeWebsite(e) }  divClasses="form-text-padding" labelClasses="form-text-padding"/>
                    </div>
                </Grid>
                <Grid item xs={12} align="center">
                    <button className="btn">
                        Save
                    </button>
                </Grid>
            </Grid>

            <PasswordGeneration open={ open } setOpen={ (val) => setOpen(val) } writePassword={ (password) => { inputPasswordGenerated(password) } } />
        </form>
    );
}

export default PasswordCreation;