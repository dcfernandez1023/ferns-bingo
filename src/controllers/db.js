const firebaseApp = require('./firebaseApp.js');
const DBFS = firebaseApp.app.firestore();

// writes one piece of data to the specified collection
export function writeOne(id, data, collectionName, callback, callbackOnError) {
	try {
		DBFS.collection(collectionName).doc(id).set(data)
			.then((res) => {callback(data)});
	}
	catch(error) {
		callbackOnError(error);
	}
}

//deletes one document in the specified collection
export function deleteOne(id, collectionName, callback, callbackOnError) {
	try {
		var doc = DBFS.collection(collectionName).doc(id);
		doc.delete()
			.then((res) => {callback(id)});
	}
	catch(error) {
		callbackOnError(error);
	}
}

//returns all the documents within the specified collection
export function getAllDocs(collectionName, callbackOnError) {
	try {
		return DBFS.collection(collectionName).get();
	}
	catch(error) {
		callbackOnError(error);
	}
}

// returns a Querey object that can be enabled to listen to changes in multiple documents within the specified collection
// only accepts ONE filter to querey
export function getQuerey(filterName, filterValue, collectionName) {
	return DBFS.collection(collectionName).where(filterName, "==", filterValue);
}
