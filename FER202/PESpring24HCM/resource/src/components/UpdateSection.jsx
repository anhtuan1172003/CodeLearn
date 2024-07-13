import React, { useState, useEffect } from 'react';
import { Button, TextField, Switch, FormControlLabel, FormControl, InputLabel, Select, MenuItem, Grid, Container, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getSectionById, updateSectionById } from '../api/section';

const UpdateSection = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: '',
        image: '',
        gender: '',
        dateOfBirth: '',
        class: '',
        feedback: '',
    });

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSectionById(id);
                setFormData(data);
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        const newValue = name === 'isMainTask' ? event.target.checked : value;
        setFormData({ ...formData, [name]: newValue });
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length === 0) {
            setSubmitting(true);
            try {
                await updateSectionById(id, formData);
                navigate('/dashboard');
            } catch (error) {
                console.error('Error updating student:', error);
            }
        } else {
            setErrors(validationErrors);
        }
    };

    const validateForm = (data) => {
        let errors = {};
        if (!data.sectionName) {
            errors.sectionName = 'SectionName is required';
        } else if (data.sectionName.length < 2) {
            errors.sectionName = 'SectionName must contain at least 2 words';
        }
        if (!data.image) {
            errors.image = 'Image URL is required';
        } else if (!isValidUrl(data.image)) {
            errors.image = 'Please enter a valid URL';
        }
        if (!data.sectionDescription) {
            errors.sectionDescription = 'Section Description is required';
        }
        if (!data.duration) {
            errors.duration = 'Duration is required';
        }
        return errors;
    };

    const handleBack = () => {
        navigate(-1);
    };

    const isValidUrl = (url) => {
        const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlPattern.test(url);
    };

    return (
        <Container>
            <Button variant="contained" color="primary" onClick={handleBack} style={{ marginTop: 20 }}>Back</Button>

            <div style={{ marginTop: 20 }}>
                <Typography variant="h4" gutterBottom>Update Student</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="sectionName"
                                label="SectionName"
                                value={formData.sectionName}
                                onChange={handleChange}
                                fullWidth
                                error={!!errors.sectionName}
                                helperText={errors.sectionName}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                name="image"
                                label="Image URL"
                                value={formData.image}
                                onChange={handleChange}
                                fullWidth
                                error={!!errors.image}
                                helperText={errors.image}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                name="sectionDescription"
                                label="Section Description"
                                value={formData.sectionDescription}
                                onChange={handleChange}
                                fullWidth
                                error={!!errors.sectionDescription}
                                helperText={errors.sectionDescription}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                type='number'
                                name="duration"
                                label="Duration"
                                value={formData.duration}
                                onChange={handleChange}
                                fullWidth
                                error={!!errors.duration}
                                helperText={errors.duration}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Switch checked={formData.isMainTask} onChange={handleChange} name="isMainTask" />}
                                label="Is Main Task"
                            />
                        </Grid>

                    </Grid>
                    <Button type="submit" variant="contained" color="primary" disabled={submitting} style={{ marginTop: 20 }}>Submit</Button>
                </form>
            </div>
        </Container>
    );
};

export default UpdateSection;
