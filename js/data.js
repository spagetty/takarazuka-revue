// 宝塚歌劇団劇団員データベース（現役＋人気歴代スター、小学2年生レベル漢字含む）
const TAKARAZUKA_PERFORMERS = [
    // 月組 (現役トップ: 鳳月杏)
    { name: "鳳月杏", reading: "ほうづきあん", troupe: "月組", troupeColor: "tsuki", era: "現役", photoUrl: "https://i.imgur.com/placeholder_moon_1.jpg" },
    { name: "白雪さち花", reading: "しらゆきさちか", troupe: "月組", troupeColor: "tsuki", era: "現役", photoUrl: "https://i.imgur.com/placeholder_moon_2.jpg" },
    { name: "夢奈瑠音", reading: "ゆめなるね", troupe: "月組", troupeColor: "tsuki", era: "現役", photoUrl: "https://i.imgur.com/placeholder_moon_3.jpg" },
    { name: "風間柚乃", reading: "かざまゆの", troupe: "月組", troupeColor: "tsuki", era: "現役", photoUrl: "https://i.imgur.com/placeholder_moon_4.jpg" },
    
    // 月組 歴代人気スター
    { name: "天海祐希", reading: "あまみゆうき", troupe: "月組", troupeColor: "tsuki", era: "歴代", photoUrl: "https://avatars.dicebear.com/api/avataaars/amami-yuki.svg?background=%232c3e50&top[]=shortHair&accessories[]=sunglasses&clothesColor=blue01" },
    { name: "月城かなと", reading: "つきしろかなと", troupe: "月組", troupeColor: "tsuki", era: "歴代", photoUrl: "https://avatars.dicebear.com/api/avataaars/tsukishiro-kanato.svg?background=%232c3e50&top[]=shortHair&clothesColor=blue02" },
    { name: "美月優", reading: "みづきゆう", troupe: "月組", troupeColor: "tsuki", era: "歴代", photoUrl: "https://avatars.dicebear.com/api/avataaars/mizuki-yu.svg?background=%232c3e50&top[]=longHair&clothesColor=blue03" },
    { name: "春光大和", reading: "はるひやまと", troupe: "月組", troupeColor: "tsuki", era: "歴代", photoUrl: "https://avatars.dicebear.com/api/avataaars/haruhi-yamato.svg?background=%232c3e50&top[]=shortHair&clothesColor=blue01" },

    // 花組 (現役トップ: 永久輝せあ)  
    { name: "永久輝せあ", reading: "とわきせあ", troupe: "花組", troupeColor: "hana", era: "現役", photoUrl: "https://i.imgur.com/placeholder_hana_1.jpg" },
    { name: "聖乃あすか", reading: "せいのあすか", troupe: "花組", troupeColor: "hana", era: "現役", photoUrl: "https://i.imgur.com/placeholder_hana_2.jpg" },
    { name: "水美舞斗", reading: "みなみまいと", troupe: "花組", troupeColor: "hana", era: "現役", photoUrl: "https://i.imgur.com/placeholder_hana_3.jpg" },
    { name: "華優希", reading: "はなゆうき", troupe: "花組", troupeColor: "hana", era: "現役", photoUrl: "https://i.imgur.com/placeholder_hana_4.jpg" },
    
    // 花組 歴代人気スター
    { name: "明日海りお", reading: "あすみりお", troupe: "花組", troupeColor: "hana", era: "歴代", photoUrl: "https://avatars.dicebear.com/api/avataaars/asumi-rio.svg?background=%23e74c3c&top[]=shortHair&accessories[]=eyepatch&clothesColor=red" },
    { name: "柚香光", reading: "ゆずかれい", troupe: "花組", troupeColor: "hana", era: "歴代", photoUrl: "https://avatars.dicebear.com/api/avataaars/yuzuka-rei.svg?background=%23e74c3c&top[]=shortHair&clothesColor=pink" },
    { name: "春野寿美礼", reading: "はるのすみれ", troupe: "花組", troupeColor: "hana", era: "歴代", photoUrl: "https://avatars.dicebear.com/api/avataaars/haruno-sumire.svg?background=%23e74c3c&top[]=longHair&clothesColor=red" },
    { name: "花音舞", reading: "はなねまい", troupe: "花組", troupeColor: "hana", era: "現役", photoUrl: "https://avatars.dicebear.com/api/avataaars/hanane-mai.svg?background=%23e74c3c&top[]=longHair&clothesColor=pink" },

    // 雪組 (現役トップ: 朝美絢)
    { name: "朝美絢", reading: "あさみじゅん", troupe: "雪組", troupeColor: "yuki", era: "現役", photoUrl: "https://i.imgur.com/placeholder_yuki_1.jpg" },
    { name: "夢白あや", reading: "ゆめしろあや", troupe: "雪組", troupeColor: "yuki", era: "現役", photoUrl: "https://i.imgur.com/placeholder_yuki_2.jpg" },
    { name: "縣千", reading: "あがたせん", troupe: "雪組", troupeColor: "yuki", era: "現役", photoUrl: "https://i.imgur.com/placeholder_yuki_3.jpg" },
    { name: "音彩唯", reading: "おとあゆい", troupe: "雪組", troupeColor: "yuki", era: "現役", photoUrl: "https://i.imgur.com/placeholder_yuki_4.jpg" },
    
    // 雪組 歴代人気スター
    { name: "望海風斗", reading: "のぞみふうと", troupe: "雪組", troupeColor: "yuki", era: "歴代", photoUrl: "https://avatars.dicebear.com/api/avataaars/nozomi-futo.svg?background=%23ecf0f1&top[]=shortHair&clothesColor=blue02" },
    { name: "水夏希", reading: "みずなつき", troupe: "雪組", troupeColor: "yuki", era: "歴代", photoUrl: "https://avatars.dicebear.com/api/avataaars/mizu-natsuki.svg?background=%23ecf0f1&top[]=longHair&clothesColor=blue01" },
    { name: "白妙なつ", reading: "しろたえなつ", troupe: "雪組", troupeColor: "yuki", era: "現役", photoUrl: "https://avatars.dicebear.com/api/avataaars/shirotae-natsu.svg?background=%23ecf0f1&top[]=longHair&clothesColor=blue03" },
    { name: "雪花風月", reading: "ゆきはなふうげつ", troupe: "雪組", troupeColor: "yuki", era: "現役", photoUrl: "https://avatars.dicebear.com/api/avataaars/yukihana-fugetsu.svg?background=%23ecf0f1&top[]=longHair&clothesColor=blue02" },

    // 星組 (現役トップ: 暁千星)
    { name: "暁千星", reading: "あかつきちせい", troupe: "星組", troupeColor: "hoshi", era: "現役", photoUrl: "https://i.imgur.com/placeholder_hoshi_1.jpg" },
    { name: "天飛華音", reading: "あまとびはなね", troupe: "星組", troupeColor: "hoshi", era: "現役", photoUrl: "https://i.imgur.com/placeholder_hoshi_2.jpg" },
    { name: "音咲いつき", reading: "おとさきいつき", troupe: "星組", troupeColor: "hoshi", era: "現役", photoUrl: "https://i.imgur.com/placeholder_hoshi_3.jpg" },
    { name: "愛月ひかる", reading: "まなつきひかる", troupe: "星組", troupeColor: "hoshi", era: "現役", photoUrl: "https://i.imgur.com/placeholder_hoshi_4.jpg" },
    
    // 星組 歴代人気スター
    { name: "礼真琴", reading: "れいまこと", troupe: "星組", troupeColor: "hoshi", era: "歴代", photoUrl: "https://avatars.dicebear.com/api/avataaars/rei-makoto.svg?background=%231abc9c&top[]=shortHair&clothesColor=green" },
    { name: "星風まどか", reading: "せいかぜまどか", troupe: "星組", troupeColor: "hoshi", era: "歴代", photoUrl: "https://avatars.dicebear.com/api/avataaars/seikaze-madoka.svg?background=%231abc9c&top[]=longHair&clothesColor=green02" },
    { name: "星空美咲", reading: "ほしぞらみさき", troupe: "星組", troupeColor: "hoshi", era: "現役", photoUrl: "https://avatars.dicebear.com/api/avataaars/hoshizora-misaki.svg?background=%231abc9c&top[]=longHair&clothesColor=green01" },
    { name: "北翔海莉", reading: "ほくしょうかいり", troupe: "星組", troupeColor: "hoshi", era: "歴代", photoUrl: "https://avatars.dicebear.com/api/avataaars/hokusho-kairi.svg?background=%231abc9c&top[]=shortHair&clothesColor=green03" },

    // 宙組 (現役トップ: 芹香斗亜) 
    { name: "芹香斗亜", reading: "せりかとあ", troupe: "宙組", troupeColor: "sora", era: "現役", photoUrl: "https://i.imgur.com/placeholder_sora_1.jpg" },
    { name: "春乃さくら", reading: "はるのさくら", troupe: "宙組", troupeColor: "sora", era: "現役", photoUrl: "https://i.imgur.com/placeholder_sora_2.jpg" },
    { name: "桜木みなと", reading: "さくらぎみなと", troupe: "宙組", troupeColor: "sora", era: "現役", photoUrl: "https://i.imgur.com/placeholder_sora_3.jpg" },
    { name: "空美月", reading: "そらみつき", troupe: "宙組", troupeColor: "sora", era: "現役", photoUrl: "https://i.imgur.com/placeholder_sora_4.jpg" },
    
    // 宙組 歴代人気スター
    { name: "真風涼帆", reading: "まかぜすずほ", troupe: "宙組", troupeColor: "sora", era: "歴代", photoUrl: "https://avatars.dicebear.com/api/avataaars/makaze-suzuho.svg?background=%233498db&top[]=shortHair&clothesColor=blue01" },
    { name: "美風舞良", reading: "みかぜまいら", troupe: "宙組", troupeColor: "sora", era: "現役", photoUrl: "https://avatars.dicebear.com/api/avataaars/mikaze-maira.svg?background=%233498db&top[]=longHair&clothesColor=blue02" },
    { name: "星咲あかり", reading: "ほしさきあかり", troupe: "宙組", troupeColor: "sora", era: "現役", photoUrl: "https://avatars.dicebear.com/api/avataaars/hoshisaki-akari.svg?background=%233498db&top[]=longHair&clothesColor=blue03" },
    { name: "風馬翔", reading: "かざまかける", troupe: "宙組", troupeColor: "sora", era: "現役", photoUrl: "https://avatars.dicebear.com/api/avataaars/kazama-kakeru.svg?background=%233498db&top[]=shortHair&clothesColor=blue01" }
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

// Wikipedia検索用のプロフィールデータベース（現役＋歴代人気スター）
const PERFORMER_PROFILES = {
    // 現役スター
    "鳳月杏": {
        realName: "鳳月 杏",
        birthDate: "1994年11月22日",
        hometown: "千葉県",
        joinYear: "2013年",
        era: "現役",
        description: "宝塚歌劇団月組トップスター（2024年7月就任）。92期生。確かな実力と華やかな存在感で月組を牽引する。"
    },
    "永久輝せあ": {
        realName: "永久輝 せあ",
        birthDate: "1994年9月26日", 
        hometown: "愛知県",
        joinYear: "2013年",
        era: "現役",
        description: "宝塚歌劇団花組トップスター（2024年5月就任）。92期生。圧倒的な歌唱力とカリスマ性を持つ。"
    },
    "朝美絢": {
        realName: "朝美 絢",
        birthDate: "1995年3月28日",
        hometown: "神奈川県",
        joinYear: "2013年", 
        era: "現役",
        description: "宝塚歌劇団雪組トップスター（2024年10月就任）。95期生。端正な容姿と確かな演技力で観客を魅了する。"
    },
    "暁千星": {
        realName: "暁 千星", 
        birthDate: "1996年1月30日",
        hometown: "東京都",
        joinYear: "2014年",
        era: "現役",
        description: "宝塚歌劇団星組トップスター（2025年8月就任）。96期生。ダイナミックなダンスと情熱的な演技が印象的。"
    },
    "芹香斗亜": {
        realName: "芹香 斗亜",
        birthDate: "1995年6月28日", 
        hometown: "京都府",
        joinYear: "2014年",
        era: "現役",
        description: "宝塚歌劇団宙組トップスター。94期生。クールな魅力と圧倒的な存在感で宙組を率いる。"
    },
    
    // 歴代人気スター
    "天海祐希": {
        realName: "天海 祐希",
        birthDate: "1967年8月8日",
        hometown: "東京都",
        joinYear: "1987年",
        era: "歴代",
        description: "宝塚歌劇団元月組トップスター（1993-1995）。73期生。史上最年少25歳でトップ就任。退団後は女優として大活躍。"
    },
    "望海風斗": {
        realName: "望海 風斗",
        birthDate: "1985年6月26日",
        hometown: "兵庫県",
        joinYear: "2003年",
        era: "歴代",
        description: "宝塚歌劇団元雪組トップスター（2017-2021）。89期生。圧倒的な人気と実力で雪組黄金期を築いた伝説のスター。"
    },
    "明日海りお": {
        realName: "明日海 りお",
        birthDate: "1985年9月13日",
        hometown: "静岡県",
        joinYear: "2004年",
        era: "歴代", 
        description: "宝塚歌劇団元花組トップスター（2014-2019）。90期生。端正な容姿と確かな演技力で多くのファンを魅了した。"
    },
    "柚香光": {
        realName: "柚香 光",
        birthDate: "1993年12月20日",
        hometown: "兵庫県",
        joinYear: "2012年",
        era: "歴代",
        description: "宝塚歌劇団元花組トップスター（2019-2024）。95期生。力強い歌声と華やかな舞台での存在感で花組を牽引した。"
    },
    "月城かなと": {
        realName: "月城 かなと",
        birthDate: "1994年12月15日",
        hometown: "兵庫県",
        joinYear: "2013年",
        era: "歴代",
        description: "宝塚歌劇団元月組トップスター（2021-2024）。92期生。清廉で気品のある舞台姿が魅力的で、歌唱力にも定評があった。"
    },
    "礼真琴": {
        realName: "礼 真琴",
        birthDate: "1994年1月21日",
        hometown: "東京都",
        joinYear: "2012年",
        era: "歴代",
        description: "宝塚歌劇団元星組トップスター（2019-2025）。95期生。情熱的な演技と美しい歌声で多くのファンを魅了した「トップ・オブ・トップ」。"
    },
    "真風涼帆": {
        realName: "真風 涼帆",
        birthDate: "1993年8月3日",
        hometown: "奈良県",
        joinYear: "2012年",
        era: "歴代",
        description: "宝塚歌劇団元宙組トップスター（2017-2022）。95期生。端正な容姿と力強い演技力で宙組を率いた。"
    },
    "北翔海莉": {
        realName: "北翔 海莉",
        birthDate: "1981年7月10日",
        hometown: "埼玉県",
        joinYear: "2000年",
        era: "歴代",
        description: "宝塚歌劇団元星組トップスター（2010-2015）。86期生。歌唱力に定評があり、退団後はミュージカル女優として活躍。"
    },
    "水夏希": {
        realName: "水 夏希",
        birthDate: "1980年8月13日",
        hometown: "北海道",
        joinYear: "1999年",
        era: "歴代",
        description: "宝塚歌劇団元雪組トップスター（2006-2010）。85期生。クールな魅力と確かな実力で雪組を牽引した。"
    },
    "春野寿美礼": {
        realName: "春野 寿美礼",
        birthDate: "1972年12月11日",
        hometown: "兵庫県",
        joinYear: "1991年",
        era: "歴代",
        description: "宝塚歌劇団元花組トップスター（2001-2007）。77期生。美しい歌声と優雅な演技で花組の黄金時代を築いた。"
    }
};

// デフォルトの劇団員写真URL（現役＋歴代スター用プレースホルダー）
const DEFAULT_PHOTO_URLS = {
    // 月組 現役
    "鳳月杏": "https://via.placeholder.com/150x150/2c3e50/ffffff?text=鳳月杏",
    "白雪さち花": "https://via.placeholder.com/150x150/ecf0f1/2c3e50?text=白雪さち花",
    "夢奈瑠音": "https://via.placeholder.com/150x150/34495e/ffffff?text=夢奈瑠音",
    "風間柚乃": "https://via.placeholder.com/150x150/2c3e50/ffffff?text=風間柚乃",
    
    // 月組 歴代
    "天海祐希": "https://avatars.dicebear.com/api/avataaars/amami-yuki.svg?background=%23c0392b&top[]=longHair&accessories[]=sunglasses&clothesColor=blue01",
    "月城かなと": "https://avatars.dicebear.com/api/avataaars/tsukishiro-kanato.svg?background=%232c3e50&top[]=shortHair&clothesColor=blue02",
    "美月優": "https://avatars.dicebear.com/api/avataaars/mizuki-yu.svg?background=%232c3e50&top[]=longHair&clothesColor=blue03",
    "春光大和": "https://avatars.dicebear.com/api/avataaars/haruhi-yamato.svg?background=%232c3e50&top[]=shortHair&clothesColor=blue01",

    // 花組 現役
    "永久輝せあ": "https://via.placeholder.com/150x150/e74c3c/ffffff?text=永久輝せあ",
    "聖乃あすか": "https://via.placeholder.com/150x150/f8bbd9/2c3e50?text=聖乃あすか",
    "水美舞斗": "https://via.placeholder.com/150x150/3498db/ffffff?text=水美舞斗",
    "華優希": "https://via.placeholder.com/150x150/e74c3c/ffffff?text=華優希",
    
    // 花組 歴代
    "明日海りお": "https://avatars.dicebear.com/api/avataaars/asumi-rio.svg?background=%23e74c3c&top[]=shortHair&accessories[]=eyepatch&clothesColor=red",
    "柚香光": "https://avatars.dicebear.com/api/avataaars/yuzuka-rei.svg?background=%23e74c3c&top[]=shortHair&clothesColor=pink",
    "春野寿美礼": "https://avatars.dicebear.com/api/avataaars/haruno-sumire.svg?background=%23e74c3c&top[]=longHair&clothesColor=red",
    "花音舞": "https://avatars.dicebear.com/api/avataaars/hanane-mai.svg?background=%23e74c3c&top[]=longHair&clothesColor=pink",

    // 雪組 現役
    "朝美絢": "https://via.placeholder.com/150x150/ecf0f1/2c3e50?text=朝美絢",
    "夢白あや": "https://via.placeholder.com/150x150/ffffff/2c3e50?text=夢白あや",
    "縣千": "https://via.placeholder.com/150x150/bdc3c7/2c3e50?text=縣千",
    "音彩唯": "https://via.placeholder.com/150x150/9c27b0/ffffff?text=音彩唯",
    
    // 雪組 歴代
    "望海風斗": "https://avatars.dicebear.com/api/avataaars/nozomi-futo.svg?background=%23ecf0f1&top[]=shortHair&clothesColor=blue02",
    "水夏希": "https://avatars.dicebear.com/api/avataaars/mizu-natsuki.svg?background=%23ecf0f1&top[]=longHair&clothesColor=blue01",
    "白妙なつ": "https://avatars.dicebear.com/api/avataaars/shirotae-natsu.svg?background=%23ecf0f1&top[]=longHair&clothesColor=blue03",
    "雪花風月": "https://avatars.dicebear.com/api/avataaars/yukihana-fugetsu.svg?background=%23ecf0f1&top[]=longHair&clothesColor=blue02",

    // 星組 現役
    "暁千星": "https://via.placeholder.com/150x150/1abc9c/ffffff?text=暁千星",
    "天飛華音": "https://via.placeholder.com/150x150/ff9800/ffffff?text=天飛華音",
    "音咲いつき": "https://via.placeholder.com/150x150/4caf50/ffffff?text=音咲いつき",
    "愛月ひかる": "https://via.placeholder.com/150x150/f1c40f/2c3e50?text=愛月ひかる",
    
    // 星組 歴代
    "礼真琴": "https://avatars.dicebear.com/api/avataaars/rei-makoto.svg?background=%231abc9c&top[]=shortHair&clothesColor=green",
    "星風まどか": "https://avatars.dicebear.com/api/avataaars/seikaze-madoka.svg?background=%231abc9c&top[]=longHair&clothesColor=green02",
    "星空美咲": "https://avatars.dicebear.com/api/avataaars/hoshizora-misaki.svg?background=%231abc9c&top[]=longHair&clothesColor=green01",
    "北翔海莉": "https://avatars.dicebear.com/api/avataaars/hokusho-kairi.svg?background=%231abc9c&top[]=shortHair&clothesColor=green03",

    // 宙組 現役
    "芹香斗亜": "https://via.placeholder.com/150x150/3498db/ffffff?text=芹香斗亜",
    "春乃さくら": "https://via.placeholder.com/150x150/f8bbd9/2c3e50?text=春乃さくら",
    "桜木みなと": "https://via.placeholder.com/150x150/e91e63/ffffff?text=桜木みなと",
    "空美月": "https://via.placeholder.com/150x150/87ceeb/2c3e50?text=空美月",
    
    // 宙組 歴代
    "真風涼帆": "https://avatars.dicebear.com/api/avataaars/makaze-suzuho.svg?background=%233498db&top[]=shortHair&clothesColor=blue01",
    "美風舞良": "https://avatars.dicebear.com/api/avataaars/mikaze-maira.svg?background=%233498db&top[]=longHair&clothesColor=blue02",
    "星咲あかり": "https://avatars.dicebear.com/api/avataaars/hoshisaki-akari.svg?background=%233498db&top[]=longHair&clothesColor=blue03",
    "風馬翔": "https://avatars.dicebear.com/api/avataaars/kazama-kakeru.svg?background=%233498db&top[]=shortHair&clothesColor=blue01"
};

// 組名の日本語表示
const TROUPE_NAMES = {
    "tsuki": "月組",
    "hana": "花組",
    "yuki": "雪組",
    "hoshi": "星組",
    "sora": "宙組"
};