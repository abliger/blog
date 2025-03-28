<template>
    <div id="temp">
        <div>
            <input v-model="useImage" type="checkbox">使用图片</input>
        </div>
        <div>
            <label>list-style-position 选项: </label>
            <select v-model="usePosition">
                <option>outside</option>
                <option>inside</option>
            </select>
        </div>
        <div>
            <label>list-style-type 选项: </label>
            <select v-model="useType">
                <optgroup label="ul">
                    <option>none</option><!--无标记 -->
                    <option>disc</option><!--默认实心圆点 -->
                    <option>circle</option><!-- 空心圆点-->
                    <option>square</option><!-- 实心方块-->
                </optgroup>
                <optgroup label="ol">
                    <option>decimal</option><!-- 默认阿拉伯数字 -->
                    <option>lower-roman</option><!-- 小写罗马数字 -->
                    <option>upper-roman</option><!--大写罗马数字-->
                    <option>lower-alpha</option><!--小写英文字母-->
                    <option>upper-alpha</option><!--大写英文字母-->
                </optgroup>
                <optgroup label="other">
                    <option>armenian</option>
                    <option>cjk-ideographic</option>
                    <option>georgian</option>
                    <option>hebrew</option>
                    <option>hiragana</option>
                    <option>katakana</option>
                    <option>hiragana-iroha</option>
                    <option>katakana-iroha</option>
                </optgroup>

            </select>
        </div>

        <div id="ListItem">
            <div :class="['ListItem', useImage ? 'useImage' : '', usePosition === 'inside' ? 'usePositionInside' : 'usePositionOutside']"
                :style="{ listStyleType: useType }">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
                quibusdam dolore, veniam delectus repudiandae .</div>
            <div :class="['ListItem', useImage ? 'useImage' : '', usePosition === 'inside' ? 'usePositionInside' : 'usePositionOutside']"
                :style="{ listStyleType: useType }">Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
                asperiores dolor numquam pariatur. Quis adipisci.</div>
            <div :class="['ListItem', useImage ? 'useImage' : '', usePosition === 'inside' ? 'usePositionInside' : 'usePositionOutside']"
                :style="{ listStyleType: useType }">Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
                deserunt!</div>
            <div :class="['ListItem', useImage ? 'useImage' : '', usePosition === 'inside' ? 'usePositionInside' : 'usePositionOutside']"
                :style="{ listStyleType: useType }">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                pariatur iste assumenda, maiores nisi .</div>
            <div :class="['ListItem', useImage ? 'useImage' : '', usePosition === 'inside' ? 'usePositionInside' : 'usePositionOutside']"
                :style="{ listStyleType: useType }">Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
                distinctio recusandae dicta!</div>
        </div>
    </div>

</template>
<script setup lang="ts">
import { ref } from 'vue'
const useImage = ref(false)
const usePosition = ref('inside')
const useType = ref('circle')
</script>
<style scoped>
#temp {
    height: auto;
}

#ListItem {
    border: 2px solid blueviolet;
    padding: 10px 20px;
}

.ListItem {
    display: list-item;
}

.usePositionInside {
    list-style-position: inside;
}

.usePositionOutside {
    list-style-position: outside;
}

.useImage {
    list-style-image: url(https://picsum.photos/10/10);
}
</style>