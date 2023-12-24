// Copyright (c) 2023 YA-androidapp(https://github.com/yzkn) All rights reserved.


const keyPrefix = 'NOTEPAD_';


const DEFAULT_FONT_FAMILIES = new Set([
    // Windows
    'Arial',
    'Arial Black',
    'Bahnschrift',
    'Calibri',
    'Cambria',
    'Cambria Math',
    'Candara',
    'Comic Sans MS',
    'Consolas',
    'Constantia',
    'Corbel',
    'Courier New',
    'Ebrima',
    'Franklin Gothic Medium',
    'Gabriola',
    'Gadugi',
    'Georgia',
    'HoloLens MDL2 Assets',
    'Impact',
    'Ink Free',
    'Javanese Text',
    'Leelawadee UI',
    'Lucida Console',
    'Lucida Sans Unicode',
    'Malgun Gothic',
    'Marlett',
    'Microsoft Himalaya',
    'Microsoft JhengHei',
    'Microsoft New Tai Lue',
    'Microsoft PhagsPa',
    'Microsoft Sans Serif',
    'Microsoft Tai Le',
    'Microsoft YaHei',
    'Microsoft Yi Baiti',
    'MingLiU-ExtB',
    'Mongolian Baiti',
    'MS Gothic',
    'MV Boli',
    'Myanmar Text',
    'Nirmala UI',
    'Palatino Linotype',
    'Segoe MDL2 Assets',
    'Segoe Print',
    'Segoe Script',
    'Segoe UI',
    'Segoe UI Historic',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'SimSun',
    'Sitka',
    'Sylfaen',
    'Symbol',
    'Tahoma',
    'Times New Roman',
    'Trebuchet MS',
    'Verdana',
    'Webdings',
    'Wingdings',
    'Yu Gothic',

    // Mac
    'American Typewriter',
    'Andale Mono',
    'Arial',
    'Arial Black',
    'Arial Narrow',
    'Arial Rounded MT Bold',
    'Arial Unicode MS',
    'Avenir',
    'Avenir Next',
    'Avenir Next Condensed',
    'Baskerville',
    'Big Caslon',
    'Bodoni 72',
    'Bodoni 72 Oldstyle',
    'Bodoni 72 Smallcaps',
    'Bradley Hand',
    'Brush Script MT',
    'Chalkboard',
    'Chalkboard SE',
    'Chalkduster',
    'Charter',
    'Cochin',
    'Comic Sans MS',
    'Copperplate',
    'Courier',
    'Courier New',
    'Didot',
    'DIN Alternate',
    'DIN Condensed',
    'Futura',
    'Geneva',
    'Georgia',
    'Gill Sans',
    'Helvetica',
    'Helvetica Neue',
    'Herculanum',
    'Hoefler Text',
    'Impact',
    'Lucida Grande',
    'Luminari',
    'Marker Felt',
    'Menlo',
    'Microsoft Sans Serif',
    'Monaco',
    'Noteworthy',
    'Optima',
    'Palatino',
    'Papyrus',
    'Phosphate',
    'Rockwell',
    'Savoye LET',
    'SignPainter',
    'Skia',
    'Snell Roundhand',
    'Tahoma',
    'Times',
    'Times New Roman',
    'Trattatello',
    'Trebuchet MS',
    'Verdana',
    'Zapfino',

    // Google Fonts
    'Source Code Pro'
].sort());


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


const listFontFamilies = async () => {
    const datalist = document.getElementById('fontFamilies');

    await document.fonts.ready;
    for (const font of DEFAULT_FONT_FAMILIES.values()) {
        if (document.fonts.check(`12px "${font}"`)) {
            const option = document.createElement('option');
            option.value = font;
            datalist.appendChild(option);
        }
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


    document.getElementById('fontFamily').addEventListener('change', () => {
        document.getElementById('mainContent').style.fontFamily = document.getElementById('fontFamily').value;
    });


    // datalistの再読込
    document.getElementById('reload').addEventListener('click', (event) => {
        listLocalStorageKeys();
    });
    listLocalStorageKeys();

    listFontFamilies();


    // ファイル
    document.getElementById('load').addEventListener('click', (event) => {
        let content = loadFromLocalStorage(document.getElementById('filename').value);
        if (content) {
            document.getElementById('mainContent').value = content;
        }
    });
});
