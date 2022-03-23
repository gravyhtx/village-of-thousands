export function idbPromise(storeName, method, object) {
    return new Promise((resolve, reject) => {
        const request =  window.indexedDB.open('vot-shop', 1);
        let db, tx, store;
        request.onupgradeneeded = function(e) {
            const db = request.result;
            db.createObjectStore('cart', { keyPath: 'product' });
        };

        request.onerror = function(e) { 
            console.log('There was an error in the indexedDB');
        };

        request.onsuccess = function(e) {
            db = request.result;
            tx = db.transaction(storeName, 'readwrite');
            store = tx.objectStore(storeName);

            db.onerror = function(e) {
                console.log('error', e);
            };

            switch (method) {
                case 'put':
                    store.put(object);
                    resolve(object);
                    break;
                case 'get':
                    const all = store.getAll();
                    all.onsuccess = function() {
                        resolve(all.result);
                    };
                    break;
                case 'delete':
                    store.delete(object.product);
                    break;
                default:
                    console.log('Not a valid method');
                    break;
            }

            tx.oncomplete = function() {
                db.close();
            };
        };
    });
}