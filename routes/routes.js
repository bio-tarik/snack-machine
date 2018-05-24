module.exports = (app) => {
    const cards = require('../controllers/card.controller.js');
    const snacks = require('../controllers/snack.controller.js');

    //cards
    app.get('/cards', cards.findAll);
    app.post('/cards', cards.create);
    app.get('/cards/:cardId', cards.findOne);
    app.put('/cards/:cardId', cards.update);
    app.delete('/cards/:cardId', cards.delete);

    //snacks
    app.get('/snacks', snacks.findAll);
    app.post('/snacks', snacks.create);
    app.get('/snacks/:cardId', snacks.findOne);
    app.put('/snacks/:cardId', snacks.update);
    app.delete('/snacks/:cardId', snacks.delete);
}