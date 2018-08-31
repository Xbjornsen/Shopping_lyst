var conn = indexedDB.open('shopping_listv1', 1);

function createRow(data) {
  var row = document.createElement('tr');
  row.classList.add('itemRow');
  console.log(data);
  var nameCell = document.createElement('td');
  nameCell.innerHTML = data.item;
  row.appendChild(nameCell);
  return row;
}

function loadData(db) {
  var shoppingTable = document.querySelector("#shoppingList tbody");
  shoppingTable.innerHTML = '';
  var store = db.transaction(['listItems']).objectStore('listItems')
  var cursor = store.openCursor();
  cursor.addEventListener('success', function(evt) {
    var thisCursor = evt.target.result;
    if (thisCursor) {
      shoppingTable.appendChild(createRow(thisCursor.value));
      thisCursor.continue();
    } else {
      console.log('No More Items');
    }
  });
}

function bindButtons(db) {
  var shoppingItem = document.getElementById('itemInput');
  var saveButton = document.getElementById('add');
  saveButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    var transaction = db.transaction(['listItems'],'readwrite');
    var objectStore = transaction.objectStore('listItems');
    var request = objectStore.add({item: shoppingItem.value});
    request.addEventListener('success', function(evt) {
      console.log(
        'Successfully added data',
        evt.target.result
      );
      loadData(db);
    });
  });
}

conn.addEventListener('success', function(evt) {
  var db = evt.target.result;
  console.log('connected event', evt);
  bindButtons(db);
  loadData(db);
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
