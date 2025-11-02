<template>
    <div class="zhuifan">
        <a href="zhuifan" target="_self">追番</a>
    </div>
</template>
<script lang="tsx" setup></script>
<style lang="css" scoped>
    .zhuifan {
        height: 100%;
        width: 100%;
        background-image: url('/animes.jpg');
        background-size: cover;
        position: relative;
        animation: imageMove 66s linear infinite;
    }
    a {
        position: absolute;
        right: 30px;
        top: 20px;
        color: rgb(255, 255, 255);
        font-size: 20px;
        font-weight: 600;
    }
    @keyframes imageMove {
        from {
            background-position-y: 0px;
        }
        to {
            background-position-y: -594px;
        }
    }
</style>
