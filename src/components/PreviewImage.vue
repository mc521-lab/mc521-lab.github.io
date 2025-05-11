<script setup lang="ts">
    defineProps<{
        src: string;
        hoverText: string;
    }>();
</script>

<template>
    <div class="relative overflow-hidden group">
        <img :src="src" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-115" />
        <div
            class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span class="text-[#fffacd] text-xl font-bold">{{ hoverText }}</span>
        </div>
    </div>
</template>
