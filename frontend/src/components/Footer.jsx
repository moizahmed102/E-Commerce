import {useState} from 'react';
import { Box, Typography, Link, TextField, Button, CircularProgress, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { subscribeToNewsletter } from '../services/newsletterService';

const Footer = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleNewsletterSubmit = async () => {
    setError('');
    setSuccess('');
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }
    setLoading(true); 
    try {
      const response = await subscribeToNewsletter(email);
      setSuccess(response.message); 
      setEmail(''); 
    } catch (error) {
      setError(error.message || 'Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#ffffff', 
        color: theme.palette.text.primary,
        padding: '32px 16px',
        borderTop: `1px solid ${theme.palette.divider}`,
        position: 'relative',
        bottom: 0,
        width: '100%',
        boxSizing: 'border-box', 
        mt: 4,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ flex: '1 1 25%', padding: '0 16px', boxSizing: 'border-box' }}>
          <Typography variant="h6" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body2" gutterBottom>
            Royal Perfumes Head Office
          </Typography>
          <Typography variant="body2" gutterBottom>
            1.5-Km, Defence Road, Bhobtian Chowk, Off Raiwind Road, Opposite University of Lahore, Lahore.
          </Typography>
          <Typography variant="body2" gutterBottom>
            <Link href="mailto:wecare@royalperfumes.pk" sx={{ color: theme.palette.primary.main }}>
              wecare@royalperfumes.pk
            </Link>
          </Typography>
          <Typography variant="body2">
            <Link href="tel:+92042111738245" sx={{ color: theme.palette.primary.main }}>
              +92(0)42 111-738-245
            </Link>
          </Typography>
        </Box>

        <Box sx={{ flex: '1 1 25%', padding: '0 16px', boxSizing: 'border-box' }}>
          <Typography variant="h6" gutterBottom>
            Customer Care
          </Typography>
          <Link component={RouterLink} to="/exchange-return-policy" sx={{ display: 'block', color: theme.palette.text.primary, textDecoration: 'none', mb: 1 }}>
            <Typography variant="body2">Exchange & Return Policy</Typography>
          </Link>
          <Link component={RouterLink} to="/faqs" sx={{ display: 'block', color: theme.palette.text.primary, textDecoration: 'none', mb: 1 }}>
            <Typography variant="body2">FAQs</Typography>
          </Link>
          <Link component={RouterLink} to="/contact" sx={{ display: 'block', color: theme.palette.text.primary, textDecoration: 'none' }}>
            <Typography variant="body2">Contact Us</Typography>
          </Link>
        </Box>
        <Box sx={{ flex: '1 1 25%', padding: '0 16px', boxSizing: 'border-box' }}>
          <Typography variant="h6" gutterBottom>
            Information
          </Typography>
          <Link component={RouterLink} to="/about" sx={{ display: 'block', color: theme.palette.text.primary, textDecoration: 'none', mb: 1 }}>
            <Typography variant="body2">About Us</Typography>
          </Link>
          <Link component={RouterLink} to="/privacy-policy" sx={{ display: 'block', color: theme.palette.text.primary, textDecoration: 'none', mb: 1 }}>
            <Typography variant="body2">Privacy Policy</Typography>
          </Link>
          <Link component={RouterLink} to="/safepay-guide" sx={{ display: 'block', color: theme.palette.text.primary, textDecoration: 'none', mb: 1 }}>
            <Typography variant="body2">SafePay Guide</Typography>
          </Link>
          <Link component={RouterLink} to="/payments" sx={{ display: 'block', color: theme.palette.text.primary, textDecoration: 'none', mb: 1 }}>
            <Typography variant="body2">Payments</Typography>
          </Link>
          <Link component={RouterLink} to="/store-locator" sx={{ display: 'block', color: theme.palette.text.primary, textDecoration: 'none', mb: 1 }}>
            <Typography variant="body2">Store Locator</Typography>
          </Link>
          <Link component={RouterLink} to="/fabric-glossary" sx={{ display: 'block', color: theme.palette.text.primary, textDecoration: 'none' }}>
            <Typography variant="body2">Fabric Glossary</Typography>
          </Link>
        </Box>

           <Box sx={{ flex: '1 1 25%', padding: '0 16px', boxSizing: 'border-box' }}>
          <Typography variant="h6" gutterBottom>
            Newsletter Signup
           </Typography>
          <Typography variant="body2" gutterBottom>
            Subscribe to our Newsletter for Exclusive Updates
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error}
            helperText={error}
            sx={{ marginBottom: '16px' }}
          />
            <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleNewsletterSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Subscribe'}
          </Button>
          {success && <Typography color="success.main">{success}</Typography>}
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
