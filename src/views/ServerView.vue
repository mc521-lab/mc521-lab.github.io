<template>
    <main>
        <section class="hero min-h-[25vh]" style="background-image: url(/images/bg1.png)">
            <div class="hero-overlay"></div>
            <div class="hero-content text-neutral-content text-center">
                <div class="max-w-md">
                    <section class="flex gap-4 justify-self-center text-[#fffacd]">
                        <h1 class="mb-5 text-5xl font-semibold">纯净生存服</h1>
                    </section>
                </div>
            </div>
        </section>
        <section class="h-16 flex items-center pl-[15vw]">
            <div class="breadcrumbs text-sm">
                <ul>
                    <li><a href="/">首页</a></li>
                    <li>服务器列表</li>
                    <li>纯净生存</li>
                </ul>
            </div>
        </section>
        <section class="py-16 w-full flex sm:flex-col sm:gap-8 lg:flex-row lg:justify-around">
            <div class="translate-x-24">
                <h1 class="text-3xl">服务器 IP</h1>
                <p class="text-lg mt-4">mc521.cc</p>
                <h1 class="text-3xl mt-8">QQ 交流群</h1>
                <p class="text-lg mt-4">5587557</p>
                <h1 class="text-3xl mt-8">服务器介绍</h1>
                <p class="text-lg mt-4">
                    长期开放 高版本纯净生存
                    <br />
                    仅有基础玩法经济等插件
                    <br />
                    保证不影响平衡或破坏公平
                    <br />
                    无需担心出现OP滥权
                </p>
                <h1 class="text-3xl mt-8">客户端下载</h1>
                <button class="btn bg-[#2F2F2F] text-white border-black mt-4">
                    <svg
                        aria-label="Microsoft logo"
                        width="16"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512">
                        <path d="M96 96H247V247H96" fill="#f24f23"></path>
                        <path d="M265 96V247H416V96" fill="#7eba03"></path>
                        <path d="M96 265H247V416H96" fill="#3ca4ef"></path>
                        <path d="M265 265H416V416H265" fill="#f9ba00"></path>
                    </svg>
                    电脑版下载
                </button>
                <button class="ml-2 btn bg-[#2F2F2F] text-white border-black mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32">
                        <rect width="4" height="10" x="2" y="12" fill="#8bc34a" rx="2" />
                        <rect width="4" height="10" x="26" y="12" fill="#8bc34a" rx="2" />
                        <path
                            fill="#8bc34a"
                            d="M8 12h16v12H8zm2 12h4v4a2 2 0 0 1-2 2a2 2 0 0 1-2-2zm8 0h4v4a2 2 0 0 1-2 2a2 2 0 0 1-2-2zm3.545-19.759l2.12-2.12A1 1 0 0 0 22.251.707l-2.326 2.326a7.97 7.97 0 0 0-7.85 0L9.75.707a1 1 0 1 0-1.414 1.414l2.12 2.12A7.97 7.97 0 0 0 8 10h16a7.97 7.97 0 0 0-2.455-5.759M14 8h-2V6h2Zm6 0h-2V6h2Z" />
                    </svg>
                    手机版下载
                </button>
            </div>
            <img src="/images/bg5.png" class="object-contain sm:px-8 lg:px-0" />
        </section>
        <section class="h-16 flex items-center pl-[15vw]">
            <div class="breadcrumbs text-sm">
                <ul>
                    <li><a href="/">首页</a></li>
                    <li>服务器列表</li>
                    <li>纯净生存</li>
                </ul>
            </div>
        </section>
    </main>
</template>

<style>
    /* 控制进入和离开的透明度 */
    .fadeQuickOut-enter-active,
    .fadeQuickOut-leave-active {
        transition: all 0.5s;
    }
    .fadeQuickOut-enter-from,
    .fadeQuickOut-leave-to {
        opacity: 0;
    }
    .fadeQuickOut-leave-to {
        transition: none;
    }

    .fadeNormalOut-enter-active,
    .fadeNormalOut-leave-active {
        transition: all 0.4s ease;
    }
    .fadeNormalOut-enter-from,
    .fadeNormalOut-leave-to {
        opacity: 0;
        transform: scale(0.95);
    }
    .fadeNormalOut-move {
        transition: transform 0.4s ease;
    }
</style>
