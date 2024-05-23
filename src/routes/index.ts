import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { verifyAuthorization } from '../utils/auth/verifyAuthorization';
import { ReadingsController } from '../controllers/ReadingsController';

const route = Router();

route.post('/register', UserController.createUser);
route.post('/login', UserController.login);
route.post('/logout', UserController.logout);
route.get('/readings/:userId', verifyAuthorization, ReadingsController.findAll);
route.delete(
  '/reading/:id/:userId',
  verifyAuthorization,
  ReadingsController.deleteOne
);
route.post(
  '/create-reading',
  verifyAuthorization,
  ReadingsController.createNewReading
);

export default route;
