// Copyright (c) 2023 YA-androidapp(https://github.com/yzkn) All rights reserved.





window.addEventListener('DOMContentLoaded', _ => {
    let sidemenuStatus = true;
    document.getElementById('toggle').addEventListener('click', () => {
        if (sidemenuStatus) {
            document.getElementsByTagName('main')[0].style.cssText = 'margin-left: -320px'
            sidemenuStatus = false;
        } else {
            document.getElementsByTagName('main')[0].style.cssText = 'margin-left: 0px'
            sidemenuStatus = true;
        }
    })

    // document.getElementById('open').addEventListener('click', (event) => {
    // });
});
