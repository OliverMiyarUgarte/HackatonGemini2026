//  modulo para refinar a pesquisa passada
//  retorna a entrada caso ocorra algum erro com o servidor
async function refine_query(user_search) {
    //  enviar para o backend
    console.log('refining search')
    
    const refined_search = await call_back_end(user_search)
    
    return refined_search ?? user_search
}

//  manda um request para o backend otimizar a pesquisa do usuário e 
//  retorna a pesquisa otimizada
async function call_back_end(user_search) {
    //const server_endpoint = "http://localhost:3000/api/optimize"
    const server_endpoint = "https://backend-hackathon-phi.vercel.app/api/optimize"
    
    try {
        const response = 
            await fetch(server_endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: user_search
            })
        })

        if (!response.ok) {
            console.log('cannot connect to server')
            return undefined
        }
        else {
            const data = await response.json()
            return data.result
        }
    }
    catch {
        return undefined
    }
}