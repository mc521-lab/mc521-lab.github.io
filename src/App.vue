<script setup lang="ts">
    import { ref } from "vue";
    import { RouterView } from "vue-router";
    import { Header, Footer, Hint } from "@/components";
    import { EventBus } from "@/modules/EventBus";
    import type { THint } from "@/types/Hint";

    const alertlist = ref<THint[]>([]);
    EventBus.on("hint:create", (payload: THint) => {
        alertlist.value.push(payload);
    });
</script>

<template>
    <Header />
    <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in"><component :is="Component" /></Transition>
    </RouterView>
    <Footer />
    <section class="fixed bottom-4 right-4 flex flex-col gap-4">
        <TransitionGroup name="list" tag="div">
            <Hint
                v-for="item of alertlist"
                :key="item.content"
                :type="item.type"
                :content="item.content"
                :time="item.time" />
        </TransitionGroup>
    </section>
</template>

<style lang="css" scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.25s ease-in-out;
    }
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
    .fade-enter-to,
    .fade-leave-from {
        opacity: 1;
    }

    .list-enter-active,
    .list-leave-active {
        transition: all 0.25s ease-in-out;
    }
    .list-enter-from,
    .list-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }
</style>
