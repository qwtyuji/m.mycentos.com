<template>
    <div>
        <mt-header fixed :title="catename" class="header">
            <mt-button icon="back" slot="left" @click.native="go">返回</mt-button>
        </mt-header>
        <div class="page-swipe">
            <mt-swipe :auto="4000" class="mint-swipe" :showIndicators="false">
                <mt-swipe-item class="slide1 mint-swipe-item">
                    <img src="../assets/banner.jpg" alt="">
                </mt-swipe-item>
                <mt-swipe-item class="slide2 mint-swipe-item">
                    <img src="../assets/banner1.jpg" alt="">
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
                <div v-for="item in articles">
                    <div class="indexlist">
                        <router-link :to="{ name: 'article', params: { id: item.id }}">
                            <h3>{{item.title}}</h3>
                            <img :src="item.pic" alt="">
                            <p style="text-align: left;">
                                {{item.description}}
                            </p>
                        </router-link>
                    </div>
                </div>
                <div slot="bottom" class="mint-loadmore-bottom">
                    <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
                    <span v-show="bottomStatus === 'loading'">
                                    <mt-spinner type="snake"></mt-spinner>
                                </span>
                </div>
            </mt-loadmore>
        </div>


    </div>

</template>

<script>
    import {getArticleByCategory} from '../api/api';

    export default {
        data () {
            return {
                articles: [],
                catename: this.$route.params.name,
                allLoaded: false,
                bottomStatus: '',
                wrapperHeight: 0
            }
        },
        methods: {

            getArticles(){
                let para = {'category_id': this.$route.params.id}
                getArticleByCategory(para).then((res) => {
                    this.articles = res.data;
                })
            },
            go(){
                history.go(-1)
            },
            handleBottomChange(status) {
                this.bottomStatus = status;
            },
            loadBottom() {
                setTimeout(() => {
                    let lastValue = this.articles.length;
                    if (lastValue < 40) {
                        let para = {'category_id': this.$route.params.id}
                        getArticleByCategory(para).then((res) => {
                            res.data.map((rs) => {
                                this.articles.push(rs);
                            })
                        })
                    } else {
                        this.allLoaded = true;
                    }
                    this.$refs.loadmore.onBottomLoaded();
                }, 1000);
            }
        },
        mounted(){
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        }
    }
</script>
<style scoped>
    img{width: 100%}
    .header { font-size: 16px; font-weight: bold; }
    .page-swipe .mint-swipe { height: 200px; color: #fff; font-size: 30px; text-align: center; margin-bottom: 20px; margin-top: 45px; }
    .page-swipe .mint-swipe-item { line-height: 200px; max-width: 100%; }
    .indexlist a { color: dimgray; text-decoration-line: none; }
    .page-loadmore-wrapper {
        overflow: scroll;
    }
    .mint-loadmore{margin-top: 40px;}
    .mint-loadmore-bottom span {
        display: inline-block;
        transition: .2s linear;
        vertical-align: middle;
    }


</style>
