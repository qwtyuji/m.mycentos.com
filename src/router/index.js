import Vue from "vue";
import Router from "vue-router";
import Index from "@/components/Index";
import Category from "@/components/Category";
import Article from "@/components/Article";

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/category/:id/:name',
            name: 'category',
            component: Category
        },
        {
            path: '/article/:id',
            name: 'article',
            component: Article
        },
        {
            path: '/',
            name: 'index',
            component: Index
        }
    ]
})
