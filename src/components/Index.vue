<template>
    <div>
        <mt-header fixed title="mycentos blog" class="header"></mt-header>
        <div class="page-swipe">
            <mt-swipe :auto="4000" class="mint-swipe">
                <mt-swipe-item class="slide1 mint-swipe-item">
                    <img src="../assets/banner.jpg" alt="">
                </mt-swipe-item>
                <mt-swipe-item class="slide2 mint-swipe-item">
                    <img src="../assets/banner1.jpg" alt="">
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="main">
            <mt-tab-container v-model="selectCate">
                <mt-tab-container-item id="1">
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

                </mt-tab-container-item>
                <mt-tab-container-item id="2" style="text-align: center">
                    <mt-cell v-for="cate in category" :title="cate.name" :to="{ name: 'category',params: { id: cate.id,name:cate.name } }" is-link>
                    </mt-cell>
                </mt-tab-container-item>
                <mt-tab-container-item id="3" style="text-align: center">
                    <div>
                        <h2>我的资料</h2>
                    </div>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
        <mt-tabbar v-model="selectCate" fixed>
            <mt-tab-item id="1" class="tab-button">
                <h3>内容</h3>
            </mt-tab-item>
            <mt-tab-item id="2" class="tab-button">
                <h3>分类</h3>
            </mt-tab-item>
            <mt-tab-item id="3" class="tab-button">
                <h3>我的</h3>
            </mt-tab-item>
        </mt-tabbar>
    </div>

</template>

<script>
    import {getCategory, getArticle} from '../api/api';

    export default {
        data () {
            return {
                selectCate: '1',
                category: [],
                articles: [],
                allLoaded: false,
                bottomStatus: '',
                wrapperHeight: 0

            }
        },
        methods: {

            getCategories(){
                getCategory().then((res) => {
                    this.category = res.data;
                })
            },
            getArticles(){
                getArticle().then((res) => {
                    this.articles = res.data;
                })
            },
            handleBottomChange(status) {
                this.bottomStatus = status;
            },
            loadBottom() {
                setTimeout(() => {
                    let lastValue = this.articles.length;
                    console.log(lastValue)
                    if (lastValue < 40) {
                        getArticle().then((res) => {
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
            this.getCategories();
            this.getArticles();
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        }
    }
</script>
<style scoped>
    .header {
        font-size: 18px;
    }

    .page-swipe .mint-swipe {
        height: 200px;
        color: #fff;
        font-size: 30px;
        text-align: center;
        margin-bottom: 20px;
        margin-top: 45px;
    }

    .page-swipe .mint-swipe-item {
        line-height: 200px;
        max-width: 100%;
    }

    .mint-swipe-item img {
        width: 100%;
    }

    .indexlist a {
        color: dimgray;
        text-decoration-line: none;
    }

    .indexlist img {
        width: 100%;
    }

    .main { padding-bottom: 40px; }

    .page-loadmore-wrapper {
        overflow: scroll;
    }

    .mint-loadmore-bottom span {
        display: inline-block;
        transition: .2s linear;
        vertical-align: middle;
    }

</style>
