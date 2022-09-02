import express from "express";
import {create, destroy, update, index} from "../controllers/booksController";
import {create as addComment} from "../controllers/commentsController";
import {
    validateAddBookRequest,
    validateAddCommentRequest,
    validateRemoveBookRequest,
    validateUpdateBookRequest
} from "./validators";
import {StatusCodes} from "http-status-codes";

const router = express.Router();

router.get('/', index);
router.post('/', validateAddBookRequest, create);
router.get('/comments', (req, res) => res.sendStatus(StatusCodes.NOT_IMPLEMENTED));
router.get('/:id/comments', (req, res) => res.sendStatus(StatusCodes.NOT_IMPLEMENTED));
router.post('/:id/comments', validateAddCommentRequest, addComment);
router.patch('/:id', validateUpdateBookRequest, update);
router.delete('/:id', validateRemoveBookRequest, destroy);

export default router;
