import express from 'express'

const router = express.Router()
const methods = require('./controllers')

router.post("/register", methods.registerUser);
router.post("/login", methods.loginUser);
router.post("/wipcollections", methods.addWipCollection);
router.post("/wip", methods.addWip);
router.post("/follower", methods.addFollower);
router.get("/logout", methods.logoutUser);
router.get('/userwipcollections', methods.getWipCollectionByUser);
router.get("/wipcollections", methods.getWipCollection);
router.get("/followers", methods.getFollowers);
router.get("/followees", methods.getFollowees);

module.exports = router
