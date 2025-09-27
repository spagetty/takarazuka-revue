// 宝塚漢字学習アプリ - メインアプリケーション

class TakarazukaKanjiApp {
    constructor() {
        this.currentQuestionIndex = 0;
        this.correctAnswers = 0;
        this.totalQuestions = 60; // 全問題数（拡張されたデータベースに対応）
        this.questions = [];
        this.currentQuestion = null;
        this.isAnswering = false;
        this.usedPerformers = new Set(); // 使用済みの劇団員を記録
        this.correctQuestions = new Set(); // 正解済み問題のIDを記録
        
        this.initializeApp();
    }

    initializeApp() {
        this.generateQuestions();
        this.bindEvents();
        this.showStartScreen();
    }

    bindEvents() {
        // スタートボタン
        document.getElementById('startButton').addEventListener('click', () => {
            this.startQuiz();
        });

        // 選択肢ボタン
        document.querySelectorAll('.option-button').forEach(button => {
            button.addEventListener('click', (e) => {
                if (!this.isAnswering) {
                    this.selectAnswer(parseInt(e.target.dataset.answer));
                }
            });
        });

        // 次の問題ボタン
        document.getElementById('nextButton').addEventListener('click', () => {
            this.nextQuestion();
        });

        // やり直しボタン
        document.getElementById('restartButton').addEventListener('click', () => {
            this.restartQuiz();
        });
    }

    generateQuestions() {
        this.questions = [];
        const usedKanjiPerformerPairs = new Set();

        for (let i = 0; i < this.totalQuestions; i++) {
            let question;
            let attempts = 0;
            
            do {
                question = this.createQuestion();
                attempts++;
                // 無限ループを防ぐ
                if (attempts > 100) {
                    break;
                }
            } while (question && (
                usedKanjiPerformerPairs.has(`${question.kanji}-${question.performer.name}`) ||
                this.correctQuestions.has(this.getQuestionId(question))
            ) && attempts < 100);
            
            if (question) {
                question.id = this.getQuestionId(question); // 問題にIDを付与
                this.questions.push(question);
                usedKanjiPerformerPairs.add(`${question.kanji}-${question.performer.name}`);
            }
        }

        // 問題数が足りない場合は重複を許可して補完
        while (this.questions.length < this.totalQuestions) {
            const question = this.createQuestion();
            if (question) {
                question.id = this.getQuestionId(question);
                this.questions.push(question);
            }
        }
    }

    // 問題の一意IDを生成
    getQuestionId(question) {
        return `${question.performer.name}-${question.kanji}`;
    }

    createQuestion() {
        // ランダムに劇団員を選択
        const performer = TAKARAZUKA_PERFORMERS[Math.floor(Math.random() * TAKARAZUKA_PERFORMERS.length)];
        
        // 劇団員の名前に含まれる漢字を取得
        const performerKanji = this.extractKanjiFromName(performer.name);
        
        if (performerKanji.length === 0) {
            return null;
        }

        // ランダムに漢字を選択
        const targetKanji = performerKanji[Math.floor(Math.random() * performerKanji.length)];
        
        // 漢字データベースから情報を取得
        const kanjiData = KANJI_DATABASE.find(k => k.kanji === targetKanji);
        
        if (!kanjiData) {
            return null;
        }

        // 正解の読み方をランダムに選択
        const correctReading = kanjiData.readings[Math.floor(Math.random() * kanjiData.readings.length)];
        
        // 間違い選択肢を生成
        const wrongOptions = this.generateWrongOptions(correctReading, kanjiData.kanji);
        
        // 選択肢をシャッフル
        const options = [correctReading, ...wrongOptions];
        const shuffledOptions = this.shuffleArray(options);
        const correctIndex = shuffledOptions.indexOf(correctReading);

        return {
            performer,
            kanji: targetKanji,
            kanjiData,
            correctReading,
            options: shuffledOptions,
            correctIndex
        };
    }

    extractKanjiFromName(name) {
        const kanji = [];
        for (let char of name) {
            if (KANJI_DATABASE.find(k => k.kanji === char)) {
                kanji.push(char);
            }
        }
        return kanji;
    }

