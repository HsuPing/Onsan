# 温啓源紀念網站

紀念使用者舅舅 **温啓源（1967.12.17 — 2026）** 的靜態網站。
2026.04.30 告別禮拜（台北市立懷愛館）使用。

- **Live：** https://hsuping.github.io/Onsan/
- **Repo：** https://github.com/HsuPing/Onsan （`main` 分支，root path，GitHub Pages）
- **本機原始檔：** `/Users/pinhsu/Documents/My Uncle/`
- **舅媽 FB（連結用）：** https://www.facebook.com/onsan.onsan.2025

## 頁面結構

| 檔案 | 用途 |
| --- | --- |
| `index.html` | 首頁。Hero（大頭照、姓名、生卒、座右銘、悼詞）+ 四張卡片（紀念禮拜／相簿／RoadWatchR／Facebook） |
| `memorial.html` | 告別禮拜程序：入殮／告別／火化／安葬／謝詞／生平略歷（中）／略歴（日）|
| `gallery.html` | 上方輪播 + 下方平鋪 92 張照片（含 lightbox）+ 末段「影像追思」兩支家庭影片 |
| `RoadWatcher-master/` | 使用者以前幫舅舅做的產品介紹站（汽車 A 柱盲區專利），保留現狀，從首頁連過去 |
| `memorial.md` | memorial.html 的 markdown 來源（人工同步，編輯 HTML 為主） |

## 共用資源

| 檔案 | 用途 |
| --- | --- |
| `style.css` | 設計系統：暖灰米色調 / Noto Serif TC / 元件樣式 |
| `i18n.js` | 中⇆日切換（`data-i18n` 屬性 + `localStorage`） |
| `gallery.js` | 相簿輪播 + 平鋪 + lightbox 互動 |
| `favicon.svg` | 暖色十字架圖示 |
| `convert_pics.sh` | HEIC/JPG → WebP 批次轉檔腳本 |

## 技術選擇

- **零依賴：** 純 HTML / vanilla JS / vanilla CSS，無 build step、無框架
- **字型：** Google Fonts 載 Noto Serif/Sans TC + JP（每頁都有 link）
- **照片：** WebP, 最長邊 1600px, q=82（原檔 52MB → 13MB）
- **無障礙：** `prefers-reduced-motion` 支援；keyboard / 觸控滑動皆可操作 lightbox 與 carousel

## 設計 tokens

```
--bg: #faf6f0  --bg-alt: #f2ece2  --bg-card: #fff
--text: #3a342e  --text-muted: #7a6f63  --text-soft: #a89d8e
--accent: #8b7355  --accent-dark: #6d5a42
--serif: 'Noto Serif TC' / --sans: 'Noto Sans TC'
--serif-ja: 'Noto Serif JP' / --sans-ja: 'Noto Sans JP'
```

JP 字型在 `html[lang="ja"]` 時自動切換。

## i18n 規則

- **元素層級：** 加 `data-i18n="key"`，i18n.js 啟動時抓取 key 對應字串塞進 `textContent`。
- **含 HTML：** 加 `data-i18n-html` 屬性，改用 `innerHTML`。
- **`<title>` 也支援：** `<title data-i18n="page.title.xxx">…</title>` 切換時連分頁標題一起改。
- **區塊層級替換：** 用 class `.only-zh` / `.only-ja`，CSS 依 `html[lang]` 顯示／隱藏。memorial.html 的中／日略歷是這樣切。
- **localStorage key：** `lang`（值為 `'zh'` 或 `'ja'`），預設 `zh`。
- **切換按鈕：** `.lang-toggle` button，按鈕文字顯示「將切到的語言」（zh 模式顯示「日本語」）。
- **i18n.js 早期 init：** 每個 HTML 的 `<head>` 都有一段 inline script 在 stylesheet 之前先讀 localStorage 並 set `<html lang>`，避免 FOUC。

### **不**翻成日文的部分（保留中文 / 台語原文）
- 聖經經文（中文和合本）
- 台語聖詩歌詞（590, 613, 397, 160, 536 首）
- 程序表格內欄位（序樂、宣召、會眾⋯）
- 家屬謝詞段落
- 慰詩〈生命（いのち）〉本身就是雙語並列，維持原樣

## 相簿設定

- 92 張 WebP 在 `pic/web/`（已 commit）
- 原圖（`.heic`/`.JPG`）在 `pic/` 根目錄，被 `.gitignore` 排除（52MB 太大）
- 第二批原圖在 `pic2/`，也被 `.gitignore` 排除
- 兩支家庭影片在 `media/`（video1.mp4 48s/12MB、video2.mp4 17s/4.4MB），含同名 `.jpg` poster，皆已 commit
- 排序：`gallery.js` 中的 `PHOTOS` 陣列依時序手排
- 檔名規則：去掉 `LINE_ALBUM_` 前綴與 `_260428` 後綴，空白換 `_`
- **首頁 hero 大頭照：** `pic/web/20241215聯合慶生ATT瀧厚_1.webp`

## 部署流程

```bash
git add -A
git commit -m "..."
# 注意：要在 URL 內帶 token，keychain 有錯帳號
git push "https://<TOKEN>@github.com/HsuPing/Onsan.git" main
```

GitHub Pages 約 30–60 秒重新建置完成。

> **⚠️ macOS keychain 警告：** 系統鑰匙圈快取了使用者另一帳號 `PinHsu90073947` 的 GitHub 憑證，沒有 `HsuPing/Onsan` 寫入權限，所以每次 push 必須在 URL 帶 token，或進「鑰匙圈存取」搜尋 `github.com` 把舊條目刪掉重新登入 HsuPing。

> **⚠️ Token 安全：** 第一次部署使用的 PAT 已在對話內外曝光，建議使用者已撤銷並重新產生。

## 待辦／可優化（之後再做）

- [ ] memorial.html 與 memorial.md 同步機制（目前是手動）
- [ ] 相簿的事件群組標籤（目前是平鋪，使用者要求簡化過）
- [ ] RoadWatcher-master 內部仍有「Road WatchR」（含空格）的舊字樣，使用者只要求改首頁卡片，未動產品站
- [ ] PWA 支援（offline 瀏覽）
- [ ] 加入留言／追思功能（目前透過 FB 達成）

## 內容來源

- 主要內容：`2026.4.30主內故温啓源兄弟告別禮拜程序.pdf`（教會印製的紙本程序冊）
- 照片：使用者 LINE 相簿匯出 + iPhone HEIC 原檔
- 座右銘（首頁 hero）：「幫人難處　記人好處　識人長處」／「人の難を助け、人の恩を覚え、人の長所を知る」
