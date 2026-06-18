// app.js
import { buildSidebar } from "./core/build-sidebar.js"
import { initInjectContentListeners, injectPage } from "./core/inject-content.js"


// import { initDarkMode } from "./dark-mode.js"
import { keyboardNav } from "./nav/keyboard-nav.js"
// import { initToggleSideBar } from "./ui/toggle-sidebar.js"
// import { initCopyCodes } from "./copy-code.js"

document.addEventListener("DOMContentLoaded", initApp)
async function initApp() {

    // Build sidebar first
    await buildSidebar()

    // Sidebar navigation
    injectPage()
    initInjectContentListeners()
    setupGlobalListeners()
    // UI features
    // initToggleSideBar()
    // initDarkMode()
    // initCopyCodes()

    // global keyboard nav
    // setupGlobalListeners()

}

function setupGlobalListeners() {
    document.addEventListener("keydown", e => {
        const tag = e.target.tagName.toLowerCase()
        if(tag === 'input' || tag === 'textarea') return
        keyboardNav({e})
    })
}