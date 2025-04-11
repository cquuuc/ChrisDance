<template>
  <div class="strategy-dashboard">
    <!-- 导航锚点 -->
    <div class="nav-anchors" v-if="false">
      <el-scrollbar>
        <div class="anchor-items">
          <el-tag
            v-for="(section, index) in sections"
            :key="index"
            :type="activeSection === index ? 'primary' : 'info'"
            @click="scrollToSection(index)"
          >
            {{ $t(section.titleKey) }}
          </el-tag>
        </div>
      </el-scrollbar>
    </div>

    <!-- 内容区块 -->
    <div class="strategy-sections">
      <!-- 技术护城河 -->
      <section ref="techSection" class="strategy-card">
        <h3 class="section-title">🛡️ {{ $t("strategy.techMoat.title") }}</h3>
        <el-row :gutter="20">
          <el-col v-for="(item, idx) in techMoats" :key="idx" :span="6">
            <el-card shadow="hover">
              <template #header>
                <div class="card-header">
                  <el-tag :type="thresholdColors[item.threshold]">
                    {{ $t(`strategy.techMoat.threshold.${item.threshold}`) }}
                  </el-tag>
                  <h4>{{ $t(item.advantageKey) }}</h4>
                </div>
              </template>
              <div class="metric-grid">
                <div class="metric-item">
                  <el-icon><User /></el-icon>
                  <span class="label">{{
                    $t("strategy.techMoat.metrics.clientValue")
                  }}</span>
                  <el-progress
                    :percentage="parseInt(item.clientValue)"
                    :format="() => $t(item.clientValueKey)"
                  />
                </div>
                <el-divider />
                <div class="case-study">
                  <el-timeline>
                    <el-timeline-item
                      v-for="(caseKey, cIdx) in item.caseKeys"
                      :key="cIdx"
                      :timestamp="$t('strategy.cases.project')"
                      placement="top"
                    >
                      {{ $t(caseKey) }}
                    </el-timeline-item>
                  </el-timeline>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </section>

      <!-- 服务模式创新 -->
      <section ref="serviceSection" class="strategy-card">
        <h3 class="section-title">
          💡 {{ $t("strategy.serviceInnovation.title") }}
        </h3>
        <el-table :data="serviceInnovations" stripe>
          <el-table-column
            :label="$t('strategy.serviceInnovation.model')"
            prop="advantageKey"
            width="180"
          >
            <template #default="{ row }">
              {{ $t(row.advantageKey) }}
            </template>
          </el-table-column>

          <el-table-column
            :label="$t('strategy.serviceInnovation.financialModel')"
          >
            <template #default="{ row }">
              <el-tag type="success">{{ $t(row.financialModelKey) }}</el-tag>
              <el-statistic
                :value="parseFloat(row.clientValue?.match(/\d+/)?.[0] || 0)"
                :precision="2"
                suffix="%"
              />
            </template>
          </el-table-column>

          <el-table-column
            :label="$t('strategy.serviceInnovation.riskControl')"
          >
            <template #default="{ row }">
              <el-progress
                :status="riskStatus(row.riskControlKey)"
                :percentage="riskLevel(row.riskControlKey)"
              />
            </template>
          </el-table-column>
        </el-table>
      </section>
    </div>

    <!-- 案例详情弹窗 -->
    <el-dialog
      v-model="caseVisible"
      :title="$t('common.viewDetails')"
      width="50%"
    >
      <div v-if="currentCaseKey">{{ $t(currentCaseKey) }}</div>
      <template #footer>
        <el-button @click="caseVisible = false">
          {{ $t("common.close") }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { User } from "@element-plus/icons-vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

// ================== 类型定义 ==================
type TechThreshold = "high" | "veryHigh" | "mediumHigh" | "mediumLow";
type ProgressStatus = "success" | "exception" | "";

interface TechMoat {
  advantageKey: string;
  clientValue: string;
  clientValueKey: string;
  caseKeys: string[];
  threshold: TechThreshold;
}

interface ServiceInnovation {
  advantageKey: string;
  clientValue: string;
  financialModelKey: string;
  riskControlKey: string;
  caseKey: string;
}

// ================== 响应式数据 ==================
const techMoats = ref<TechMoat[]>([
  {
    advantageKey: "strategy.techMoat.aiSandbox",
    clientValue: "300",
    clientValueKey: "progress.efficiency",
    caseKeys: ["strategy.cases.medicalAI"],
    threshold: "high",
  },
  {
    advantageKey: "strategy.techMoat.quantumSecurity",
    clientValue: "100",
    clientValueKey: "progress.efficiency",
    caseKeys: ["strategy.cases.govAudit"],
    threshold: "veryHigh",
  },
]);

const serviceInnovations = ref<ServiceInnovation[]>([
  {
    advantageKey: "strategy.service.paymentModel",
    clientValue: "35%",
    financialModelKey: "strategy.financial.kpi",
    riskControlKey: "strategy.risk.dataAnalysis",
    caseKey: "strategy.cases.ecommercePlatform",
  },
  {
    advantageKey: "strategy.service.techInsurance",
    clientValue: "92%",
    financialModelKey: "strategy.financial.compensation",
    riskControlKey: "strategy.risk.actuarial",
    caseKey: "strategy.cases.ecommercePlatform",
  },
]);

// ================== 模板引用 ==================
const techSection = ref<HTMLElement>();
const serviceSection = ref<HTMLElement>();

// ================== 样式配置 ==================
const thresholdColors: Record<
  TechThreshold,
  "success" | "warning" | "danger" | "info"
> = {
  high: "warning",
  veryHigh: "danger",
  mediumHigh: "success",
  mediumLow: "info",
};

// ================== 业务逻辑 ==================
const activeSection = ref(0);
const caseVisible = ref(false);
const currentCaseKey = ref<string>();

const riskStatus = (riskKey: string): ProgressStatus => {
  const riskMap: Record<string, ProgressStatus> = {
    "strategy.risk.dataAnalysis": "exception",
    "strategy.risk.actuarial": "success",
  };
  return riskMap[riskKey] || "";
};

const riskLevel = (riskKey: string): number => {
  const levelMap: Record<string, number> = {
    "strategy.risk.dataAnalysis": 60,
    "strategy.risk.actuarial": 30,
  };
  return levelMap[riskKey] || 0;
};

const showCaseDetail = (caseKey: string) => {
  currentCaseKey.value = caseKey;
  caseVisible.value = true;
};

const sections = [
  { titleKey: "menu.report", ref: techSection },
  { titleKey: "menu.site", ref: serviceSection },
];

const scrollToSection = (index: number) => {
  activeSection.value = index;
  const section = sections[index].ref.value;
  section?.scrollIntoView({ behavior: "smooth" });
};
</script>

<style lang="scss" scoped>
.strategy-dashboard {
  padding: 20px;
  background: #f8f9fa;

  .nav-anchors {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: white;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

    .anchor-items {
      display: flex;
      gap: 15px;
      padding: 10px 20px;
    }
  }

  .strategy-card {
    margin: 40px 0;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

    .section-title {
      color: #2c3e50;
      border-left: 4px solid #409eff;
      padding-left: 15px;
      margin-bottom: 25px;
    }
  }

  .metric-grid {
    display: grid;
    gap: 12px;

    .metric-item {
      display: flex;
      align-items: center;
      gap: 8px;

      .label {
        color: #909399;
        min-width: 80px;
      }
    }
  }

  .case-study {
    max-height: 200px;
    overflow-y: auto;
  }
}
</style>
