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
    'Noto Sans JP',
    'Source Code Pro'
].sort());


const lsTest = _ => {
    // localStorage.clear();

    if (!((keyPrefix + 'copyright.txt') in localStorage)) {
        localStorage.setItem(keyPrefix + 'copyright.txt', 'Copyright (c) 2023 YA All rights reserved.');
    }
    if (!((keyPrefix + 'markdown.md') in localStorage)) {
        localStorage.setItem(keyPrefix + 'markdown.md', '# Title\n\n----------\n\nContent');
    }
};


const getTempFilename = (prefix, ext) => {
    return prefix + Date.now() + ext;
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
            // console.log(k, localStorage.getItem(k));
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
    // console.log('key', key);
    if (key !== '') {
        if (keyPrefix + key in localStorage) {
            // console.log('key', key, 'item', localStorage.getItem(keyPrefix + key));
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


const downloadFile = (key, content) => {
    if (key !== '' && content !== '') {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.download = key;
        a.href = url;
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
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


const contentChanged = (changed) => {
    isContentChanged = changed;
    document.title = 'notepad' + (changed && lastSavedContent !== document.getElementById('mainContent').value ? ' *' : '');

    if (changed == false) {
        lastSavedContent = document.getElementById('mainContent').value;
    }
};

const updateFontFamily = _ => {
    document.getElementById('mainContent').style.fontFamily = document.getElementById('fontFamily').value;
};

const updateFontSize = _ => {
    document.getElementById('mainContent').style.fontSize = document.getElementById('fontsize').value;
};

const updateColors = _ => {
    document.getElementById('mainContent').style.color = document.getElementById('foreColor').value;
    document.getElementById('mainContent').style.backgroundColor = document.getElementById('backColor').value;
    document.getElementById('mainContent').style.borderColor = document.getElementById('backColor').value;
};


let sidemenuStatus = true;
let isContentChanged = false;
let lastSavedContent = '';


window.addEventListener('DOMContentLoaded', _ => {

    // test
    lsTest();


    // サイドメニュー
    document.getElementById('toggle').addEventListener('click', () => {
        if (sidemenuStatus) {
            document.getElementsByTagName('main')[0].style.cssText = 'margin-left: -320px'
            sidemenuStatus = false;
        } else {
            document.getElementsByTagName('main')[0].style.cssText = 'margin-left: 0px'
            sidemenuStatus = true;
        }
    });


    // ショートカットキー
    document.addEventListener('keydown', event => {
        // console.log(event);
        if (event.ctrlKey && event.altKey && event.code === 'KeyN') {
            document.getElementById('new').dispatchEvent(new Event('click'));
            event.preventDefault();
        } else if (event.ctrlKey && event.altKey && event.code === 'KeyO') {
            document.getElementById('load').dispatchEvent(new Event('click'));
            event.preventDefault();
        } else if (event.ctrlKey && event.code === 'KeyS') {
            document.getElementById('store').dispatchEvent(new Event('click'));
            event.preventDefault(); // ブラウザ既定のCtrl+Sを上書きするため
        } else if (event.ctrlKey && event.altKey && event.code === 'KeyS') {
            document.getElementById('store').dispatchEvent(new Event('click'));
            event.preventDefault();
        }
    });


    // 入力欄サイズ
    const setTextareaSize = () => {
        const mainContentElem = document.getElementById("mainContent");
        const parentElem = mainContentElem.parentElement;
        const h = parentElem.clientHeight;
        const w = parentElem.clientWidth;

        mainContentElem.setAttribute("width", w);
        mainContentElem.setAttribute("height", h);
        mainContentElem.style.width = w + "px";
        mainContentElem.style.height = h + "px";
    }
    setTextareaSize();


    // フォント
    document.getElementById('fontsize').addEventListener('change', updateFontSize);
    document.getElementById('fontsize').addEventListener('keyup', updateFontSize);
    document.getElementById('fontsize').addEventListener('mouseup', updateFontSize);

    document.getElementById('fontFamily').addEventListener('change', updateFontFamily);
    document.getElementById('fontFamily').addEventListener('keyup', updateFontFamily);
    document.getElementById('fontFamily').addEventListener('mouseup', updateFontFamily);

    // 再読込
    document.getElementById('reload').addEventListener('click', _ => {
        listFontFamilies();
        listLocalStorageKeys();
    });
    listFontFamilies();
    listLocalStorageKeys();

    document.getElementById('foreColor').addEventListener('change', updateColors);
    document.getElementById('backColor').addEventListener('change', updateColors);


    // ファイル
    document.getElementById('mainContent').addEventListener('change', _ => { contentChanged(true) });
    document.getElementById('mainContent').addEventListener('keyup', _ => { contentChanged(true) });
    document.getElementById('mainContent').addEventListener('mouseup', _ => { contentChanged(true) });

    document.getElementById('new').addEventListener('click', (event) => {

        document.getElementById('filename').value = getTempFilename('Untitled_', '.txt');
        document.getElementById('mainContent').value = '';
        contentChanged(false);
    });

    document.getElementById('load').addEventListener('click', (event) => {
        let filename = document.getElementById('filename').value;
        if (filename) {
            let content = loadFromLocalStorage(filename);
            if (content) {
                document.getElementById('mainContent').value = content;
                contentChanged(false);
            }
        } else {
            document.getElementById('filename').focus();
        }
    });

    document.getElementById('upload').addEventListener('change', (event) => {
        let file = event.target;
        let reader = new FileReader();
        reader.readAsText(file.files[0]);
        reader.onload = function () {
            document.getElementById('mainContent').value = reader.result;
            document.getElementById('filename').value = file.files[0].name;
            contentChanged(false);
        };
    });

    document.getElementById('store').addEventListener('click', (event) => {
        let filename = document.getElementById('filename').value;
        if (filename) {
            let mainContent = document.getElementById('mainContent').value;

            saveToLocalStorage(filename, mainContent);
            contentChanged(false);
        } else {
            document.getElementById('filename').focus();
        }
    });

    document.getElementById('download').addEventListener('click', (event) => {
        let filename = document.getElementById('filename').value;
        let mainContent = document.getElementById('mainContent').value;

        if (filename !== '') {
            filename = getTempFilename('', '.txt');
        }

        saveToLocalStorage(filename, mainContent);
        downloadFile(filename, mainContent);
        contentChanged(false);
    });
});
