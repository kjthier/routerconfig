import express from 'express';
import User from '../models/user.js';
import {
  validateUserFields,
  validate,
  userNotFound,
  requestSuccess,
  requestError
} from './middlewares.js';

const router = express.Router();

// GET /users/:id ⇒ return a single user
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    !user
      ? userNotFound(res)
      : requestSuccess(res, user);
    } catch (err) {
      requestError (res, err);
    }
});

// PUT /users/:id ⇒ update a single user
router.put('/:id', validateUserFields, validate, async (req, res) => {

    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, { 
          first_name: req.body.first_name, 
          last_name: req.body.last_name
      }, { new: true }); // { new: true } ensures updated user in the res
      !updatedUser
        ? userNotFound(res)     
        : requestSuccess (res, updatedUser);
    } catch (err) {
      requestError (res, err);
    }
});

// DELETE /users/:id ⇒ delete a single user
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    !deletedUser
      ? userNotFound(res)
      : requestSuccess(res, { message: 'User deleted successfully' });
  } catch (err) {
    requestError (res, err);
  }
});

// GET /users ⇒ return all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    users.length > 0  
      ? requestSuccess (res, users)
      : res.status(404).json({ message: 'No users found' });
  } catch (err) {
    requestError (res, err);
  }
});

// POST /users ⇒ create a new user w/validation
router.post('/', validateUserFields, validate, async (req, res) => {

    try {
      const newUsers = await User.insertMany(req.body);
      requestSuccess (res, newUsers);
    } catch (err) {
      requestError (res, err);
    }
  }
);
 
export default router;
