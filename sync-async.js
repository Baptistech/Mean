/* VERSION SYNCHRONE */

function addOneSync (array) {
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
        newArray[i] = array[i] + 1;
    }
    return newArray;
}

/*
// ou plus simplement
function addOneSync (array) {
    return array.map(function (n) { return n + 1; });
}

//Note: la fonction map est une fonction synchrone
//bien qu'elle admette une fonction de rappelle en
//argument. Une implémentation de cette fonction pourrait être

Array.prototype.map = function(callback) {
    var newArray = []
    for (var i = 0; i < this.length; i++) {
        newArray[i] = callback(this[i]);
    }
    return newArray;
}
*/



/* VERSION ASYNCHRONE */

/*
//Version asynchrone présentée en cours
//++: Met bien en évidence le caractere asynchrone de ce type de fonction
//--: L'opération d'incrémentation reste synchrone.

function addOne(array, callback) {
    var error = array.length == 0 ? new Error('Empty array not allowed') : null;
    var result =  array.map(function (n) { return n + 1; });

    setTimeout(function() {
        callback(error, result);
    }, 1000);
};
*/

// La version suivante réalise l'opération d'incrémentation de facon asynchrone.
// Une fonction de rappelle réalisant l'incrémentation est définie pour chaque element du tableau.
// Le code est plus complexe. On remarque la présence d'une fonction invoquée immédiatement définissant
// une closure pour capter l'incrément de boucle.

function addOne(array, callback) {
    var error = array.length == 0 ? new Error('Empty array not allowed') : null;
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
        (function(j) {
            setTimeout(function() {
                newArray[j] = array[j] + 1;
                if (newArray.length == array.length) {
                    callback(error, newArray);
                }
            });
        })(i);
    }
};

var nums = [0,1,2,3,4,5,6,7,8,9];

console.log('version synchrone:', addOneSync(nums));

addOne(nums, function (err, data) {
  if (err) throw err;
  console.log('version asynchrone: ', data);
});
