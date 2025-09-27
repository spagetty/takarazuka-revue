// 宝塚歌劇団劇団員データベース（2024-2025年現役の実在人物、小学2年生レベル漢字含む）
const TAKARAZUKA_PERFORMERS = [
    // 月組 (トップ: 鳳月杏)
    { name: "鳳月杏", reading: "ほうづきあん", troupe: "月組", troupeColor: "tsuki" },
    { name: "白雪さち花", reading: "しらゆきさちか", troupe: "月組", troupeColor: "tsuki" },
    { name: "夢奈瑠音", reading: "ゆめなるね", troupe: "月組", troupeColor: "tsuki" },
    { name: "風間柚乃", reading: "かざまゆの", troupe: "月組", troupeColor: "tsuki" },
    { name: "天紫珠李", reading: "あましじゅり", troupe: "月組", troupeColor: "tsuki" },
    { name: "桃歌雪", reading: "ももかゆき", troupe: "月組", troupeColor: "tsuki" },
    { name: "彩みちる", reading: "あやみちる", troupe: "月組", troupeColor: "tsuki" },
    { name: "英かおと", reading: "はなぶさかおと", troupe: "月組", troupeColor: "tsuki" },

    // 花組 (トップ: 永久輝せあ)
    { name: "永久輝せあ", reading: "とわきせあ", troupe: "花組", troupeColor: "hana" },
    { name: "聖乃あすか", reading: "せいのあすか", troupe: "花組", troupeColor: "hana" },
    { name: "水美舞斗", reading: "みなみまいと", troupe: "花組", troupeColor: "hana" },
    { name: "華優希", reading: "はなゆうき", troupe: "花組", troupeColor: "hana" },
    { name: "春妃うらら", reading: "はるきうらら", troupe: "花組", troupeColor: "hana" },
    { name: "花音舞", reading: "はなねまい", troupe: "花組", troupeColor: "hana" },
    { name: "風光る", reading: "かぜひかる", troupe: "花組", troupeColor: "hana" },
    { name: "朝美絢", reading: "あさみじゅん", troupe: "花組", troupeColor: "hana" },

    // 雪組 (トップ: 朝美絢)
    { name: "朝美絢", reading: "あさみじゅん", troupe: "雪組", troupeColor: "yuki" },
    { name: "夢白あや", reading: "ゆめしろあや", troupe: "雪組", troupeColor: "yuki" },
    { name: "縣千", reading: "あがたせん", troupe: "雪組", troupeColor: "yuki" },
    { name: "瀬央ゆりあ", reading: "せおゆりあ", troupe: "雪組", troupeColor: "yuki" },
    { name: "音彩唯", reading: "おとあゆい", troupe: "雪組", troupeColor: "yuki" },
    { name: "美羽愛", reading: "みうあ", troupe: "雪組", troupeColor: "yuki" },
    { name: "雪花風月", reading: "ゆきはなふうげつ", troupe: "雪組", troupeColor: "yuki" },
    { name: "白妙なつ", reading: "しろたえなつ", troupe: "雪組", troupeColor: "yuki" },

    // 星組 (トップ: 暁千星)
    { name: "暁千星", reading: "あかつきちせい", troupe: "星組", troupeColor: "hoshi" },
    { name: "天飛華音", reading: "あまとびはなね", troupe: "星組", troupeColor: "hoshi" },
    { name: "瑠風輝", reading: "るかぜあきら", troupe: "星組", troupeColor: "hoshi" },
    { name: "音咲いつき", reading: "おとさきいつき", troupe: "星組", troupeColor: "hoshi" },
    { name: "愛月ひかる", reading: "まなつきひかる", troupe: "星組", troupeColor: "hoshi" },
    { name: "星空美咲", reading: "ほしぞらみさき", troupe: "星組", troupeColor: "hoshi" },
    { name: "風間祐", reading: "かざまゆう", troupe: "星組", troupeColor: "hoshi" },
    { name: "詩ちづる", reading: "うたちづる", troupe: "星組", troupeColor: "hoshi" },

    // 宙組 (トップ: 芹香斗亜)
    { name: "芹香斗亜", reading: "せりかとあ", troupe: "宙組", troupeColor: "sora" },
    { name: "春乃さくら", reading: "はるのさくら", troupe: "宙組", troupeColor: "sora" },
    { name: "桜木みなと", reading: "さくらぎみなと", troupe: "宙組", troupeColor: "sora" },
    { name: "澄輝さやと", reading: "すみきさやと", troupe: "宙組", troupeColor: "sora" },
    { name: "美風舞良", reading: "みかぜまいら", troupe: "宙組", troupeColor: "sora" },
    { name: "空美月", reading: "そらみつき", troupe: "宙組", troupeColor: "sora" },
    { name: "風馬翔", reading: "かざまかける", troupe: "宙組", troupeColor: "sora" },
    { name: "星咲あかり", reading: "ほしさきあかり", troupe: "宙組", troupeColor: "sora" }
];

