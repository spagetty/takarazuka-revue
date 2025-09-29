# 🔍 Google Custom Search API 設定完全ガイド

## 🎯 **目的**
宝塚漢字学習アプリで**本物のタカラジェンヌの写真**を表示するためのGoogle API設定

## 📋 **必要なもの**
- Googleアカウント
- クレジットカード（無料枠内でも登録必要）
- 約15-20分の設定時間

---

## 🚀 **Step 1: Google Cloud Console プロジェクト作成**

### 1️⃣ **Google Cloud Console にアクセス**
```
🌐 https://console.cloud.google.com/ にアクセス
🔑 Googleアカウントでログイン
```

### 2️⃣ **新しいプロジェクトを作成**
```
1. 左上の「プロジェクトを選択」をクリック
2. 「新しいプロジェクト」をクリック
3. プロジェクト名入力: "takarazuka-kanji-app"
4. 「作成」をクリック
5. プロジェクトが作成されるまで待機（約30秒）
```

### 3️⃣ **課金アカウントの設定**
```
⚠️ 注意: 無料枠内でも課金アカウント登録が必要です

1. 左メニュー「お支払い」をクリック
2. 「課金アカウントをリンク」をクリック  
3. クレジットカード情報を入力
4. 「無料トライアルを開始」をクリック

💰 料金: 1日10,000回まで無料、超過分は1,000回ごとに$5
```

---

## 🔧 **Step 2: Custom Search API の有効化**

### 1️⃣ **APIライブラリにアクセス**
```
1. 左メニュー「APIとサービス」> 「ライブラリ」をクリック
2. 検索ボックスに「Custom Search API」と入力
3. 「Custom Search API」を選択
4. 「有効にする」をクリック
```

### 2️⃣ **API有効化の確認**
```
✅ 「APIが有効になりました」のメッセージが表示される
✅ ダッシュボードでCustom Search APIが表示される
```

---

## 🔑 **Step 3: API キーの作成**

### 1️⃣ **認証情報ページへ移動**
```
1. 左メニュー「APIとサービス」> 「認証情報」をクリック
2. 上部「+ 認証情報を作成」をクリック
3. 「APIキー」を選択
```

### 2️⃣ **API キーの設定**
```
1. APIキーが自動生成される: AIzaSyC9w-XXXXXXXXXXXXXXXXx
2. 「キーを制限」をクリック（セキュリティのため）
3. 名前を設定: "Takarazuka App API Key"
```

### 3️⃣ **API制限の設定**
```
🔒 アプリケーションの制限:
「HTTPリファラー（ウェブサイト）」を選択

📝 ウェブサイトの制限:
以下のURLパターンを追加:
- https://your-app-domain.vercel.app/*  
- https://your-app-domain.netlify.app/*
- https://localhost:*/*
- http://localhost:*/*

🎯 API の制限:
「キーを制限」> 「Custom Search API」にチェック

💾 「保存」をクリック
```

### 4️⃣ **APIキーをコピー**
```
📋 生成されたAPIキーをコピー・保存:
AIzaSyC9w-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

⚠️ 重要: このキーは後で使用するので安全に保管
```

---

## 🔍 **Step 4: Programmable Search Engine の作成**

### 1️⃣ **Programmable Search Engine にアクセス**
```
🌐 https://programmablesearchengine.google.com/ にアクセス
🔑 同じGoogleアカウントでログイン
```

### 2️⃣ **新しい検索エンジンを作成**
```
1. 「開始する」または「Add」をクリック
2. 「新しい検索エンジンを作成」を選択
```

### 3️⃣ **検索エンジンの設定**
```
🌐 検索するサイト:
kageki.hankyu.co.jp
ja.wikipedia.org
*.wikipedia.org
takarazuka-fan.com
kageki.hankyu.co.jp/revue
www.sankei.com/entertainments/takarazuka

📝 検索エンジンの名前:
Takarazuka Performer Search

🌍 言語:
日本語

🔍 セーフサーチ:
厳格
```

### 4️⃣ **画像検索の有効化**
```
⚙️ 検索エンジンが作成された後:
1. 「制御パネル」をクリック
2. 「設定」タブをクリック  
3. 「画像検索」を「オン」に設定
4. 「更新」をクリック
```

### 5️⃣ **検索エンジンIDを取得**
```
📋 「概要」タブで検索エンジンIDをコピー:
1234567890abcdef:xxxxxxxx

⚠️ 重要: このIDは後で使用するので保存
```

---

## 🎯 **Step 5: アプリケーションでの設定**

### 1️⃣ **環境変数の設定**

#### 🌐 **Vercel での設定**
```
1. Vercel Dashboard > Settings > Environment Variables
2. 以下の変数を追加:

変数名: GOOGLE_SEARCH_API_KEY
値: AIzaSyC9w-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

変数名: GOOGLE_SEARCH_ENGINE_ID  
値: 1234567890abcdef:xxxxxxxx

3. 「Save」をクリック
4. 再デプロイを実行
```

#### 🌐 **Netlify での設定**
```
1. Netlify Dashboard > Site settings > Environment variables
2. 「Add variable」をクリック
3. 上記と同じキー・値を設定
```

