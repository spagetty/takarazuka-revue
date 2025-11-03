# 宝塚漢字学習アプリ - 実装仕様書

## 1. アーキテクチャ概要

### 1.1 システムアーキテクチャ
```
┌─────────────────────────────────────────────────────┐
│                   Browser (Client)                   │
├─────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │  HTML (View) │  │  CSS (Style) │  │  JS (Logic)│ │
│  │  index.html  │  │  style.css   │  │  app.js   │ │
│  │              │  │  effects.css │  │  data.js  │ │
│  └──────────────┘  └──────────────┘  │  effects.js│ │
│                                       │  config.js │ │
│                                       └───────────┘ │
├─────────────────────────────────────────────────────┤
│              localStorage (Persistence)              │
│  - 正解データ (takarazuka_correct_answers)           │
│  - API設定 (GOOGLE_SEARCH_API_KEY, etc.)            │
├─────────────────────────────────────────────────────┤
│              External APIs                           │
│  - Google Custom Search API (写真検索)               │
│  - Web Audio API (サウンド)                          │
└─────────────────────────────────────────────────────┘
```

### 1.2 技術スタック

| レイヤー | 技術 | バージョン | 用途 |
|---------|------|-----------|------|
| マークアップ | HTML5 | - | DOM構造 |
| スタイル | CSS3 | - | UI/UXデザイン、アニメーション |
| ロジック | JavaScript (ES6+) | - | アプリケーションロジック |
| サウンド | Web Audio API | - | 音響エフェクト |
| ストレージ | localStorage | - | データ永続化 |
| 外部API | Google Custom Search API | v1 | 画像検索 |

### 1.3 ディレクトリ構造
```
takarazuka-revue/
├── index.html                  # メインHTMLファイル
├── Spec.md                     # 要件定義書（本ドキュメント）
├── Design.md                   # 実装仕様書（本ドキュメント）
├── Tasks.md                    # 実装計画書
├── README.md                   # プロジェクト概要
├── IMPLEMENTATION_STATUS.md    # 実装状況
├── css/
│   ├── style.css              # メインスタイル
│   └── effects.css            # エフェクト専用スタイル
├── js/
│   ├── app.js                 # メインアプリケーション
│   ├── data.js                # データベース定義
│   ├── effects.js             # エフェクトクラス
│   ├── config.js              # 設定管理
│   ├── google-search-setup.js # Google検索セットアップ
│   └── real-google-search.js  # Google検索実装
└── (その他のドキュメント)
```

## 2. データモデル設計

### 2.1 劇団員データモデル

#### TAKARAZUKA_PERFORMERS（配列）
```javascript
{
  name: string,          // 芸名（例: "鳳月杏"）
  reading: string,       // ふりがな（例: "ほうづきあん"）
  troupe: string,        // 組名（例: "月組"）
  troupeColor: string,   // 組カラーコード（例: "tsuki"）
  era: string,           // 時代区分（"現役" | "歴代"）
  photoUrl: string       // 写真URL（プレースホルダー）
}
```

#### PERFORMER_PROFILES（オブジェクト）
```javascript
{
  [performerName: string]: {
    realName: string,        // 本名/芸名（公式表記）
    birthDate: string,       // 生年月日
    hometown: string,        // 出身地
    joinYear: string,        // 入団年
    era: string,            // 時代区分
    description: string      // プロフィール説明
  }
}
```

### 2.2 漢字データモデル

#### KANJI_DATABASE（配列）
```javascript
{
  kanji: string,          // 漢字（例: "月"）
  readings: string[],     // 読み方の配列（例: ["つき", "がつ", "げつ"]）
  level: number          // 漢字検定級（10 | 9）
}
```

### 2.3 問題データモデル

#### Question（生成される問題オブジェクト）
```javascript
{
  id: string,                // 問題ID（例: "鳳月杏-月"）
  performer: Performer,      // 劇団員オブジェクト
  kanji: string,            // 出題する漢字
  kanjiData: KanjiData,     // 漢字情報オブジェクト
  correctReading: string,   // 正解の読み方
  options: string[],        // 4つの選択肢
  correctIndex: number      // 正解の選択肢インデックス（0-3）
}
```

### 2.4 正解データモデル（localStorage）

#### takarazuka_correct_answers（配列）
```javascript
[
  {
    id: string,                    // 一意ID（例: "鳳月杏_月"）
    performer: {
      name: string,
      reading: string,
      troupe: string,
      troupeColor: string,
      era: string
    },
    kanjiData: {
      kanji: string,
      level: number,
      readings: string[]
    },
    answeredAt: string,           // ISO8601形式のタイムスタンプ
    answeredDate: string          // 日本語日付（例: "2024/11/3"）
  }
]
```

