function changeAttribute(img, reg, attributeName, newPath) {
    const attribute = img.getAttribute(attributeName);
    if (attribute) {
        img.setAttribute(attributeName, attribute.replace(reg, newPath));
    }
}

function changeImgDom(img, theme) {
    img.title = 'logo';
    img.alt = 'logo';
    if (theme === 'dark') {
        const reg = /\/avatar.png/g;
        changeAttribute(img, reg, 'src', '/avatar_dark.png');
        changeAttribute(img, reg, 'data-src', '/avatar_dark.png');
        changeAttribute(img, reg, 'data-srcset', '/avatar_dark.png');
        changeAttribute(img, reg, 'srcset', '/avatar_dark.png');
    }
    else {
        const reg = /\/avatar_dark.png/g;
        changeAttribute(img, reg, 'src', '/avatar.png');
        changeAttribute(img, reg, 'data-src', '/avatar.png');
        changeAttribute(img, reg, 'data-srcset', '/avatar.png');
        changeAttribute(img, reg, 'srcset', '/avatar.png');
    }
}

function loadTheme() {
    if (window.localStorage) {
        const theme = localStorage.getItem('theme');
        if (document.getElementsByClassName('home-avatar').length > 0) {
            const imgs = document.getElementsByClassName('home-avatar')[0].getElementsByTagName('img');
            if (imgs.length > 0) {
                changeImgDom(imgs[0], theme);
            }
        }

        if (document.getElementsByClassName('header-title').length > 0) {
            const imgs = document.getElementsByClassName('header-title')[0].getElementsByTagName('img');
            if (imgs.length > 0) {
                changeImgDom(imgs[0], theme);
            }
        }
    }
}

(function () {
    console.log('欢迎来到 free 笔记');

    const orignalSetItem = localStorage.setItem;
    localStorage.setItem = function (key) {
        var setItemEvent = new Event("setItemEvent");
        setItemEvent.key = key;
        window.dispatchEvent(setItemEvent);
        orignalSetItem.apply(this, arguments);
    };

    window.addEventListener("setItemEvent", function (e) {
        if (e.key == 'theme') {
            setTimeout(() => { loadTheme(); }, 0);
        }
    });

    setTimeout(() => { loadTheme(); }, 0);
})();