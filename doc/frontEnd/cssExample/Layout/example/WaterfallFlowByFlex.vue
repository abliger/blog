<template>
    <div id="temp">
     <div class="contenter">
         <template v-for="k in 4">
            <div class="col">
                <div v-for="(item,index) in 10" class="item" :style="getRandom()">item{{ index }}</div>
            </div>
        </template>

        </div>
    </div>
   
</template>
<script setup lang="ts">
function getRandom(){
    return {
            height: (Math.max(Math.random()*300|0 ,100)) +'px'
    }
}
</script>
<style scoped>
#temp{
        height: 300px;
        overflow-y: scroll;
}
.contenter{
    width: 100%;
    background-color: aquamarine;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
}
.col{
    background-color: blue;
    flex-basis: 25%;
    box-sizing: border-box;
}
.item{
    background-color:beige;
    margin: 10px;
}
</style>