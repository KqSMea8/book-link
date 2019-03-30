const express = require("express");
const router = express.Router();
const bookService = require("../services/bookService");

router.get("/type/list", (req, res) => {
	bookService.getType(req, res);
});
router.get("/list/all", (req, res) => {
	bookService.getList(req, res);
});
router.post("/list/create", (req, res) => {
	bookService.createBook(req, res);
});
router.get("/list/delete", (req, res) => {
	bookService.deleteBook(req, res);
});
router.post("/list/edit", (req, res) => {
	bookService.editBook(req, res);
});

module.exports = router;
