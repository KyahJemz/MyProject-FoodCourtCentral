
import Ajax from './ajax.js'

export async function fetchAllItems (AccountId, AuthToken, StoreId){
    var formData = new FormData();
    formData.append('AuthToken', AuthToken);
    formData.append('AccountId', AccountId);
    formData.append('StoreId', StoreId);
    formData.append('Intent', 'Select Items');

    try {
        const responseJSON = await Ajax.postFormData('../php/api/item.php', formData);
        return responseJSON;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function fetchMyItems (AccountId, AuthToken, StoreId){
    var formData = new FormData();
    formData.append('AuthToken', AuthToken);
    formData.append('AccountId', AccountId);
    formData.append('StoreId', StoreId);
    formData.append('Intent', 'Select MyItems');

    try {
        const responseJSON = await Ajax.postFormData('../php/api/item.php', formData);
        return responseJSON;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function fetchAccountWithStore (AccountId, AuthToken){
    var formData = new FormData();
    formData.append('AuthToken', AuthToken);
    formData.append('AccountId', AccountId);
    formData.append('Intent', 'Select Account With Store');

    try {
        const responseJSON = await Ajax.postFormData('../php/api/account.php', formData);
        return responseJSON;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function fetchAccount(AccountId, AuthToken){
    var formData = new FormData();
    formData.append('AuthToken', AuthToken);
    formData.append('AccountId', AccountId);
    formData.append('Intent', 'Select Account With Store');

    try {
        const responseJSON = await Ajax.postFormData('../php/api/account.php', formData);
        return responseJSON;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function fetchTransactions(AccountId, AuthToken){
    var formData = new FormData();
    formData.append('AuthToken', AuthToken);
    formData.append('AccountId', AccountId);
    formData.append('Intent', 'Select Transaction');

    try {
        const responseJSON = await Ajax.postFormData('../php/api/transaction.php', formData);
        return responseJSON;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}