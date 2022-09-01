"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const booksController_1 = require("../controllers/booksController");
const validators_1 = require("./validators");
const router = express_1.default.Router();
router.get('/', booksController_1.index);
router.post('/', validators_1.validateAddBookRequest, booksController_1.create);
router.delete('/:uuid', booksController_1.destroy);
exports.default = router;
//# sourceMappingURL=books.js.map