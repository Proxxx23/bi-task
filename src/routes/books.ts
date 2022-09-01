import express from "express";
import {create, destroy, index} from "../controllers/booksController";
import {validateAddBookRequest} from "./validators";

const router = express.Router();

router.get('/', index);
router.post('/', validateAddBookRequest, create);
router.delete('/:uuid', destroy);

export default router;
