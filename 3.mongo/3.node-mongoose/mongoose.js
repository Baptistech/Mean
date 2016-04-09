///////////////////////////////////////////////////////////
// ********************** Le SCHEMA *********************//
///////////////////////////////////////////////////////////

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});

////////////// Les methodes d'instance: ///////////////

var animalSchema = new Schema({ name: String, type: String });

animalSchema.methods.findSimilarTypes = function (cb) {
  return this.model('Animal').find({ type: this.type }, cb);
}

var Animal = mongoose.model('Animal', animalSchema);
var dog = new Animal({ type: 'dog' });

dog.findSimilarTypes(function (err, dogs) {
  console.log(dogs);
});

//////////////// Les methodes statiques : /////////////////

animalSchema.statics.findByName = function (name, cb) {
  return this.find({ name: new RegExp(name, 'i') }, cb);
}

var Animal = mongoose.model('Animal', animalSchema);

Animal.findByName('fido', function (err, animals) {
  console.log(animals);
});

///////////////// Propriétés virtuelles //////////////////

var personSchema = new Schema({
  name: {
    first: String,
    last: String
  }
});

var Person = mongoose.model('Person', personSchema);

var bad = new Person({
    name: { first: 'Walter', last: 'White' }
});

personSchema.virtual('name.full').get(function () {
  return this.name.first + ' ' + this.name.last;
});

console.log('%s is insane', bad.name.full); // Walter White is insane

personSchema.virtual('name.full').set(function (name) {
  var split = name.split(' ');
  this.name.first = split[0];
  this.name.last = split[1];
});

mad.name.full = 'Breaking Bad';
console.log(mad.name.first); // Breaking
console.log(mad.name.last);  // Bad

/////////////////// les middlewares /////////////////////

var schema = new Schema(..);
schema.pre('save', function(next) {
  // do stuff
  next();
});


///////////////////////////////////////////////////////////
// ********************** Le MODEL **********************//
///////////////////////////////////////////////////////////
var Blog = mongoose.model('Blog', blogSchema);


// Création d'un document
var monblog = new Blog({title: 'mon titre', author: 'moi'});
// ou
Blog.create({ title: 'small' }, function (err, small) {
  if (err) return handleError(err);
})

// Récupération
Blog.find({ title: 'mon titre' }).where('createdDate').gt(oneYearAgo).exec(callback);

// Suppression
Blog.remove({ title: 'brouillon' }, function (err) {
  if (err) return handleError(err);
});

// Mise à jour
Blog.findById(id, function (err, blog) {
  if (err) return handleError(err);
  blog.title = 'mon titre 2';
  blog.save(function (err) {
    if (err) return handleError(err);
    res.send(blog);
  });
});

// mieux
//Blog.update
// si le document doit remonter à l'application, les methodes ci-dessous réalisent les 2 opérations
// de récupération et de mise à jour en une seule requete
//Blog.findOneAndUpdate;
//Blog.findByIdAndUpdate;


///////////////////// Les requetes /////////////////////
//count(), findOne(), find(), findOneAndRemove(), findOneAndUpdate(), update()
var Person = mongoose.model('Person', personSchema);

Person.findOne({ 'name.last': 'Ghost' }, 'name occupation', function (err, person) {
  if (err) return handleError(err);
  console.log('%s %s is a %s.', person.name.first, person.name.last, person.occupation) // Space Ghost is a talk show host.
})

// Ces methodes appelées sans passer de callback retournent un objet de type Query qu'il est possible d'enrichir au fur et à mesure
var query = Person.findOne({ 'name.last': 'Ghost' });
query.select('name occupation');

//...

// execute la requete plus tard
query.exec(function (err, person) {
  if (err) return handleError(err);
  console.log('%s %s is a %s.', person.name.first, person.name.last, person.occupation) // Space Ghost is a talk show host.
})

// Avec JSON doc
Person.
  find({
    occupation: /host/,
    'name.last': 'Ghost',
    age: { $gt: 17, $lt: 66 },
    likes: { $in: ['vaporizing', 'talking'] }
  }).
  limit(10).
  sort({ occupation: -1 }).
  select({ name: 1, occupation: 1 }).
  exec(callback);

// En utilisant le query builder
Person.
  find({ occupation: /host/ }).
  where('name.last').equals('Ghost').
  where('age').gt(17).lt(66).
  where('likes').in(['vaporizing', 'talking']).
  limit(10).
  sort('-occupation').
  select('name occupation').
  exec(callback);

///////////////////////////////////////////////////////////
// ******************** Le DOCUMENT *********************//
///////////////////////////////////////////////////////////
var monblog = new Blog({title: 'mon titre', author: 'moi'});

monblog.save()
