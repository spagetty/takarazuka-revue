// Google Custom Search API セットアップとタカラジェンヌ特化検索
// 実際の本番環境で使用するための設定ガイド

class GoogleCustomSearchSetup {
    constructor() {
        this.setupInstructions = {
            step1: "Google Cloud Console でプロジェクトを作成",
            step2: "Custom Search API を有効化",
            step3: "API キーを取得",
            step4: "Programmable Search Engine を作成",
            step5: "検索エンジンIDを取得"
        };
    }

    // Google Custom Search Engine の設定手順
    getSetupInstructions() {
        return `
🔧 Google Custom Search API セットアップ手順

1️⃣ Google Cloud Console (https://console.cloud.google.com/)
   - 新しいプロジェクトを作成
   - 「APIs & Services」→「Library」から「Custom Search API」を有効化
   - 「Credentials」→「Create Credentials」→「API Key」を作成

2️⃣ Programmable Search Engine (https://programmablesearchengine.google.com/)
   - 「Add」→新しい検索エンジンを作成
   - 検索対象サイト:
     * kageki.hankyu.co.jp (宝塚歌劇公式)
     * ja.wikipedia.org/wiki/Category:宝塚歌劇団 
     * takarazuka-fan.com
     * その他宝塚関連サイト
   - 画像検索を有効化
   - 検索エンジンIDをコピー

3️⃣ 環境変数設定
   GOOGLE_SEARCH_API_KEY=your_api_key_here
   GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id_here

4️⃣ 制限設定
   - 1日10,000回まで無料
   - 追加検索は1,000回ごとに$5
   - レート制限: 100回/100秒
`;
    }

    // タカラジェンヌ特化の検索エンジン設定推奨値
    getRecommendedSearchEngineSettings() {
        return {
            name: "宝塚歌劇団 劇団員検索",
            description: "宝塚歌劇団の現役・歴代劇団員の写真を検索",
            sites: [
                "kageki.hankyu.co.jp/*",           // 宝塚歌劇公式サイト
                "ja.wikipedia.org/wiki/*宝塚*",    // Wikipedia宝塚関連
                "commons.wikimedia.org/*",         // Wikimedia Commons
                "twitter.com/TakarazukaRevue",     // 公式Twitter
                "www.instagram.com/takarazuka_official", // 公式Instagram
                "takarazuka.co.jp/*",              // 宝塚関連サイト
                "*.takarazuka-fan.com/*"           // ファンサイト
            ],
            imageSearch: true,
            safeBrowsing: true,
            adultFilter: "strict"
        };
    }

    // 実際のAPIキーを使用する場合の設定更新
    updateConfigWithRealKeys(apiKey, searchEngineId) {
        return {
            googleCustomSearch: {
                enabled: true,
                apiKey: apiKey,
                searchEngineId: searchEngineId,
                baseUrl: 'https://www.googleapis.com/customsearch/v1',
                searchConfig: {
                    searchType: 'image',
                    imgType: 'face',
                    imgSize: 'medium',
                    safe: 'active',
                    num: 5, // 本番では5件取得
                    fileType: 'jpg,png',
                    rights: 'cc_publicdomain,cc_attribute,cc_sharealike,cc_nonderived',
                    // 宝塚特化フィルター
                    siteSearch: 'kageki.hankyu.co.jp OR ja.wikipedia.org',
                    exactTerms: '宝塚歌劇団',
                    excludeTerms: 'cosplay costume fan art'
                }
            }
        };
    }
}

// 実際のGoogle Custom Search APIを使用するためのヘルパー関数
class TakarazukaGoogleSearch {
    constructor(apiKey, searchEngineId) {
        this.apiKey = apiKey;
        this.searchEngineId = searchEngineId;
        this.baseUrl = 'https://www.googleapis.com/customsearch/v1';
        this.rateLimiter = new Map(); // レート制限管理
    }

    // レート制限チェック
    checkRateLimit() {
        const now = Date.now();
        const windowStart = now - 100000; // 100秒のウィンドウ
        
        // 古いエントリを削除
        for (const [timestamp] of this.rateLimiter) {
            if (timestamp < windowStart) {
                this.rateLimiter.delete(timestamp);
            }
        }
        
        // 現在のウィンドウでのリクエスト数をチェック
        if (this.rateLimiter.size >= 100) {
            throw new Error('Google Custom Search API レート制限に達しました。100秒後に再試行してください。');
        }
        
        this.rateLimiter.set(now, true);
    }

