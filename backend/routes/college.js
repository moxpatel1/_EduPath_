const express = require('express');
const College = require('../models/College');

const router = express.Router();

// GET /api/colleges - Get colleges based on criteria with rank prediction
router.get('/colleges', async (req, res) => {
  try {
    const { rank, category, branch, city, hostel, transport } = req.query;

    let query = {};

    // Filter by category (for reserved seats)
    if (category && category !== 'General') {
      query.category = { $regex: category, $options: 'i' };
    }

    // Filter by branch
    if (branch) {
      query.branch = { $regex: branch, $options: 'i' };
    }

    // Filter by city
    if (city) {
      query.city = { $regex: city, $options: 'i' };
    }

    // Filter by hostel
    if (hostel) {
      if (hostel === 'both') {
        query.hostelBoys = true;
        query.hostelGirls = true;
      } else if (hostel === 'boys') {
        query.hostelBoys = true;
      } else if (hostel === 'girls') {
        query.hostelGirls = true;
      }
    }

    // Filter by transport
    if (transport) {
      query.transportation = transport === 'yes';
    }

    const allColleges = await College.find(query);
    
    // If rank is provided, add prediction likelihood
    let colleges = allColleges;
    
    if (rank) {
      const userRank = parseInt(rank);
      const SAFE_MARGIN = 500; // Rank points margin
      
      colleges = allColleges.map(college => {
        const difference = Math.abs(college.cutoffRank - userRank);
        
        let prediction = 'Low';
        let probability = 0;
        
        // Lower rank number is better (e.g. 1200 is better than 5000)
        // If user's rank is <= cutoff, chances are better.
        if (userRank <= college.cutoffRank) {
          if (difference <= SAFE_MARGIN) {
            prediction = 'High';
            probability = 100 - (difference / SAFE_MARGIN * 30);
          } else if (difference <= SAFE_MARGIN * 1.5) {
            prediction = 'Medium-High';
            probability = 70 - (difference / (SAFE_MARGIN * 1.5) * 40);
          } else {
            prediction = 'Medium';
            probability = 40 - (difference / (SAFE_MARGIN * 2) * 30);
          }
        } else {
          // User rank is lower than cutoff (should not expect admission)
          prediction = 'Low';
          probability = Math.max(0, 20 - (difference / SAFE_MARGIN * 20));
        }
        
        return {
          ...college.toObject(),
          rankDifference: difference,
          prediction: prediction,
          probability: Math.max(0, Math.round(probability))
        };
      });

      // Sort by prediction category first, then by rank difference
      colleges.sort((a, b) => {
        const predictionOrder = { 'High': 0, 'Medium-High': 1, 'Medium': 2, 'Low': 3 };
        const aPredOrder = predictionOrder[a.prediction] || 4;
        const bPredOrder = predictionOrder[b.prediction] || 4;
        
        if (aPredOrder !== bPredOrder) {
          return aPredOrder - bPredOrder;
        }
        return a.rankDifference - b.rankDifference;
      });
    } else {
      // Sort by cutoff rank
      colleges.sort((a, b) => a.cutoffRank - b.cutoffRank);
    }

    res.json({
      success: true,
      count: colleges.length,
      data: colleges
    });
  } catch (error) {
    console.error('Error fetching colleges:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// GET /api/colleges/filters - Get available filter options
router.get('/colleges/filters', async (req, res) => {
  try {
    const branches = await College.distinct('branch');
    const cities = await College.distinct('city');

    res.json({
      success: true,
      filters: {
        branches: branches.filter(b => b && b.trim()).sort(),
        cities: cities.filter(c => c && c.trim()).sort()
      }
    });
  } catch (error) {
    console.error('Error fetching filters:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