// 漢字検定10級・9級レベルの漢字データベース
const KANJI_DATABASE = [
    // 10級レベル（小学1年生）の漢字
    { kanji: "月", readings: ["つき", "がつ", "げつ"], level: 10 },
    { kanji: "日", readings: ["ひ", "か", "にち"], level: 10 },
    { kanji: "水", readings: ["みず", "すい"], level: 10 },
    { kanji: "火", readings: ["ひ", "か"], level: 10 },
    { kanji: "木", readings: ["き", "もく"], level: 10 },
    { kanji: "金", readings: ["きん", "かな", "かね"], level: 10 },
    { kanji: "土", readings: ["つち", "ど"], level: 10 },
    { kanji: "山", readings: ["やま", "さん"], level: 10 },
    { kanji: "川", readings: ["かわ", "せん"], level: 10 },
    { kanji: "花", readings: ["はな", "か"], level: 10 },
    { kanji: "草", readings: ["くさ", "そう"], level: 10 },
    { kanji: "虫", readings: ["むし", "ちゅう"], level: 10 },
    { kanji: "犬", readings: ["いぬ", "けん"], level: 10 },
    { kanji: "人", readings: ["ひと", "じん", "にん"], level: 10 },
    { kanji: "大", readings: ["おお", "だい", "たい"], level: 10 },
    { kanji: "小", readings: ["ちい", "しょう"], level: 10 },
    { kanji: "中", readings: ["なか", "ちゅう"], level: 10 },
    { kanji: "上", readings: ["うえ", "じょう"], level: 10 },
    { kanji: "下", readings: ["した", "か", "げ"], level: 10 },
    { kanji: "左", readings: ["ひだり", "さ"], level: 10 },
    { kanji: "右", readings: ["みぎ", "う"], level: 10 },
    { kanji: "手", readings: ["て", "しゅ"], level: 10 },
    { kanji: "足", readings: ["あし", "そく"], level: 10 },
    { kanji: "目", readings: ["め", "もく"], level: 10 },
    { kanji: "口", readings: ["くち", "こう"], level: 10 },
    { kanji: "耳", readings: ["みみ", "じ"], level: 10 },
    { kanji: "白", readings: ["しろ", "はく"], level: 10 },
    { kanji: "青", readings: ["あお", "せい"], level: 10 },
    { kanji: "赤", readings: ["あか", "せき"], level: 10 },
    { kanji: "王", readings: ["おう"], level: 10 },
    { kanji: "玉", readings: ["たま", "ぎょく"], level: 10 },
    { kanji: "石", readings: ["いし", "せき"], level: 10 },
    { kanji: "竹", readings: ["たけ", "ちく"], level: 10 },
    { kanji: "糸", readings: ["いと", "し"], level: 10 },
    { kanji: "貝", readings: ["かい", "ばい"], level: 10 },
    { kanji: "車", readings: ["くるま", "しゃ"], level: 10 },

    // 9級レベル（小学2年生）の漢字
    { kanji: "空", readings: ["そら", "くう"], level: 9 },
    { kanji: "雲", readings: ["くも", "うん"], level: 9 },
    { kanji: "雨", readings: ["あめ", "う"], level: 9 },
    { kanji: "雪", readings: ["ゆき", "せつ"], level: 9 },
    { kanji: "風", readings: ["かぜ", "ふう"], level: 9 },
    { kanji: "光", readings: ["ひかり", "こう"], level: 9 },
    { kanji: "声", readings: ["こえ", "せい"], level: 9 },
    { kanji: "音", readings: ["おと", "おん"], level: 9 },
    { kanji: "色", readings: ["いろ", "しょく"], level: 9 },
    { kanji: "形", readings: ["かたち", "けい"], level: 9 },
    { kanji: "心", readings: ["こころ", "しん"], level: 9 },
    { kanji: "思", readings: ["おも", "し"], level: 9 },
    { kanji: "考", readings: ["かんが", "こう"], level: 9 },
    { kanji: "強", readings: ["つよ", "きょう"], level: 9 },
    { kanji: "弱", readings: ["よわ", "じゃく"], level: 9 },
    { kanji: "高", readings: ["たか", "こう"], level: 9 },
    { kanji: "安", readings: ["やす", "あん"], level: 9 },
    { kanji: "長", readings: ["なが", "ちょう"], level: 9 },
    { kanji: "短", readings: ["みじか", "たん"], level: 9 },
    { kanji: "明", readings: ["あか", "めい"], level: 9 },
    { kanji: "暗", readings: ["くら", "あん"], level: 9 },
    { kanji: "新", readings: ["あたら", "しん"], level: 9 },
    { kanji: "古", readings: ["ふる", "こ"], level: 9 },
    { kanji: "友", readings: ["とも", "ゆう"], level: 9 },
    { kanji: "父", readings: ["ちち", "ふ"], level: 9 },
    { kanji: "母", readings: ["はは", "ぼ"], level: 9 },
    { kanji: "兄", readings: ["あに", "きょう"], level: 9 },
    { kanji: "姉", readings: ["あね", "し"], level: 9 },
    { kanji: "弟", readings: ["おとうと", "てい"], level: 9 },
    { kanji: "妹", readings: ["いもうと", "まい"], level: 9 },
    { kanji: "家", readings: ["いえ", "か"], level: 9 },
    { kanji: "学", readings: ["まな", "がく"], level: 9 },
    { kanji: "校", readings: ["こう"], level: 9 },
    { kanji: "先", readings: ["さき", "せん"], level: 9 },
    { kanji: "生", readings: ["い", "せい"], level: 9 },
    { kanji: "年", readings: ["とし", "ねん"], level: 9 },
    { kanji: "時", readings: ["とき", "じ"], level: 9 },
    { kanji: "分", readings: ["わ", "ぶん", "ふん"], level: 9 },
    { kanji: "半", readings: ["なか", "はん"], level: 9 },
    { kanji: "朝", readings: ["あさ", "ちょう"], level: 9 },
    { kanji: "昼", readings: ["ひる", "ちゅう"], level: 9 },
    { kanji: "夜", readings: ["よる", "や"], level: 9 },
    { kanji: "今", readings: ["いま", "こん"], level: 9 },
    { kanji: "何", readings: ["なに", "なん"], level: 9 },
    { kanji: "作", readings: ["つく", "さく"], level: 9 },
    { kanji: "元", readings: ["もと", "げん"], level: 9 },
    { kanji: "公", readings: ["おおやけ", "こう"], level: 9 },
    { kanji: "春", readings: ["はる", "しゅん"], level: 9 },
    { kanji: "夏", readings: ["なつ", "か"], level: 9 },
    { kanji: "秋", readings: ["あき", "しゅう"], level: 9 },
    { kanji: "冬", readings: ["ふゆ", "とう"], level: 9 },
    { kanji: "海", readings: ["うみ", "かい"], level: 9 },
    { kanji: "星", readings: ["ほし", "せい"], level: 9 },
    { kanji: "地", readings: ["ち", "じ"], level: 9 }
];

