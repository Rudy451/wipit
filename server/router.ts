import express from 'express'

const router = express.Router()
const methods = require('./controllers')

// user registration
router.post("/register", methods.registerUser);
// user login
router.post("/login", methods.loginUser);
// add new wip collection for new user
router.post("/wipcollections", methods.addWipCollection);
// add individual wip
router.post("/wip", methods.addWip);
// add follower for a given artist
router.post("/follower", methods.addFollower);
// user logout
router.get("/logout", methods.logoutUser);
// get all wips for a given artist
router.get('/userwipcollections', methods.getWipCollectionByUser);
// get all wips for gallerist
router.get("/wipcollections", methods.getWipCollection);
// get all followers for an artist
router.get("/followers", methods.getFollowers);
// get all artists the user is following
router.get("/followees", methods.getFollowees);
// catch all route for static files
router.get('/*', methods.misc);

module.exports = router
