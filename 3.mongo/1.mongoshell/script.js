db.myCollection.insert({
    prop1: 'val1',
    prop2: ['val1', 2],
    prop3: {
        prop1: 'val1'
    }
});

db.myCollection.count();

var obj={prop1: 'val1'};
obj.prop2 = 'val2';
db.myCollection.save(obj); // insert ou met à jour

db.myCollection.find().forEach(printjson);

db.myCollection.find()[0]._id.getTimestamp();

function counter(collection) {
	var res = db.counters.findAndModify( { query:{_id: collection}, update: {$inc :{next:1}}, "new":true, upsert: true } );
	return res.next;
}

db.items.insert({_id: counter("items"), name: "apple"});
db.items.insert({_id: counter("items"), name: "orange"});
db.items.insert({_id: counter("items"), name: "pear"});

db.items.find();

var apple = db.items.findOne({name: "apple"});
var orange = db.items.findOne({name: "orange"});
var pear = db.items.findOne({name: "pear"})

//denormalisation et relation

db.card.insert({ items: [orange._id, apple._id]} );
db.card.insert({ items: [pear._id]} );

db.users.insert({name: "bob", credit: 5, card: db.card.find()[0]});
db.users.insert({name: "john", credit: 8, card: db.card.find()[0]._id});

//db.myCollection.drop();

db.myCollection.find({prop1: "val1"});
//marche eglement avec les tableaux: => match prop1: [..., ..., val1, ...]

db.myCollection.find({prop1: "val1"}, {prop: true, prop2: true})
//on ne peut pas mixer true et false sauf dans le cas de l'_id

db.myCollection.find({'prop1.prop3': "val1"});

db.myCollection.find({prop1: {$in: ['val1', 'val2']}}, {prop: true});
db.myCollection.find({prop:{$all: ['val1', '2']}}, {prop: true});

db.myCollection.find().sort({prop: 1}).limit(5)
db.myCollection.find().skip(5).limit(5) //=> page 2

//insertion, mise à jour
db.users.update(query object, update object)

//upsert
db.users.update(qo, uo, true)

//mise à jour par modification
//opérateur de modification
//$incr
// incrémente la propriété prop de 5
db.links.update(qo, { $inc: { prop: 5 } })

//Avec les opérateur de requete, la clef est à l'interieur
//Avec les opérateur de modification, la clef est à l'interieur


db.collection.remove()
db.collection.remove(qo)
//methode finAdModify
//    remove: true

db.users.drop()

db.dropDatabase()


find().explain()
//index prop
db.col.ensureIndex({prop: 1})
