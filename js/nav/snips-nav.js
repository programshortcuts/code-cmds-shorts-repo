function updateSnips(){
    return document.querySelectorAll('.snip')
}
export function initSnipNav(){
    const snips = updateSnips()
    console.log('here')
    snips.forEach(el => {
        el.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase()
            if(key === 'enter'){
                const copyCode = el.querySelector('.copy-code')
                copyCode.focus()
            }
        });
    })

}