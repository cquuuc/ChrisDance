<template>
  <div class="menu-container">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @select="handleMenuSelect"
    >
      <!-- 菜单项 -->
      <el-menu-item
        v-for="item in menuItems"
        :key="item.index"
        :index="item.index"
      >
        <el-icon><component :is="item.icon" /></el-icon>
        <template #title>{{ item.label }}</template>
      </el-menu-item>

      <!-- 语言切换按钮 -->
      <div class="language-switcher">
        <el-tooltip
          :content="t('common.toggle_language')"
          placement="right"
          :disabled="!isCollapse"
        >
          <el-button class="lang-btn" @click="toggleLanguage">
            <span class="flag">{{ currentLang === "zh" ? "🇨🇳" : "🇺🇸" }}</span>
            <span v-show="!isCollapse">{{ currentLang.toUpperCase() }}</span>
          </el-button>
        </el-tooltip>
      </div>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { Document, Menu } from "@element-plus/icons-vue";
import type { Component } from "vue";

const { t, locale } = useI18n();

type MenuItem = {
  index: string;
  label: string;
  icon: Component;
  routePath: string;
};

const router = useRouter();
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
  {
    index: "site",
    label: t("menu.site"),
    icon: Menu,
    routePath: "/site",
  },
]);

const handleMenuSelect = (index: string) => {
  const target = menuItems.value.find(item => item.index === index);
  if (target) router.push(target.routePath);
};

const toggleLanguage = () => {
  currentLang.value = currentLang.value === "en" ? "zh" : "en";
  locale.value = currentLang.value;
  localStorage.setItem("lang", currentLang.value);
};
</script>

<style scoped>
.menu-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.el-menu-vertical-demo {
  flex: 1;
  border-right: none;
}

.language-switcher {
  padding: 12px 4px;
  border-top: 1px solid var(--el-border-color);
}

.lang-btn {
  width: 100%;
  padding: 0 10px;
  justify-content: start;

  .flag {
    font-size: 18px;
    margin-right: 5px;
  }

  span:not(.flag) {
    font-weight: 500;
  }
}

.el-menu--collapse {
  .lang-btn {
    justify-content: center;

    span:not(.flag) {
      display: none;
    }

    .flag {
      margin-right: 0;
    }
  }
}
</style>
