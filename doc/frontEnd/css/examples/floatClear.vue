<template>
    <div id="float">
        <input type="checkbox" id="checkbox" v-model="isOverFlow">在 span 是否使用 clear</input>
        <input type="checkbox" id="checkbox" v-model="isImgClear">在 img 是否使用 clear</input>
        
        <div class="float" >
            <div class="imgClear">
                <img src="https://picsum.photos/200/300?random=1" alt="Elephant at sunset" />
            </div>
            <div :class="[isImgClear?'test':'','imgClear']">
                <img src="https://picsum.photos/200/300?random=2" alt="Elephant at sunset" />
            </div>
            <div :class="[isOverFlow?'clear':'']">clear</div>
            <div class="imgClear">
                <img src="https://picsum.photos/200/300?random=3" alt="Elephant at sunset" />
            </div>
            <div :class="[isImgClear?'test':'','imgClear']">
                <img src="https://picsum.photos/200/300?random=4" alt="Elephant at sunset" />
            </div>
            <div class="imgClear">
                <img src="https://picsum.photos/200/300?random=5" alt="Elephant at sunset" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {ref} from 'vue'
const isOverFlow = ref(false)
const isImgClear= ref(false)
</script>
<style scoped>
#float{
    height: 650px;
    overflow: visible;
    background-color: antiquewhite;
}
img{
    float: left;
}
.clear{
    clear: both;
}


.test::before{
    content: '.';
    display: block;
    clear: both;
}

</style> 