var app = new Vue({
    el: '#app',
    data: {
        test: '# hello',
        showData: '',
        tips: 'init tips',
        selectorList: [],
        infoList: [],
        selectedSelector: '',
        parentSelector: 'none',
        detailItem: {}
    },
    computed: {
        hasParentSelector: function () {
            return this.parentSelector !== 'none';
        },
        parentSelectorList: function () {
            let arr = this.selectedSelector.split(/\s+/);
            let list = [];
            let tmp = '';

            arr.forEach((item) => {
                tmp = (tmp + ' ' + item).trim();
                list.push({
                    value: tmp,
                    title: tmp
                });
            });

            // 追加一个默认的在列表头部
            list.unshift({
                value: 'none',
                title: '无'
            });

            // 要剔除自己
            list.pop();

            return list;
        },
        selectedSelectorDisplay: function () {
            if (this.parentSelector === 'none') {
                return this.selectedSelector;
            } else {
                return this.selectedSelector.replace(new RegExp(this.parentSelector), '').trim();
            }
        }
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

        showDetail: function (item, index) {
            console.log('--showDetail--', item, index);
            this.detailItem = item;

            // 展示模态框
            $('#detail_modal').modal();
        }
    },
    created() {
        // 监听来自 content script 的消息，并处理回调
        gUtils.listenMsgFromContentScript((message) => {
            this.showData = JSON.stringify(message);
            this.selectorList = message.data.selectorList;
            this.selectedSelector = message.data.selectorList[0] || '';
            this.infoList = message.data.infoList;
        });

    }
});