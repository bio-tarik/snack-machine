const redis = require("redis");
const crypto = require('crypto');
let client = redis.createClient();

module.exports = {
    create: (req, res) => {
        if (!req.body.name || !req.body.cost) {
            res.status(420).send('You must provide both a name and a cost to create a snack');
            return;
        }

        let snackId = 'snack_' + crypto.randomBytes(4).toString('hex');
        let name = req.body.name;
        let cost = req.body.cost;

        client.hmset(snackId, [
            'name', usnameerName,
            'cost', cost
          ], function(err, reply){
            if(err){
                return res.status(500).send({
                    message: "An internal error ocurred when creating the new snack."
                });
            }
            else{
                return res.status(200).send({
                    message: "New snack " + snackId + " created succesfully."
                });
            }
          });
    },

    findAll: (req, res) => {
        client.scan(0, 'MATCH', 'snack_*', (err, obj) => {
            res.send(obj[1]);
        });
    },

    findOne: (req, res) => {
        client.hgetall(req.params.snackId, function(err, obj){
            if(!obj){
                return res.status(404).send({
                    message: "Snack not found with id " + req.params.snackId
                });
            } else {
                let snack = { "snackId": obj.snackId, "name": obj.name, "cost": obj.cost};
                res.send(snack);
            }
        });
    },

    update: (req, res) => {
        if (!req.params.snackId) {
            res.status(420).send('You must provide a snack Id');
            return;
        }

        let snackId = req.params.snackId;

        client.hgetall(snackId, function(err, obj){
            if(!obj){
                return res.status(404).send({
                    message: "Snack not found with id " + req.params.snackId
                });
            } else {
                let name = req.body.name || obj.name;
                let cost = req.body.cost || obj.cost;
                
                client.hmset(snackId, ["name", name, "cost", cost], (err, reply) => {
                    if(err){
                        return res.status(500).send({
                            message: "An internal error ocurred when updating the snack."
                        });
                    }
                    else{
                        return res.status(200).send({
                            message: "Snack updated succesfully."
                        });
                    }
                })
            }
        });
    },

    delete: (req, res) => {
        if (!req.params.snackId) {
            res.status(420).send('You must provide an snack Id');
            return;
        }

        let snackId = req.params.snackId;

        client.hgetall(snackId, function(err, obj){
            if(!obj){
                return res.status(404).send({
                    message: "Snack not found with id " + req.params.snackId
                });
            } else {
                
                client.del(snackId, (err, reply) => {
                    if(err){
                        console.log(err);
                        
                        return res.status(500).send({
                            message: "An internal error ocurred when deleting the snack."
                        });
                    }
                    else{
                        return res.status(200).send({
                            message: "Snack deleted succesfully."
                        });
                    }
                })
            }
        });
    },
}