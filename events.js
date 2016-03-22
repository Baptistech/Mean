var events = require('events'),
    EventEmitter = events.EventEmitter,
    eventEmitter = new EventEmitter();


// Utilisation basic

var callback = function (data) {
  console.log('data:', data);
};

eventEmitter.on('anEvent', callback);
eventEmitter.emit('anEvent', { data: 'attached data' });

eventEmitter.removeListener('anEvent', callback);

// Plus d'écouteur associé à l'évenement. L'évenement emis est perdu
eventEmitter.emit('someEvent', { data: 'data' });






// Cas d'usage

var util = require('util');


// Nous définissons un constructeur qui hérite
// du composant EventEmitter

function Card () {
  this.items = [];
  EventEmitter.call(this);
}
util.inherits(Card, EventEmitter);

// Nous ajoutons à son prototype une methode add qui
// emmet un evenement
Card.prototype.add = function (item) {
  this.items.push(item);
  this.emit('add-item', item);
};


//Nous instancions un objet
var card = new Card();

//Nous associons à l'objet instancié un écouteur qui réagit à l'évenement
//et qui imprime à l'écran l'objet ajouté
card.on('add-item', function (item) {
  console.log(item, 'added');
});

card.add('apple');
card.add('orange');
