<template>
    <div id="float">
        <input type="checkbox" id="checkbox" v-model="isOverFlow">是否使用 overflow</input>
        <div :class="[isOverFlow ? 'overflow' : '', 'lorem1']">
            <img src="https://picsum.photos/200/300?random=1" alt="Elephant at sunset" />
            lorem ipsum dolorsit amet consectetur adipisicing elit. Maiores illum accusamus, corporis beatae impedit
            nesciunt! A facilis natus assumenda totam, nulla eum tempore, deleniti nostrum excepturi consequuntur qui
            illo debitis!
            lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores illum accusamus, corporis beatae impedit
            nesciunt! A facilis natus assumenda totam, nulla eum tempore, deleniti nostrum excepturi consequuntur qui
            illo debitis!
            lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores illum accusamus, corporis beatae impedit
            nesciunt! A facilis natus assumenda totam, nulla eum tempore, deleniti nostrum excepturi consequuntur qui
            illo debitis!

        </div>
        <div :class="[isOverFlow ? 'overflow' : '', 'lorem2']">
            <img src="https://picsum.photos/200/300?random=1" alt="Elephant at sunset" />
            lorem ipsum dolorsit amet consectetur adipisicing elit. Maiores illum accusamus, corporis beatae impedit
            nesciunt! A facilis natus assumenda totam, nulla eum tempore, deleniti nostrum excepturi consequuntur qui
            illo debitis!
            lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores illum accusamus, corporis beatae impedit
            nesciunt! A facilis natus assumenda totam, nulla eum tempore, deleniti nostrum excepturi consequuntur qui
            illo debitis!
            lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores illum accusamus, corporis beatae impedit
            nesciunt! A facilis natus assumenda totam, nulla eum tempore, deleniti nostrum excepturi consequuntur qui
            illo debitis!

        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const isOverFlow = ref(true)
</script>
<style scoped>
#float {
    height: 700px;
    width: 100%;
    background-color: antiquewhite;
}

.lorem1 {
    background-color: sandybrown;
}

.lorem2 {
    background-color: blue;
}

.overflow {
    overflow: hidden;
}

img {
    border: 2px solid black;
}

:is(.lorem1, .lorem2)>img {
    float: left;
}
</style>