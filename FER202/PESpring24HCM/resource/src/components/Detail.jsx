import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Card, CardContent, CardHeader, Avatar, Grid, Button } from '@mui/material';
import { getSectionById } from '../api/section';


const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [section, setSection] = useState(null);

  const handleBack = () => {
    navigate(-1)
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSectionById(id);
      setSection(data);
    };
    fetchData();
  }, [id]);

  return (
    <div style={{ marginTop: '20px' }}>
      {section ? (
        <>
          <Button variant="contained" color="primary" onClick={handleBack} style={{ marginTop: 20 }}>Back</Button>

          <Grid container justifyContent="center">
            <Grid item xs={12} sm={8} md={6}>
              <Card style={{ maxWidth: '600px', margin: '0 auto' }}>
                <CardHeader title="Section Detail" />
                <CardContent>
                  <Avatar src={section.image} alt={section.name} style={{
                    width: 120,
                    height: 120,
                    margin: '0 auto',
                    marginBottom: 16,
                  }} />
                  <Typography variant="subtitle1"><b>ID:</b> {section.id}</Typography>
                  <Typography variant="subtitle1"><b>Section Name:</b> {section.sectionName}</Typography>
                  <Typography variant="subtitle1"><b>Section Description:</b> {section.sectionDescription}</Typography>
                  <Typography variant="subtitle1"><b>Duration:</b> {section.duration}</Typography>
                  <Typography variant="subtitle1"><b>IsMainTask:</b> {section.isMainTask ? "true" : "false"}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography variant="h4">Loading...</Typography>
      )}
    </div>
  );
};

export default Detail;
