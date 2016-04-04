
//racourcs shell

//JSON
//mongoimport 
//mongoexport

//BSON
//mongodump
//mongoretore

//BSON => JSON
//bsondump

//mongostat

//show dbs;
//use myDB;
//show collection
//db; => pointe sur la table courante
//mongo localhost/base script.js => utilise la base 'base' puis execute script.js



db.myCollection.count();
db.myCollection.insert({ prop1: 'val1', prop2: ['val1', 2], prop3: {prop1: 'val1'}});

var obj={prop1: 'val1'};
obj.prop2 = 'val2';
db.myCollection.save(obj);
// insert OR update

db.myCollection.find().forEach(printjson);

//Object Id
//_id inseré à la sauvegarde, immutable et unique
//basé sur le timestamp, le hostanme, le pid et un nombre alétoire

db.myCollection.find()[0]._id.getTimestamp();

function counter(collection) {
	var res = db.counters.findAndModify( { query:{_id: collection}, update: {$inc :{next:1}}, "new":true, upsert: true } );
	return res.next;
}

db.items.insert({_id: counter("items"), name: "apple"});
db.items.insert({_id: counter("items"), name: "orange"});
db.items.insert({_id: counter("items"), name: "pear"});

db.items.find();

//denormalisation et relations

var apple = db.items.findOne({name: "apple"});
var orange = db.items.findOne({name: "orange"});
var pear = db.items.findOne({name: "pear"})

db.card.insert({ items: [orange._id, apple._id]} );
db.card.insert({ items: [pear._id]} );

db.users.insert({name: "bob", credit: 5, card: db.card.find()[0]});
db.users.insert({name: "john", credit: 8, card: db.card.find()[0]._id});

//db.myCollection.drop();


//Querying
db.myCollection.find({prop1: "val1"});
//marche eglement avec les tableaux: => match prop1: [..., ..., val1, ...]

//find return un cursor object
//findOne retourne le document

// filter
db.myCollection.find({prop1: "val1"}, {prop: true, prop2: true})
//on ne peut pas mixer true et fase sauf dans le cas de l'_id

//subobject:
db.myCollection.find({'prop.sub': "val"});


// Operateurs
//les operateurs commencent par $
db.myCollection.find({prop:{$in: ['jane', 'john']}}, {prop: true});
db.myCollection.find({prop:{$all: ['jane', 'john']}}, {prop: true});

// $or
// $exists
// $mod
// $not quand il n'y a pa de negatif pour l'opreateur
// $elemmatch
// $where pour les expression

// Callback
db.myCollection.find().sort(1).limit(5)
db.myCollection.find().skip(5).limit(5) //=> page 2

//insertion, mise à jour