console.log('iniciando')
//  Init script when document fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('primeira fn')
    const server_addr = ""

    const forms = document.getElementById('search')
    const enhance_button = null
    
    forms.addEventListener('submit', on_search) 
    enhance_button.addEventListener('click', on_refine_button)

    async function on_search(event) {
        event.preventDefault()
        let user_search = document.getElementById('search-bar').value  
        document.getElementById("search-bar").value = "" 
        let query = await refine_search(user_search)
        open_search_tab(query)
    }

    async function on_refine_button(event) {
        let user_search = ""
        let refined_search = refine_search(user_search)
        open_search_tab(query)
    }

    function refine_search(user_search) {
        //  enviar para o backend
        console.log('refining search')
        return user_search
    }

    function open_search_tab(query) {
        const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`
        chrome.tabs.create({url: url})
        console.log('nova página aberta')
    }
})

