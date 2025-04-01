<template>
    <div class="contenter">
        <div class="item1">
            <div class="inner">item1</div>
        </div>
        <div class="item2">
            <div class="inner">item2</div>
        </div>
        <div class="item3">
            <div class="inner">item3</div>
        </div>
        <div class="item4">
            <div class="inner">item4</div>
        </div>
        <div class="item5">
            <div class="inner">item5</div>
        </div>
        <div class="item6">
            <div class="inner">item6</div>
        </div>
        <div class="item7">
            <div class="inner">item7</div>
        </div>
        <div class="item8">
            <div class="inner">item8</div>
        </div>
    </div>
</template>
<style scoped>
* {
    box-sizing: border-box;
}

.inner {
    height: 100%;
    width: 100%;
}

.contenter {
    padding: .8rem;
    min-height: 200px;
    width: 100%;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas: "item1 item2 item3"
        "item4 item5 item6"
        "item4 item7 item8";
}

.contenter>div {
    height: 100px;
    background-color: aquamarine;
}

div.item1 {
    grid-area: item1;
    width: 140%;
    height: 100%;
    background-color: red;
    clip-path: polygon(0% 0%, 70% 0%, 100% 100%, 0% 100%);
    display: grid;
    place-content: center;
}

div.item2 {
    grid-area: item2;
    width: 140%;
    height: 100%;
    background-color: #1234;
    clip-path: polygon(0% 0%, 70% 0%, 50% 100%, 30% 100%);
    display: grid;
    place-content: center;
}

div.item3 {
    grid-area: item3;
    justify-self: end;
    width: 200%;
    height: 140%;
    background-color: #1aaa;
    clip-path: polygon(49.8% 0%, 100% 0%, 100% 100%, 30.6% 100%);
    display: grid;
    place-content: center;
}

div.item4 {
    grid-area: item4;
    height: 100%;
    width: 140%;
    clip-path: polygon(0% 0%, 80% 0%, 100% 50%, 80% 100%, 0 100%);
    display: grid;
    place-content: center;
    background-color: #1aaa43;
}

div.item5 {
    grid-area: item5;
    clip-path: polygon(15.5% 5%, 69% 5%, 59.5% 40%, 73% 95%, 70% 95%, 42% 95%);
    display: grid;
    place-content: center;
}

div.item6 {
    grid-area: item6;
    width: 140%;
    justify-self: end;
    clip-path: polygon(1.5% 44%, 100% 44%, 100% 95%, 10.4% 95%);
    display: grid;
    place-content: center;
    background-color: #Faa343;
}

div.item7 {
    grid-area: item7;
    display: grid;
    place-content: center;
    clip-path: polygon(42% 0, 99% 0%, 99% 100%, 14.5% 100%);
}

div.item8 {
    grid-area: item8;

    display: grid;
    place-content: center;
}
</style>