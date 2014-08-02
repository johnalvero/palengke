module.exports = {

	create: function(req,res) {
		Products.create(req.body).done(function(err,products){
			if (err) {
				res.json({"success": false, "reason": err})
			} else {
				res.json({"success": true, "product_id": products.product_id})
			}
		});
	},

	getAll: function(req,res) {
		var user_id = Number(req.query.user_id);
		var order_by = req.query.order_by;
		var limit = req.query.limit;
		var fields = req.query.fields;

		var include_fields = fields.split(",");
		var fi_product = []

		Products.find()
		.where({user_id: user_id})
		.sort('product_name')
		.limit(limit)
		.exec(function(err,products) {


		var num_products = products.length

		while (products.length > 0) {

			var i_product = products.pop();
			var product_keys = Object.keys(i_product);
			var remove_arr = _.difference(product_keys,include_fields)

			for (cnt = 0; cnt < remove_arr.length ;  cnt++) {
				delete i_product[remove_arr[cnt]]
			}

			fi_product.push(i_product)
		}
			res.json({"count": num_products, products: fi_product})
		});
	},

	get: function(req,res) {
		product_id = Number(req.param("product_id", null))
		Products.find({product_id: product_id}, function(err, products){
			res.json({"count": products.length, "products": products})
		});

	},

	update: function(req,res) {
		var product_id = Number(req.param("product_id",null));
		Products.update({product_id: product_id}, req.body, function(err, products) {
			if (err) {
				res.json({"success": false, "reason": err})
			} else {
				res.json({"success": true, "product": products})
			}

		});
	},

	destroy: function(req, res) {
		var product_id = Number(req.param("product_id",null));

		Products.find({product_id: product_id}, function(err, products) {
			if (products.length < 1) {
				res.json({"success": "false", "reason": "no product found"})
			} else {
				Products.destroy({product_id: product_id}, function(err) {
					res.json({"success": true});
				});
			}
		});	    
	},

};


