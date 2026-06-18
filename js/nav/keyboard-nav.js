// keyboard-nav.js
import { letterNav } from "./letter-nav.js"
const navState = {
    zone : null,
    iseEnabled : false
}
export function keyboardNav({e}){
    if (e.key === 'x' && e.shiftKey && e.metaKey) {
        navState.isLetterNavEnabled = !navState.isLetterNavEnabled
        popupLetterNav.innerText = `letter navigation : ${navState.isLetterNavEnabled}`
        popupLetterNav.classList.add('animate')
        document.querySelector('.page-wrapper').classList.toggle('nav-mode-colors')
        setTimeout(() => {
            popupLetterNav.classList.remove('animate')
        }, 1000);

        return
    }
    // FOR NOW Keep here
    letterNav({e})
}