### 2.5 Google API設定データモデル（localStorage）

```javascript
{
  GOOGLE_SEARCH_API_KEY: string,      // Google APIキー
  GOOGLE_SEARCH_ENGINE_ID: string     // 検索エンジンID
}
```

## 3. クラス設計

### 3.1 TakarazukaKanjiApp（メインアプリケーションクラス）

**責務**: アプリケーション全体の状態管理とフロー制御

**プロパティ**:
```javascript
class TakarazukaKanjiApp {
  currentQuestionIndex: number;     // 現在の問題番号
  correctAnswers: number;           // 正解数
  totalQuestions: number;           // 総問題数（60）
  questions: Question[];            // 問題配列
  currentQuestion: Question | null; // 現在の問題
  isAnswering: boolean;             // 回答中フラグ
  usedPerformers: Set<string>;      // 使用済み劇団員セット
  correctQuestions: Set<string>;    // 正解済み問題IDセット
}
```

**主要メソッド**:
```javascript
// 初期化
initializeApp(): void
bindEvents(): void

// 問題生成
generateQuestions(): void
createQuestion(): Question | null
getQuestionId(question: Question): string
extractKanjiFromName(name: string): string[]
generateWrongOptions(correctReading: string, targetKanji: string): string[]
shuffleArray(array: any[]): any[]

// 画面制御
showStartScreen(): void
showQuestion(): void
showResult(selectedIndex: number): void
showCompletionScreen(): void
showPortfolio(): void
hideAllScreens(): void

// クイズフロー
startQuiz(): void
selectAnswer(answerIndex: number): void
nextQuestion(): void
restartQuiz(): void

// UI更新
updateProgress(): void
applyTroupeTheme(troupeColor: string): void
displayPerformerInfo(performer: Performer): void
displayQuestion(question: Question): void
resetOptions(): void
showPerformerProfile(): void

// 写真検索
loadPerformerPhoto(performer: Performer): Promise<void>
searchPerformerPhoto(performer: Performer): Promise<string | null>
searchGoogleCustomSearch(query: string, performer: Performer): Promise<string | null>
generatePerformerAvatar(performer: Performer): string

// ポートフォリオ
saveCorrectAnswer(performer: Performer, kanjiData: KanjiData): void
loadPortfolioData(): void
createPortfolioScreen(): void
updatePortfolioStats(answers: CorrectAnswer[]): void
renderPortfolioItems(answers: CorrectAnswer[]): void
filterPortfolioItems(filter: string): void
exportPortfolio(): void

// ユーティリティ
getTroupeIcon(troupe: string): string
getKanjiLevelColor(level: number): string
simpleHash(str: string): number
```

### 3.2 TakarazukaEffects（エフェクトクラス）

**責務**: ビジュアルエフェクトとサウンドの制御

**プロパティ**:
```javascript
class TakarazukaEffects {
  audioContext: AudioContext | null;
  isAudioEnabled: boolean;
}
```

**主要メソッド**:
```javascript
// エフェクト実行
playCorrectCelebration(performer: Performer, kanjiData: KanjiData): Promise<void>
createSparkles(container: HTMLElement, troupeColor: string, type: string): void
createSingleSparkle(container: HTMLElement, color: string, type: string): HTMLElement

// サウンド制御
playTakarazukaFanfare(troupeColor: string): Promise<void>
createTone(frequency: number, duration: number, type: string): Promise<void>
initializeAudio(): void

// ユーティリティ
getTroupeColors(troupeColor: string): string[]
getSparkleIcon(type: string): string
```

### 3.3 RealGoogleImageSearch（Google検索クラス）

**責務**: Google Custom Search APIとの連携

**プロパティ**:
```javascript
class RealGoogleImageSearch {
  apiKey: string;
  searchEngineId: string;
  cache: Map<string, CachedImage>;
}
```

**主要メソッド**:
```javascript
// 検索実行
searchTakarazukaPerformer(performer: Performer): Promise<string | null>
searchWithQuery(query: string): Promise<string | null>

// API制御
updateApiConfig(apiKey: string, searchEngineId: string): void
buildSearchUrl(query: string): string
selectBestImage(items: ImageItem[]): ImageItem | null

// キャッシュ管理
getCachedImage(key: string): string | null
setCachedImage(key: string, url: string): void
clearCache(): void
```

## 4. データフロー

### 4.1 アプリケーション初期化フロー

