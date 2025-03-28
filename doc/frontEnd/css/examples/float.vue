<template>
    <div id="float">
        <div class="lorem">
            lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores illum accusamus, corporis beatae impedit nesciunt! A facilis natus assumenda totam, nulla eum tempore, deleniti nostrum excepturi consequuntur qui illo debitis!
        </div>
    </div>
</template>
<script setup lang="ts">
</script>
<style scoped>
#float{
    height: 100px;
    width: 100%;
}
.lorem::first-letter{
    text-transform: uppercase;
    font-size: 5em;
    float: left;
    margin: 0;
    margin-top: -20px;
}
</style> 