console.log('iniciando')

//  Init script when document fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('primeira fn')

    const forms = document.getElementById('search')
    const enhance_button = null
    
    forms.addEventListener('submit', on_search) 
    enhance_button.addEventListener('click', on_refine_button)

    async function on_search(event) {
        event.preventDefault()
        let user_search = document.getElementById('search-bar').value  
        document.getElementById("search-bar").value = "" 

        let refined_query = await refine_query(user_search)
        open_search_tab(refined_query)
    }

    function open_search_tab(query) {
        const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`

        chrome.runtime.sendMessage({
            action: "create_tab",
            url: url
        });
    }    
    // function open_search_tab(query) {
    //     const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`
    //     chrome.tabs.create({url: url})
    //     console.log('nova página aberta')
    // }
})

