// Google API自動設定スクリプト
// このスクリプトはGoogle API設定を支援するユーティリティです

class GoogleApiSetupHelper {
    constructor() {
        this.apiKey = '';
        this.searchEngineId = '';
        this.testResults = [];
    }

    // APIキー形式の検証
    validateApiKey(apiKey) {
        const apiKeyPattern = /^AIza[0-9A-Za-z\-_]{35}$/;
        return apiKeyPattern.test(apiKey);
    }

    // 検索エンジンID形式の検証  
    validateSearchEngineId(engineId) {
        const engineIdPattern = /^[0-9a-f]{10,20}:[0-9a-z]{8,12}$/;
        return engineIdPattern.test(engineId);
    }

    // Google API接続テスト
    async testApiConnection(apiKey, searchEngineId) {
        const testQuery = '宝塚歌劇団';
        const testUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(testQuery)}&searchType=image&num=1&safe=high&lr=lang_ja`;

        try {
            console.log('🔍 Google Custom Search API 接続テスト開始...');
            
            const response = await fetch(testUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            
            if (data.error) {
                throw new Error(`API Error: ${data.error.code} - ${data.error.message}`);
            }

            if (data.items && data.items.length > 0) {
                console.log('✅ Google API接続成功！検索結果を取得できました。');
                return {
                    success: true,
                    message: 'Google API接続成功！実際の写真検索が可能です。',
                    results: data.items.length,
                    searchInfo: data.searchInformation
                };
            } else {
                console.log('⚠️ API接続は成功しましたが、検索結果がありません。');
                return {
                    success: true,
                    warning: true,
                    message: 'API接続は成功しましたが、検索結果がありません。検索エンジン設定を確認してください。',
                    results: 0
                };
            }

        } catch (error) {
            console.error('❌ API接続テストエラー:', error);
            return {
                success: false,
                message: `接続エラー: ${error.message}`,
                error: error.message
            };
        }
    }

    // 設定の保存
    saveApiConfiguration(apiKey, searchEngineId) {
        try {
            // LocalStorageに保存（開発環境用）
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('GOOGLE_SEARCH_API_KEY', apiKey);
                localStorage.setItem('GOOGLE_SEARCH_ENGINE_ID', searchEngineId);
                console.log('💾 API設定をLocalStorageに保存しました');
            }

            // 環境変数設定のガイダンス表示
            this.showEnvironmentVariableGuidance(apiKey, searchEngineId);

            return true;
        } catch (error) {
            console.error('❌ 設定保存エラー:', error);
            return false;
        }
    }

    // 環境変数設定ガイダンス
    showEnvironmentVariableGuidance(apiKey, searchEngineId) {
        const guidance = `
🔧 本番環境での設定方法:

📊 Vercel:
1. Dashboard > Settings > Environment Variables
2. 以下の変数を追加:
   GOOGLE_SEARCH_API_KEY=${apiKey}
   GOOGLE_SEARCH_ENGINE_ID=${searchEngineId}

🌐 Netlify:
1. Site settings > Environment variables  
2. 上記と同じ変数を追加

☁️ Cloudflare Pages:
1. Settings > Environment variables
2. 上記と同じ変数を追加

💻 ローカル開発:
1. プロジェクトルートに .env ファイル作成
2. 以下を追加:
   GOOGLE_SEARCH_API_KEY=${apiKey}
   GOOGLE_SEARCH_ENGINE_ID=${searchEngineId}
3. .env を .gitignore に追加
        `.trim();

        console.log(guidance);
    }

    // 設定状況の確認
    checkCurrentConfiguration() {
        const config = {
            localStorage: {
                apiKey: localStorage.getItem('GOOGLE_SEARCH_API_KEY'),
                searchEngineId: localStorage.getItem('GOOGLE_SEARCH_ENGINE_ID')
            },
            environment: {
                apiKey: typeof process !== 'undefined' && process.env ? process.env.GOOGLE_SEARCH_API_KEY : undefined,
                searchEngineId: typeof process !== 'undefined' && process.env ? process.env.GOOGLE_SEARCH_ENGINE_ID : undefined
            }
        };

        console.log('📋 現在の設定状況:', config);
        return config;
    }

    // 設定完了チェック
    isConfigurationComplete() {
        const config = this.checkCurrentConfiguration();
        
        const hasLocalStorage = config.localStorage.apiKey && config.localStorage.searchEngineId;
        const hasEnvironment = config.environment.apiKey && config.environment.searchEngineId;
        
        return hasLocalStorage || hasEnvironment;
    }

    // 設定ウィザード（対話式設定）
    async runSetupWizard() {
        console.log('🚀 Google API設定ウィザードを開始します...');
        
        // ステップ1: 現在の設定確認
        console.log('\n📋 ステップ1: 現在の設定を確認中...');
        const currentConfig = this.checkCurrentConfiguration();
        
        if (this.isConfigurationComplete()) {
            console.log('✅ 設定が既に完了しています。テストを実行しますか？');
            // 既存設定でテスト実行
            const apiKey = currentConfig.localStorage.apiKey || currentConfig.environment.apiKey;
            const searchEngineId = currentConfig.localStorage.searchEngineId || currentConfig.environment.searchEngineId;
            
            const testResult = await this.testApiConnection(apiKey, searchEngineId);
            console.log('📊 テスト結果:', testResult);
            return testResult;
        }

        // ステップ2: 設定ガイダンス表示
        console.log('\n🔧 ステップ2: Google API設定が必要です');
        this.showSetupInstructions();
        
        return {
            success: false,
            message: 'Google API設定を完了してから再度実行してください。',
            instructions: true
        };
    }

    // 設定手順の表示
    showSetupInstructions() {
        const instructions = `
🔍 Google Custom Search API 設定手順:

1️⃣ Google Cloud Console (https://console.cloud.google.com/)
   - 新しいプロジェクトを作成
   - Custom Search API を有効化
   - APIキーを作成 (HTTPリファラー制限設定)

2️⃣ Programmable Search Engine (https://programmablesearchengine.google.com/)
   - 新しい検索エンジンを作成
   - 検索対象サイト: kageki.hankyu.co.jp, *.wikipedia.org など
   - 画像検索を有効化
   - 検索エンジンIDを取得

3️⃣ このアプリで設定
   - 「🔧 Google API設定」ボタンをクリック
   - APIキーと検索エンジンIDを入力
   - 「接続をテスト」で動作確認

📚 詳細手順: GOOGLE_API_SETUP_TUTORIAL.md を参照
        `.trim();

        console.log(instructions);
    }

    // トラブルシューティングガイド
    troubleshoot(errorMessage) {
        const troubleshooting = {
            '403': {
                title: '🚫 403 Forbidden エラー',
                causes: [
                    'HTTPリファラー制限の設定不備',
                    'APIキーの権限不足',
                    'ドメインが許可リストにない'
                ],
                solutions: [
                    'Google Cloud Console でHTTPリファラー設定を確認',
                    'アプリのドメインを許可リストに追加',
                    '設定変更後5-10分待機'
                ]
            },
            '401': {
                title: '🔑 401 Unauthorized エラー',
                causes: [
                    'APIキーが無効',
                    'Custom Search APIが無効',
                    '課金アカウント未設定'
                ],
                solutions: [
                    'APIキーを再確認・再生成',
                    'Custom Search APIの有効化確認',
                    '課金アカウントのリンク確認'
                ]
            },
            '429': {
                title: '⏰ 429 Too Many Requests',
                causes: [
                    'API使用量制限に到達',
                    '短時間での大量リクエスト'
                ],
                solutions: [
                    'しばらく待ってから再試行',
                    'API使用量の確認・制限緩和'
                ]
            }
        };

        const errorCode = errorMessage.match(/\b\d{3}\b/)?.[0];
        const guide = troubleshooting[errorCode];

        if (guide) {
            console.log(`\n${guide.title}`);
            console.log('原因:');
            guide.causes.forEach(cause => console.log(`  • ${cause}`));
            console.log('解決方法:');
            guide.solutions.forEach(solution => console.log(`  • ${solution}`));
        } else {
            console.log('\n🆘 一般的なトラブルシューティング:');
            console.log('1. APIキーと検索エンジンIDの再確認');
            console.log('2. Google Cloud Console で設定確認');
            console.log('3. ブラウザキャッシュのクリア');
            console.log('4. 数分待って再試行');
        }
    }
}

// グローバルに公開
if (typeof window !== 'undefined') {
    window.GoogleApiSetupHelper = GoogleApiSetupHelper;
    window.googleApiSetup = new GoogleApiSetupHelper();
}

// Node.js環境用エクスポート
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GoogleApiSetupHelper;
}

// 使用例とテスト関数
if (typeof window !== 'undefined') {
    // ブラウザコンソールで使用可能な関数
    window.testGoogleApi = async function() {
        const helper = new GoogleApiSetupHelper();
        return await helper.runSetupWizard();
    };

    window.checkApiConfig = function() {
        const helper = new GoogleApiSetupHelper();
        return helper.checkCurrentConfiguration();
    };

    console.log('🔧 Google API設定ヘルパーが読み込まれました');
    console.log('📝 使用方法:');
    console.log('  testGoogleApi() - 設定ウィザード実行');
    console.log('  checkApiConfig() - 現在の設定確認');
}