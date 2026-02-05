//  script para criar o botão na barra de pesquisa
//  roda sempre que a URL der "match"

function criar_botao() {
    const reference_el = document.querySelector("div[jsname='UdfVXc'")
    let plugin_refine_search_button = document.getElementById('p-search-btn')

    if (reference_el && !plugin_refine_search_button) {
        const btn = document.createElement('button')
        btn.id = 'p-search-btn'
        btn.type = 'button'
        btn.title = 'Refine your search'
        
        const imgUrl = chrome.runtime.getURL("icons/icon-32.svg")
    
        btn.style.backgroundImage = `url('${imgUrl}')`;

        btn.addEventListener('click', on_click)

        reference_el.after(btn);
    } 
}

criar_botao()

async function on_click(event) {
    event.preventDefault()
    event.stopPropagation()

    const search_bar = get_textarea()
    const user_query = get_textarea_content(search_bar)
    let refined_query = ""

    reset_textarea_content(search_bar)

    refined_query = await refine_query(user_query)

    update_tab(refined_query)
}

function get_textarea() {
    return document.querySelector('textarea[name="q"]') || document.querySelector('input[name="q"]');
}

function get_textarea_content(textarea) {
    return textarea.value
}

function reset_textarea_content(textarea) {
    textarea.value = ""
}

function update_tab(refined_search) {
    const url = `https://www.google.com/search?q=${encodeURIComponent(refined_search)}`

    chrome.runtime.sendMessage({
        action: "update_tab",
        url: url
    });
}
