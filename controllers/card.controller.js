const redis = require("redis");
const crypto = require('crypto');
let client = redis.createClient();

module.exports = {
    create: (req, res) => {
        if (!req.body.userName) {
            res.status(420).send('You must provide an username');
            return;
        }

        let cardId = 'card_' + crypto.randomBytes(16).toString('hex');
        let userName = req.body.userName;
        let balance = 0;
        let lastVisit = Date.now();

        client.hmset(cardId, [
            'userName', userName,
            'balance', balance,
            'lastVisit', lastVisit
          ], function(err, reply){
            if(err){
                return res.status(500).send({
                    message: "An internal error ocurred when creating the new card."
                });
            }
            else{
                return res.status(200).send({
                    message: "New card " + cardId + " created succesfully."
                });
            }
          });
    },

    findAll: (req, res) => {
        client.scan(0, 'MATCH', 'card_*', (err, obj) => {
            res.send(obj[1]);
        });
    },

    findOne: (req, res) => {
        client.hgetall(req.params.cardId, function(err, obj){
            if(!obj){
                return res.status(404).send({
                    message: "Card not found with id " + req.params.cardId
                });
            } else {
                let card = { "cardId": obj.cardId, "userName": obj.userName, "balance": obj.balance, "lastVisit": obj.lastVisit};
                res.send(card);
            }
        });
    },

    update: (req, res) => {
        if (!req.params.cardId) {
            res.status(420).send('You must provide a card Id');
            return;
        }

        let cardId = req.params.cardId;

        client.hgetall(cardId, function(err, obj){
            if(!obj){
                return res.status(404).send({
                    message: "Card not found with id " + req.params.cardId
                });
            } else {
                let userName = req.body.userName || obj.userName;
                let balance = req.body.balance || obj.balance;
                let lastVisit = req.body.lastVisit || obj.lastVisit;
                
                client.hmset(cardId, ["userName", userName, "balance", balance, "lastVisit", lastVisit], (err, reply) => {
                    if(err){
                        return res.status(500).send({
                            message: "An internal error ocurred when updating the card."
                        });
                    }
                    else{
                        return res.status(200).send({
                            message: "Card updated succesfully."
                        });
                    }
                })
            }
        });
    },

    delete: (req, res) => {
        if (!req.params.cardId) {
            res.status(420).send('You must provide an card Id');
            return;
        }

        let cardId = req.params.cardId;

        client.hgetall(cardId, function(err, obj){
            if(!obj){
                return res.status(404).send({
                    message: "Card not found with id " + req.params.cardId
                });
            } else {
                
                client.del(cardId, (err, reply) => {
                    if(err){
                        console.log(err);
                        
                        return res.status(500).send({
                            message: "An internal error ocurred when deleting the card."
                        });
                    }
                    else{
                        return res.status(200).send({
                            message: "Card deleted succesfully."
                        });
                    }
                })
            }
        });
    },
}