import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileAsync, logout } from '../features/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box, CircularProgress } from '@mui/material';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      await dispatch(getProfileAsync());
      setLoading(false);
    };
    fetchProfile();
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  if (loading || status === 'loading') return <CircularProgress />;

  if (!user) return <Typography variant="h6">No user data found</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">{user.name}'s Profile</Typography>
      <Typography variant="body1">Email: {user.email}</Typography>
      <Typography variant="body1">Role: {user.role}</Typography>
      <Button onClick={handleLogout} variant="contained" color="primary">
        Logout
      </Button>
    </Box>
  );
};

export default Profile;
