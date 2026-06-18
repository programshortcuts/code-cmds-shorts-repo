// letter-nav.js
// BEST simple letter-focus Thus Far, (( put in boiler plate))
export function letterNav({e}){
    const key = e.key.toLowerCase();
    // console.log('dkfhs')
    // only react to single alphanumeric keys
    if (key.length !== 1 || !/^[a-z0-9]$/.test(key)) return;

    // const allAs = [...document.querySelectorAll('[data-nav-target],.sub-resources-container a')].filter(el => {
    //     const rect = el.getBoundingClientRect();
    //     return el.offsetParent !== null && rect.width > 0 && rect.height > 0;
    // });
    const allAs = [...document.querySelectorAll(
        '.side-bar-topics a'
    )].filter(el => {
        const rect = el.getBoundingClientRect();
        return el.offsetParent !== null && rect.width > 0 && rect.height > 0;
    });

    // filter elements whose id starts with the key
    const letteredAs = allAs.filter(el => el.id.toLowerCase().startsWith(key));
    if (letteredAs.length === 0) return;

    const activeEl = document.activeElement;
    const iActiveEl = allAs.indexOf(activeEl);

    let target;
    if (e.shiftKey) {
        // console.log("here"); // debugging
        // go backwards: find the last match before the active element
        target = [...letteredAs].reverse().find(a => allAs.indexOf(a) < iActiveEl)
            || letteredAs[letteredAs.length - 1];
    } else {
        // go forwards: find the first match after the active element
        target = letteredAs.find(a => allAs.indexOf(a) > iActiveEl)
            || letteredAs[0];
    }

    target?.focus();
    window.lastLetterPressed = key;

}
