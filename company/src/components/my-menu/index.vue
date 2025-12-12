<template>
  <div class="menu-container">
    <!-- 1. 菜单只放 menuitem，div 搬出来 -->
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @select="handleMenuSelect"
    >
      <el-menu-item
        v-for="item in menuItems"
        :key="item.index"
        :index="item.index"
        role="menuitem"
        :aria-label="item.label"
      >
        <el-icon><component :is="item.icon" /></el-icon>
        <template #title>{{ item.label }}</template>
      </el-menu-item>
    </el-menu>

    <!-- 语言切换 & 访问量 放在菜单外面，不再乱辈分 -->
    <div class="menu-extras">
      <div class="language-switcher">
        <el-tooltip
          :content="t('common.toggle_language')"
          placement="right"
          :disabled="!isCollapse"
        >
          <el-button
            :aria-label="
              currentLang === 'zh' ? '切换英文' : 'Switch to Chinese'
            "
            class="lang-btn"
            @click="toggleLanguage"
          >
            <span class="flag" aria-hidden="true">{{
              currentLang === "zh" ? "🇨🇳" : "🇺🇸"
            }}</span>
            <span v-show="!isCollapse">{{ currentLang.toUpperCase() }}</span>
          </el-button>
        </el-tooltip>
      </div>

      <div class="visitor-count">
        <!-- 给图标加名字 -->
        <el-badge :value="formattedCount" class="item" color="green">
          <span>
            <el-icon color="#0163EF" size="30"><View /></el-icon>
          </span>
        </el-badge>

        <el-button
          v-if="counterStore.error"
          @click="counterStore.retry"
          class="retry-btn"
          aria-label="重新加载访问量"
        >
          Reload
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { Document, Menu, View } from "@element-plus/icons-vue";
import type { Component } from "vue";
import { useCounterStore } from "@/stores/counter";

const { t, locale } = useI18n();
const counterStore = useCounterStore();
const router = useRouter();

type MenuItem = {
  index: string;
  label: string;
  icon: Component;
  routePath: string;
};

const isCollapse = ref(true);
const activeIndex = ref("report");
const currentLang = ref(locale.value);

const menuItems = computed<MenuItem[]>(() => [
  {
    index: "report",
    label: t("menu.report"),
    icon: Document,
    routePath: "/report",
  },
  { index: "site", label: t("menu.site"), icon: Menu, routePath: "/site" },
]);

const handleMenuSelect = (index: string) => {
  const target = menuItems.value.find((item) => item.index === index);
  if (target) router.push(target.routePath);
};

const toggleLanguage = () => {
  currentLang.value = currentLang.value === "en" ? "zh" : "en";
  locale.value = currentLang.value;
  localStorage.setItem("lang", currentLang.value);
};

counterStore.fetch();

const formattedCount = computed(() =>
  counterStore.count === -1 ? "N/A" : counterStore.count.toLocaleString()
);
</script>

<style  scoped>
.menu-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.el-menu-vertical-demo {
  flex: 1;
  border-right: none;
}

/* 把语言 & 访问量 放在同一个 extras 区域，顶部加线分隔 */
.menu-extras {
  border-top: 1px solid var(--el-border-color);
  padding: 8px 0;
}

.language-switcher,
.visitor-count {
  padding: 6px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lang-btn {
  width: 100%;
  justify-content: start;
}
.lang-btn .flag {
  font-size: 18px;
  margin-right: 5px;
}

.el-menu--collapse .lang-btn span:not(.flag) {
  display: none;
}

.el-menu--collapse .lang-btn .flag {
  margin-right: 0;
}
/* ==============================
   左侧菜单样式整队 - 百岁老程序员专用
============================== */

/* 1. 每项菜单最少 180px，文字不许换行 */
.el-menu-vertical-demo .el-menu-item {
  min-width: 180px !important;
  white-space: nowrap !important;
  display: flex !important;
  align-items: center !important;
  padding-left: 12px !important;
  padding-right: 12px !important;
}

/* 2. 图标垂直居中，大小固定 20px */
.el-menu-item .el-icon {
  font-size: 20px !important;
  margin-right: 8px !important;
}

/* 3. 语言按钮区域 - 不挤扁 */
.language-switcher {
  padding: 10px 12px !important;
  box-sizing: border-box;
}

.lang-btn {
  width: 100% !important;
  height: 40px !important; /* 固定高度，不扁 */
  display: flex !important;
  align-items: center !important;
  justify-content: flex-start !important;
  padding: 0 12px !important;
}

/* 4. 访问量区域同高 */
.visitor-count {
  padding: 10px 12px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

/* 5. 折叠时国旗缩小，文字隐藏 */
.el-menu--collapse .lang-btn {
  justify-content: center !important;
  padding: 0 8px !important;
}

.el-menu--collapse .lang-btn span:not(.flag) {
  display: none !important; /* 文字藏起 */
}
.el-menu--collapse .lang-btn .flag {
  font-size: 16px !important; /* 国旗小一点 */
  margin-right: 0 !important;
}

/* 6. 整个菜单最小宽度 - 防止被压扁 */
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px !important; /* 展开时固定 200px */
}
.el-menu--collapse {
  width: 64px !important; /* 折叠时官方默认窄边 */
}
</style>