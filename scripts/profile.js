import Alert from './modules/alert.js';

import Helper from './modules/helper.js';

import Ajax from './modules/ajax.js';

import { 
    fetchAllItems,
    fetchMyItems,
    fetchAccountWithStore,
    fetchAccount,
    fetchTransactions 
} from './modules/async.js';

import { 
    Item,
    Store,
    Cart
} from './class.js';

refreshMyItems();
refreshMyAccount();
refreshMyStore();
refreshAllItems();

const uniqueCategories = new Set();

function refreshMyItems(){
    (async () => {
        try {
            const fetch = await fetchMyItems(AccountId, AuthToken, StoreId);
            if (Array.isArray(fetch)) {
                localStorage.setItem('MyItems', JSON.stringify(fetch));
                ProfileMystoreRefreshList(fetch);
            } else {
                console.log('fetchItems is not an array.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    })();
}

function refreshMyAccount(){
    (async () => {
        try {
            let fetch = null;
            if (StoreId === null || StoreId === ""){
                fetch = await fetchAccount(AccountId, AuthToken);
            } else {
                fetch = await fetchAccountWithStore(AccountId, AuthToken);
            }
            
            if (Array.isArray(fetch)) {
                localStorage.setItem('Account', JSON.stringify(fetch));
                ProfileMyprofileEditProfileForm(fetch);
            } else {
                console.log('fetchItems is not an array.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    })();
}


function refreshMyStore(){
    (async () => {
        try {
            let fetch = null;
            if (StoreId === null || StoreId === ""){
                fetch = await fetchAccount(AccountId, AuthToken);
            } else {
                fetch = await fetchAccountWithStore(AccountId, AuthToken);
            }
            
            if (Array.isArray(fetch)) {
                localStorage.setItem('Account', JSON.stringify(fetch));
                MyShop (fetch);
            } else {
                console.log('fetchItems is not an array.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    })();
}

function refreshMyTransactions(){
    (async () => {
        try {
            const fetch = await fetchTransactions(AccountId, AuthToken);
            if (Array.isArray(fetch)) {
                localStorage.setItem('MyTransactions', JSON.stringify(fetch));
                MyTransactions(fetch);
            } else {
                console.log('fetchItems is not an array.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    })();
}

function refreshAllItems(){
    (async () => {
        try {
            const fetch = await fetchAllItems(AccountId, AuthToken);
            if (Array.isArray(fetch)) {
                fetch.forEach(element => {
                    Items.push(new Item(
                        element['ItemId'],
                        element['ItemName'],
                        element['ItemCategory'],
                        element['ItemPrice'],
                        element['ItemImage'],
                        element['StoreId'],
                        element['StoreName'],
                        element['StoreImage'],
                        element['AccountId']
                    ));
                    if (element['StoreId']) {
                        if (!uniqueCategories.has(element['StoreId'])) {
                            uniqueCategories.add(element['StoreId']);
                            Stores.push(new Store(
                                element['StoreId'],
                                element['StoreName'],
                                element['StoreImage'],
                                element['AccountId']
                            ));
                        }
                    }
                });
                localStorage.setItem('Items', JSON.stringify(fetch));
                console.log(Items);
                console.log(Stores);
                refreshMyTransactions();
            } else {
                console.log('fetchItems is not an array.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    })();
}

var Items = [];
var Stores = [];
var Carts = [];
var Category = [];

var ProfileMystoreContainer = null;

var ProfileTransactionsContainer  = document.getElementById('ProfileTransactionsContainer');
var ProfileMyprofileEditProfileButton = document.getElementById('edit-profile-button');
var ProfileMyprofileContainer = document.getElementById('ProfileMyprofileContainer');

// #############################################################################
// REFRESH LIST OF ITEMS
// #############################################################################
function ProfileMystoreRefreshList(list){

    ProfileMystoreContainer = document.getElementById('ProfileMystoreContainer');

    if (ProfileMystoreContainer) {
        ProfileMystoreContainer.innerHTML = '';

        ProfileMystoreContainer.innerHTML = `
        <div class="list-item add-item-form-container" style="padding-top: 0px; padding-bottom: 0px; margin-bottom: 0px">
            <div class="bottom add-item-form" style="height: 0">
                <form id="form-add-item" style="border-top-width: 0px" action="../php/api/item.php" method="post" enctype="multipart/form-data">
                    <h3>Add Item Form</h3>
                    <fieldset><legend>Item Image:</legend><input name="ItemImage" class="add-image" type="file"></fieldset>
                    <fieldset><legend>Item Name:</legend><input name="ItemName" class="add-name" type="text"></fieldset>
                    <fieldset><legend>Item Category:</legend><input name="ItemCategory" class="add-category" type="text"></fieldset>
                    <fieldset><legend>Item Price:</legend><input name="ItemPrice" class="add-price" type="text"></fieldset>
                    <input id="add-item-button" class="add-button" type="submit" value="Add item">
                </form>
            </div>
        </div>
    `;

    list.forEach(item => {
        ProfileMystoreContainer.innerHTML += `
            <div class="list-item" data-id="${item.ItemId}" data-name="${item.ItemName}" data-category="${item.ItemCategory}" data-price="${item.ItemPrice}" data-image="${item.ItemImage}">
                <div class="top">
                    <div class="item-image">
                        <img src="../images/uploads/items/${item.ItemImage}" alt="">
                    </div>
                    <div class="contents">
                        <p class="item-name">${item.ItemName}</p>
                        <p class="item-category">${item.ItemCategory}</p>
                        <p class="item-price">${Helper.formatPrice(item.ItemPrice)}</p>
                    </div>
                    <div class="actions">
                        <div class="icons edit-button" title="Edit"></div>
                        <div class="icons delete-button" title="Delete"></div>
                    </div>
                </div>
                <div class="bottom" style="height: 0">
                    <form data-id="${item.ItemId}" action="" method="" action="../php/api/item.php" method="post" enctype="multipart/form-data">
                        <h3>Edit Item Form</h3>
                        <fieldset><legend>Item Image:</legend><input name="ItemImage" class="new-image" type="file"></fieldset>
                        <fieldset><legend>Item Name:</legend><input name="ItemName" value="${item.ItemName}" class="new-name" type="text"></fieldset>
                        <fieldset><legend>Item Category:</legend><input name="ItemCategory" value="${item.ItemCategory}" class="new-category" type="text"></fieldset>
                        <fieldset><legend>Item Price:</legend><input name="ItemPrice" value="${item.ItemPrice}" class="new-price" type="text"></fieldset>
                        <input class="update-button" type="submit" value="Update changes">
                    </form>
                </div>
            </div>
        `;

    });
    }
    
    bindProfileMyshopContainerButtons ();
}


// #############################################################################
// SHOW ADD ITEM FORM
// #############################################################################
function ProfileMystoreAddItemForm(event){
    const container = event.currentTarget.parentNode.parentNode.querySelector('.add-item-form-container');
    const element = event.currentTarget.parentNode.parentNode.querySelector('.add-item-form');

    if (element.style.visibility === 'hidden' || element.style.visibility === '') {
        element.style.visibility = 'visible';
        element.style.height = 'fit-content';
        container.style.paddingTop = '6px'
        container.style.paddingBottom = '6px'
        container.style.marginBottom = '10px'
    } else {
        element.style.visibility = 'hidden';
        element.style.height = '0px';
        container.style.paddingTop = '0px'
        container.style.paddingBottom= '0px'
        container.style.marginBottom = '0px'
    }
}



// #############################################################################
// ADD SHOP API
// #############################################################################
function ProfileMystoreAddShop(event){
    event.preventDefault();
    const formData = new FormData(event.currentTarget.parentNode);
    formData.append('Username', Username);
    formData.append('AuthToken', AuthToken);
    formData.append('AccountId', AccountId);
    formData.append('Intent', 'Insert Store');

    Ajax.postFormData('../php/api/store.php',formData)
    .then(data => {
        console.log(data);
        if(data) {
            Alert.SendAlert("success", "Store created! reloading page...", 3000);
        }
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    })
    .catch(error => {
        console.error(error);
    });
}
;
// #############################################################################
// ADD ITEM API
// #############################################################################
function ProfileMystoreAddItem(event){
    event.preventDefault();
    const formData = new FormData(event.currentTarget.parentNode);
    formData.append('StoreId', StoreId);
    formData.append('AuthToken', AuthToken);
    formData.append('AccountId', AccountId);
    formData.append('Intent', "Insert Item");

    Ajax.postFormData('../php/api/item.php',formData)
    .then(data => {
        console.log(data);
        refreshMyItems()
        if(data) {
            Alert.SendAlert("success", "Item added successfully", 3000);
        }
    })
    .catch(error => {
        console.error(error);
    });
}


// #############################################################################
// DELETE ITEM API
// #############################################################################
function ProfileMyshopDeleteItem(event){
    const element = event.currentTarget.parentNode.parentNode.parentNode.querySelector('.bottom');
    const itemId = event.currentTarget.parentNode.parentNode.parentNode.dataset.id;

    const formData = new FormData();
    formData.append('AuthToken', AuthToken);
    formData.append('AccountId', AccountId);
    formData.append('StoreId', StoreId);
    formData.append('ItemId', itemId);
    formData.append('Intent', "Delete Item");

    Ajax.postFormData('../php/api/item.php',formData)
    .then(data => {
        console.log(data);
        refreshMyItems();
        if(data) {
            Alert.SendAlert("success", "Item deleted successfully", 3000);
        }
    })
    .catch(error => {
        console.error(error);
    });
    console.log("Deleting: " + itemId);
}

// #############################################################################
// DEqwe
// #############################################################################
function ProfileMyprofileEditProfileForm(list) {
    const data = JSON.parse(localStorage.getItem('Account'));
    const EditFrom = `
        <form action="../php/api/Account.php" method="post" enctype="multipart/form-data">
            <h3>Account Edit Form</h3>
            <label for="AccountPicture">Account Image:</label>
            <input type="file" name="AccountImage">
            <label for="Firstname">Firstname:</label>
            <input type="text" name="Firstname" value="${data[0]['Firstname']}">
            <label for="Lastname">Lastname:</label>
            <input type="text" name="Lastname" value="${data[0]['Lastname']}">
            <label for="Email">Email:</label>
            <input type="text" name="Email" value="${data[0]['Email']}">
            <label for="PhoneNumber">Phone Number:</label>
            <input type="text" name="PhoneNumber" value="${data[0]['PhoneNumber']}">
            <label for="Address">Complete Address:</label>
            <input type="text" name="Address" value="${data[0]['Address']}">
            <label for="Username">Username:</label>
            <input type="text" name="Username" value="${data[0]['Username']}">
            <label for="Password">Password:</label>
            <input type="password" name="Password" value="">
            <input id="update-account-button" type="submit" value="Save Account changes">
        </form>
    `;
    const DisplayItems = `
        <img class="center" src="../images/uploads/profiles/${data[0]['AccountPicture'] || ''}" alt="">
        <p class="center name">${data[0]['Firstname'] || ''} ${data[0]['Lastname'] || ''}</p>
        <p class="center username">@${data[0]['Username'] || ''}</p>
        <br>
        <p class="left email"><a>E-mail: </a>${data[0]['Email'] || ''}</p>
        <p class="left phone-number"><a>Phone Number: </a>${data[0]['PhoneNumber'] || ''}</p>
        <p class="left address"><a>Complete Address: </a></p>
        <p class="left address-content">${data[0]['Address'] || ''}</p>
        <br>
        <p class="left joined-date"><a>Joined Date: </a>${data[0]['JoinedDate'] || ''}</p>
    `;
    console.log("PROFILE",data[0].StoreId );
    if (ProfileMyprofileContainer.dataset.view === 'view') {
        ProfileMyprofileContainer.innerHTML = "";
        console.log("On View");
        ProfileMyprofileContainer.dataset.view = 'edit';
        ProfileMyprofileContainer.innerHTML = EditFrom;
        if (data[0].StoreId == "" || data[0].StoreId == null){ 
        } else {
            ProfileMyprofileContainer.innerHTML = ProfileMyprofileContainer.innerHTML + `
            <form action="../php/api/Shop.php" method="post" enctype="multipart/form-data">
                <h3>Store Edit Form</h3>
                <label for="StoreImage">Store Image:</label>
                <input type="file" name="StoreImage">
                <label for="StoreName">Store Name:</label>
                <input require type="text" name="StoreName" value="${data[0]['StoreName']}">
                <label for="StoreDelete">Store Delete:</label>
                <input class="DeleteStore" type="checkbox" name="StoreDelete">
                <input id="update-store-button" type="submit" value="Save store changes">
            </form>
        `;
        document.getElementById('update-store-button').addEventListener('click', ProfileMyprofileUpdateStore);
        
        }
        document.getElementById('update-account-button').addEventListener('click', ProfileMyprofileUpdateAccount)
    } else {
        console.log("On Edit");
        ProfileMyprofileContainer.innerHTML = "";
        ProfileMyprofileContainer.dataset.view = 'view';
        ProfileMyprofileContainer.innerHTML = DisplayItems;
        if (data[0].StoreId == "" || data[0].StoreId == null){ 
        } else {
            ProfileMyprofileContainer.innerHTML = ProfileMyprofileContainer.innerHTML + `
            <br>
            <p class="left store-name"><a>Store Name: </a>${data[0]['StoreName']}</p>
        `;
        } 
    }
}

function ProfileMyprofileUpdateAccount(event){
    event.preventDefault();
    const formData = new FormData(event.currentTarget.parentNode);
    formData.append('AuthToken', AuthToken);
    formData.append('AccountId', AccountId);
    formData.append('Intent', "Update Account");

    Ajax.postFormData('../php/api/account.php',formData)
    .then(data => {
        console.log(data);
        refreshMyAccount();
        if(data) {
            Alert.SendAlert("success", "Account updated successfully", 3000);
        }
    })
    .catch(error => {
        console.error(error);
    });
}

function ProfileMyprofileUpdateStore(event){
    event.preventDefault();
    const formData = new FormData(event.currentTarget.parentNode);
    formData.append('AuthToken', AuthToken);
    formData.append('AccountId', AccountId);
    formData.append('StoreId', StoreId);

    if (event.currentTarget.parentNode.querySelector('.DeleteStore').checked) {
        formData.append('Intent', "Delete Store");
    } else {
        formData.append('Intent', "Update Store");
    }

    Ajax.postFormData('../php/api/store.php',formData)
    .then(data => {
        console.log(data);
        refreshMyStore();
        if(data) {
            Alert.SendAlert("success", "Store updated successfully! Reloading page...", 3000);
        }
        setTimeout(() => {
            window.location.reload();
        }, 2000);

    })
    .catch(error => {
        console.error(error);
    });
}




// #############################################################################
// SHOW EDIT FORM
// #############################################################################
function ProfileMyshopEditForm(event){
    const element = event.currentTarget.parentNode.parentNode.parentNode.querySelector('.bottom');
    if (element.style.visibility === 'hidden' || element.style.visibility === '') {
        element.style.visibility = 'visible';
        element.style.height = 'fit-content';
    } else {
        element.style.visibility = 'hidden';
        element.style.height = '0px';
    }
}

// #############################################################################
// UPDATE ITEM API
// #############################################################################
function ProfileMyshopUpdateItem(event){
    event.preventDefault();
    const itemId = event.currentTarget.parentNode.parentNode.parentNode.dataset.id;
    console.log(itemId);

    const formData = new FormData(event.currentTarget.parentNode);
    formData.append('AuthToken', AuthToken);
    formData.append('AccountId', AccountId);
    formData.append('ItemId', itemId);
    formData.append('StoreId', StoreId);
    formData.append('Intent', "Update Item");

    Ajax.postFormData('../php/api/item.php',formData)
    .then(data => {
        console.log(data);
        refreshMyItems()
        Alert.SendAlert("success", "Item updated successfully", 3000);
    })
    .catch(error => {
        console.error(error);
    });

    console.log("Updating: " + itemId);

}

// #############################################################################
// BIND ALL LIST BUTTONS
// #############################################################################
function bindProfileMyshopContainerButtons () {
    const DeleteButtons = Helper.SelectAllClassWith(ProfileMystoreContainer, '.delete-button');
    const EditButtons = Helper.SelectAllClassWith(ProfileMystoreContainer, '.edit-button');
    const UpdateButtons = Helper.SelectAllClassWith(ProfileMystoreContainer, '.update-button');
    const AddItemButtons = document.getElementById('add-item-button');

    Helper.ElementsArrayAddClickListener(DeleteButtons,ProfileMyshopDeleteItem);
    Helper.ElementsArrayAddClickListener(EditButtons,ProfileMyshopEditForm);
    Helper.ElementsArrayAddClickListener(UpdateButtons,ProfileMyshopUpdateItem);
    Helper.ElementsAddClickListener(AddItemButtons,ProfileMystoreAddItem);
}

function MyShop (list){
    const Shop = `
        <div class="list-scroll">
            <div id="ProfileMystoreContainer" class="list-container">
                <div class="list-item add-item-form-container" style="padding-top: 0px; padding-bottom: 0px; margin-bottom: 0px">
                    <div class="bottom add-item-form" style="height: 0">
                        <form id="form-add-item" style="border-top-width: 0px" s>
                            <h3>Add Item Form</h3>
                            <fieldset><legend>Item Image:</legend><input require name="ItemImage" class="add-image" type="file"></fieldset>
                            <fieldset><legend>Item Name:</legend><input require name="ItemName" class="add-name" type="text"></fieldset>
                            <fieldset><legend>Item Category:</legend><input require name="ItemCategory" class="add-category" type="text"></fieldset>
                            <fieldset><legend>Item Price:</legend><input require name="ItemPrice" class="add-price" type="text"></fieldset>
                            <input id="add-item-button" class="add-button" type="submit" value="Add item">
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
    const NoShop = `
        <div class="create-store">
            <p>Do you want to create your own store?</p>
            <form id="form-add-store" action="../php/api/store.php" method="post" enctype="multipart/form-data">
                <div id="create-store-result" style="display: none;">
                </div>
                <label for="store-image">Store image:</label>
                <input class="add-store-image" type="file" name="StoreImage" require accept="image/*">
                <label for="store-name">Store Name:</label>
                <input class="add-store-name" type="text" name="StoreName" require>
                <input id="add-store-button" type="submit" value="Create my store">
            </form>
        </div>
    `;
    console.log(list);
    console.log("STORE",list[0].StoreId);

    if (!(typeof list[0].StoreId !== 'undefined' && list[0].StoreId !== null && list[0].StoreId !== '')){
        document.querySelector('.mystore').innerHTML = document.querySelector('.mystore').innerHTML + NoShop;
        Helper.ElementsAddClickListener(document.getElementById('add-store-button'),ProfileMystoreAddShop);
    } else {
        document.querySelector('.mystore').innerHTML = document.querySelector('.mystore').innerHTML + Shop;
        document.querySelector('.mystore-header').innerHTML = document.querySelector('.mystore-header').innerHTML +
        `<div id="ProfileMyshopAddItemFormButton" class="icons add-item-form-button" title="Add item"></div>`;
        ProfileMystoreContainer = document.getElementById('ProfileMystoreContainer');
        Helper.ElementsAddClickListener(document.getElementById('ProfileMyshopAddItemFormButton'),ProfileMystoreAddItemForm);
        refreshMyItems();
    }
}

Helper.ElementsAddClickListener(ProfileMyprofileEditProfileButton,ProfileMyprofileEditProfileForm);



function MyTransactions(list){
    const data = list;
    console.log(data);
    const x = `
        <div class="list-item">
            <span class="left">
                <div class="user">No Transactions</div>
                <div class="type"></div>
                <div class="date"></div>
            </span>
            <span class="cost"></span>
        </div>
    `;
    if (typeof data !== 'undefined' && data !== null && data !== '') {

        document.getElementById('ProfileTransactionsContainer').innerHTML = ``;
        data.forEach(element => {

            const Seller = JSON.parse(element.TransactionSeller);
            let names = "";
            Seller.forEach(item => {
                Stores.forEach(store => {
                    if (item.toString() === store._StoreId.toString()) {
                        if (names === ""){
                            names = names + store._StoreName;
                        } else {
                            names = names + ", " +store._StoreName;
                        }
                    }
                });
            });

            document.getElementById('ProfileTransactionsContainer').innerHTML = document.getElementById('ProfileTransactionsContainer').innerHTML + `
                <div class="list-item">
                    <span class="left">
                        <div class="user">${names}</div>
                        <div class="type complete">${element.TransactionStatus}</div>
                        <div class="date">${element.TransactionTimestamp}</div>
                    </span>
                    <span class="cost">${Helper.formatPrice(element.TransactionAmount) }</span>
                </div>
            `;
        });    
    } else {
        document.getElementById('ProfileTransactionsContainer').innerHTML = x;
    }
}

