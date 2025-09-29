// 実際のGoogle Custom Search APIを使用したタカラジェンヌ画像検索システム
// Unsplash等のランダム画像システムを完全に置き換え

class RealGoogleImageSearch {
    constructor() {
        this.apiKey = null;
        this.searchEngineId = null;
        this.cache = new Map();
        this.rateLimitMap = new Map();
        this.initialized = false;
    }

    // Google APIキーの初期化
    initialize() {
        // 複数の方法でAPIキーを取得
        this.apiKey = this.getApiKey();
        this.searchEngineId = this.getSearchEngineId();
        
        if (this.apiKey && this.searchEngineId && 
            this.apiKey !== 'demo' && this.searchEngineId !== 'demo') {
            this.initialized = true;
            console.log('✅ Google Custom Search API初期化完了');
            console.log(`API Key: ${this.apiKey.substring(0, 10)}...`);
            console.log(`Search Engine ID: ${this.searchEngineId.substring(0, 10)}...`);
        } else {
            console.log('⚠️ Google API設定が見つかりません。デモモードを使用します。');
            this.initialized = false;
        }
    }

    // APIキーを複数のソースから取得
    getApiKey() {
        // 1. LocalStorage（ブラウザ設定）
        if (typeof localStorage !== 'undefined') {
            const key = localStorage.getItem('GOOGLE_SEARCH_API_KEY');
            if (key && key !== 'demo') return key;
        }

        // 2. Window.config（手動設定）
        if (typeof window !== 'undefined' && window.GOOGLE_API_CONFIG) {
            return window.GOOGLE_API_CONFIG.apiKey;
        }

        // 3. 設定ファイル
        if (typeof IMAGE_SEARCH_CONFIG !== 'undefined') {
            return IMAGE_SEARCH_CONFIG.googleCustomSearch?.apiKey;
        }

        return null;
    }

    // 検索エンジンIDを複数のソースから取得
    getSearchEngineId() {
        // 1. LocalStorage（ブラウザ設定）
        if (typeof localStorage !== 'undefined') {
            const id = localStorage.getItem('GOOGLE_SEARCH_ENGINE_ID');
            if (id && id !== 'demo') return id;
        }

        // 2. Window.config（手動設定）
        if (typeof window !== 'undefined' && window.GOOGLE_API_CONFIG) {
            return window.GOOGLE_API_CONFIG.searchEngineId;
        }

        // 3. 設定ファイル
        if (typeof IMAGE_SEARCH_CONFIG !== 'undefined') {
            return IMAGE_SEARCH_CONFIG.googleCustomSearch?.searchEngineId;
        }

        return null;
    }

    // レート制限チェック
    checkRateLimit() {
        const now = Date.now();
        const windowStart = now - 100000; // 100秒のウィンドウ

        // 古いエントリを削除
        for (const [timestamp] of this.rateLimitMap) {
            if (timestamp < windowStart) {
                this.rateLimitMap.delete(timestamp);
            }
        }

        if (this.rateLimitMap.size >= 100) {
            throw new Error('Google API レート制限に達しました。しばらくお待ちください。');
        }

        this.rateLimitMap.set(now, true);
    }

    // タカラジェンヌ専用の検索クエリ生成
    buildTakarazukaQueries(performer) {
        return [
            // 最優先: 公式サイト
            `site:kageki.hankyu.co.jp "${performer.name}"`,
            
            // Wikipedia
            `site:ja.wikipedia.org "${performer.name}" 宝塚歌劇団`,
            
            // 公式名称 + ノイズ除去
            `"${performer.name}" 宝塚歌劇団 ${performer.troupe} -cosplay -ファン -同人`,
            
            // 英語検索
            `"${performer.name}" Takarazuka Revue -cosplay -fan`,
            
            // シンプル検索
            `"${performer.name}" 宝塚`
        ];
    }

    // 実際のGoogle Custom Search API呼び出し
    async searchTakarazukaPerformer(performer) {
        if (!this.initialized) {
            this.initialize();
        }

        // デモモードの場合
        if (!this.initialized) {
            return await this.getDemoImage(performer);
        }

        console.log(`🔍 ${performer.name}のGoogle検索を開始...`);
        
        const queries = this.buildTakarazukaQueries(performer);

        for (let i = 0; i < Math.min(queries.length, 3); i++) {
            const query = queries[i];
            
            try {
                // キャッシュチェック
                const cacheKey = `google_${query}`;
                if (this.cache.has(cacheKey)) {
                    const cached = this.cache.get(cacheKey);
                    if (Date.now() - cached.timestamp < 1800000) { // 30分キャッシュ
                        console.log(`💾 キャッシュから取得: ${performer.name}`);
                        return cached.url;
                    }
                }

                // レート制限チェック
                this.checkRateLimit();

                console.log(`📡 Google API呼び出し ${i + 1}: "${query}"`);
                
                const result = await this.callGoogleAPI(query);
                
                if (result) {
                    // キャッシュに保存
                    this.cache.set(cacheKey, {
                        url: result,
                        timestamp: Date.now()
                    });
                    
                    console.log(`✅ ${performer.name}の写真を発見: ${result}`);
                    return result;
                }

                // API呼び出し間隔を空ける
                await this.sleep(300);

            } catch (error) {
                console.warn(`❌ 検索クエリ "${query}" でエラー:`, error);
                continue;
            }
        }

        console.log(`❌ ${performer.name}の写真が見つかりませんでした`);
        return null;
    }

