# 🔍 Google API 問題診断レポート

## 📊 **現在の状況**

### 🌐 **サイト**: https://takarazuka-revue.vercel.app/
### ⏰ **診断日時**: 2024年9月29日
### 🎯 **問題**: Google Custom Search API が動作していない

---

## 🚨 **発見された問題**

### 1️⃣ **環境変数未設定**
```
コンソールメッセージ: "⚠️ Google API設定が見つかりません。デモモードを使用します。"

原因: Vercelの環境変数が設定されていない
状態: GOOGLE_SEARCH_API_KEY および GOOGLE_SEARCH_ENGINE_ID が未設定
```

### 2️⃣ **デモモードで動作中**
```
現在の状態: 代替のアバター画像を使用
影響: 実際のタカラジェンヌの写真が表示されない
動作: アプリ自体は正常に動作
```

---

## 🔧 **診断手順と解決方法**

### **Step 1: Google API設定の確認**

#### 🔍 **Google Cloud Consoleでの確認項目**
```bash
# 確認すべき項目:
1. プロジェクトが作成されているか
2. Custom Search API が有効化されているか  
3. APIキーが作成されているか
4. APIキーの制限設定が正しいか
5. 課金アカウントがリンクされているか
```

#### 🔑 **APIキー制限設定の確認**
```bash
Google Cloud Console > APIとサービス > 認証情報 > APIキー

HTTPリファラー制限に以下が追加されているかチェック:
✅ https://takarazuka-revue.vercel.app/*
✅ https://*.vercel.app/*
✅ https://localhost:*/*
✅ http://localhost:*/*

API制限:
✅ Custom Search API のみに制限されているか
```

### **Step 2: Programmable Search Engine 確認**

#### 🔍 **検索エンジン設定チェック**
```bash
https://programmablesearchengine.google.com/

確認項目:
1. 検索エンジンが作成されているか
2. 画像検索がオンになっているか
3. 検索サイトが適切に設定されているか
4. 検索エンジンIDが正しく取得できているか

推奨検索サイト:
- kageki.hankyu.co.jp
- ja.wikipedia.org
- *.wikipedia.org  
- www.google.com (全ウェブを検索)
```

### **Step 3: Vercel環境変数の設定**

#### ⚡ **Vercelでの環境変数設定手順**
```bash
1. https://vercel.com/dashboard にログイン
2. takarazuka-revue プロジェクトを選択
3. Settings > Environment Variables をクリック
4. 以下の変数を追加:

変数名: GOOGLE_SEARCH_API_KEY
値: AIzaSyC9w-[あなたのAPIキー]
環境: Production, Preview, Development (全て選択)

変数名: GOOGLE_SEARCH_ENGINE_ID  
値: [あなたの検索エンジンID]
環境: Production, Preview, Development (全て選択)

5. Save をクリック
6. Deployments > 最新のデプロイを選択 > Redeploy
```

### **Step 4: アプリ内設定の確認**

#### 🔧 **ブラウザでの設定方法**
```bash
1. https://takarazuka-revue.vercel.app/ にアクセス
2. 「🔧 Google API設定」ボタンをクリック
3. Google API Key と Search Engine ID を入力
4. 「接続をテスト」をクリック
5. 成功メッセージが表示されるまで調整

期待される結果:
✅ "Google API接続成功！実際の写真検索が可能です。"
```

---

## 🧪 **テスト手順**

### **Manual API Test**
```javascript
// ブラウザコンソールで実行可能なテストコード
async function testGoogleApi(apiKey, searchEngineId) {
    const testUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=宝塚歌劇団&searchType=image&num=1&safe=high`;
    
    try {
        const response = await fetch(testUrl);
        const data = await response.json();
        console.log('API Response:', data);
        return data;
    } catch (error) {
        console.error('API Error:', error);
        return error;
    }
}

// 使用例:
// testGoogleApi('your_api_key', 'your_search_engine_id');
```

---

## 🚨 **よくあるエラーと解決方法**

### **❌ 403 Forbidden エラー**
```bash
原因: HTTPリファラー制限の問題
解決方法:
1. Google Cloud Console > 認証情報 > APIキー
2. HTTPリファラー制限を確認・更新:
   https://takarazuka-revue.vercel.app/*
   https://*.vercel.app/*
3. 設定変更後5-10分待機
```

### **❌ 401 Unauthorized エラー**
```bash
原因: APIキーが無効またはAPI未有効化
解決方法:
1. APIキーを再生成
2. Custom Search API の有効化確認
3. 課金アカウントのリンク確認
```

### **❌ 検索結果なしエラー**
```bash
原因: 検索エンジンの設定問題
解決方法:
1. Programmable Search Engine で設定確認
2. 画像検索をオンに設定
3. 検索サイトに www.google.com を追加
```

### **❌ 環境変数エラー**
```bash
原因: Vercel環境変数の設定不備
解決方法:
1. Vercel Settings で環境変数確認
2. Production, Preview, Development 全てに設定
3. 再デプロイ実行
```

---

## ✅ **段階的な解決チェックリスト**

### **Phase 1: 基本設定確認**
- [ ] Google Cloud Console プロジェクト存在確認
- [ ] Custom Search API 有効化確認  
- [ ] APIキー作成確認
- [ ] 課金アカウントリンク確認

### **Phase 2: セキュリティ設定確認**  
- [ ] APIキーのHTTPリファラー制限設定
- [ ] API制限でCustom Search APIのみ許可
- [ ] Vercelドメインの許可設定

### **Phase 3: 検索エンジン設定確認**
- [ ] Programmable Search Engine 作成確認
- [ ] 画像検索オン設定確認
- [ ] 適切な検索サイト設定確認
- [ ] 検索エンジンID取得確認

### **Phase 4: デプロイメント設定**
- [ ] Vercel環境変数設定
- [ ] 全環境(Prod/Preview/Dev)への適用
- [ ] 再デプロイ実行
- [ ] アプリでの動作確認

### **Phase 5: 最終テスト**
- [ ] ブラウザでAPI設定画面テスト
- [ ] 実際のクイズでの写真表示確認
- [ ] コンソールエラーの消失確認
- [ ] 本物の写真表示確認

---

## 🎯 **即座に試すべき解決策**

### **🚀 クイックフィックス (5分で完了)**

1. **Vercel環境変数設定**
   ```bash
   Vercel Dashboard > Settings > Environment Variables
   GOOGLE_SEARCH_API_KEY と GOOGLE_SEARCH_ENGINE_ID を追加
   → Redeploy実行
   ```

2. **アプリ内設定**
   ```bash  
   アプリの「🔧 Google API設定」でAPIキーを直接入力
   → 「接続をテスト」で確認
   ```

3. **HTTPリファラー更新**
   ```bash
   Google Cloud Console > APIキー設定
   https://takarazuka-revue.vercel.app/* を追加
   → 5分待機後テスト
   ```

---

## 📞 **次のステップ**

1. **まず環境変数を確認** - Vercelで設定されているか
2. **APIキーの制限設定を確認** - ドメインが許可されているか  
3. **アプリで直接テスト** - 設定画面でAPIキーを入力してテスト
4. **段階的にテスト** - エラーメッセージに基づいて問題を特定

**最も可能性の高い原因**: Vercelの環境変数が未設定またはAPIキーのHTTPリファラー制限にVercelドメインが追加されていない。

この診断に基づいて、具体的な設定を確認・修正してください！ 🔧✨