<template>
    <div class="ViewBook">
        <div class="books"></div>
        <div class="arrow">
            <div class="arrow-button"></div>
            <div class="arrow-right"></div>
        </div>
        <a href="/viewBook" target="_self">图书</a>
    </div>
</template>
<script lang="tsx" setup></script>
<style lang="css" scoped>
    .ViewBook {
        position: relative;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
    .books {
        height: 100%;
        width: 120px;
        background-image: url('Book.png');
        background-repeat: no-repeat;
        background-size: cover;
    }
    .arrow {
        display: flex;
        flex-direction: row;
        animation: sc 3s linear infinite;
        align-self: center;
    }
    .arrow-button {
        width: 60px;
        height: 10px;
        background-color: wheat;
        align-self: center;
    }
    .arrow-right {
        width: 0;
        height: 0;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-left: 15px solid wheat;
    }

    a {
        align-self: center;
        font-size: 20px;
        font-weight: 600;
    }
    @keyframes sc {
        from {
            transform: scale(1);
        }
        50% {
            transform: scale(1.3);
        }
        to {
            transform: scale(1);
        }
    }
</style>
