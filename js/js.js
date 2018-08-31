var conn = indexedDB.open('test-db', 3);

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
