# API Authentication using JWT

This code defines middleware function named `protect`, which is used to protect routes from unauthorized access.

## Usage

To use this middleware, simply import the `protect` function and place it in the route that needs to be protected.

```javascript
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Protected route
router.get('/protected', protect, (req, res) => {
    res.send('You have access to this protected route.');
});

module.exports = router;
```