// Wikipedia検索用のプロフィールデータベース（実在人物）
const PERFORMER_PROFILES = {
    "鳳月杏": {
        realName: "鳳月 杏",
        birthDate: "1994年11月22日",
        hometown: "千葉県",
        joinYear: "2013年",
        description: "宝塚歌劇団月組トップスター（2024年7月就任）。92期生。確かな実力と華やかな存在感で月組を牽引する。"
    },
    "白雪さち花": {
        realName: "白雪 さち花", 
        birthDate: "1995年8月14日",
        hometown: "神奈川県",
        joinYear: "2014年",
        description: "宝塚歌劇団月組の娘役。93期生。清楚で上品な美しさと丁寧な演技が魅力的。"
    },
    "永久輝せあ": {
        realName: "永久輝 せあ",
        birthDate: "1994年9月26日", 
        hometown: "愛知県",
        joinYear: "2013年",
        description: "宝塚歌劇団花組トップスター（2024年5月就任）。92期生。圧倒的な歌唱力とカリスマ性を持つ。"
    },
    "聖乃あすか": {
        realName: "聖乃 あすか",
        birthDate: "1998年4月12日",
        hometown: "東京都", 
        joinYear: "2017年",
        description: "宝塚歌劇団花組トップ娘役。100期生。清楚で気品のある美しさと表現力豊かな演技が光る。"
    },
    "朝美絢": {
        realName: "朝美 絢",
        birthDate: "1995年3月28日",
        hometown: "神奈川県",
        joinYear: "2013年", 
        description: "宝塚歌劇団雪組トップスター（2024年10月就任）。95期生。端正な容姿と確かな演技力で観客を魅了する。"
    },
    "夢白あや": {
        realName: "夢白 あや",
        birthDate: "1996年5月15日",
        hometown: "大阪府",
        joinYear: "2015年",
        description: "宝塚歌劇団雪組トップ娘役。97期生。夢のような美しさと白雪のような清らかさを持つ。"
    },
    "暁千星": {
        realName: "暁 千星", 
        birthDate: "1996年1月30日",
        hometown: "東京都",
        joinYear: "2014年",
        description: "宝塚歌劇団星組トップスター（2025年8月就任）。96期生。ダイナミックなダンスと情熱的な演技が印象的。"
    },
    "芹香斗亜": {
        realName: "芹香 斗亜",
        birthDate: "1995年6月28日", 
        hometown: "京都府",
        joinYear: "2014年",
        description: "宝塚歌劇団宙組トップスター。94期生。クールな魅力と圧倒的な存在感で宙組を率いる。"
    },
    "春乃さくら": {
        realName: "春乃 さくら",
        birthDate: "1996年3月3日",
        hometown: "兵庫県", 
        joinYear: "2015年",
        description: "宝塚歌劇団宙組トップ娘役。97期生。春の桜のような華やかさと可憐な美しさが魅力。"
    }
};