```
[ページ読み込み]
      ↓
[DOMContentLoaded イベント]
      ↓
[TakarazukaKanjiApp インスタンス化]
      ↓
[initializeApp()]
      ↓
  ┌─────────────────┐
  │ generateQuestions() │ ← 60問の問題を生成
  └─────────────────┘
      ↓
  ┌─────────────────┐
  │ bindEvents()     │ ← イベントリスナー設定
  └─────────────────┘
      ↓
  ┌─────────────────┐
  │ showStartScreen()│ ← スタート画面表示
  └─────────────────┘
```

### 4.2 クイズフロー

```
[スタートボタンクリック]
      ↓
[startQuiz()]
      ↓
[showQuestion()] ──┐
      ↓            │
[問題表示]         │
      ↓            │
[ユーザーが選択肢をクリック]
      ↓            │
[selectAnswer(answerIndex)]
      ↓            │
[showResult(selectedIndex)]
      ↓            │
  ┌─正解？─┐      │
  │   YES   │      │
  └─────────┘      │
      ↓            │
[キラキラエフェクト実行]
[サウンド再生]    │
[正解データ保存]   │
      ↓            │
[次の問題ボタンクリック]
      ↓            │
[nextQuestion()] ──┘
      ↓
[全問完了？]
  YES → [showCompletionScreen()]
  NO  → [showQuestion()] へ戻る
```

### 4.3 ポートフォリオフロー

```
[ポートフォリオボタンクリック]
      ↓
[showPortfolio()]
      ↓
  ┌─────────────────────┐
  │ hideAllScreens()    │
  └─────────────────────┘
      ↓
  ┌─────────────────────┐
  │ loadPortfolioData() │
  └─────────────────────┘
      ↓
  ┌───────────────────────────────┐
  │ localStorage から正解データ取得 │
  └───────────────────────────────┘
      ↓
  ┌─────────────────────┐
  │ updatePortfolioStats()│ ← 統計情報更新
  └─────────────────────┘
      ↓
  ┌─────────────────────┐
  │ renderPortfolioItems()│ ← カード表示
  └─────────────────────┘
      ↓
[フィルターボタンクリック]
      ↓
[filterPortfolioItems(filter)]
      ↓
[該当する組のカードのみ表示]
```

### 4.4 写真検索フロー

```
[showQuestion()]
      ↓
[loadPerformerPhoto(performer)]
      ↓
[ローディング表示]
      ↓
[searchPerformerPhoto(performer)]
      ↓
  ┌─Google API設定済み？─┐
  │       YES             │
  └───────────────────────┘
      ↓
[searchGoogleCustomSearch(query, performer)]
      ↓
  ┌─写真が見つかった？─┐
  │      YES            │
  └─────────────────────┘
      ↓                ↓
   [写真表示]    [generatePerformerAvatar()]
                      ↓
                 [アバター表示]
```

## 5. API仕様

### 5.1 Google Custom Search API

**エンドポイント**:
```
GET https://www.googleapis.com/customsearch/v1
```

**パラメータ**:
```javascript
{
  key: string,          // APIキー
  cx: string,           // 検索エンジンID
  q: string,            // 検索クエリ
  searchType: 'image',  // 画像検索
  imgType: 'photo',     // 写真のみ
  imgSize: 'medium',    // 中サイズ
  safe: 'active',       // セーフサーチ有効
  num: 3,              // 取得件数
  fileType: 'jpg|png',  // ファイル形式
  rights: 'cc_publicdomain|cc_attribute'  // ライセンス
}
```

**レスポンス**:
```javascript
{
  items: [
    {
      link: string,           // 画像URL
      title: string,          // タイトル
      image: {
        width: number,
        height: number,
        contextLink: string
      }
    }
  ]
}
```

**エラーハンドリング**:
- HTTP 400: パラメータエラー → フォールバック画像
- HTTP 403: API制限超過 → フォールバック画像
- HTTP 429: レート制限 → フォールバック画像
- タイムアウト（5秒） → フォールバック画像

### 5.2 Web Audio API

**使用メソッド**:
```javascript
// AudioContext作成
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// オシレーター作成（音源）
const oscillator = audioContext.createOscillator();
oscillator.type = 'sine' | 'square' | 'sawtooth' | 'triangle';
oscillator.frequency.value = frequency; // Hz

// ゲインノード作成（音量制御）
const gainNode = audioContext.createGain();
gainNode.gain.value = volume; // 0.0 - 1.0

// 接続して再生
oscillator.connect(gainNode);
gainNode.connect(audioContext.destination);
oscillator.start(startTime);
oscillator.stop(stopTime);
```

## 6. UI/UXデザイン仕様

