import express from 'express';
import Request from '../models/Request.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all requests (admin sees all, users see only their own)
// Non-admin users will only receive requests they created
router.get('/', auth, async (req, res) => {
  try {
    let query = {};
    if (req.user.role !== 'admin') {
      query.createdBy = req.user.id;
    }

    const requests = await Request.find(query)
      .populate('createdBy', 'username email')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new request - ALL authenticated users can create requests
router.post('/', auth, async (req, res) => {
  try {
    const { description, materials } = req.body;

    // Generate request number
    const count = await Request.countDocuments();
    const requestNumber = `REQ-${(count + 1).toString().padStart(4, '0')}`;

    const request = new Request({
      requestNumber,
      description,
      materials,
      createdBy: req.user.id
    });

    await request.save();
    await request.populate('createdBy', 'username email');

    res.status(201).json(request);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update request status (admin only)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { status } = req.body;
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('createdBy', 'username email');

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.json(request);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete request
router.delete('/:id', auth, async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Users can only delete their own requests, admins can delete any
    if (req.user.role !== 'admin' && request.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this request' });
    }

    await Request.findByIdAndDelete(req.params.id);
    res.json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;