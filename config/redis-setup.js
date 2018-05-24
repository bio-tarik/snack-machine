const crypto = require('crypto');

module.exports = (client) => {
    client.hget("config", "statusOK", (err, obj) => {
        if(!obj){
            client.hmset('config', ['statusOK', "OK"]);

            var cards = [
                { "cardId" : crypto.randomBytes(16).toString('hex'), "userName": "John Lennon", "balance": 0, "lastVisit": 0 },
                { "cardId" : crypto.randomBytes(16).toString('hex'), "userName": "Ozzy Osbourne", "balance": 0, "lastVisit": 0 },
                { "cardId" : crypto.randomBytes(16).toString('hex'), "userName": "Jimmy Hendrix", "balance": 0, "lastVisit": 0 },
                { "cardId" : crypto.randomBytes(16).toString('hex'), "userName": "Janis Joplin", "balance": 0, "lastVisit": 0 },
                { "cardId" : crypto.randomBytes(16).toString('hex'), "userName": "Roger Waters", "balance": 0, "lastVisit": 0 }
            ];

            for (let index = 0; index < cards.length; index++) {
                client.hmset('card_' + cards[index].cardId, ["userName", cards[index].userName, "balance", cards[index].balance, "lastVisit", cards[index].lastVisit]);
            }

            var snacks = [
                { "snackId" : crypto.randomBytes(4).toString('hex'), "name": "Coke", "cost": 3 },
                { "snackId" : crypto.randomBytes(4).toString('hex'), "name": "Ruffles", "cost": 3.5 },
                { "snackId" : crypto.randomBytes(4).toString('hex'), "name": "Pringles", "cost": 5.5 },
                { "snackId" : crypto.randomBytes(4).toString('hex'), "name": "Water bottle", "cost": 1 },
                { "snackId" : crypto.randomBytes(4).toString('hex'), "name": "Japanese peanuts", "cost": 1.25 }
            ];

            for (let index = 0; index < snacks.length; index++) {
                client.hmset('snack_' + snacks[index].snackId, ["name", snacks[index].name, "cost", snacks[index].cost]);
            }
        }
    })
}