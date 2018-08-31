var conn = indexedDB.open('shopping_list', 1);

fucntion loadData(db) {

}
function bindSaveButton(db) {
  var shoppingItem = document.getElementById('');
  var saveButton = document.getElementById('add')
  )
}

conn.addEventListener('success', function(evt) {
  var db = evt.target.result;
  console.log('connected event', evt);
});

conn.addEventListener('error', function(evt) {
  console.log(
    'error connecting',
    evt.target.error
  );
});

conn.addEventListener('upgradeneeded',function(evt) {
  console.log('upgrade needed', evt)
});

conn.addEventListener('upgradeneeded',function(evt) {
  console.log('upgrade needed', evt)
  var db = evt.target.result;

  // Create an objectStore for this database
  var objectStore = db.createObjectStore("listItems");
  objectStore.createIndex(r
    'item',
    'item',
    {unique: false}
  );

  // Listen for the completed transaction
  objectStore
    .transaction
    .addEventListener('complete', function(evt) {
   console.log('Store created');
  });
});
