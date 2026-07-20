import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sources = Object.fromEntries(await Promise.all([
  "index.html",
  "src/App.tsx",
  "public/legal/privacy.html",
  "public/legal/terms.html",
  "public/legal/disclaimer.html",
  "public/legal/complaints.html",
].map(async (name) => [name, await readFile(path.join(root, name), "utf8")])));

const checks = [
  ["官网如实写明邀请制", sources["src/App.tsx"].includes("Android 移动端当前为邀请制内测")],
  ["官网不得误写开放注册", !sources["src/App.tsx"].includes("现已开放注册")],
  ["官网不得误写无需邀请码", !sources["src/App.tsx"].includes("无需邀请码")],
  ["官网如实写明邀请内测 AI", sources["src/App.tsx"].includes("邀请内测用户可在一项知情授权下使用 DeepSeek")],
  ["隐私政策写明单一授权的两项用途", sources["public/legal/privacy.html"].includes("内测 AI 数据授权是一项完整的可选 AI 服务授权") && sources["public/legal/privacy.html"].includes("两类处理同时生效")],
  ["隐私政策写明 DeepSeek 与服务商备案信息", sources["public/legal/privacy.html"].includes("Beijing-DeepseekChat-202404280016") && sources["public/legal/privacy.html"].includes("网信算备110108970550101240011号")],
  ["隐私政策不把服务商备案冒充应用备案", sources["public/legal/privacy.html"].includes("不等于知潮已完成其作为下游应用可能需要的全部登记、评估或备案")],
  ["隐私政策写明离线样本隐私边界", sources["public/legal/privacy.html"].includes("不附带用户 ID、邮箱、昵称和模型回复")],
  ["隐私政策写明撤回同时停止两项处理", sources["public/legal/privacy.html"].includes("新的实时 AI 请求不再发送给 DeepSeek") && sources["public/legal/privacy.html"].includes("新的输入也不再进入脱敏离线资源改进流程")],
  ["隐私政策写明临床工具输入不上传", sources["public/legal/privacy.html"].includes("临床工具输入") && sources["public/legal/privacy.html"].includes("不会把这些具体输入上传")],
  ["隐私政策覆盖精确闹钟权限", sources["public/legal/privacy.html"].includes("USE_EXACT_ALARM")],
  ["隐私政策覆盖电池优化权限", sources["public/legal/privacy.html"].includes("REQUEST_IGNORE_BATTERY_OPTIMIZATIONS")],
  ["隐私政策覆盖前台响铃服务", sources["public/legal/privacy.html"].includes("FOREGROUND_SERVICE_SPECIAL_USE")],
  ["隐私政策覆盖全屏提醒权限", sources["public/legal/privacy.html"].includes("USE_FULL_SCREEN_INTENT")],
  ["隐私政策覆盖严格专注无障碍服务", sources["public/legal/privacy.html"].includes("BIND_ACCESSIBILITY_SERVICE")],
  ["知识树公共池写明默认公开边界", sources["public/legal/privacy.html"].includes("个人知识树默认加入公共学习池") && sources["public/legal/terms.html"].includes("不公开原始输入或账号身份")],
  ["知识树公共池写明撤回权", sources["public/legal/privacy.html"].includes("按单棵树撤回公共学习池") && sources["public/legal/terms.html"].includes("可在应用内将单棵知识树撤回公共池")],
  ["用户协议写明注销保留例外", sources["public/legal/terms.html"].includes("最小同意凭证")],
  ["投诉页写明注销保留例外", sources["public/legal/complaints.html"].includes("最小同意凭证")],
  ["公开文案不得笼统承诺删除全部个人数据", !Object.values(sources).some((text) => text.includes("删除你的全部个人数据"))],
  ["政策不得把全部服务18+误写成国家一刀切要求", !Object.values(sources).some((text) => text.includes("按国家规定仅向年满 18"))],
  ["免责声明写明本地计算边界", sources["public/legal/disclaimer.html"].includes("设备本地、确定性公式工具")],
  ["危机独立记录不得再宣称保存200字原话", !Object.values(sources).some((text) => text.includes("原话摘要（最长 200") || text.includes("含原话摘要"))],
  ["隐私政策写明危机元数据不关联账号", sources["public/legal/privacy.html"].includes("不保存账号、用户 ID、昵称、邮箱、联系方式或输入原话/摘要")],
  ["隐私政策如实说明原输入仍属聊天历史", sources["public/legal/privacy.html"].includes("仍会按第 1、5、8、9 章所述保存在账号聊天记录中")],
  ["危机匿名元数据写明180天清理", sources["public/legal/privacy.html"].includes("超过 180 天") && sources["public/legal/terms.html"].includes("180 天后自动清理")],
  ["公开文案不得承诺实时人工跟进", !Object.values(sources).some((text) => text.includes("并由人工跟进") || text.includes("用于人工关怀跟进"))],
  ["公开文案不得继续宣称第三方模型全关闭", !Object.values(sources).some((text) => text.includes("当前第三方模型功能已关闭") || text.includes("当前运行状态：未启用第三方大模型处理"))],
  ["公开文案不得继续宣称当前不实时调用模型", !Object.values(sources).some((text) => text.includes("当前由审核文案库和规则自动回应，不实时调用云端大模型") || text.includes("当前使用审核文案库与规则自动回应，不实时调用云端大模型"))],
  ["官网与协议统一登记运营主体", ["src/App.tsx", "public/legal/privacy.html", "public/legal/terms.html", "public/legal/complaints.html"].every((name) => sources[name].includes("旬阳市槐序软件工作室"))],
  ["官网与协议统一抖音账号", ["src/App.tsx", "public/legal/privacy.html", "public/legal/terms.html", "public/legal/complaints.html"].every((name) => sources[name].includes("槐序工作室"))],
  ["公开源码不再保留旧抖音账号名或旧短链", !Object.values(sources).some((text) => /槐序学长|4vpWBY5MsL0|XTF17fnkqNE|N4weK8sUDmM/.test(text))],
];

const failed = checks.filter(([, ok]) => !ok);
if (failed.length > 0) {
  for (const [label] of failed) console.error(`FAIL: ${label}`);
  process.exitCode = 1;
} else {
  console.log(`PASS: ${checks.length} 项公开文案一致性检查`);
}
