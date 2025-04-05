const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const geoip = require('geoip-lite');
const Url = require('../models/Url');

// @route   POST /api/urls/shorten
// @desc    Create short URL
router.post('/shorten', async (req, res) => {
  try {
    const { originalUrl } = req.body;
    
    // Check if URL already exists
    let url = await Url.findOne({ originalUrl });
    if (url) {
      return res.json(url);
    }

    // Create short URL
    const shortUrl = shortid.generate();
    url = new Url({
      originalUrl,
      shortUrl
    });

    await url.save();
    res.json(url);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/urls/:shortUrl
// @desc    Redirect to original URL and track analytics
router.get('/:shortUrl', async (req, res) => {
  try {
    const url = await Url.findOne({ shortUrl: req.params.shortUrl });
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    // Track analytics
    const ip = req.ip;
    const geo = geoip.lookup(ip);
    url.analytics.push({
      ip,
      country: geo ? geo.country : 'Unknown',
      city: geo ? geo.city : 'Unknown',
      userAgent: req.headers['user-agent']
    });
    url.clicks += 1;
    await url.save();

    res.redirect(url.originalUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/urls/stats/:shortUrl
// @desc    Get URL statistics
router.get('/stats/:shortUrl', async (req, res) => {
  try {
    const url = await Url.findOne({ shortUrl: req.params.shortUrl });
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }
    res.json(url);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 