<template>
    <div class="AdminInfo">
        <div class="info1">
            <SteamInfo />
        </div>
        <div class="info2">
            <ZhuiFanImg />
        </div>
        <div class="info3"></div>
        <div class="info4"></div>
    </div>
</template>
<script lang="tsx" setup>
    import SteamInfo from './SteamInfo.vue'
    import ZhuiFanImg from './ZhuiFanImg.vue'
</script>
<style lang="css" scoped>
    .AdminInfo {
        height: 100%;
        width: 500px;
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: 100px 130px repeat(4, 1fr);
        gap: 10px;
        justify-content: stretch;
        align-items: stretch;
    }
    .AdminInfo > div {
        border: 2px rgb(47, 44, 44);
        border-style: solid;
    }
    .info1 {
        grid-area: 1/1/3/5;
    }
    .info2 {
        grid-area: 1/5/5/7;
    }
    .info3 {
        grid-area: 3/1/5/5;
    }
    .info4 {
        grid-column: 1 /7;
        grid-row: 5/7;
    }
</style>
