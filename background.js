// Entry point for Extension, this is called every time an active tab is considered 'loading'
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'loading' && tab.active) {
        body()
    }
})

function body() {
    chrome.tabs.query({ 'active': true },
        function (tabs) {

            // Get Domain List from Extension Options
            chrome.storage.sync.get(
                'domainlist', function (data) {

                    // Split on new-line char to get all separate domains
                    var domainlistArray = data.domainlist.split(/\r?\n/)

                    domainlistArray.forEach(function (currentValue) {
                        // If the active tab's URL contains a domain from the list, then redirect
                        if (tabs[0].url.toString().indexOf(currentValue) > -1) {
                            if (tabs[0].url.toString().indexOf('12ft') == -1) {
                                redirectUrl(tabs, tabs[0].url)
                            }
                        }
                    })
                })
        })
}

function redirectUrl(tabs, oldUrl) {
    chrome.tabs.update(tabs[0].id, { url: 'https://12ft.io/' + oldUrl.toString() })
}