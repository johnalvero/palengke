

module.exports = {

	create: function(req,res) {
		Users.create(req.body).done(function(err,users){
			if(err) {
				res.json({"success": "false", "reason": err})
			} else {
				res.json({"success": "true", "user_id": users.user_id})
			}
		});
	},

	update: function(req,res) {
		var user_id = Number(req.param("user_id",null));
		Users.update({user_id: user_id}, req.body, function(err, users) {
			if (err) {
				res.json({"success": false, "reason": err})
			} else {
				res.json({"success": true, "user": users});
			}
		});
	},

	destroy: function(req, res) {
		var user_id = Number(req.param("user_id",null));

	    Users.find({user_id: user_id}, function(err, users) {
	    	if (users.length < 1) {
	    		res.json({"success": "false", "reason": "no user found"})
	    	} else {
			    Users.destroy({user_id: user_id}, function(err) {
			        res.json({"success": "true", "user": users});
			    });
	    	}
	    });
	},



	details: function(req, res) {
		var user_id = Number(req.param("user_id",null));
	    Users.find({user_id: user_id}, function(err, users) {
	    	if (users.length > 0) {
	    		Products.find({user_id: user_id}, function(err,products) {
	    			res.json({"user_id": users[0].user_id, "username": users[0].username, "first_name": users[0].first_name, "last_name": users[0].last_name, "email": users[0].email, "products": products})
	    		});
	    	} else { 
	    		res.json({"error": "user not found"})
	    	}
	    });
	}

  
};
