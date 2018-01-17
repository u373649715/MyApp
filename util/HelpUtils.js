import {
    Alert
} from 'react-native';

let i=0;
export const isDebug = false;
export const version = 1.21;

export function isBlank(str){
    return (str === ''|| str === null || str === 'null' || str === 'undefined' || str === undefined);
}

export function alertNetError(str){
    Alert.alert('sorry','网络开小差了。'+str);
}