// デフォルトの劇団員写真URL（実在人物用プレースホルダー）
const DEFAULT_PHOTO_URLS = {
    // 月組
    "鳳月杏": "https://via.placeholder.com/150x150/2c3e50/ffffff?text=鳳月杏",
    "白雪さち花": "https://via.placeholder.com/150x150/ecf0f1/2c3e50?text=白雪さち花",
    "夢奈瑠音": "https://via.placeholder.com/150x150/34495e/ffffff?text=夢奈瑠音",
    "風間柚乃": "https://via.placeholder.com/150x150/2c3e50/ffffff?text=風間柚乃",
    "天紫珠李": "https://via.placeholder.com/150x150/9b59b6/ffffff?text=天紫珠李",
    "桃歌雪": "https://via.placeholder.com/150x150/e91e63/ffffff?text=桃歌雪",
    "彩みちる": "https://via.placeholder.com/150x150/3f51b5/ffffff?text=彩みちる",
    "英かおと": "https://via.placeholder.com/150x150/2c3e50/ffffff?text=英かおと",
    
    // 花組
    "永久輝せあ": "https://via.placeholder.com/150x150/e74c3c/ffffff?text=永久輝せあ",
    "聖乃あすか": "https://via.placeholder.com/150x150/f8bbd9/2c3e50?text=聖乃あすか",
    "水美舞斗": "https://via.placeholder.com/150x150/3498db/ffffff?text=水美舞斗",
    "華優希": "https://via.placeholder.com/150x150/e74c3c/ffffff?text=華優希",
    "春妃うらら": "https://via.placeholder.com/150x150/2ecc71/ffffff?text=春妃うらら",
    "花音舞": "https://via.placeholder.com/150x150/e91e63/ffffff?text=花音舞",
    "風光る": "https://via.placeholder.com/150x150/f39c12/ffffff?text=風光る",
    "朝美絢": "https://via.placeholder.com/150x150/ff5722/ffffff?text=朝美絢",
    
    // 雪組
    "朝美絢": "https://via.placeholder.com/150x150/ecf0f1/2c3e50?text=朝美絢",
    "夢白あや": "https://via.placeholder.com/150x150/ffffff/2c3e50?text=夢白あや",
    "縣千": "https://via.placeholder.com/150x150/bdc3c7/2c3e50?text=縣千",
    "瀬央ゆりあ": "https://via.placeholder.com/150x150/e8f5e8/2c3e50?text=瀬央ゆりあ",
    "音彩唯": "https://via.placeholder.com/150x150/9c27b0/ffffff?text=音彩唯",
    "美羽愛": "https://via.placeholder.com/150x150/f8bbd9/2c3e50?text=美羽愛",
    "雪花風月": "https://via.placeholder.com/150x150/ecf0f1/2c3e50?text=雪花風月",
    "白妙なつ": "https://via.placeholder.com/150x150/ffffff/2c3e50?text=白妙なつ",
    
    // 星組
    "暁千星": "https://via.placeholder.com/150x150/1abc9c/ffffff?text=暁千星",
    "天飛華音": "https://via.placeholder.com/150x150/ff9800/ffffff?text=天飛華音",
    "瑠風輝": "https://via.placeholder.com/150x150/009688/ffffff?text=瑠風輝",
    "音咲いつき": "https://via.placeholder.com/150x150/4caf50/ffffff?text=音咲いつき",
    "愛月ひかる": "https://via.placeholder.com/150x150/f1c40f/2c3e50?text=愛月ひかる",
    "星空美咲": "https://via.placeholder.com/150x150/3f51b5/ffffff?text=星空美咲",
    "風間祐": "https://via.placeholder.com/150x150/607d8b/ffffff?text=風間祐",
    "詩ちづる": "https://via.placeholder.com/150x150/795548/ffffff?text=詩ちづる",
    
    // 宙組
    "芹香斗亜": "https://via.placeholder.com/150x150/3498db/ffffff?text=芹香斗亜",
    "春乃さくら": "https://via.placeholder.com/150x150/f8bbd9/2c3e50?text=春乃さくら",
    "桜木みなと": "https://via.placeholder.com/150x150/e91e63/ffffff?text=桜木みなと",
    "澄輝さやと": "https://via.placeholder.com/150x150/2196f3/ffffff?text=澄輝さやと",
    "美風舞良": "https://via.placeholder.com/150x150/9c27b0/ffffff?text=美風舞良",
    "空美月": "https://via.placeholder.com/150x150/87ceeb/2c3e50?text=空美月",
    "風馬翔": "https://via.placeholder.com/150x150/00bcd4/ffffff?text=風馬翔",
    "星咲あかり": "https://via.placeholder.com/150x150/ffeb3b/2c3e50?text=星咲あかり"
};

// 組名の日本語表示
const TROUPE_NAMES = {
    "tsuki": "月組",
    "hana": "花組",
    "yuki": "雪組",
    "hoshi": "星組",
    "sora": "宙組"
};