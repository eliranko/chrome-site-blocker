const ul = document.getElementById("sites");
refreshSites();

function refreshSites() {
    ul.innerHTML = "";
    chrome.storage.sync.get('sites', function (data) {
        for (let site of data.sites) {
            var li = document.createElement("LI");
            li.appendChild(document.createTextNode(site));

            ul.appendChild(li);
        }
    });
}

const aAdd = document.getElementById("add-site");
aAdd.addEventListener('click', () => {
    const siteName = document.getElementById("site-name").value;
    if (siteName == '') return;

    chrome.storage.sync.get('sites', function (data) {
        chrome.storage.sync.set({ sites: [...data.sites, siteName] });
        refreshSites();
    });
});

const aRemove = document.getElementById("remove-site");
aRemove.addEventListener('click', () => {
    const location = parseInt(document.getElementById("location").value);

    chrome.storage.sync.get('sites', function (data) {
        if (location >= data.sites.length) return;

        data.sites.splice(location);
        chrome.storage.sync.set({ sites: [...data.sites] });
        refreshSites();
    });
});