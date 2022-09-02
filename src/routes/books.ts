import express from "express";
import {create, destroy, update, index} from "../controllers/booksController";
import {validateAddBookRequest, validateRemoveBookRequest, validateUpdateBookRequest} from "./validators";

const router = express.Router();

router.get('/', index);
router.post('/', validateAddBookRequest, create);
router.patch('/:id', validateUpdateBookRequest, update);
router.delete('/:id', validateRemoveBookRequest, destroy);

export default router;