    // Google Custom Search API の実際の呼び出し
    async callGoogleAPI(query) {
        const baseUrl = 'https://www.googleapis.com/customsearch/v1';
        const params = new URLSearchParams({
            key: this.apiKey,
            cx: this.searchEngineId,
            q: query,
            searchType: 'image',
            imgType: 'face',
            imgSize: 'medium',
            safe: 'active',
            num: '3',
            fileType: 'jpg,png',
            rights: 'cc_publicdomain,cc_attribute,cc_sharealike'
        });

        const url = `${baseUrl}?${params.toString()}`;
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Google API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            return null;
        }

        // 最も関連性の高い画像を選択
        const bestImage = this.selectBestImage(data.items, query);
        return bestImage ? bestImage.link : null;
    }

    // 最適な画像を選択
    selectBestImage(items, query) {
        return items
            .map(item => ({
                ...item,
                score: this.calculateRelevanceScore(item, query)
            }))
            .sort((a, b) => b.score - a.score)[0];
    }

    // 関連性スコア計算
    calculateRelevanceScore(item, query) {
        let score = 0;
        const title = (item.title || '').toLowerCase();
        const contextLink = (item.image?.contextLink || '').toLowerCase();
        
        // 宝塚関連ボーナス
        if (title.includes('宝塚') || title.includes('takarazuka')) score += 20;
        
        // 公式サイトボーナス
        if (contextLink.includes('kageki.hankyu.co.jp')) score += 30;
        if (contextLink.includes('wikipedia.org')) score += 15;
        
        // クエリマッチング
        const queryWords = query.toLowerCase().split(' ');
        queryWords.forEach(word => {
            if (title.includes(word.replace(/"/g, ''))) score += 10;
        });
        
        // ノイズペナルティ
        if (title.includes('cosplay') || title.includes('fan')) score -= 20;
        if (title.includes('同人') || title.includes('二次創作')) score -= 20;
        
        // 画像サイズボーナス
        if (item.image) {
            const width = parseInt(item.image.width) || 0;
            const height = parseInt(item.image.height) || 0;
            if (width >= 200 && height >= 200) score += 10;
        }
        
        return Math.max(0, score);
    }

    // デモモード用画像
    async getDemoImage(performer) {
        console.log(`🎭 ${performer.name}のデモ画像を使用`);
        
        // 実際の宝塚公式サイト風のサンプルURL
        const demoImages = {
            '鳳月杏': 'https://kageki.hankyu.co.jp/star/houzuki_an.jpg',
            '永久輝せあ': 'https://kageki.hankyu.co.jp/star/towaki_sea.jpg',
            '朝美絢': 'https://kageki.hankyu.co.jp/star/asami_jun.jpg',
            '暁千星': 'https://kageki.hankyu.co.jp/star/akatsuki_chisei.jpg',
            '真風涼帆': 'https://kageki.hankyu.co.jp/star/makaze_suzuho.jpg'
        };

        return demoImages[performer.name] || null;
    }

    // 待機用ヘルパー
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // API設定の動的更新
    updateApiConfig(apiKey, searchEngineId) {
        this.apiKey = apiKey;
        this.searchEngineId = searchEngineId;
        
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('GOOGLE_SEARCH_API_KEY', apiKey);
            localStorage.setItem('GOOGLE_SEARCH_ENGINE_ID', searchEngineId);
        }
        
        this.initialized = (apiKey && searchEngineId && apiKey !== 'demo' && searchEngineId !== 'demo');
        
        console.log(`🔧 Google API設定を更新: ${this.initialized ? '有効' : '無効'}`);
    }

    // 統計情報取得
    getStats() {
        return {
            initialized: this.initialized,
            cacheSize: this.cache.size,
            rateLimitEntries: this.rateLimitMap.size,
            apiKey: this.apiKey ? `${this.apiKey.substring(0, 10)}...` : 'なし',
            searchEngineId: this.searchEngineId ? `${this.searchEngineId.substring(0, 10)}...` : 'なし'
        };
    }
}

// グローバルインスタンス
const realGoogleSearch = new RealGoogleImageSearch();

// ブラウザ環境でグローバルに公開
if (typeof window !== 'undefined') {
    window.realGoogleSearch = realGoogleSearch;
    
    // 初期化実行
    realGoogleSearch.initialize();
}

// Node.js環境用エクスポート
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RealGoogleImageSearch, realGoogleSearch };
}