chrome.tabs.onUpdated.addListener((id, change, tab) => {
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, tabs => {
        let url = tabs[0].url;
        if (!url.includes("reddit.com/r/all")) return;


        chrome.tabs.executeScript(
            tabs[0].id,
            { code: `document.open(); document.write('<img src="https://media.giphy.com/media/98C4E2HeR4NBm/giphy.gif"/>'); document.close();` }
        );
    });
});