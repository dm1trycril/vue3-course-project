import { computed, ref } from "vue";

export function useSortedPosts(posts) {
    const selectedSort = ref('')
    const sortedPosts = computed(() => {
        return [...posts.value].sort((post1, post2) =>
            String(post1[selectedSort.value]).localeCompare(
                String(post2[selectedSort.value]),
                undefined,
                { numeric: true }
            )
        );
    })
    return {
        selectedSort,
        sortedPosts
    }
};