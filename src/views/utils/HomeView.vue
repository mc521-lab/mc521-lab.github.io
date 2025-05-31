<script setup lang="ts">
    import type { VNode } from "vue";

    interface ITools {
        title: string;
        desc: string | VNode;
        routerLink?: string;
        link?: string;
    }

    const tools: ITools[] = [
        {
            title: "落颜 · SkinDrop",
            desc: "为 SkinsRestorer 量身打造的轻量级皮肤上传与命令生成工具，支持一键生成可用于 SkinsRestorer 指令的公开链接与命令",
            routerLink: "/utils/skindrop",
        },
    ];

    const openLink = (link: string) => {
        window.open(link, "_blank");
    };
</script>

<template>
    <section class="hero min-h-screen" style="background-image: url(/images/poster.png)">
        <div class="hero-overlay backdrop-blur-xs"></div>
        <div class="hero-content flex flex-col">
            <div class="max-w-md scale-110">
                <h1 class="mb-5 text-5xl font-bold text-[#fffacd]">快捷工具箱</h1>
            </div>
            <div
                class="card bg-base-100 card-md"
                v-for="tool in tools"
                :key="tool.title"
                @click="tool.routerLink ? $router.push(tool.routerLink) : tool.link ? openLink(tool.link) : null">
                <div class="card-body">
                    <h2 class="card-title">{{ tool.title }}</h2>
                    <p>{{ tool.desc }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
    .card {
        box-shadow: 0 0 6px transparent;
        transition: all 0.25s ease-in-out;
        cursor: pointer;
    }
    .card:hover {
        box-shadow: 0 0 6px var(--color-primary);
    }
</style>
