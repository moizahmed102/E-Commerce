import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileAsync, logout } from '../features/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProfileAsync());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); 
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>{user.name}'s Profile</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
