# 演示

<script setup>
import {ref} from 'vue'
import i from './html_test/index.html?raw'
import b from './html_test/next.html?raw'
</script>

<iframe :srcdoc="i" style="width:100%;height:1000px;"></iframe>
<iframe :srcdoc="b" style="width:100%;height:1000px;"></iframe>
