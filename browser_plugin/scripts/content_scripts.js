//  script para criar o botão na barra de pesquisa
//  roda sempre que a URL der "match"

function criar_botao() {
    const button_div = document.querySelector("div[jsname='UdfVXc'")
    let plugin_refine_search_button = document.getElementById('p-search-btn')

    if (button_div && !plugin_refine_search_button) {
        const btn = document.createElement('button')
        btn.id = 'p-search-btn'
        btn.type = 'button'
        btn.title = 'Refine your search'
        
        const imgUrl = chrome.runtime.getURL("icons/icon_32px_placeholder.png");
    
        btn.style.backgroundImage = `url('${imgUrl}')`;

        btn.addEventListener('click', () => {
            alert("Botão com imagem clicado!");
        });

        button_div.appendChild(btn);
    } 
}

criar_botao()
