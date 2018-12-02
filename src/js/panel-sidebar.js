var app = new Vue({
    el: '#app',
    data: {
        test: '# hello',
        showData: '',
        tips: 'init tips',
        selectorList: [],
        infoList: []
    },
    methods: {
        handleClick: function (event) {
            this.tips = 'loading...';

            // 发送消息给 content script，并处理回调
            gUtils.sendMsgToContentScript({
                type: 'GET_NEW_TIPS'
            }, (response) => {
                this.tips = response;
            });
        },

        showDetail: function () {
            $('#detail_modal').modal();
        }
    },
    created() {
        // 监听来自 content script 的消息，并处理回调
        gUtils.listenMsgFromContentScript((message) => {
            this.showData = JSON.stringify(message);
            // this.selectorList = message.data.selectorList;
            this.infoList = message.data.infoList;
        });

    }
});