### 6.1 カラーパレット

#### 組別テーマカラー
```css
/* 月組 (tsuki) */
--troupe-tsuki-primary: #2c3e50;    /* ダークブルー */
--troupe-tsuki-secondary: #34495e;   /* ミッドナイトブルー */
--troupe-tsuki-accent: #3498db;      /* スカイブルー */

/* 花組 (hana) */
--troupe-hana-primary: #e74c3c;      /* レッド */
--troupe-hana-secondary: #c0392b;    /* ダークレッド */
--troupe-hana-accent: #f8bbd9;       /* ピンク */

/* 雪組 (yuki) */
--troupe-yuki-primary: #ecf0f1;      /* ホワイト */
--troupe-yuki-secondary: #bdc3c7;    /* シルバー */
--troupe-yuki-accent: #3498db;       /* アイスブルー */

/* 星組 (hoshi) */
--troupe-hoshi-primary: #1abc9c;     /* ティール */
--troupe-hoshi-secondary: #16a085;   /* グリーンシー */
--troupe-hoshi-accent: #f1c40f;      /* ゴールド */

/* 宙組 (sora) */
--troupe-sora-primary: #3498db;      /* ブルー */
--troupe-sora-secondary: #2980b9;    /* ダークブルー */
--troupe-sora-accent: #9b59b6;       /* パープル */
```

### 6.2 タイポグラフィ

```css
/* 見出し */
h1 { font-size: 2rem; font-weight: bold; }
h2 { font-size: 1.5rem; font-weight: bold; }
h3 { font-size: 1.25rem; font-weight: bold; }

/* 本文 */
body { font-size: 16px; line-height: 1.6; }

/* 劇団員名 */
.performer-name { font-size: 1.5rem; font-weight: bold; }

/* 問題漢字 */
.question-kanji { font-size: 3rem; font-weight: bold; }
```

### 6.3 レイアウトグリッド

```css
/* モバイル（〜767px） */
.container { max-width: 100%; padding: 1rem; }
.option-button { width: 100%; margin: 0.5rem 0; }

/* タブレット（768px〜1023px） */
@media (min-width: 768px) {
  .container { max-width: 720px; padding: 1.5rem; }
  .options-container { display: grid; grid-template-columns: 1fr 1fr; }
}

/* デスクトップ（1024px〜） */
@media (min-width: 1024px) {
  .container { max-width: 960px; padding: 2rem; }
  .options-container { grid-template-columns: 1fr 1fr; gap: 1rem; }
}
```

### 6.4 アニメーション

#### キラキラエフェクト
```css
@keyframes sparkle-float {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(var(--dx), var(--dy)) scale(0);
    opacity: 0;
  }
}

.sparkle {
  animation: sparkle-float 1.5s ease-out forwards;
}
```

#### ボタンホバー
```css
.option-button {
  transition: transform 0.2s, background-color 0.3s;
}

.option-button:hover {
  transform: scale(1.05);
  background-color: rgba(255, 255, 255, 0.3);
}
```

## 7. パフォーマンス最適化

### 7.1 画像最適化

**戦略**:
- 遅延読み込み（問題表示時に写真を読み込む）
- 適切な画像サイズ（150x150px）
- フォールバック画像の即座表示
- メモリキャッシュ（Map使用）

**実装**:
```javascript
// 画像のプリロード
const img = new Image();
img.onload = () => { /* 表示 */ };
img.onerror = () => { /* フォールバック */ };
img.src = photoUrl;
```

### 7.2 DOM操作最適化

**戦略**:
- 必要最小限のDOM更新
- DocumentFragmentの使用（ポートフォリオ生成時）
- CSSクラスの追加/削除のみで状態変更

**実装**:
```javascript
// 悪い例
element.style.backgroundColor = 'red';
element.style.color = 'white';

// 良い例
element.classList.add('correct');
```

### 7.3 アニメーション最適化

**戦略**:
- CSS transformとopacityのみ使用（GPU加速）
- will-changeプロパティの活用
- requestAnimationFrameの使用

**実装**:
```css
.sparkle {
  will-change: transform, opacity;
  transform: translateZ(0); /* GPU加速 */
}
```

### 7.4 localStorage最適化

**戦略**:
- 必要最小限のデータのみ保存
- JSON.stringify/parseの最適化
- データサイズ監視（5MB制限）

**実装**:
```javascript
// データの圧縮（不要なプロパティを削除）
const compactData = answers.map(a => ({
  id: a.id,
  p: a.performer.name,
  k: a.kanjiData.kanji,
  d: a.answeredDate
}));
```

## 8. セキュリティ設計