    // タカラジェンヌ専用の検索クエリ最適化
    optimizeQueryForTakarazuka(performerName, troupe, era) {
        const optimizedQueries = [
            // 最優先: 公式サイト特化
            `site:kageki.hankyu.co.jp "${performerName}" ${troupe}`,
            
            // Wikipedia特化
            `site:ja.wikipedia.org "${performerName}" 宝塚歌劇団`,
            
            // 一般検索（ノイズ除去）
            `"${performerName}" 宝塚歌劇団 ${troupe} -cosplay -fan -art -同人`,
            
            // 英語検索
            `"${performerName}" Takarazuka Revue ${this.translateTroupe(troupe)}`,
            
            // Era特化
            `"${performerName}" 宝塚 ${era} トップスター`
        ];
        
        return optimizedQueries;
    }

    translateTroupe(troupe) {
        const troupeMap = {
            '月組': 'Moon Troupe',
            '花組': 'Flower Troupe',
            '雪組': 'Snow Troupe', 
            '星組': 'Star Troupe',
            '宙組': 'Cosmos Troupe'
        };
        return troupeMap[troupe] || troupe;
    }

    // 実際のGoogle Custom Search API呼び出し
    async searchTakarazukaPerformer(performerName, troupe, era) {
        try {
            this.checkRateLimit();
            
            const queries = this.optimizeQueryForTakarazuka(performerName, troupe, era);
            
            for (const query of queries) {
                const params = new URLSearchParams({
                    key: this.apiKey,
                    cx: this.searchEngineId,
                    q: query,
                    searchType: 'image',
                    imgType: 'face',
                    imgSize: 'medium',
                    safe: 'active',
                    num: 3,
                    fileType: 'jpg,png',
                    rights: 'cc_publicdomain,cc_attribute,cc_sharealike'
                });

                const response = await fetch(`${this.baseUrl}?${params}`);
                
                if (!response.ok) {
                    console.warn(`Google API HTTP Error: ${response.status}`);
                    continue;
                }

                const data = await response.json();
                
                if (data.items && data.items.length > 0) {
                    // 画像の品質とタカラジェンヌらしさをスコアリング
                    const bestImage = this.selectBestTakarazukaImage(data.items, performerName);
                    if (bestImage) {
                        return {
                            url: bestImage.link,
                            title: bestImage.title,
                            source: 'google_custom_search',
                            contextLink: bestImage.image?.contextLink,
                            query: query
                        };
                    }
                }
            }
            
            return null;
        } catch (error) {
            console.error('Google Custom Search API Error:', error);
            throw error;
        }
    }

    // タカラジェンヌらしい画像を選択
    selectBestTakarazukaImage(items, performerName) {
        return items
            .map(item => ({
                ...item,
                score: this.calculateTakarazukaScore(item, performerName)
            }))
            .sort((a, b) => b.score - a.score)[0];
    }

    // タカラジェンヌらしさスコア計算
    calculateTakarazukaScore(item, performerName) {
        let score = 0;
        const title = (item.title || '').toLowerCase();
        const contextLink = (item.image?.contextLink || '').toLowerCase();
        
        // 劇団員名マッチング
        if (title.includes(performerName.toLowerCase())) score += 30;
        
        // 公式サイトボーナス
        if (contextLink.includes('kageki.hankyu.co.jp')) score += 25;
        if (contextLink.includes('wikipedia.org')) score += 20;
        
        // 宝塚関連キーワード
        if (title.includes('宝塚') || title.includes('takarazuka')) score += 15;
        if (title.includes('劇団員') || title.includes('スター')) score += 10;
        
        // 除外すべきキーワード（負のスコア）
        if (title.includes('cosplay') || title.includes('fan art')) score -= 20;
        if (title.includes('同人') || title.includes('二次創作')) score -= 15;
        
        // 画像サイズボーナス
        if (item.image) {
            const width = parseInt(item.image.width) || 0;
            const height = parseInt(item.image.height) || 0;
            if (width >= 200 && height >= 200) score += 10;
            if (width >= 400 && height >= 400) score += 5;
        }
        
        return score;
    }
}

// 使用例とテスト用のコード
if (typeof window !== 'undefined') {
    window.GoogleCustomSearchSetup = GoogleCustomSearchSetup;
    window.TakarazukaGoogleSearch = TakarazukaGoogleSearch;
    
    // セットアップ手順を表示
    console.log(new GoogleCustomSearchSetup().getSetupInstructions());
}

// Export for Node.js environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GoogleCustomSearchSetup, TakarazukaGoogleSearch };
}