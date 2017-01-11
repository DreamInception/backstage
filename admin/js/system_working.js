$(function () {
    var app = new Vue({
        el: '#app',
        data:{
            cur: 1,
            all:20,
            total_count:100
        },
        components:{
            'vue-nav': Vnav
        },
        methods:{
            listens:function(data){
                this.cur=data;
                this.page=this.cur;
                // console.log(app.page);
            }
        }
    });
})
