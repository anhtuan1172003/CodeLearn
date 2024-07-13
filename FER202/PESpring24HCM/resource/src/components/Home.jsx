import React, { useEffect, useState } from 'react'
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { getAllSections } from '../api/section';
import { Link } from 'react-router-dom';


const Home = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let data = await getAllSections();
      data = data.filter(section => section.isMainTask === true);
      setSections(data);
    };
    fetchData();
  }, []);

  return (
    <TableContainer component={Paper} style={{
      marginTop: 20,
      marginBottom: 20,
    }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Section name</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sections?.map((section) => (
            <TableRow key={section.id}>
              <TableCell><Link to={`/${section.id}`}>{section.sectionName}</Link></TableCell>
              <TableCell>{section.duration}</TableCell>
              <TableCell>
                <img src={section.image} alt={section.name} style={{ width: 100, height: 70, objectFit: 'cover' }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Home