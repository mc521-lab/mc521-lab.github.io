<script setup lang="ts">
    import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
    import { useRouter } from "vue-router";
    import axios from "axios";
    import { SkinViewer, WalkingAnimation } from "skinview3d";
    import { EventBus } from "@/modules/EventBus";
    import type { THint } from "@/types/Hint";
    import { uploadFileToAlist } from "@/modules/AlistAPI";

    const router = useRouter();

    // Step Control Variables
    const step = ref(0);
    const okToPass = ref<boolean>(false);

    // Input Datas
    const data = ref<File | null>(null);
    const dataUrl = ref<string | null>(null);
    const fileInput = ref<HTMLInputElement | null>(null);
    const namemcInput = ref<HTMLInputElement | null>(null);
    const fileType = ref<string>("");
    const username = ref<string>("");
    const isFinalBtnDisabled = ref<boolean>(true);

    // Skin Preview
    const skinview = ref<HTMLCanvasElement | null>(null);
    const skinviewInstance = ref<SkinViewer | null>(null);

    // Result Datas
    const uploadStatus = ref<string>("");
    const uploadResult = ref<any>(null);
    const uploadError = ref<string>("");

    // Step 1
    const handleFileInputChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        data.value = file!;
        okToPass.value = true;
        namemcInput.value!.disabled = Boolean(file);
    };
    const handleNamemcInputChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const value = target.value;
        if (/^https:\/\/(zh\.)?namemc\.com\/skin\/[0-9a-f]+$/.test(value)) {
            dataUrl.value = value;
            okToPass.value = true;
        } else {
            data.value = null;
        }
        fileInput.value!.disabled = Boolean(value);
    };

    // Step 2
    const handleStartPreview = async () => {
        step.value = 1;
        nextTick(async () => {
            let skinFile;
            if (dataUrl.value !== null) {
                // 从 NameMC 链接获取
                const seprated = dataUrl.value.split("/");
                const url = `https://mc521.rth2.xyz/index.php?url=https://s.namemc.com/i/${seprated[seprated.length - 1]}.png`;
                // 获取文件
                const response = await axios.get<ArrayBuffer>(url, { responseType: "arraybuffer" });
                // 保存为 File 对象
                data.value = new File([response.data], `${seprated[seprated.length - 1]}.png`, { type: "image/png" });
                skinFile = URL.createObjectURL(new Blob([response.data], { type: response.headers["content-type"] }));
            } else {
                // 从文件获取
                skinFile = URL.createObjectURL(data.value as File);
            }
            if (!skinviewInstance.value) {
                skinviewInstance.value = new SkinViewer({
                    canvas: skinview.value!,
                    width: 512,
                    height: 512,
                    skin: skinFile,
                });
            }
            skinviewInstance.value.animation = new WalkingAnimation();
        });
    };

    // Step 3
    const handleUpload = async () => {
        if (!data.value || !username.value) {
            uploadStatus.value = "请填写用户名并选择皮肤文件!";
            return;
        }

        step.value = 2;
        uploadStatus.value = "正在上传...";
        uploadError.value = "";
        uploadResult.value = null;

        try {
            const [result, error] = await uploadFileToAlist(data.value, `${username.value}.png`);
            if (error) {
                uploadError.value = error;
                uploadStatus.value = `${error}，请联系站点管理员！`;
            } else {
                uploadResult.value = result;
                uploadStatus.value = "上传成功!";
            }
        } catch (err) {
            uploadError.value = `发生意外错误：${err instanceof Error ? err.message : String(err)}，请联系站点管理员！`;
            uploadStatus.value = "上传失败!";
        }
    };
    const handleCopy = async (username: string) => {
        const { Alist_Url, Alist_Download_Url_Base } = import.meta.env;
        fileType.value = data.value!.type.split("/")[1];
        try {
            await navigator.clipboard.writeText(`/skin url ${Alist_Url}/d/${Alist_Download_Url_Base}/${username}.${fileType.value}?t=${new Date().getTime()}`);
            EventBus.emit<THint>("hint:create", { type: "success", content: "已复制命令到剪贴板" });
        } catch (err) {
            EventBus.emit<THint>("hint:create", {
                type: "error",
                content: `复制命令时发生错误：${err instanceof Error ? err.message : String(err)}，请联系站点管理员！`,
            });
        }
    };

    // Reset
    const resetAll = () => {
        data.value = null;
        step.value = 0;
        username.value = "";
        isFinalBtnDisabled.value = true;
        uploadStatus.value = "";
        uploadResult.value = null;
        uploadError.value = "";
    };

    // Leave
    const _operation = (callback: Function) => {
        if (step.value !== 0 || data.value !== null) {
            if (confirm("你确定要离开吗？所有未保存的内容将会被丢弃。")) {
                callback();
            }
        } else callback();
    };
    router.beforeEach((to, from, next) => {
        if (from.fullPath === "/utils/skindrop" && to.fullPath !== from.fullPath) {
            _operation(next);
        }
    });

    // Listener
    const watchUsernameInput = watch(username, (newValue, oldValue) => {
        if (newValue === oldValue) return;
        isFinalBtnDisabled.value = !(/^[A-Za-z][A-Za-z0-9\-]*$/.test(newValue) && newValue.length >= 3 && newValue.length <= 30);
    });

    // Mount Hook
    onMounted(() => {
        EventBus.emit<THint>("hint:create", { type: "info", content: "当前落颜工具版本为 v1.0.0" });
    });

    // Unmount Hook
    onUnmounted(() => {
        if (skinviewInstance.value) {
            skinviewInstance.value.dispose();
        }
        watchUsernameInput.stop();
    });
