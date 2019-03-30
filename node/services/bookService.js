const resultMessage = require("../util/resultMessage");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const sequelize = require("../dataSource/MysqlPoolClass");
const BookType = require("../models/book_type");
const BookTypeModel = BookType(sequelize);
const BookList = require("../models/book_list");
const BookListModel = BookList(sequelize);
module.exports = {
	// 获取书籍种类
	getType: (req, res) => {
		try {
			BookTypeModel.findAll({
				where: {
					is_delete: {
						[Op.not]: ["1"]
					}
				}
			}).then(type => {
				let result = [];
				type.map(item => {
					result.push(item.dataValues);
				});
				res.send(resultMessage.success(result));
			});
		} catch (error) {
			return resultMessage.success([]);
		}
	},
	// 获取书籍列表
	getList: (req, res) => {
		console.log(req.query.name);
		let name = req.query.name || "";
		try {
			BookListModel.findAll( {
				where: {
					is_delete: {
						[Op.not]: ["1"]
					},
					name: {
						[Op.like]: `${name}%`
					}
				}
			}).then(books => {
				let result = [];
				books.map(item => {
					result.push(item.dataValues);
				});
				res.send(resultMessage.success(result));
			});
		} catch (error) {
			return resultMessage.success([]);
		}
	},
	// 删除书籍
	deleteBook: (req, res) => {
		console.log(req.query.id);
		try {
			let id = req.query.id;
			BookListModel.destroy({
				where: {
					id: id
				}
			}).then((book) => {
				console.log(book);
				res.send(resultMessage.success([]));
			});
		} catch (error) {
			return resultMessage.error([]);
		}
	},
	// 编辑书籍
	editBook: (req, res) => {
		const params = {
			name: req.body.name,
			desc: req.body.desc,
			url: "url",
			type: req.body.type,
			borrow: req.body.borrow
		};
		try {
			BookListModel.update(params, {
				where: {
					id: 4
				}
			}).then(() => {
				res.send(resultMessage.success([]));
			});
		} catch (error) {
			return resultMessage.error([]);
		}
	},
	// 增加书籍
	createBook: (req, res) => {
		try {
			const params = {
				name: req.body.name,
				desc: req.body.desc,
				url: "url",
				type: req.body.type,
				borrow: req.body.borrow
			};
			BookListModel.create(params).then(books => {
				console.log(books);
				res.send(resultMessage.success([]));
			});
		} catch (error) {
			return resultMessage.error([]);
		}
	},
};
