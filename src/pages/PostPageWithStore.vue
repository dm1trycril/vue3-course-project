<template>
    <div>
        <!-- <h1>{{ $store.state.isAuth ? "Пользователь авторизован" : "Авторизуйтесь"}}</h1>
        <h1><strong>Likes: </strong> {{ $store.getters.doubleLikes }}</h1>
        <div>
            <my-button @click="$store.commit('incrementLikes')">Increment likes</my-button>
            <my-button @click="$store.commit('dicrementLikes')">Dicrement likes</my-button>
        </div> -->
        <h1>Страница с постами</h1>
        <my-input 
            :value="searchQuery"
            @update:value="setSearchQuery"
            v-focus 
            placeholder="Поиск..." 
        />
        <div class="app__btns">
            <my-button 
                @click="showDialog" 
                class="create-button">
                Создать пост
            </my-button>
            <my-select 
                :modelValue="selectedSort" 
                @update:modelValue="setSelectedSort"
                :options="sortOptions" 
            />
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost" />
        </my-dialog>
        <post-list 
            :posts="sortedAndSearchedPosts" 
            @remove="removePost"
            v-if="!isPostsLoading" 
        />
        <div v-else>Идёт загрузка</div>
        <div v-intersection="loadMorePosts" class="observer">

        </div>
    </div>
</template>
<script>

import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";

import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
    components: {
        PostForm,
        PostList,
    },
    data() {
        return {
            dialogVisible: false,
        }
    },
    methods: {
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort',
        }),
        ...mapActions({
            loadMorePosts: 'post/loadMorePosts',
        }),

        createPost(post) {
            this.posts.push(post);
            this.dialogVisible = false;
        },
        removePost(post_id) {
            this.posts = this.posts.filter(p => p.id !== post_id);
        },
        showDialog() {
            this.dialogVisible = true;
        },
    },
    mounted() {

    },

    computed: {
        ...mapState({
            posts: state => state.post.posts,
            isPostsLoading: state => state.post.isPostsLoading,
            selectedSort: state => state.post.selectedSort,
            searchQuery: state => state.post.searchQuery,
            page: state => state.post.page,
            limit: state => state.post.limit,
            totalPages: state => state.post.totalPages,
            sortOptions: state => state.post.sortOptions
        }),
        ...mapGetters({
            sortedPosts: 'post/sortedPosts',
            sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
        }),
    },

    watch: {

    }

}
</script>
<style>
.app__btns {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
}

.page__wrapper {
    display: flex;
    margin-top: 15px;
}

.page {
    border: 1px solid black;
    padding: 10px;
}

.current-page {
    border: 2px solid teal;
}
</style>