</script>

<template>
    <main>
        <section class="hero min-h-screen" style="background-image: url(/images/poster.png)">
            <div class="hero-overlay backdrop-blur-xs"></div>
            <div class="hero-content w-full max-w-9/10 h-full pt-14 lg:pt-28 flex-col">
                <div class="card w-full h-16 bg-base-100 flex flex-row justify-between items-center px-8">
                    <h1 class="font-bold">落颜 · SkinDrop</h1>
                    <Transition name="fade" mode="out-in">
                        <button class="btn btn-square ml-auto mr-2" v-if="step !== 0 || data !== null" @click="resetAll">
                            <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M2 12a9 9 0 0 0 9 9c2.39 0 4.68-.94 6.4-2.6l-1.5-1.5A6.7 6.7 0 0 1 11 19c-6.24 0-9.36-7.54-4.95-11.95S18 5.77 18 12h-3l4 4h.1l3.9-4h-3a9 9 0 0 0-18 0" />
                            </svg>
                        </button>
                    </Transition>
                    <button class="btn btn-square" @click="$router.push('/utils')">
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z" />
                        </svg>
                    </button>
                </div>
                <div class="card w-full h-3/5 bg-base-100 flex flex-col justify-center items-center gap-2 lg:hidden">
                    <h1 class="text-3xl font-bold">提示</h1>
                    <p class="text-xl">请使用电脑端访问工具箱</p>
                </div>
                <div class="card w-full h-4/5 bg-base-100 hidden lg:flex flex-row gap-4 p-4">
                    <section class="w-1/2 h-full flex justify-center items-center border-2 border-base-300 rounded-md relative">
                        <Transition name="fade" mode="out-in">
                            <div class="flex flex-col items-center gap-4 absolute" v-if="step === 0">
                                <div class="skeleton h-32 w-32"></div>
                                <p class="opacity-50">请先加载一个皮肤以应用预览</p>
                            </div>
                        </Transition>
                        <Transition name="fade" mode="out-in">
                            <div class="w-full h-full flex flex-col justify-center items-center gap-4 absolute" v-if="step === 1 || step === 2">
                                <canvas ref="skinview" class="bg-base-100 size-128" />
                            </div>
                        </Transition>
                    </section>
                    <section class="w-1/2 h-full flex justify-center items-center border-2 border-base-300 rounded-md relative">
                        <Transition name="fade" mode="out-in">
                            <div class="w-full flex flex-col justify-between items-center gap-4 absolute" v-if="step === 0">
                                <h1 class="text-3xl font-bold">上传你的皮肤</h1>
                                <fieldset class="fieldset w-1/2">
                                    <legend class="fieldset-legend">你的皮肤文件</legend>
                                    <input
                                        type="file"
                                        class="file-input w-full transition-all duration-200 ease-in-out"
                                        ref="fileInput"
                                        @input="handleFileInputChange" />
                                    <p class="label">需要是支持的大小，例如 32x32 或 64x32 等</p>
                                </fieldset>
                                <div class="divider w-9/10 mx-auto"></div>
                                <h1 class="text-2xl font-bold">从 NameMC 链接获取皮肤</h1>
                                <fieldset class="fieldset w-1/2">
                                    <legend class="fieldset-legend">NameMC 皮肤页面链接</legend>
                                    <label class="input validator w-full">
                                        <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
                                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                                            </g>
                                        </svg>
                                        <input
                                            type="url"
                                            required
                                            disabled
                                            placeholder="https://namemc.com/skin/... 或 https://zh.namemc.c..."
                                            pattern="^https:\/\/(zh\.)?namemc\.com\/skin\/[0-9a-f]+$"
                                            title="需要正确的 NameMC 皮肤 URL"
                                            ref="namemcInput"
                                            class="transition-all duration-200 ease-in-out"
                                            @input="handleNamemcInputChange" />
                                    </label>
                                    <p class="validator-hint hidden -mt-0.5">需要正确的 NameMC 皮肤 URL</p>
                                    <p class="label">
                                        <a class="underline" href="https://namemc.com" target="_blank">打开 NameMC</a>
                                        <a class="underline" href="https://zh.namemc.com" target="_blank">打开 NameMC 中国站</a>
                                        <!-- <span
                                            class="underline cursor-help tooltip tooltip-right"
                                            data-tip="在 NameMC 中打开你喜欢的皮肤，复制网页链接粘贴至上方输入框并确认即可。">
                                            如何使用？
                                        </span> -->
                                        <span
                                            class="underline cursor-help tooltip tooltip-right"
                                            data-tip="由于 NameMC 的限制，我们无法直接获取皮肤文件，且反代节点被封掉了，故此功能暂时下线">
                                            为何我无法输入？
                                        </span>
                                    </p>
                                </fieldset>
                                <div class="divider w-9/10 mx-auto"></div>
                                <button class="btn btn-primary" :disabled="!okToPass" @click="handleStartPreview">确认</button>
                            </div>
                        </Transition>
                        <Transition name="fade" mode="out-in">
                            <div class="w-full flex flex-col justify-between items-center gap-4 absolute" v-if="step === 1">
                                <h1 class="text-3xl font-bold">预览与确认</h1>
                                <p class="opacity-50 -mt-2">这是你想要的皮肤吗</p>
                                <section class="flex gap-4">
                                    <button class="btn btn-error" @click="step = 0">不是，我要重新选择</button>
                                    <div class="join">
                                        <label class="join-item input validator">
                                            <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
                                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                                    <circle cx="12" cy="7" r="4"></circle>
                                                </g>
                                            </svg>
                                            <input
                                                v-model="username"
                                                type="text"
                                                required
                                                placeholder="用户名"
                                                pattern="^[A-Za-z][A-Za-z0-9\-]*$"
                                                minlength="3"
                                                maxlength="30"
                                                title="你的用户名" />
                                        </label>
                                        <button class="join-item btn btn-success" :disabled="isFinalBtnDisabled" @click="handleUpload">是，我要落颜</button>
                                    </div>
                                </section>
                            </div>
                        </Transition>
                        <Transition name="fade" mode="out-in">
                            <div class="w-full flex flex-col justify-between items-center gap-4 absolute" v-if="step === 2">
                                <h2 class="text-2xl font-bold mb-4">上传状态</h2>
                                <div
                                    v-if="uploadStatus"
                                    class="alert mb-4"
                                    :class="uploadError ? 'alert-error!' : uploadStatus === '正在上传...' ? 'alert-warning' : 'alert-success!'">
                                    <!-- Icon -->
                                    <span class="loading loading-dots loading-sm" v-if="!uploadError && uploadStatus === '正在上传...'"></span>
                                    <svg
                                        v-else-if="!uploadError && uploadStatus === '上传成功!'"
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-6 w-6 shrink-0 stroke-current"
                                        fill="none"
                                        viewBox="0 0 24 24">
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <!-- Text -->
                                    <span v-if="uploadStatus === '正在上传...'">
                                        {{ uploadStatus }}
                                    </span>
                                    <span v-else>
                                        {{ uploadStatus }}
                                    </span>
                                </div>
                                <div v-if="uploadResult" class="shadow-xl flex gap-4 justify-center">
                                    <button class="btn btn-primary copy-btn" @click="handleCopy(username)">复制换皮肤命令</button>
                                    <button class="btn btn-neutral" @click="resetAll">再上传一个</button>
                                </div>
                            </div>
                        </Transition>
                    </section>
                </div>
            </div>
        </section>
    </main>
</template>

<style lang="css" scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s ease-in-out;
    }
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
    .fade-enter-to,
    .fade-leave-from {
        opacity: 1;
    }
</style>
