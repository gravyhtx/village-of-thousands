import Auth from './auth';

export function idbPromise(storeName, method, object) {
    return new Promise((resolve, reject) => {
        const request =  window.indexedDB.open('vot-shop', 1);
        let db, tx, store;
        request.onupgradeneeded = function(e) {
            const db = request.result;
            db.createObjectStore('cart', { keyPath: 'id' });
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
                    const profile = Auth.loggedIn() ? Auth.getProfile() : null;

                    const record = store.get(profile.data._id)
                    //future: put date on creation of user
                    record.onsuccess = function(info) {
                        console.log(record, info)
                        if(!record.result) {
                            store.put({id: profile.data._id, cart: [object], dateUpdated: Date.now()});
                        }else {
                            let flag = false;

                            record.result.cart.forEach(item => {
                                if(item.id === object.id){
                                    flag = true;
                                    return
                                }
                            })
                            if(flag){
                                alert("item already in cart");
                                return
                            }
                            record.result.cart.push(object);
                            record.result.dateUpdated = Date.now();
                            store.put(record.result);
                        }
                        resolve(object);
                    }
                    break;
                case 'get':
                    const user = Auth.loggedIn() ? Auth.getProfile() : null;

                    const all = user ? store.get(user.data._id) : null;

                    if(!all) {
                        return
                    }
                    
                    all.onsuccess = function() {
                        console.log(all)
                        resolve(all.result);
                    };
                    break;
                case 'deleteone':
                    const profileForDelete = Auth.loggedIn() ? Auth.getProfile() : null;

                    const recordForDelete = store.get(profileForDelete.data._id)

                    recordForDelete.onsuccess = function(info) {
                        console.log(recordForDelete, info)
                        if(!recordForDelete.result) {
                            alert("no cart to delete items from")
                            return
                        }else {
                            recordForDelete.result.cart.forEach((item, index) => {
                                console.log(item)
                                if(item.id === object.id){
                                    recordForDelete.result.cart.splice(index, 1);
                                    return
                                }
                            })
                            recordForDelete.result.dateUpdated = Date.now();
                            store.put(recordForDelete.result);
                        }
                        resolve(object);
                    }
                    break;
                case 'delete':
                    store.delete(object.id);
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