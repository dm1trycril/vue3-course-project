<template>
    <form @submit.prevent>
        <h4>Создание поста</h4>
        <my-input 
            v-model:value.trim="post.title"
            v-focus
            type="text" 
            placeholder="Название"
        />
        <my-input 
            v-model:value.trim="post.body"
            type="text" 
            placeholder="Описание"
        />
        <my-button 
            @click="createPost" 
        >
            Создать
        </my-button>
    </form>
</template>
<script>

export default {
    data() {
        return {
            post: {
                title: '',
                body: ''
            }
        }
    },
    methods: {
        createPost() {
            this.post.id = Date.now();
            this.$emit('create', this.post);
            this.post = {
                title: '',
                body: ''
            }
        }
    }
}
</script>
<style>
form {
    display: flex;
    flex-direction: column;
}
</style>