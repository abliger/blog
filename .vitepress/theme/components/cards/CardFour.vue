<template>
    <div class="card4">
        <div class="g-container">
            <svg
                class="g-svg"
                width="400"
                height="160"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    id="svgPath"
                    d="M 350 140 C 1200 1000, -550 1000, 350 1960"
                    stroke="black"
                    fill="transparent"
                />
            </svg>
            <div class="ball" />
            <div class="point point1" />
            <div class="point point2" />
            <div class="point point3" />
            <h2>去过的地方</h2>
            <p class="p1">
                CSS Scroll Driven refers to a technique where CSS is used to
                create visual effects or animations that are triggered by the
                scrolling behavior of the user. It involves manipulating CSS
                properties based on the scroll position to create dynamic and
                interactive elements on a webpage.
            </p>
            <p class="p2">
                1. Parallax scrolling: By adjusting background positions or
                opacity based on the scroll position.<br />
                2.Sticky navigation: The navigation bar can have its style
                modified as the user scrolls, such as changing its background
                color, size, or position to enhance usability and improve the
                user experience.
            </p>
            <p class="p3">
                In summary, CSS Scroll Driven involves using CSS and JavaScript
                to create effects and animations that respond to the user's
                scrolling behavior. This technique adds interactivity and visual
                appeal to webpages, making them more engaging for users.
            </p>
            <div class="clear" />
        </div>
        <div class="blur">
            <div class="blur-after" />
            <div class="blur-after" />
            <div class="blur-after" />
            <div class="blur-after" />
            <div class="blur-after" />
            <div class="blur-after" />
        </div>

        <!-- 使用 svg -->
        <!-- <p>鲁东大学</p>
        <mark-img src="/ludong.jpg" v-show="endAnim" />
        <p>上海</p>
        <div><img src="/allPeople.jpeg" alt="allPeople" /></div> -->
    </div>
</template>
<script setup lang="tsx">
    // import { inject } from 'vue'
    // import { MarkImg } from 'style-vue'
    // const endAnim = inject('endAnim')
</script>
<style lang="css" scoped>
    .card4 {
        position: relative;
        width: 100%;
        height: 2000px;

        background: linear-gradient(rgb(28, 28, 32), purple 80%, #fff);
        --rang1: 50%;
        --rang2: 60%;
        --rang3: 70%;
        --rang4: 80%;
    }

    .blur {
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 999;
        background: linear-gradient(transparent, #f2e2e2, #fff);

        .blur-after {
            height: 60px;
        }

        .blur-after:nth-child(1) {
            backdrop-filter: blur(1px);
        }

        .blur-after:nth-child(2) {
            backdrop-filter: blur(2px);
        }

        .blur-after:nth-child(3) {
            backdrop-filter: blur(3px);
        }

        .blur-after:nth-child(4) {
            backdrop-filter: blur(4px);
        }

        .blur-after:nth-child(5) {
            backdrop-filter: blur(5px);
        }

        .blur-after:nth-child(6) {
            backdrop-filter: blur(6px);
        }
    }

    .g-svg {
        position: absolute;
        top: 0;
        left: 50%;
        width: 700px;
        height: 2000px;
        transform: translate(-50%, 0);
    }

    .g-container {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, 0);
        width: 700px;
        height: 2000px;
    }

    .ball {
        position: absolute;
        width: 40px;
        height: 40px;
        clip-path: polygon(0 0, 100% 50%, 0 100%);
        offset-path: path('M 350 140 C 1200 1000, -550 1000, 350 1960');
        background: linear-gradient(270deg, #673ab7, #ff5722);
        animation: move 1s linear;
        animation-timeline: scroll(root);
        z-index: 10;
    }

    #svgPath {
        stroke-dasharray: 2100, 2100;
        animation: lineMove 3s linear;
        animation-timeline: scroll(root);
        stroke-width: 2px;
        stroke: #ff5722;
    }

    .point {
        position: absolute;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #ff5722;
        opacity: 0;
        animation: show 1s linear forwards;
        animation-delay: 1s;
        animation-timeline: scroll(root);

        &::before,
        &::after {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            animation: circleScale 2s infinite ease-in;
            animation-delay: 1s;
            z-index: -1;
        }

        &::after {
            animation-delay: -0.5s;
        }
    }

    .point1 {
        top: 510px;
        left: 565px;
        animation-range: var(--rang1) var(--rang2);
    }

    .point2 {
        top: 950px;
        left: 350px;
        animation-range: var(--rang2) var(--rang3);
    }

    .point3 {
        top: 1410px;
        left: 66px;
        animation-range: var(--rang3) var(--rang4);
    }

    h2 {
        position: absolute;
        left: 0;
        right: 0;
        text-align: center;
        top: 100px;
        font-size: 42px;
        color: #fff;
    }

    p {
        position: absolute;
        padding: 16px;
        border: 4px dashed #fff;
        width: 50vw;
        color: #fff;
        font-size: 24px;
        text-align: justify;
        font-style: italic;
        opacity: 0;
        animation: textShow 1s linear forwards;
        animation-timeline: scroll(root);
    }

    .p1 {
        --x: -500px;
        top: 410px;
        left: 60px;
        width: 400px;
        animation-range: var(--rang1) var(--rang2);
    }

    .p2 {
        --x: -150px;
        width: 600px;
        top: 840px;
        left: 300px;
        animation-range: var(--rang2) var(--rang3);
    }

    .p2::before {
        content: '';
        float: left;
        width: 240px;
        height: 200px;
        shape-outside: polygon(80% 0, 90% 0, 0 90%, 0 80%);
    }

    .p3 {
        --x: 500px;
        top: 1310px;
        left: 190px;
        width: 450px;
        animation-range: var(--rang3) var(--rang4);
    }

    .p2 {
        --scale: 0.2;
        --x: 900px;
        top: 900px;
        animation: show 1s linear forwards;
        animation-timeline: scroll(root);
        animation-range: var(--rang2) var(--rang3);
    }

    @keyframes lineMove {
        0% {
            stroke-dashoffset: 2100;
        }

        40% {
            stroke-dashoffset: 2100;
        }

        100% {
            stroke-dashoffset: 0;
        }
    }

    @keyframes move {
        0% {
            offset-distance: 0%;
            opacity: 0;
        }

        35% {
            offset-distance: 0%;
            opacity: 0;
        }

        40% {
            offset-distance: 0%;
            opacity: 1;
        }

        50% {
            transform: scale(3);
        }

        100% {
            offset-distance: 100%;
        }
    }

    @keyframes circleScale {
        40% {
        }

        80%,
        100% {
            transform: scale(4);
            opacity: 0.1;
        }
    }

    @keyframes show {
        0% {
            opacity: 0;
        }

        40% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }

    @keyframes textShow {
        0% {
            transform: translate(var(--x), 0);
            opacity: 0;
        }

        40% {
            transform: translate(var(--x), 0);
            opacity: 0;
        }

        100% {
            transform: translate(0, 0);
            opacity: 1;
        }
    }
</style>
