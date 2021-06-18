const vm = Vue.createApp({
  data: () => {
    return {
      keyword:'',
      tags: [],
      hasTag:false,
      history:[]
    }
  },
  methods: {
    getData(key){
      const apiUrl = `http://suggestqueries.google.com/complete/search?output=firefox&q=${key}&hl=zh-tw&gl=tw`;
      if(key == undefined){
        alert('要輸入關鍵字喔')
        return;
      }
      if(key === this.history[this.history.length-1]){
        alert("")
        return;
      }
      axios({
        method:'get',
        url:apiUrl,
      })
      .then((res)=> {
        this.tags = res.data[1]
        this.hasTag = true
        this.history.push(key)
      })
      .catch((error)=> {
        console.log('取得資料失敗:' + error);
        alert("請輸入關鍵字")
      })
    },
    clear(){
      this.history = []
      this.tags = []
      this.hasTag = false
      this.keyword = ''
    }
  },
});


vm.mount('#app');
