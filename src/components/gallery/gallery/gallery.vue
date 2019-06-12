<template>
    <div>
        <top1></top1>
        <right></right>
        <paging></paging>
    </div>
</template>
<script>
import top1 from './top.vue'
import right from './right.vue'
import paging from './paging.vue'
    export default {
        name: "gallery",
        components: {
            top1,
            right,
            paging
        }
    }
</script>

<style scoped>

</style>
