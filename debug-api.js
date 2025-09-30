// Google API デバッグスクリプト
// このスクリプトは現在のAPI設定状況を詳しく調査します

class ApiDebugger {
    constructor() {
        this.results = [];
        this.errors = [];
    }

    // 環境変数の確認
    checkEnvironmentVariables() {
        console.log('🔍 環境変数チェック開始...');
        
        const checks = {
            localStorage: {
                apiKey: this.getLocalStorageValue('GOOGLE_SEARCH_API_KEY'),
                searchEngineId: this.getLocalStorageValue('GOOGLE_SEARCH_ENGINE_ID')
            },
            browserEnvironment: {
                apiKey: this.getBrowserEnvValue('GOOGLE_SEARCH_API_KEY'),
                searchEngineId: this.getBrowserEnvValue('GOOGLE_SEARCH_ENGINE_ID')
            },
            configObject: {
                apiKey: this.getConfigValue('GOOGLE_SEARCH_API_KEY'),
                searchEngineId: this.getConfigValue('GOOGLE_SEARCH_ENGINE_ID')
            }
        };

        console.log('📊 環境変数チェック結果:', checks);
        
        // 利用可能な設定をチェック
        const hasLocalStorage = checks.localStorage.apiKey && checks.localStorage.searchEngineId;
        const hasBrowserEnv = checks.browserEnvironment.apiKey && checks.browserEnvironment.searchEngineId;
        const hasConfig = checks.configObject.apiKey && checks.configObject.searchEngineId;

        const status = {
            hasAnyConfig: hasLocalStorage || hasBrowserEnv || hasConfig,
            configSources: {
                localStorage: hasLocalStorage,
                browserEnvironment: hasBrowserEnv,
                configObject: hasConfig
            }
        };

        console.log('✅ 設定状況サマリー:', status);
        return { checks, status };
    }

    // LocalStorageから値を取得
    getLocalStorageValue(key) {
        try {
            return localStorage.getItem(key) || null;
        } catch (error) {
            return null;
        }
    }

    // ブラウザ環境変数から値を取得
    getBrowserEnvValue(key) {
        try {
            return process?.env?.[key] || window?.[key] || null;
        } catch (error) {
            return null;
        }
    }

    // 設定オブジェクトから値を取得
    getConfigValue(key) {
        try {
            // アプリの設定オブジェクトをチェック
            if (typeof IMAGE_SEARCH_CONFIG !== 'undefined') {
                return IMAGE_SEARCH_CONFIG.googleCustomSearch?.[key] || null;
            }
            return null;
        } catch (error) {
            return null;
        }
    }

    // 実際のAPI接続テスト
    async testActualApiConnection() {
        console.log('🧪 実際のAPI接続テスト開始...');
        
        // 設定を取得
        const envCheck = this.checkEnvironmentVariables();
        const { checks } = envCheck;

        // 利用可能な設定を選択
        let apiKey = checks.localStorage.apiKey || checks.browserEnvironment.apiKey || checks.configObject.apiKey;
        let searchEngineId = checks.localStorage.searchEngineId || checks.browserEnvironment.searchEngineId || checks.configObject.searchEngineId;

        if (!apiKey || !searchEngineId) {
            const error = 'API設定が見つかりません。APIキーと検索エンジンIDが必要です。';
            console.error('❌', error);
            return { success: false, error };
        }

        console.log('🔑 使用するAPIキー:', apiKey.substring(0, 10) + '...');
        console.log('🔍 使用する検索エンジンID:', searchEngineId.substring(0, 10) + '...');

        // テストクエリ実行
        const testQueries = [
            '宝塚歌劇団',
            '花組 宝塚',
            '月組 宝塚'
        ];

        const results = [];

        for (const query of testQueries) {
            try {
                const result = await this.executeSearchQuery(apiKey, searchEngineId, query);
                results.push({ query, success: true, result });
                console.log(`✅ "${query}" の検索成功:`, result.items?.length || 0, '件');
            } catch (error) {
                results.push({ query, success: false, error: error.message });
                console.error(`❌ "${query}" の検索失敗:`, error.message);
            }
        }

        return { success: results.some(r => r.success), results, apiKey, searchEngineId };
    }

