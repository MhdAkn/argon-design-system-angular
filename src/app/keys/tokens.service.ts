import { EncryptStorage } from "storage-encryption";

//Lecture d'une Donnée du Local Storage
const encryptStorage = new EncryptStorage('&&$Explotel#20@76_x_=', 'localStorage');
const encryptSessionStore = new EncryptStorage('&&$Explotel#20@76_x_=', 'sessionStorage');

export function READ_LOCAL_TOKEN(key: any): any {
    let result = null;
    try {
        result = encryptStorage.decrypt(key);
    } catch (e) {
        result = null;
    }
    return result;
};

//Lecture d'une Donnée du Local Storage
export function READ_SESSION_TOKEN(key: any): any {
    let result = null;
    try {
        result = encryptSessionStore.decrypt(key);
    } catch (e) {
        result = null;
    }
    return result;
};
