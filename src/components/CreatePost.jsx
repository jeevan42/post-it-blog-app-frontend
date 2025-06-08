import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import { notifySuccess, notifyError } from '../toastNotification';
import { Container, Typography } from '@mui/material';

const CreatePost = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

    const formik = useFormik({
        initialValues: {
            title: '',
            content: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            content: Yup.string().required('Content is required'),
        }),
        onSubmit: async (values) => {
            setIsSubmitting(true); // Set submitting to true when form submission starts
            try {
                const response = await API.post('/posts/create-post', values);
                // console.log(`/posts/create-post`, response);

                if (response?.data?.code === 200) {
                    notifySuccess(response?.data?.message);
                    navigate('/');
                } else {
                    notifyError(response?.data?.msg);
                }
            } catch (err) {
                notifyError(err?.response?.data?.message);
                console.error('Failed to create post', err);
            } finally {
                setIsSubmitting(false); // Set submitting back to false
            }
        },
    });

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
                    disabled={isSubmitting} // Disable button when submitting
                    style={{
                        padding: '10px 20px',
                        backgroundColor: isSubmitting ? 'grey' : 'blue',
                        color: 'white',
                        border: 'none',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    }}
                >
                    {isSubmitting ? 'Submitting...' : 'Create Post'}
                </button>
            </form>
        </Container>
    );
};

export default CreatePost;
