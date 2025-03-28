<template>
    <div id="temp">
        {{ useType }}
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
                quibusdam dolore, veniam delectus repudiandae ea harum alias quaerat nulla ullam nisi provident sit
                repellendus illum dignissimos molestiae ratione? Quisquam, placeat.</div>
            <div :class="['ListItem', useImage ? 'useImage' : '', usePosition === 'inside' ? 'usePositionInside' : 'usePositionOutside']"
                :style="{ listStyleType: useType }">Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
                asperiores dolor numquam pariatur. Quis adipisci consectetur deleniti aperiam nihil sequi non harum
                libero quam, iste officia et, impedit dignissimos sapiente.</div>
            <div :class="['ListItem', useImage ? 'useImage' : '', usePosition === 'inside' ? 'usePositionInside' : 'usePositionOutside']"
                :style="{ listStyleType: useType }">Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
                deserunt
                odio enim qui, delectus assumenda autem! Asperiores, laborum eum! Molestiae possimus optio quos dolore
                distinctio dignissimos esse in a animi!</div>
            <div :class="['ListItem', useImage ? 'useImage' : '', usePosition === 'inside' ? 'usePositionInside' : 'usePositionOutside']"
                :style="{ listStyleType: useType }">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                pariatur
                iste assumenda, maiores nisi fugit recusandae neque odio, commodi, quibusdam adipisci doloribus
                voluptas! Quod illo ducimus officiis ex fugit temporibus.</div>
            <div :class="['ListItem', useImage ? 'useImage' : '', usePosition === 'inside' ? 'usePositionInside' : 'usePositionOutside']"
                :style="{ listStyleType: useType }">Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
                distinctio recusandae dicta aliquam voluptatum quis facilis asperiores, cupiditate cum repellat amet
                atque! Sequi ducimus officia nisi inventore voluptate tenetur qui!</div>
        </div>
    </div>

</template>
<script setup lang="ts">
import { ref } from 'vue'
const useImage = ref(false)
const usePosition = ref('outside')
const useType = ref('circle')
</script>
<style scoped>
#temp {
    height: auto;
    background-color: aquamarine;
}

#ListItem {
    border: 2px solid blueviolet;
    padding: 10px 20px;
}

.ListItem {
    display: list-item;
    list-style-type: circle;
    list-style-position: inside;
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