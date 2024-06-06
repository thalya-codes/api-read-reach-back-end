import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { verifyAuthorization } from '../utils/auth/verifyAuthorization';
import { ReadingsController } from '../controllers/ReadingsController';

const route = Router();

route.post('/register', UserController.createUser);
route.post('/login', UserController.login);
route.post('/logout', UserController.logout);
route.delete('/reading/:id', verifyAuthorization, ReadingsController.deleteOne);
route.get('/readings', verifyAuthorization, ReadingsController.findAll);
route.post(
  '/create-reading',
  verifyAuthorization,
  ReadingsController.createNewReading
);

export default route;
