///////////////////////////////////////////////////////////
// ********************** Le SCHEMA *********************//
///////////////////////////////////////////////////////////

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var animalSchema = new Schema({ name: String, type: String });

////////////// Les methodes d'instance: ///////////////
animalSchema.methods.findSimilarTypes = function (cb) {
  return this.model('Animal').find({ type: this.type }, cb);
}

var Animal = mongoose.model('Animal', animalSchema);
var fido = new Animal({ name: 'fido', type: 'dog' });

fido.findSimilarTypes(function (err, dogs) {
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
animalSchema.virtual('nameType').get(function () {
  return this.name + ' is a ' + this.type;
});

console.log('%s. Don\'t you know it ?', fido.nameType);

animalSchema.virtual('nameType').set(function (nameType) {
  var split = name.split(' is a ');
  this.name = split[0];
  this.type = split[1];
});

fido.nameType = 'fido is a rabbit';
console.log(mad.name); // fido
console.log(mad.type);  // rabbit

/////////////////// les middlewares /////////////////////

// var schema = new Schema(..);
// schema.pre('save', function(next) {
//   // do stuff
//   next();
// });


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
