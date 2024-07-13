import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Modal, Typography, Button, Table, TableContainer, TableHead,
  TableBody, TableRow, TableCell, Paper, Menu, MenuItem, IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { deleteSectionById, getAllSections } from '../api/section';

const StyledTableContainer = styled(TableContainer)({
  marginTop: 20,
  marginBottom: 20,
});

const StyledTableCell = styled(TableCell)({
  fontWeight: 'bold',
});

const Dashboard = () => {
  const [sections, setSections] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const navigate = useNavigate()


  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllSections();
      setSections(data);
    };
    fetchData();
  }, []);

  const handleMenuClick = (event, section) => {
    setAnchorEl(event.currentTarget);
    setSelectedSection(section);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedSection(null);
  };

  const handleViewDetail = () => {
    navigate(`/${selectedSection.id}`)

    handleMenuClose();
  };

  const handleCreate = () => {
    navigate(`/create_section`)
    handleMenuClose();
  }

  const handleUpdate = () => {
    navigate(`/update_section/${selectedSection.id}`)
    handleMenuClose();
  };

  const handleDelete = async () => {
    if (selectedSection) {
      await deleteSectionById(selectedSection.id);
      setSections(sections.filter(section => section.id !== selectedSection.id));
      setIsDeleteModalOpen(false);
      setSelectedSection(null);
      handleMenuClose();
    }
  };

  return (
    <StyledTableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Section Name</StyledTableCell>
            <StyledTableCell>Section Description</StyledTableCell>
            <StyledTableCell>Duration</StyledTableCell>
            <StyledTableCell>Is Main Task</StyledTableCell>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sections.map((section) => (
            <TableRow key={section.id}>
              <StyledTableCell><Link to={`/${section.id}`}>{section.id}</Link></StyledTableCell>
              <TableCell>{section.sectionName}</TableCell>
              <TableCell>{section.sectionDescription}</TableCell>
              <TableCell>{section.duration}</TableCell>
              <TableCell>{section.isMainTask ? 'true' : 'false'}</TableCell>
              <TableCell>
                <img src={section.image} alt={section.name} style={{ width: 100, height: 70, objectFit: 'cover' }} />
              </TableCell>
              <TableCell>
                <IconButton
                  aria-label="more"
                  aria-controls="section-menu"
                  aria-haspopup="true"
                  onClick={(event) => handleMenuClick(event, section)}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="section-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleViewDetail}>View section detail</MenuItem>
                  <MenuItem onClick={handleCreate}>Create new section</MenuItem>
                  <MenuItem onClick={handleUpdate}>Update section</MenuItem>
                  <MenuItem onClick={() => setIsDeleteModalOpen(true)}>Delete section</MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: 20 }}>
          <Typography variant="h6">Are you sure you want to delete {selectedSection?.name}?</Typography>
          <Button variant="outlined" color="primary" onClick={() => setIsDeleteModalOpen(false)} style={{ marginRight: 10 }}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleDelete} >Confirm</Button>
        </div>
      </Modal>
    </StyledTableContainer >
  );
};

export default Dashboard;
