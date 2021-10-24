// Saves options to chrome.storage
function save_options() {
    var domainlist = document.getElementById('domainlist').value
    chrome.storage.sync.set({
        domainlist: domainlist
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

// Restores state of options stored in chrome.storage
function restore_options() {
    chrome.storage.sync.get(
        'domainlist', function (data) {
            document.getElementById('domainlist').value = data.domainlist;
        });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);