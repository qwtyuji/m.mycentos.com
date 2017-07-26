<template>

    <div>
        <mt-header fixed :title="article.title" class="header">
            <mt-button icon="back" @click.native="go" slot="left">返回</mt-button>
        </mt-header>
        <article>
        <h1>{{ article.title }}</h1>
        <div class="article" v-html="article.content">
            <img :src="article.pic" alt="">
        </div>
        </article>

    </div>
</template>

<script>
    import {getArticleById} from '../api/api';
    export default {
        data () {
            return {
                article: [],
            }
        },
        methods: {
            getArticle(){
                let para = {'id': this.$route.params.id};
                getArticleById(para).then((res) => {
                    console.log(res.data);
                    this.article = res.data;
                })
            },
            go(){
                history.go(-1)
            }
        },
        mounted(){
            this.getArticle();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .header {
        font-size: 16px;
        font-weight: bold;
    }
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }
    img{
        width: 100%;
    }
    .header{font-size: 16px;}
    article{
        margin-top: 40px;
    }


</style>
