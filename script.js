/*
const urlCripto ="https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP&tsyms=USD";
const urlPrivat ="https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11";
const calculate = new Vue({
    el: '.main',
    data: {
        value: '',
        coin: '',
        currency: '',
        resultApi: '',
        uahInUsd:'',
        rubInUah:'',
        result: '',
        btc: {
            name: 'BTC',
            usd:this.btcUsd ,
            uah: '',
            rub: '',
        },
        eth: {
            name: 'ETH',
            usd: '',
            uah:'',
            rub: ''
        },
        xrp: {
            name: 'XRP',
            usd: '',
            uah: '',
            rub: ''
        }
    },
    methods: {
        vUah(usd){
            return (this.uahInUsd * usd).toFixed(2);
        },
        vRub(uah){
            return (this.uahInUsd * uah).toFixed(2);
        },
        getCoin(coin){
            this.coin = coin;
        },
        getRub() {
            this.currency = this.coin.rub;
            this.result = this.value + ' ' + this.coin.name + ' will be ' + this.value * this.currency + ' in RUB';
        },
        getUsd() {
            this.currency = this.coin;
            this.result = this.value + ' ' + this.coin.name + ' will be ' + this.value * this.currency + ' in USD';
        },
        getUah() {
            this.currency = this.coin.uah;
            this.result = this.value + ' ' + this.coin.name + ' will be ' + this.value * this.currency + ' in UAH';
        },
    },
    computed:{
        btcUsd(){
            return this.result
        }
    },
    mounted() {
        axios
            .get(urlCripto).then(response => {
            this.resultApi = response.data })
        axios
            .get(urlPrivat).then(response => {
            this.uahInUsd = response.data[0].buy  })
         axios
            .get(urlPrivat)
            .then(response => (this.rubInUah = response.data[2].buy))
    }
});

*/

//в компютед ми передаємо значення в валюти кріпти
//блок кнопки

const urlCripto = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP&tsyms=USD";
const urlPrivat = "https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11";
const calculate = new Vue({
    el: '.main',
    data: {
        value: null,
        coin: '',
        currency: null,
        resultApi: null,
        result: null,
        btc: {
            name: 'BTC',
            usd: null,
            uah: null,
            rub: null
        },
        eth: {
            name: 'ETH',
            usd: null,
            uah: null,
            rub: null
        },
        xrp: {
            name: 'XRP',
            usd: null,
            uah: null,
            rub: null
        },
        nameCurrency: null,
        namesCurrency: {
            usd: 'USD',
            uah: 'UAH',
            rub: 'RUB'
        }
    },
    methods: {
        getCoin(coin) {
            this.coin = coin;
        },
        getCurrency(nameCurrency, valueCurrency) {
            this.currency = valueCurrency;
            this.nameCurrency = nameCurrency;
        },
    },
    computed: {
        getResult() {
            return this.value + ' ' + this.coin.name + ' will be ' + (this.currency * this.value).toFixed(2) + ' in ' + this.nameCurrency;
        },
    },
    mounted() {
        axios
            .get(urlCripto)
            .then(response => {
                this.resultApi = response.data;
                this.btc.usd = response.data.BTC.USD;
                this.eth.usd = response.data.ETH.USD;
                this.xrp.usd = response.data.XRP.USD;
            });
        axios
            .get(urlPrivat).then(response => {
            this.btc.uah = (this.btc.usd * response.data[0].buy).toFixed(2);
            this.eth.uah = (this.eth.usd * response.data[0].buy).toFixed(2);
            this.xrp.uah = (this.xrp.usd * response.data[0].buy).toFixed(2);
            this.btc.rub = (this.btc.uah * response.data[2].buy).toFixed(2);
            this.eth.rub = (this.eth.uah * response.data[2].buy).toFixed(2);
            this.xrp.rub = (this.xrp.uah * response.data[2].buy).toFixed(2);
        });
    }
});
//loading api and error

