// server/src/routes/contacts.js
import { Router } from 'express';
import requireAuth from '../middleware/requireAuth.js';
import {
  listContacts,
  createContact,
  updateContact,
  deleteContact
} from '../controllers/contactController.js';

const router = Router();

router.use(requireAuth);          // protège tout /contacts

router.route('/')
  .get(listContacts)
  .post(createContact);

router.route('/:id')
  .patch(updateContact)
  .delete(deleteContact);

export default router;
