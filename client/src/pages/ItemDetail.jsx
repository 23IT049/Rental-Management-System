import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Button,
    Box,
    Chip,
    CircularProgress,
    Alert,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import { format } from 'date-fns';
import Navbar from '../components/Navbar';
import { itemsAPI, bookingsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';

const ItemDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [bookingDialog, setBookingDialog] = useState(false);
    const [bookingData, setBookingData] = useState({
        startDate: new Date().toISOString().split('T')[0],
        notes: ''
    });
    const [bookingLoading, setBookingLoading] = useState(false);

    useEffect(() => {
        fetchItem();
    }, [id]);

    const fetchItem = async () => {
        try {
            const response = await itemsAPI.getOne(id);
            setItem(response.data.item);
        } catch (err) {
            setError('Failed to load item');
        } finally {
            setLoading(false);
        }
    };

    const handleBooking = async () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        setBookingLoading(true);
        try {
            await bookingsAPI.create({
                item: item._id,
                startDate: bookingData.startDate,
                notes: bookingData.notes
            });
            alert('Booking created successfully! Check My Bookings.');
            setBookingDialog(false);
            navigate('/my-bookings');
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to create booking');
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                    <CircularProgress />
                </Box>
            </>
        );
    }

    if (error || !item) {
        return (
            <>
                <Navbar />
                <Container sx={{ mt: 4 }}>
                    <Alert severity="error">{error || 'Item not found'}</Alert>
                </Container>
            </>
        );
    }

    const isOwner = user?._id === item.owner._id;

    return (
        <>
            <Navbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={4}>
                    {/* Image */}
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3}>
                            <img
                                src={item.image}
                                alt={item.title}
                                style={{ width: '100%', height: 'auto', display: 'block' }}
                            />
                        </Paper>
                    </Grid>

                    {/* Details */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" gutterBottom fontWeight="bold">
                            {item.title}
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                            <Chip label={item.category} color="primary" />
                            <Chip label={item.condition} />
                            {item.available ? (
                                <Chip label="Available" color="success" />
                            ) : (
                                <Chip label="Not Available" color="error" />
                            )}
                        </Box>

                        <Typography variant="h5" color="primary" gutterBottom>
                            ₹{item.price} / 24 hours
                        </Typography>

                        {item.deposit > 0 && (
                            <Typography variant="body1" color="text.secondary" gutterBottom>
                                Security Deposit: ₹{item.deposit}
                            </Typography>
                        )}

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 2 }}>
                            <LocationOnIcon color="action" />
                            <Typography variant="body1">{item.location}</Typography>
                        </Box>

                        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                            Description
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {item.description}
                        </Typography>

                        {item.features && item.features.length > 0 && (
                            <>
                                <Typography variant="h6" gutterBottom>
                                    Features
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                    {item.features.map((feature, index) => (
                                        <Chip key={index} label={feature} variant="outlined" />
                                    ))}
                                </Box>
                            </>
                        )}

                        <Paper elevation={2} sx={{ p: 2, mt: 3, bgcolor: 'grey.50' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <PersonIcon />
                                <Typography variant="h6">Owner</Typography>
                            </Box>
                            <Typography variant="body1">{item.owner.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item.owner.email}
                            </Typography>
                        </Paper>

                        {!isOwner && item.available && (
                            <Button
                                variant="contained"
                                size="large"
                                fullWidth
                                sx={{ mt: 3 }}
                                onClick={() => setBookingDialog(true)}
                            >
                                Book Now
                            </Button>
                        )}

                        {isOwner && (
                            <Alert severity="info" sx={{ mt: 3 }}>
                                This is your item
                            </Alert>
                        )}
                    </Grid>
                </Grid>
            </Container>

            {/* Booking Dialog */}
            <Dialog open={bookingDialog} onClose={() => setBookingDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Book {item.title}</DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <TextField
                            fullWidth
                            label="Start Date"
                            type="date"
                            value={bookingData.startDate}
                            onChange={(e) => setBookingData({ ...bookingData, startDate: e.target.value })}
                            InputLabelProps={{ shrink: true }}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Notes (Optional)"
                            multiline
                            rows={3}
                            value={bookingData.notes}
                            onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                        />
                        <Paper elevation={0} sx={{ p: 2, mt: 2, bgcolor: 'grey.50' }}>
                            <Typography variant="body2" gutterBottom>
                                <strong>Rental Period:</strong> 24 hours
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                <strong>Rental Price:</strong> ₹{item.price}
                            </Typography>
                            {item.deposit > 0 && (
                                <Typography variant="body2" gutterBottom>
                                    <strong>Security Deposit:</strong> ₹{item.deposit}
                                </Typography>
                            )}
                            <Typography variant="h6" sx={{ mt: 1 }}>
                                <strong>Total:</strong> ₹{item.price + (item.deposit || 0)}
                            </Typography>
                        </Paper>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setBookingDialog(false)}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={handleBooking}
                        disabled={bookingLoading}
                    >
                        {bookingLoading ? 'Creating...' : 'Confirm Booking'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ItemDetail;