#### 🌐 **ローカル開発での設定**
```
1. プロジェクトルートに .env ファイル作成
2. 以下を記述:

GOOGLE_SEARCH_API_KEY=AIzaSyC9w-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
GOOGLE_SEARCH_ENGINE_ID=1234567890abcdef:xxxxxxxx

3. .env をgitignoreに追加（セキュリティのため）
```

### 2️⃣ **アプリ内での設定 (ブラウザ)**
```
1. アプリにアクセス
2. 「🔧 Google API設定」ボタンをクリック
3. APIキーと検索エンジンIDを入力
4. 「設定を保存」をクリック  
5. 「接続テスト」でテストを実行
6. ✅ 成功メッセージが表示されれば完了
```

---

## 🧪 **Step 6: 動作テスト**

### 1️⃣ **API接続テスト**
```
🔗 アプリの「Google API設定」画面で:
1. APIキーと検索エンジンIDを入力
2. 「接続をテスト」をクリック  
3. 以下のいずれかが表示される:

✅ 成功: "Google API接続成功！実際の写真検索が可能です。"
⚠️ 警告: "API接続は成功しましたが、検索結果がありません。"
❌ エラー: "APIエラー: 403 Forbidden" など
```

### 2️⃣ **実際の写真検索テスト**
```
📚 クイズを開始して確認:
1. 学習開始をクリック
2. 問題が表示される
3. タカラジェンヌの写真が読み込まれる

✅ 成功時: 実際の公式写真が表示
❌ 失敗時: 代替のアバター画像が表示
```

---

## 🔧 **トラブルシューティング**

### ❌ **よくあるエラーと解決方法**

#### 🚫 **403 Forbidden エラー**
```
原因: APIキーの制限設定
解決方法:
1. Google Cloud Console > 認証情報
2. APIキーを選択
3. HTTPリファラーにアプリのURLを追加:
   - https://your-app.vercel.app/*
   - https://localhost:*/*
4. 保存して5-10分待機
```

#### 🚫 **401 Unauthorized エラー**  
```
原因: 無効なAPIキー
解決方法:
1. APIキーを再確認
2. Custom Search APIが有効化されているか確認
3. 課金アカウントがリンクされているか確認
```

#### 🚫 **検索結果なしエラー**
```
原因: 検索エンジン設定
解決方法:  
1. Programmable Search Engine で設定確認
2. 検索サイトに以下を追加:
   - kageki.hankyu.co.jp/*
   - *.wikipedia.org/*  
   - www.google.com/*
3. 画像検索が有効になっているか確認
```

#### 🚫 **課金エラー**
```
原因: 課金アカウント未設定
解決方法:
1. Google Cloud Console > お支払い
2. 課金アカウントをリンク
3. クレジットカード情報を入力
💡 無料枠内でも登録必要
```

---

## 💰 **料金・使用量について**

### 📊 **無料枠**
```
✅ 1日あたり: 10,000回の検索
✅ 月額: $0 (無料枠内)
✅ 制限: なし（通常使用範囲内）
```

### 💳 **有料プラン**
```
超過料金: 1,000回ごとに$5
月間想定: 通常使用で$0-10程度
上限設定: 可能（予算制限設定）
```

### 📈 **使用量確認方法**
```
1. Google Cloud Console > APIとサービス > ダッシュボード
2. Custom Search API の使用状況を確認
3. グラフで1日の使用回数を監視
```

---

## 🛡️ **セキュリティ設定**

### 🔒 **API キー保護**
```
✅ HTTPリファラー制限設定済み
✅ API制限でCustom Search APIのみ許可
✅ 環境変数での管理
❌ コードに直接記述しない
❌ 公開リポジトリにコミットしない
```

### 🌐 **ドメイン制限**
```
本番環境で許可するドメイン:
- https://your-app.vercel.app/*
- https://your-custom-domain.com/*

開発環境で許可するドメイン:  
- https://localhost:*/*
- http://localhost:*/*
- https://*.e2b.dev/*
```

---

## 🎯 **設定完了の確認**

### ✅ **チェックリスト**
- [ ] Google Cloud プロジェクト作成
- [ ] 課金アカウント設定（無料枠でも必要）
- [ ] Custom Search API 有効化
- [ ] APIキー作成・制限設定
- [ ] Programmable Search Engine 作成
- [ ] 画像検索有効化
- [ ] 検索エンジンID取得
- [ ] アプリで環境変数設定  
- [ ] 動作テスト成功
- [ ] 実際の写真表示確認

### 🏆 **設定完了！**
```
🎉 Google API設定が完了しました！
✨ 宝塚漢字学習アプリで実際のタカラジェンヌの写真が表示されます
🎭 より豊かな学習体験をお楽しみください
```

---

## 📞 **サポート・参考資料**

### 📚 **公式ドキュメント**
- [Google Custom Search API](https://developers.google.com/custom-search/v1/overview)
- [Programmable Search Engine](https://programmablesearchengine.google.com/about/)
- [Google Cloud Console](https://console.cloud.google.com/)

### 🆘 **よくある質問**
- [Custom Search API FAQ](https://developers.google.com/custom-search/docs/overview)
- [課金について](https://cloud.google.com/docs/pricing)

この設定により、あなたの宝塚漢字学習アプリで本物のタカラジェンヌの美しい写真を表示できるようになります！ 🌸✨⭐