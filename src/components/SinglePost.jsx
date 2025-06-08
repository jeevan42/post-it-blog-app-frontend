import React, { useEffect, useState } from 'react';
import API from '../api';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { notifyError, notifySuccess } from '../toastNotification';
import { Card, CardContent, Typography, Button, CircularProgress, Container, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function SinglePost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true); // To manage loading state
    const [openDialog, setOpenDialog] = useState(false); // Manage modal open state

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await API.get(`/posts/get-post/${id}`);
                if (response?.data?.code === 200) {
                    setPost(response?.data?.data);
                } else {
                    notifyError(response?.data?.message);
                }
            } catch (err) {
                notifyError(err?.response?.data?.message || 'Failed to fetch post');
                console.error('Failed to fetch post', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        try {
            const response = await API.delete(`/posts/delete-post/${id}`);
            if (response?.data?.code === 200) {
                notifySuccess(response?.data?.message);
                navigate(`/`);
            } else {
                notifyError(response?.data?.message);
            }
        } catch (err) {
            notifyError(err?.response?.data?.message || 'Failed to delete post');
            console.error('Failed to delete post', err);
        } finally {
        }
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleConfirmDelete = () => {
        handleDelete();
        handleCloseDialog();
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    if (!post) {
        return <Typography variant="h5" align="center">No blog post found...</Typography>;
    }

    const {
        _id: postId,
        title: postTitle,
        content: postContent,
        author: {
            username: postAuthor,
            _id: postAuthorId
        } = {} 
    } = post;

    return (
        <Container maxWidth="md" style={{ marginTop: '20px' }}>
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {postTitle}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        {postContent}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Author: {postAuthor || 'Unknown'}
                    </Typography>
                </CardContent>

                <Box display="flex" justifyContent="center" padding={2} gap={2}>
                    {userId && postAuthorId && postAuthorId === userId
                        ? (
                            <>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    component={Link}
                                    to={`/`}
                                >
                                    Go Back
                                </Button>

                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={handleOpenDialog} // Open the delete confirmation dialog
                                >
                                    Delete
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    component={Link}
                                    to={`/edit/${postId}`}
                                >
                                    Edit
                                </Button>
                            </>
                        )
                        : (
                            <Button
                                variant="contained"
                                color="primary"
                                component={Link}
                                to={`/`}
                            >
                                Go Back
                            </Button>
                        )}
                </Box>
            </Card>

            {/* Confirmation Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this post? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default SinglePost;
