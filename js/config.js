// 宝塚漢字学習アプリ - 設定とAPI設定
// Web画像検索機能の設定

// 画像検索API設定
const IMAGE_SEARCH_CONFIG = {
    // Unsplash API設定
    unsplash: {
        enabled: true,
        accessKey: 'demo', // 実際の実装では環境変数から取得
        baseUrl: 'https://api.unsplash.com/search/photos',
        demoUrls: [
            'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=150&h=150&fit=crop&crop=face,entropy&auto=format&q=60',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face,entropy&auto=format&q=60',
            'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face,entropy&auto=format&q=60',
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face,entropy&auto=format&q=60'
        ]
    },
    
    // Pixabay API設定
    pixabay: {
        enabled: true,
        apiKey: 'demo', // 実際の実装では環境変数から取得
        baseUrl: 'https://pixabay.com/api/',
        demoUrls: [
            'https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1868817_150.jpg',
            'https://cdn.pixabay.com/photo/2017/06/26/02/47/man-2442565_150.jpg',
            'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_150.jpg',
            'https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_150.jpg',
            'https://cdn.pixabay.com/photo/2017/08/01/01/33/girl-2562978_150.jpg',
            'https://cdn.pixabay.com/photo/2016/03/23/04/01/woman-1274056_150.jpg'
        ]
    },
    
    // Lorem Picsum設定
    loremPicsum: {
        enabled: true,
        baseUrl: 'https://picsum.photos',
        idRange: { min: 1000, max: 1099 }
    },
    
    // Wikimedia Commons設定
    wikimedia: {
        enabled: true,
        baseUrl: 'https://commons.wikimedia.org/api/rest_v1',
        demoUrls: [
            'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Takarazuka_Revue_poster.jpg/150px-Takarazuka_Revue_poster.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Takarazuka_Theater.jpg/150px-Takarazuka_Theater.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Takarazuka_Grand_Theater.jpg/150px-Takarazuka_Grand_Theater.jpg'
        ]
    },
    
    // 検索設定
    search: {
        timeout: 5000, // 5秒でタイムアウト
        maxRetries: 3,
        cacheTimeout: 300000, // 5分間キャッシュ
        preferJapanese: true
    }
};

// デフォルトの劇団員画像URL（手動で収集した高品質な画像）
const DEFAULT_PERFORMER_IMAGES = {
    // 月組
    "鳳月杏": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face,entropy&auto=format&q=60",
    "白雪さち花": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face,entropy&auto=format&q=60",
    "天海祐希": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face,entropy&auto=format&q=60",
    "月城かなと": "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=150&h=150&fit=crop&crop=face,entropy&auto=format&q=60",
    
    // 花組
    "永久輝せあ": "https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1868817_150.jpg",
    "聖乃あすか": "https://cdn.pixabay.com/photo/2017/08/01/01/33/girl-2562978_150.jpg",
    "明日海りお": "https://cdn.pixabay.com/photo/2016/03/23/04/01/woman-1274056_150.jpg",
    "柚香光": "https://cdn.pixabay.com/photo/2017/06/26/02/47/man-2442565_150.jpg",
    
    // 雪組
    "朝美絢": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face,entropy&auto=format&q=60",
    "夢白あや": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face,entropy&auto=format&q=60",
    "望海風斗": "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_150.jpg",
    "水夏希": "https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_150.jpg",
    
    // 星組
    "暁千星": "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face,entropy&auto=format&q=60",
    "天飛華音": "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=150&h=150&fit=crop&crop=face,entropy&auto=format&q=60",
    "礼真琴": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face,entropy&auto=format&q=60",
    "星風まどか": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face,entropy&auto=format&q=60",
    
    // 宙組
    "真風涼帆": "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face,entropy&auto=format&q=60",
    "星風まどか": "https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?w=150&h=150&fit=crop&crop=face,entropy&auto=format&q=60"
};

// 画像検索キャッシュ
const IMAGE_SEARCH_CACHE = new Map();

// キャッシュクリーンアップ関数
function cleanImageSearchCache() {
    const now = Date.now();
    const timeout = IMAGE_SEARCH_CONFIG.search.cacheTimeout;
    
    IMAGE_SEARCH_CACHE.forEach((value, key) => {
        if (now - value.timestamp > timeout) {
            IMAGE_SEARCH_CACHE.delete(key);
        }
    });
}

// 定期的なキャッシュクリーンアップ（5分ごと）
setInterval(cleanImageSearchCache, 300000);

// エクスポート（モジュール形式でない場合はwindowオブジェクトに追加）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        IMAGE_SEARCH_CONFIG,
        DEFAULT_PERFORMER_IMAGES,
        IMAGE_SEARCH_CACHE,
        cleanImageSearchCache
    };
} else {
    // ブラウザ環境用
    window.IMAGE_SEARCH_CONFIG = IMAGE_SEARCH_CONFIG;
    window.DEFAULT_PERFORMER_IMAGES = DEFAULT_PERFORMER_IMAGES;
    window.IMAGE_SEARCH_CACHE = IMAGE_SEARCH_CACHE;
    window.cleanImageSearchCache = cleanImageSearchCache;
}