function loadTheme() {
    if (window.localStorage) {
        const theme = localStorage.getItem('theme');
        if (document.getElementsByClassName('home-avatar').length > 0) {
            const imgs = document.getElementsByClassName('home-avatar')[0].getElementsByTagName('img');
            if (imgs.length > 0) {
                imgs[0].title = 'logo';
                imgs[0].alt = 'logo';
                if (theme === 'dark') {
                    const reg = /\/avatar.png/g;
                    imgs[0].setAttribute('src', imgs[0].getAttribute('src').replace(reg, '/avatar_dark.png'));
                    imgs[0].setAttribute('data-src', imgs[0].getAttribute('data-src').replace(reg, '/avatar_dark.png'));
                    imgs[0].setAttribute('data-srcset', imgs[0].getAttribute('data-srcset').replace(reg, '/avatar_dark.png'));
                    imgs[0].setAttribute('srcset', imgs[0].getAttribute('srcset').replace(reg, '/avatar_dark.png'));
                }
                else {
                    const reg = /\/avatar_dark.png/g;
                    imgs[0].setAttribute('src', imgs[0].getAttribute('src').replace(reg, '/avatar.png'));
                    imgs[0].setAttribute('data-src', imgs[0].getAttribute('data-src').replace(reg, '/avatar.png'));
                    imgs[0].setAttribute('data-srcset', imgs[0].getAttribute('data-srcset').replace(reg, '/avatar.png'));
                    imgs[0].setAttribute('srcset', imgs[0].getAttribute('srcset').replace(reg, '/avatar.png'));
                }
            }
        }

        if (document.getElementsByClassName('header-title').length > 0) {
            const imgs = document.getElementsByClassName('header-title')[0].getElementsByTagName('img');
            if (imgs.length > 0) {
                imgs[0].title = 'logo';
                imgs[0].alt = 'logo';
                if (theme === 'dark') {
                    const reg = /\/avatar.png/g;
                    imgs[0].setAttribute('src', imgs[0].getAttribute('src').replace(reg, '/avatar_dark.png'));
                    imgs[0].setAttribute('data-src', imgs[0].getAttribute('data-src').replace(reg, '/avatar_dark.png'));
                    imgs[0].setAttribute('data-srcset', imgs[0].getAttribute('data-srcset').replace(reg, '/avatar_dark.png'));
                    imgs[0].setAttribute('srcset', imgs[0].getAttribute('srcset').replace(reg, '/avatar_dark.png'));
                }
                else {
                    const reg = /\/avatar_dark.png/g;
                    imgs[0].setAttribute('src', imgs[0].getAttribute('src').replace(reg, '/avatar.png'));
                    imgs[0].setAttribute('data-src', imgs[0].getAttribute('data-src').replace(reg, '/avatar.png'));
                    imgs[0].setAttribute('data-srcset', imgs[0].getAttribute('data-srcset').replace(reg, '/avatar.png'));
                    imgs[0].setAttribute('srcset', imgs[0].getAttribute('srcset').replace(reg, '/avatar.png'));
                }
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