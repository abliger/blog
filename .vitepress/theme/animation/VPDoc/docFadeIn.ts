
import { nextTick, onMounted, watch } from 'vue'
import './fadeIn.css'
import { useRoute } from 'vitepress';

export function useFadeInByRoute(docClass: string) {
    const route = useRoute();
    onMounted(() => {
        watch(() => route.path, async () => {
            const main = document.getElementsByClassName(docClass)[0]
            main.classList.remove('fadeInContent')
            await nextTick()
            main.classList.add('fadeInContent')
        })
    })
}