    generateWrongOptions(correctReading, targetKanji) {
        const wrongOptions = [];
        const allReadings = new Set();
        
        // 他の漢字の読み方を収集
        KANJI_DATABASE.forEach(kanjiData => {
            if (kanjiData.kanji !== targetKanji) {
                kanjiData.readings.forEach(reading => {
                    allReadings.add(reading);
                });
            }
        });
        
        // 正解を除外
        allReadings.delete(correctReading);
        
        const readingsArray = Array.from(allReadings);
        
        // ランダムに3つの間違い選択肢を選択
        while (wrongOptions.length < 3 && readingsArray.length > 0) {
            const randomIndex = Math.floor(Math.random() * readingsArray.length);
            const wrongReading = readingsArray.splice(randomIndex, 1)[0];
            wrongOptions.push(wrongReading);
        }
        
        // 足りない場合はデフォルトの選択肢を追加
        const defaultWrongOptions = ["あい", "うえ", "おか", "きく", "さし", "たち", "なに", "はひ", "まみ", "やゆ"];
        while (wrongOptions.length < 3) {
            const defaultOption = defaultWrongOptions[wrongOptions.length];
            if (!wrongOptions.includes(defaultOption) && defaultOption !== correctReading) {
                wrongOptions.push(defaultOption);
            }
        }
        
        return wrongOptions.slice(0, 3);
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    showStartScreen() {
        this.hideAllScreens();
        document.getElementById('startScreen').style.display = 'flex';
    }

    startQuiz() {
        this.currentQuestionIndex = 0;
        this.correctAnswers = 0;
        this.showQuestion();
    }

    showQuestion() {
        if (this.currentQuestionIndex >= this.questions.length) {
            this.showCompletionScreen();
            return;
        }

        this.hideAllScreens();
        document.getElementById('quizScreen').style.display = 'block';
        
        this.currentQuestion = this.questions[this.currentQuestionIndex];
        this.isAnswering = false;

        // 進捗更新
        this.updateProgress();

        // 組のテーマを適用
        this.applyTroupeTheme(this.currentQuestion.performer.troupeColor);

        // 劇団員情報を表示
        this.displayPerformerInfo(this.currentQuestion.performer);

        // 問題を表示
        this.displayQuestion(this.currentQuestion);

        // 結果セクションを非表示
        document.getElementById('resultSection').style.display = 'none';

        // 選択肢をリセット
        this.resetOptions();

        // 劇団員の写真を読み込み
        this.loadPerformerPhoto(this.currentQuestion.performer);
    }

    updateProgress() {
        const progressPercentage = ((this.currentQuestionIndex + 1) / this.totalQuestions) * 100;
        
        document.getElementById('currentQuestion').textContent = this.currentQuestionIndex + 1;
        document.getElementById('totalQuestions').textContent = this.totalQuestions;
        document.getElementById('correctCount').textContent = this.correctAnswers;
        document.getElementById('progressFill').style.width = progressPercentage + '%';
    }

    applyTroupeTheme(troupeColor) {
        // 既存のテーマクラスを削除
        const body = document.body;
        body.className = body.className.replace(/troupe-\w+/g, '');
        
        // 新しいテーマクラスを追加
        body.classList.add(`troupe-${troupeColor}`);
        
        // 組名を表示
        document.getElementById('troupeName').textContent = TROUPE_NAMES[troupeColor];
    }

    displayPerformerInfo(performer) {
        document.getElementById('performerName').textContent = performer.name;
        document.getElementById('performerReading').textContent = `(${performer.reading})`;
    }

    displayQuestion(question) {
        document.getElementById('targetKanji').textContent = `「${question.performer.name}」の芸名より`;
        document.getElementById('questionKanji').textContent = question.kanji;
        
        const optionButtons = document.querySelectorAll('.option-button');
        question.options.forEach((option, index) => {
            optionButtons[index].textContent = option;
        });
    }

    resetOptions() {
        document.querySelectorAll('.option-button').forEach(button => {
            button.classList.remove('selected', 'correct', 'incorrect');
        });
    }

    async loadPerformerPhoto(performer) {
        const photoElement = document.getElementById('performerPhoto');
        const loadingElement = document.getElementById('photoLoading');
        
        // ローディング表示
        photoElement.style.display = 'none';
        loadingElement.style.display = 'flex';
        
        try {
            // データベースに写真URLがある場合はそれを使用
            let photoUrl = performer.photoUrl;
            
            // URLが無効な場合は代替画像を生成
            if (!photoUrl || photoUrl.includes('placeholder') || photoUrl.includes('i.imgur.com/placeholder')) {
                photoUrl = DEFAULT_PHOTO_URLS[performer.name] || 
                          this.generatePerformerImage(performer);
            }
            
            photoElement.src = photoUrl;
            photoElement.alt = `${performer.name}の写真`;
            
            // 画像読み込み完了後に表示
            photoElement.onload = () => {
                loadingElement.style.display = 'none';
                photoElement.style.display = 'block';
            };
            
            photoElement.onerror = () => {
                // エラー時は組の色とeraに合わせた美しいアバターを表示
                const fallbackUrl = this.generatePerformerAvatar(performer);
                photoElement.src = fallbackUrl;
                loadingElement.style.display = 'none';
                photoElement.style.display = 'block';
            };
            
        } catch (error) {
            console.error('写真の読み込みに失敗:', error);
            photoElement.src = this.generatePerformerAvatar(performer);
            loadingElement.style.display = 'none';
            photoElement.style.display = 'block';
        }
    }

    // Wikipedia検索機能の改良版
    async searchWikipediaImage(performerName) {
        try {
            // CORSの問題を避けるため、プロキシサービスを使用するか
            // または実際の実装では、バックエンドAPI経由でアクセスする
            // ここでは簡略化してnullを返す（実際のWikipedia APIは使用しない）
            return null;
        } catch (error) {
            console.error('Wikipedia検索エラー:', error);
            return null;
        }
    }

    // 劇団員に合わせた美しいプレースホルダー画像を生成
    generatePerformerImage(performer) {
        const colorMap = {
            'tsuki': '2c3e50',  // 月組: ダークブルー
            'hana': 'e74c3c',   // 花組: レッド
            'yuki': 'ecf0f1',   // 雪組: ホワイト
            'hoshi': '1abc9c',  // 星組: ティール
            'sora': '3498db'    // 宙組: ブルー
        };
        
        const textColor = performer.troupeColor === 'yuki' ? '2c3e50' : 'ffffff';
        const bgColor = colorMap[performer.troupeColor] || '95a5a6';
        
        return `https://via.placeholder.com/150x150/${bgColor}/${textColor}?text=${encodeURIComponent(performer.name)}`;
    }

    // より美しいアバター画像を生成（現役/歴代の区別も含む）
    generatePerformerAvatar(performer) {
        const seed = performer.name.replace(/\s/g, '-').toLowerCase();
        const bgColorMap = {
            'tsuki': '2c3e50',  // 月組: ダークブルー
            'hana': 'e74c3c',   // 花組: レッド  
            'yuki': 'bdc3c7',   // 雪組: ライトグレー
            'hoshi': '1abc9c',  // 星組: ティール
            'sora': '3498db'    // 宙組: ブルー
        };
        
        const bgColor = bgColorMap[performer.troupeColor] || '95a5a6';
        
        // 現役と歴代で異なるスタイルを適用
        const hairStyle = performer.era === '歴代' ? 'longHair' : 'shortHair';
        const accessory = performer.era === '歴代' ? '&accessories[]=sunglasses' : '';
        
        return `https://avatars.dicebear.com/api/avataaars/${seed}.svg?background=%23${bgColor}&top[]=${hairStyle}${accessory}&clothesColor=blue01`;
    }

    selectAnswer(answerIndex) {
        if (this.isAnswering) return;
        
        this.isAnswering = true;
        const selectedButton = document.querySelectorAll('.option-button')[answerIndex];
        selectedButton.classList.add('selected');
        
        // 少し遅延して結果を表示
        setTimeout(() => {
            this.showResult(answerIndex);
        }, 500);
    }

    showResult(selectedIndex) {
        const isCorrect = selectedIndex === this.currentQuestion.correctIndex;
        const optionButtons = document.querySelectorAll('.option-button');
        
        // 結果に応じてボタンのスタイルを更新
        optionButtons.forEach((button, index) => {
            if (index === this.currentQuestion.correctIndex) {
                button.classList.add('correct');
            } else if (index === selectedIndex && !isCorrect) {
                button.classList.add('incorrect');
            }
        });

        // 結果メッセージを表示
        const resultMessage = document.getElementById('resultMessage');
        const kanjiInfo = document.getElementById('kanjiInfo');
        const profileSection = document.getElementById('profileSection');
        
        if (isCorrect) {
            this.correctAnswers++;
            // 正解した問題をセットに追加
            this.correctQuestions.add(this.currentQuestion.id);
            
            resultMessage.textContent = '🎉 正解です！';
            resultMessage.className = 'result-message correct';
            
            // プロフィール表示
            this.showPerformerProfile();
            profileSection.style.display = 'block';
        } else {
            resultMessage.textContent = '❌ 不正解です';
            resultMessage.className = 'result-message incorrect';
            profileSection.style.display = 'none';
        }
        
        // 漢字情報を表示
        kanjiInfo.innerHTML = `
            <strong>${this.currentQuestion.kanji}</strong> の読み方: <strong>${this.currentQuestion.correctReading}</strong><br>
            漢字検定 ${this.currentQuestion.kanjiData.level}級レベル<br>
            他の読み方: ${this.currentQuestion.kanjiData.readings.join('、')}
        `;
        
        document.getElementById('resultSection').style.display = 'block';
    }

    showPerformerProfile() {
        const performer = this.currentQuestion.performer;
        const profileContent = document.getElementById('profileContent');
        const profile = PERFORMER_PROFILES[performer.name];
        
        if (profile) {
            const eraLabel = performer.era === '歴代' ? '(歴代スター)' : '(現役)';
            const eraIcon = performer.era === '歴代' ? '👑' : '⭐';
            
            profileContent.innerHTML = `
                <p><strong>${eraIcon} 芸名:</strong> ${performer.name} (${performer.reading}) ${eraLabel}</p>
                <p><strong>🎭 所属:</strong> 宝塚歌劇団 ${performer.troupe}</p>
                <p><strong>📅 入団:</strong> ${profile.joinYear}</p>
                <p><strong>🏠 出身:</strong> ${profile.hometown}</p>
                <p><strong>✨ プロフィール:</strong> ${profile.description}</p>
            `;
        } else {
            const eraLabel = performer.era === '歴代' ? '(歴代スター)' : '(現役)';
            const eraIcon = performer.era === '歴代' ? '👑' : '⭐';
            
            profileContent.innerHTML = `
                <p><strong>${eraIcon} 芸名:</strong> ${performer.name} (${performer.reading}) ${eraLabel}</p>
                <p><strong>🎭 所属:</strong> 宝塚歌劇団 ${performer.troupe}</p>
                <p>美しく輝く宝塚のスターとして、多くの観客に愛され続けています。</p>
            `;
        }
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex >= this.questions.length) {
            this.showCompletionScreen();
        } else {
            this.showQuestion();
        }
    }

    showCompletionScreen() {
        this.hideAllScreens();
        document.getElementById('completionScreen').style.display = 'flex';
        
        document.getElementById('finalTotal').textContent = this.totalQuestions;
        document.getElementById('finalScore').textContent = this.correctAnswers;
        
        // テーマを初期状態に戻す
        document.body.className = document.body.className.replace(/troupe-\w+/g, '');
    }

    restartQuiz() {
        this.currentQuestionIndex = 0;
        this.correctAnswers = 0;
        this.usedPerformers.clear();
        // 注意: 正解済み問題のリセットは行わない（学習の継続のため）
        // this.correctQuestions.clear(); // あえてコメントアウト
        this.generateQuestions();
        this.showStartScreen();
    }

    hideAllScreens() {
        document.getElementById('startScreen').style.display = 'none';
        document.getElementById('quizScreen').style.display = 'none';
        document.getElementById('completionScreen').style.display = 'none';
    }
}

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
    window.kanjiApp = new TakarazukaKanjiApp();
});



// ユーティリティ関数
function formatPerformerInfo(performer) {
    return `${performer.name}（${performer.reading}） - ${performer.troupe}`;
}