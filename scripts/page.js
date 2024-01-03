import Alert from './modules/alert.js';

import Helper from './modules/helper.js';

import { 
    fetchAllItems
} from './modules/async.js';

import { 
    Item,
    Store,
    Cart,
    AddItemToCart,
    GetItemsFromCart
} from './class.js';

var Items = [];
var Stores = [];
var Carts = [];

const SuggestedItemsContainer = document.getElementById('suggested-items-container');
const SuggestedStoresContainer = document.getElementById('suggested-stores-container');

const uniqueCategories = new Set();

refreshItems();

function refreshItems(){
    (async () => {
        try {
            const fetchItems = await fetchAllItems(AccountId, AuthToken, StoreId);
            if (Array.isArray(fetchItems)) {
                fetchItems.forEach(element => {
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
                setSuggestedItems();
                setSuggestedStores();
                console.log(Items);
                console.log(GetItemsFromCart());
            } else {
                console.log('fetchItems is not an array.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    })();
}

function getRandomFromArray(array, count) {
    const shuffled = array.slice();
    let i = array.length;
    const results = [];
    while (i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[rand]] = [shuffled[rand], shuffled[i]];
    }
    if (array.length <= count) {
        return shuffled;
    }
    for (let j = 0; j < count; j++) {
        results.push(shuffled[j]);
    }
    return results;
}
  
function setSuggestedItems() {
    const randomItems = getRandomFromArray(Items, 10);
    Carts = GetItemsFromCart();
    randomItems.forEach(item => {

        let exist = false;
        Carts.forEach(cart => {
            if (randomItems._ItemId === cart._itemId){
                exist = true;
            }
        });
    
        if (!exist) {
            SuggestedItemsContainer.innerHTML += `
            <div class="card-item" data-itemid="${item._ItemId}" data-itemname="${item._ItemName}" data-itemcategory="${item._ItemCategory}" data-itemprice="${item._ItemPrice}" data-itemimage="${item._ItemImage}" data-itemstorename="${item._StoreName}" data-itemstoreimage="${item._StoreImage}">
                <div class="StoreName">${item._StoreName}</div>
                <div class="ItemImage"><img src="../images/uploads/items/${item._ItemImage}" alt=""></div>
                <div class="ItemName">${item._ItemName}</div>
                <div class="ItemCategory">${item._ItemCategory}</div>
                <div class="ItemPrice">${Helper.formatPrice(item._ItemPrice)}</div>
                <div class="Button"><button>Add to cart</button></div>
            </div>
        `;
        }
    });

    Helper.ElementsArrayAddClickListener(SuggestedItemsContainer.querySelectorAll('.Button button'),AddToCartClick);
}

function AddToCartClick(event){
    const element = event.currentTarget.parentNode.parentNode;
    const ItemId = element.dataset.itemid;
    console.log(ItemId);
    const foundItem = Items.find(item => item._ItemId === ItemId);
    if (foundItem) {
        AddItemToCart(new Cart(foundItem.ItemId, foundItem.ItemName, foundItem.ItemPrice, foundItem.ItemImage, foundItem.StoreId, foundItem.StoreName, foundItem.StoreImage, '1'))
    }
    element.remove();
    Alert.SendAlert("success", `${element.dataset.itemname} is added to your cart`, 3000);
}

function setSuggestedStores() {
    const randomItems = getRandomFromArray(Stores, 10);
    randomItems.forEach(item => {
        SuggestedStoresContainer.innerHTML += `
            <div class="card-item" data-storeid="${item._StoreId}" data-storename="${item._StoreName}" data-storeimage="${item._StoreImage}" data-storeaccountid="${item._AccountId}">
                <div class="StoreImage"><img src="../images/uploads/stores/${item._StoreImage}" alt=""></div>
                <div class="StoreName">${item._StoreName}</div>
                <div class="Button"><button>View Shop</button></div>
            </div>
        `;
    });
}

// Alert.SendAlert("warning", "Test", 3000);

// setTimeout(() => {
//     Alert.SendAlert("success", "Test", 3000);
// }, 1000);

// setTimeout(() => {
//     Alert.SendAlert("danger", "Test", 3000);
// }, 2000);