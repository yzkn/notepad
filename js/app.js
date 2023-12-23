// Copyright (c) 2023 YA-androidapp(https://github.com/yzkn) All rights reserved.


const keyPrefix = 'NOTEPAD_';


const lsTest = _ => {
    localStorage.setItem(keyPrefix + 'copyright', 'Copyright (c) 2023 YA All rights reserved.');
    localStorage.setItem(keyPrefix + 'markdown', '# Title\n\n----------\n\nContent');
};


const resetContent = () => {
    document.getElementById('mainContent').value = '';
};

const listLocalStorageKeys = () => {
    const datalist = document.getElementById('keys');

    Object.keys(localStorage).forEach((k) => {
        if (k.startsWith(keyPrefix)) {
            const option = document.createElement('option');
            option.value = k.substring(keyPrefix.length);
            datalist.appendChild(option);
            console.log(k, localStorage.getItem(k));
        }
    });
};

const removeFromLocalStorage = (key, allItems = false) => {
    if (allItems) {
        localStorage.clear();
    } else if (key !== '') {
        if (keyPrefix + key in localStorage) {
            localStorage.removeItem(keyPrefix + key);
        }
    }
};

const loadFromLocalStorage = (key) => {
    console.log('key', key);
    if (key !== '') {
        if (keyPrefix + key in localStorage) {
            console.log('key', key, 'item', localStorage.getItem(keyPrefix + key));
            return localStorage.getItem(keyPrefix + key);
        }
    }

    // document.getElementById('filename').value = '';
};

const saveToLocalStorage = (key, content) => {
    if (key !== '') {
        if (keyPrefix + key in localStorage) {
            //TODO: 上書き確認
            localStorage.setItem(keyPrefix + key, content);
        } else {
            localStorage.setItem(keyPrefix + key, content);
        }
    }
};

const uploadFile = () => {
    ;

    // document.getElementById('filename').value = '';
};

const downloadFile = (key, content) => {
    if (key !== '') {
        ;
    }
};


window.addEventListener('DOMContentLoaded', _ => {

    // test
    lsTest();


    // サイドメニュー
    let sidemenuStatus = true;
    document.getElementById('toggle').addEventListener('click', () => {
        if (sidemenuStatus) {
            document.getElementsByTagName('main')[0].style.cssText = 'margin-left: -320px'
            sidemenuStatus = false;
        } else {
            document.getElementsByTagName('main')[0].style.cssText = 'margin-left: 0px'
            sidemenuStatus = true;
        }
    });

    document.getElementById('fontsize').addEventListener('change', () => {
        document.getElementById('mainContent').style.fontSize = document.getElementById('fontsize').value;
    });


    // datalistの再読込
    document.getElementById('reload').addEventListener('click', (event) => {
        listLocalStorageKeys();
    });
    listLocalStorageKeys();


    // ファイル
    document.getElementById('load').addEventListener('click', (event) => {
        let content = loadFromLocalStorage(document.getElementById('filename').value);
        if (content) {
            document.getElementById('mainContent').value = content;
        }
    });
});
