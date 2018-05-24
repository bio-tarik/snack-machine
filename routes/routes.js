module.exports = (app) => {
    const cards = require('../controllers/card.controller.js');

    app.get('/cards', cards.findAll);
    app.post('/cards', cards.create);
    app.get('/cards/:cardId', cards.findOne);
    app.put('/cards/:cardId', cards.update);
    app.delete('/cards/:cardId', cards.delete);
}