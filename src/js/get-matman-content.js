new Vue({
    el: '#app',
    data: {
        test: '# hello',
        showData: ''
    },
    created() {
        console.log('--created--');
        const self = this;
        chrome.extension.onMessage.addListener(
            function (request, sender, sendResponse) {
                console.log('--onMessage--', request);
                sendResponse({ farewell: 'i got your message, and say goodbye', test: document.title });

                self.showData = JSON.stringify(request);
            });
    }
});