    // 検索クエリを実行
    async executeSearchQuery(apiKey, searchEngineId, query) {
        const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}&searchType=image&num=3&safe=high&lr=lang_ja`;
        
        console.log('📡 API URL:', url.replace(apiKey, 'HIDDEN_API_KEY'));

        const response = await fetch(url);
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        
        if (data.error) {
            throw new Error(`API Error: ${data.error.code} - ${data.error.message}`);
        }

        return data;
    }

    // HTTPリファラー制限のテスト
    async testReferrerRestrictions() {
        console.log('🔒 HTTPリファラー制限テスト...');
        
        const currentDomain = window.location.origin;
        const testDomains = [
            currentDomain,
            'https://takarazuka-revue.vercel.app',
            'https://localhost:3000',
            'http://localhost:8000'
        ];

        console.log('🌐 現在のドメイン:', currentDomain);
        console.log('🔍 テスト対象ドメイン:', testDomains);

        // 現在のドメインでのテスト結果を確認
        const apiTest = await this.testActualApiConnection();
        
        if (apiTest.success) {
            console.log('✅ 現在のドメインでAPI接続成功');
            return { success: true, domain: currentDomain };
        } else {
            console.log('❌ 現在のドメインでAPI接続失敗');
            console.log('💡 Google Cloud Console でHTTPリファラー制限に以下を追加してください:');
            testDomains.forEach(domain => {
                console.log(`   ${domain}/*`);
            });
            return { success: false, domain: currentDomain, suggestedDomains: testDomains };
        }
    }

    // 総合診断の実行
    async runCompleteDiagnostics() {
        console.log('🔍 Google API 総合診断開始...');
        console.log('=' .repeat(50));

        const diagnostics = {
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            results: {}
        };

        // 1. 環境変数チェック
        console.log('\n1️⃣ 環境変数チェック');
        diagnostics.results.environment = this.checkEnvironmentVariables();

        // 2. API接続テスト
        console.log('\n2️⃣ API接続テスト');
        diagnostics.results.apiConnection = await this.testActualApiConnection();

        // 3. リファラー制限テスト
        console.log('\n3️⃣ HTTPリファラー制限テスト');
        diagnostics.results.referrerTest = await this.testReferrerRestrictions();

        // 4. アプリ設定確認
        console.log('\n4️⃣ アプリ設定確認');
        diagnostics.results.appConfig = this.checkAppConfiguration();

        // 5. 推奨解決策の生成
        console.log('\n5️⃣ 推奨解決策');
        diagnostics.results.recommendations = this.generateRecommendations(diagnostics.results);

        console.log('=' .repeat(50));
        console.log('📊 診断完了！結果サマリー:');
        console.log(diagnostics.results.recommendations);

        return diagnostics;
    }

    // アプリ設定の確認
    checkAppConfiguration() {
        const config = {
            realGoogleSearchAvailable: typeof realGoogleSearch !== 'undefined',
            imageSearchConfigAvailable: typeof IMAGE_SEARCH_CONFIG !== 'undefined',
            takarazukaEffectsAvailable: typeof takarazukaEffects !== 'undefined',
            kanjiAppAvailable: typeof kanjiApp !== 'undefined'
        };

        console.log('🔧 アプリ設定状況:', config);

        // 設定オブジェクトの詳細
        if (typeof IMAGE_SEARCH_CONFIG !== 'undefined') {
            console.log('⚙️ IMAGE_SEARCH_CONFIG:', {
                googleCustomSearchEnabled: IMAGE_SEARCH_CONFIG.googleCustomSearch?.enabled,
                hasApiKey: !!IMAGE_SEARCH_CONFIG.googleCustomSearch?.apiKey,
                hasSearchEngineId: !!IMAGE_SEARCH_CONFIG.googleCustomSearch?.searchEngineId
            });
        }

        return config;
    }

    // 推奨解決策の生成
    generateRecommendations(results) {
        const recommendations = [];

        // 環境変数の問題
        if (!results.environment.status.hasAnyConfig) {
            recommendations.push({
                priority: 'HIGH',
                category: '環境変数',
                issue: 'API設定が見つからない',
                solution: 'アプリの「🔧 Google API設定」ボタンからAPIキーと検索エンジンIDを設定してください。'
            });
        }

        // API接続の問題
        if (!results.apiConnection.success) {
            const errorMsg = results.apiConnection.error || (results.apiConnection.results && results.apiConnection.results.find(r => !r.success)?.error);
            
            if (errorMsg && errorMsg.includes('403')) {
                recommendations.push({
                    priority: 'HIGH',
                    category: 'API制限',
                    issue: 'HTTPリファラー制限エラー',
                    solution: `Google Cloud Console でAPIキーのHTTPリファラー制限に "${window.location.origin}/*" を追加してください。`
                });
            } else if (errorMsg && errorMsg.includes('401')) {
                recommendations.push({
                    priority: 'HIGH',  
                    category: 'API認証',
                    issue: 'APIキー認証エラー',
                    solution: 'APIキーが無効です。Google Cloud Console でAPIキーを再確認してください。'
                });
            } else {
                recommendations.push({
                    priority: 'MEDIUM',
                    category: 'API接続',
                    issue: 'API接続に失敗',
                    solution: 'Custom Search APIの有効化と課金アカウントの設定を確認してください。'
                });
            }
        }

        // 成功の場合
        if (results.apiConnection.success) {
            recommendations.push({
                priority: 'INFO',
                category: '成功',
                issue: 'API接続成功',
                solution: 'Google API設定が正常に動作しています！実際のタカラジェンヌの写真が表示されるはずです。'
            });
        }

        return recommendations;
    }

    // 結果のエクスポート
    exportDiagnostics(diagnostics) {
        const report = JSON.stringify(diagnostics, null, 2);
        const blob = new Blob([report], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `google-api-diagnostics-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        console.log('📁 診断結果をダウンロードしました');
    }
}

// グローバルに公開
if (typeof window !== 'undefined') {
    window.ApiDebugger = ApiDebugger;
    window.apiDebugger = new ApiDebugger();
    
    // 便利な関数を公開
    window.debugGoogleApi = async function() {
        const debugger = new ApiDebugger();
        return await debugger.runCompleteDiagnostics();
    };

    window.testGoogleApiNow = async function() {
        const debugger = new ApiDebugger();
        return await debugger.testActualApiConnection();
    };

    window.checkApiEnvironment = function() {
        const debugger = new ApiDebugger();
        return debugger.checkEnvironmentVariables();
    };

    console.log('🔧 API診断ツールが読み込まれました');
    console.log('📝 使用方法:');
    console.log('  debugGoogleApi() - 完全診断実行');
    console.log('  testGoogleApiNow() - API接続テストのみ');
    console.log('  checkApiEnvironment() - 環境変数確認のみ');
}

// Node.js環境用エクスポート
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ApiDebugger;
}