import React, { useState } from 'react'
import { Box, Button, InputAdornment, Modal, TextField, Typography } from '@mui/material'
import postDailyEmployeeService from '../services/postDailyEmployeeService';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Post = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const initialPostState = {
        id:         null,
        post_name:  '',
        salary:     '',
    }

    const [post, setPost] = useState(initialPostState)

    const handleInputChange = e => {
        const { name, value } = e.target
        setPost({ ...post, [name]: value })
    }

    const saveTool = e => {
        e.preventDefault()
        var data = {
            post_name:  post.post_name,
            salary:     post.salary,
        }
        postDailyEmployeeService.create(data).then(res => {
            setPost({
                id:         res.data.id,
                post_name:  res.data.post_name,
                salary:     res.data.salary,
            })
        }).catch(err => {
            console.log(err)
        })
        window.location.reload()
    }

    return (
        <>
            <Button
                variant="contained"
                sx={{ mr: 10, ml: 150, mt: -10, width: 250, marginLeft: '70%' }}
                onClick={handleOpen}
            >
                Nouveau Poste
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Nouveau Poste
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <form onSubmit={saveTool} noValidate autoComplete='off'>
                            <TextField 
                                id="post_name"
                                value={post.post_name}
                                onChange={handleInputChange}
                                name="post_name"
                                label="Nom du poste" 
                                variant="outlined" 
                                sx={{ width: '100%' }}
                                size="small"
                            /><br /><br />

                            <TextField
                                id="salary"
                                value={post.salary}
                                onChange={handleInputChange}
                                name="salary"
                                type="number"
                                label="Salaire"
                                sx={{ width: '100%' }}
                                size="small"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">Ar</InputAdornment>,
                                }}
                                variant="outlined"
                            /><br /><br />
                            <Button onClick={saveTool} variant="contained" sx={{ width: '100%' }}>Enregistrer</Button>
                        </form>
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}

export default Post