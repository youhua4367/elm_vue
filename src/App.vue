<script setup lang="ts">
import FooterBar from "@/components/FooterBar.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
    <div class="container">
        <router-view></router-view>
        <FooterBar v-if="route.meta.showFooter !== false" />   <!-- 固定底部导航 -->
    </div>
</template>

<style scoped>
.container {
    min-height: 100vh;          /* 让 router-view 占满整个视口 */
    display: flex;
    align-items: center;
    flex-direction: column;
}

</style>
