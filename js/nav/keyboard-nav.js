// keyboard-nav.js
import { letterNav } from "./letter-nav.js"
const navState = {
    zone : null,
    isEnabled : false
}
export function keyboardNav({e}){
    navState.zone = routeKey({e})
    console.log(navState)
    if (e.key === 'x' && e.shiftKey && e.metaKey) {
        navState.isEnabled = !navState.isEnabled
        popupLetterNav.innerText = `letter navigation : ${navState.isEnabled}`
        popupLetterNav.classList.add('animate')
        document.querySelector('.page-wrapper').classList.toggle('nav-mode-colors')
        setTimeout(() => {
            popupLetterNav.classList.remove('animate')
        }, 1000);
        
        return
    }
    if(navState.isEnabled){
        letterNav({e})
       
    }
    
}
function routeKey({e}){
    if(e.target.closest('.side-bar')){
        return 'sidebar'
    }
    if(e.target.closest('.main-content')){
        return 'main-content'
    }
}
