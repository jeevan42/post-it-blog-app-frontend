import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import API from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import { notifySuccess, notifyError } from '../toastNotification'; // Import notification functions
import { Box, CircularProgress, Container, Typography } from '@mui/material';

const EditPost = () => {
    const { id } = useParams(); // Get the post ID from the URL
    const navigate = useNavigate();
    const [post, setPost] = useState(null); // State to store post data
    const [loading, setLoading] = useState(true); // Loading state
    const [isSubmitting, setIsSubmitting] = useState(false); // Submission state

    // Fetch the post data when the component mounts
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await API.get(`/posts/get-post/${id}`);
                // console.log(`update post /posts/get-post/`, response)
                if (response?.data?.code === 200) {
                    setPost(response?.data?.data);
                } else {
                    notifyError(response?.data?.message);
                }
            } catch (err) {
                notifyError(err?.response?.data?.message);
                console.error('Failed to fetch post', err);
            } finally {
                setLoading(false); // Set loading to false after fetching data
            }
        };
        fetchPost();
    }, [id]);

    // Set up Formik for form handling
    const formik = useFormik({
        initialValues: {
            title: post ? post.title : '',
            content: post ? post.content : '',
        },
        enableReinitialize: true, // To reinitialize form when post data changes
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            content: Yup.string().required('Content is required'),
        }),
        onSubmit: async (values) => {
            setIsSubmitting(true); // Set form as submitting
            try {
                const response = await API.put(`/posts/update-post/${id}`, values); // Send PUT request to update post
                // console.log(`update post /posts/update-post/`, response)
                if (response?.data?.code === 200) {
                    notifySuccess(response?.data?.message);
                    navigate(`/post/${id}`); // Redirect to the single post page
                } else {
                    notifyError(response?.data?.message);
                }
            } catch (err) {
                notifyError(err?.response?.data?.message);
                console.error('Failed to update post', err);
            } finally {
                setIsSubmitting(false); // Reset submitting state
            }
        },
    });

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }
    return (
        <Container maxWidth="sm" style={{ marginTop: '50px' }}>
            <Typography variant="h4" gutterBottom>
                Create Post
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Title"
                    style={{ width: '100%', padding: '10px', margin: '10px 0' }}
                />
                {formik.touched.title && formik.errors.title ? (
                    <div style={{ color: 'red' }}>{formik.errors.title}</div>
                ) : null}

                <textarea
                    name="content"
                    value={formik.values.content}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Content"
                    style={{ width: '100%', padding: '10px', margin: '10px 0' }}
                />
                {formik.touched.content && formik.errors.content ? (
                    <div style={{ color: 'red' }}>{formik.errors.content}</div>
                ) : null}

                <button
                    type="submit"
                    disabled={isSubmitting} // Disable button during submission
                    style={{
                        padding: '10px 20px',
                        backgroundColor: isSubmitting ? 'grey' : 'blue',
                        color: 'white',
                        border: 'none',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    }}
                >
                    {isSubmitting ? 'Updating...' : 'Update Post'} {/* Change button text */}
                </button>
            </form>
        </Container>
    );
};

export default EditPost;