### 8.1 XSS対策

**戦略**:
- ユーザー入力のサニタイズ（該当なし - 入力フォームなし）
- textContentの使用（innerHTMLを避ける）
- DOMPurifyライブラリ（将来的に検討）

**実装**:
```javascript
// 安全な方法
element.textContent = userInput;

// 危険な方法（使用しない）
// element.innerHTML = userInput;
```

### 8.2 APIキー保護

**戦略**:
- クライアントサイドでの保存（localStorage）
- HTTPリファラー制限（Google Cloud Console）
- API使用量制限（Google Cloud Console）

**注意事項**:
- APIキーはユーザーローカル環境のみに保存
- リポジトリにAPIキーをコミットしない
- .env.exampleファイルで設定方法を説明

### 8.3 CORS対策

**戦略**:
- Google APIのCORS設定を確認
- fetchのmodeオプション設定

**実装**:
```javascript
fetch(url, {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
});
```

## 9. テスト戦略

### 9.1 単体テスト（推奨）

**対象**:
- `generateWrongOptions()` - 間違い選択肢生成
- `extractKanjiFromName()` - 漢字抽出
- `getQuestionId()` - 問題ID生成
- `shuffleArray()` - 配列シャッフル
- `simpleHash()` - ハッシュ生成

**ツール**:
- Jest（推奨）
- Mocha + Chai

### 9.2 統合テスト（推奨）

**対象**:
- クイズフロー全体
- ポートフォリオ保存・読み込み
- 写真検索フローバック

**ツール**:
- Cypress
- Playwright

### 9.3 E2Eテスト（推奨）

**シナリオ**:
1. スタート画面 → クイズ開始 → 問題回答 → 完了画面
2. ポートフォリオボタン → ポートフォリオ表示 → フィルター操作
3. API設定 → テスト → 保存

**ツール**:
- Cypress
- Selenium

### 9.4 手動テスト（現在実施中）

**チェックリスト**:
- [ ] 全ブラウザでの動作確認
- [ ] モバイル端末での動作確認
- [ ] ネットワークオフライン時の動作
- [ ] localStorage容量超過時の動作
- [ ] API制限超過時の動作

## 10. デプロイメント

### 10.1 ビルドプロセス

**現在**: ビルドプロセスなし（静的ファイルのみ）

**将来的に検討**:
- Webpack/Vite によるバンドル
- CSS/JSの最小化
- 画像最適化

### 10.2 ホスティング

**推奨プラットフォーム**:
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

**設定例（GitHub Pages）**:
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

### 10.3 環境変数

**設定ファイル**: `.env.example`
```
GOOGLE_SEARCH_API_KEY=your_api_key_here
GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id_here
```

**注意**: 実際の`.env`ファイルは`.gitignore`に追加

## 11. 監視とロギング

### 11.1 エラーロギング

**現在の実装**:
```javascript
console.log()   // 通常のログ
console.warn()  // 警告
console.error() // エラー
```

**将来的に検討**:
- Sentryによるエラートラッキング
- Google Analyticsによるイベントトラッキング

### 11.2 パフォーマンス監視

**実装**:
```javascript
// Performance APIの使用
const startTime = performance.now();
// 処理
const endTime = performance.now();
console.log(`処理時間: ${endTime - startTime}ms`);
```

## 12. 今後の拡張計画

### 12.1 短期（1-3ヶ月）
- [ ] PWA対応（オフライン動作）
- [ ] 音声読み上げ機能
- [ ] より詳細な統計情報

### 12.2 中期（3-6ヶ月）
- [ ] ユーザーアカウント機能
- [ ] クラウドデータ同期
- [ ] リーダーボード

### 12.3 長期（6ヶ月以上）
- [ ] 漢字検定8級以上の対応
- [ ] マルチプレイヤーモード
- [ ] ソーシャルシェア機能

## 13. 参考資料

### 13.1 公式ドキュメント
- [MDN Web Docs](https://developer.mozilla.org/)
- [Google Custom Search API](https://developers.google.com/custom-search)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

### 13.2 関連リソース
- [宝塚歌劇団公式サイト](https://kageki.hankyu.co.jp/)
- [漢字検定公式サイト](https://www.kanken.or.jp/)

## 14. 変更履歴

| バージョン | 日付 | 変更内容 | 作成者 |
|-----------|------|---------|--------|
| 1.0 | 2025-11-03 | 初版作成（既存実装から仕様を抽出） | Claude Code |

## 15. 承認

本実装仕様書は、既存の実装を基に作成されました。

---

**次のステップ**: Tasks.md（実装計画書）の作成
