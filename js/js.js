var conn = indexedDB.open('shopping_list', 1);

function createRow(db) {
  var row = document.createElement('tr');
  row.classicList.add('itemRow');
  var nameCell = document.createElement('td');
  nameCell.innerHTML = data.item;
  row.appendChild(nameCell);
  return row;
}

function loadData(db) {

}
function bindSaveButton(db) {
  var shoppingItem = document.getElementById('ItemInput');
  var saveButton = document.getElementById('add');
  saveButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    var transaction = db.transaction(['listItems'],'readwrite');
    var objectStore = transaction.objectStore('listItems');
    var request = objectStore.add({item: shoppingItem});
    request.addEventListener('success', function(evt) {
      console.log(
        'Successfully added data',
        evt.target.result
      );
    });
  } );
}



conn.addEventListener('success', function(evt) {
  var db = evt.target.result;
  console.log('connected event', evt);
  bindSaveButton(db);
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
  var objectStore = db.createObjectStore("listItems", {autoIncrement : true});
  objectStore.createIndex('item', 'item',{unique: false});

  // Listen for the completed transaction
  objectStore
    .transaction
    .addEventListener('complete', function(evt) {
   console.log('Store created');
  });
});
