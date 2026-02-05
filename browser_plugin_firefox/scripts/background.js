chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const targetUrl = request.url;

    if (!targetUrl) {
        console.error("Nenhuma URL fornecida na mensagem.");
        return;
    }

    if (request.action === "update_tab") {
        chrome.tabs.update(sender.tab.id, { url: targetUrl });
    } 
    else if (request.action === "create_tab") {
        chrome.tabs.create({ url: targetUrl });
    }

    sendResponse({ status: "ok" });

    return true; 
});