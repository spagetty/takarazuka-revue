// キラキラエフェクトと音響演出システム

class TakarazukaEffects {
    constructor() {
        this.audioContext = null;
        this.soundEnabled = true;
        this.effectsEnabled = true;
        this.sparkleContainer = null;
        this.initializeAudio();
        this.createSparkleContainer();
    }

    // Web Audio API初期化
    async initializeAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            console.log('🎵 音響システム初期化完了');
        } catch (error) {
            console.warn('⚠️ 音響システムの初期化に失敗:', error);
        }
    }

    // キラキラエフェクト用コンテナ作成
    createSparkleContainer() {
        this.sparkleContainer = document.createElement('div');
        this.sparkleContainer.className = 'sparkle-container';
        this.sparkleContainer.id = 'sparkleContainer';
        document.body.appendChild(this.sparkleContainer);
    }

    // 正解時の総合演出
    async playCorrectCelebration(performer, kanjiData) {
        if (!this.effectsEnabled) return;

        console.log(`✨ ${performer.name}の正解演出開始!`);

        // 複数の演出を同時実行
        await Promise.all([
            this.playCorrectSound(),
            this.createSparkleExplosion(performer.troupeColor),
            this.addCelebrationOverlay(),
            this.animatePerformerPhoto(),
            this.createConfetti(),
            this.playTakarazukaFanfare()
        ]);

        // 少し遅れて追加エフェクト
        setTimeout(() => {
            this.createElegantSparkles(performer.troupeColor);
        }, 500);
    }

    // 正解音の生成・再生
    async playCorrectSound() {
        if (!this.audioContext || !this.soundEnabled) return;

        try {
            // 宝塚らしい華やかなコード進行を生成
            const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, C (1オクターブ上)
            
            for (let i = 0; i < frequencies.length; i++) {
                setTimeout(() => {
                    this.playTone(frequencies[i], 0.3, 'sine');
                }, i * 150);
            }

            // キラキラ効果音
            setTimeout(() => {
                this.playSparkleSound();
            }, 400);

        } catch (error) {
            console.warn('音響エフェクトエラー:', error);
        }
    }

    // 宝塚ファンファーレ風の音
    async playTakarazukaFanfare() {
        if (!this.audioContext || !this.soundEnabled) return;

        try {
            // 宝塚らしいファンファーレ
            const fanfareNotes = [
                {freq: 261.63, time: 0},    // C
                {freq: 329.63, time: 200},  // E
                {freq: 392.00, time: 400},  // G
                {freq: 523.25, time: 600},  // C (1オクターブ上)
                {freq: 659.25, time: 800},  // E (1オクターブ上)
                {freq: 783.99, time: 1000}  // G (1オクターブ上)
            ];

            fanfareNotes.forEach(note => {
                setTimeout(() => {
                    this.playTone(note.freq, 0.4, 'triangle');
                }, note.time);
            });

        } catch (error) {
            console.warn('ファンファーレ音響エラー:', error);
        }
    }

    // キラキラ効果音
    playSparkleSound() {
        if (!this.audioContext) return;

        try {
            // 複数のキラキラ音を重ねる
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const frequency = 800 + Math.random() * 1200; // 800-2000Hz
                    this.playTone(frequency, 0.1, 'sine');
                }, i * 100);
            }
        } catch (error) {
            console.warn('キラキラ音響エラー:', error);
        }
    }

    // 基本音生成
    playTone(frequency, duration, type = 'sine') {
        if (!this.audioContext) return;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.type = type;
            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

            // エンベロープ（音量の時間変化）
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.3, this.audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);

        } catch (error) {
            console.warn('音生成エラー:', error);
        }
    }

    // キラキラ爆発エフェクト
    createSparkleExplosion(troupeColor) {
        if (!this.sparkleContainer) return;

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // メインのキラキラ爆発
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                this.createSparkle(centerX, centerY, troupeColor);
            }, i * 50);
        }

        // 追加の星とダイヤモンド
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                this.createSparkle(centerX, centerY, troupeColor, 'star');
            }, i * 100);
        }

        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                this.createSparkle(centerX, centerY, troupeColor, 'diamond');
            }, i * 150);
        }
    }

    // 個別キラキラパーティクル作成
    createSparkle(x, y, troupeColor, type = 'normal') {
        const sparkle = document.createElement('div');
        sparkle.className = `sparkle ${type} ${troupeColor}`;

        // ランダムな方向と距離
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 100;
        const offsetX = Math.cos(angle) * distance;
        const offsetY = Math.sin(angle) * distance;

        sparkle.style.left = (x + offsetX) + 'px';
        sparkle.style.top = (y + offsetY) + 'px';

        this.sparkleContainer.appendChild(sparkle);

        // アニメーション完了後に削除
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 2500);
    }

    // 画面全体の祝福オーバーレイ
    addCelebrationOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'correct-celebration';
        document.body.appendChild(overlay);

        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 1500);
    }

    // 劇団員写真のアニメーション
    animatePerformerPhoto() {
        const photo = document.getElementById('performerPhoto');
        if (photo) {
            photo.classList.add('sparkle-photo');
            
            setTimeout(() => {
                photo.classList.remove('sparkle-photo');
            }, 2000);
        }
    }

    // 紙吹雪エフェクト
    createConfetti() {
        const colors = ['#ff69b4', '#ffd700', '#87ceeb', '#98fb98', '#dda0dd'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.top = '-10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                
                this.sparkleContainer.appendChild(confetti);

                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 3000);
            }, i * 100);
        }
    }

    // エレガントなキラキラ（背景エフェクト）
    createElegantSparkles(troupeColor) {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = `elegant-sparkle ${troupeColor}`;
                sparkle.style.left = Math.random() * window.innerWidth + 'px';
                sparkle.style.top = Math.random() * window.innerHeight + 'px';
                sparkle.style.animationDelay = Math.random() * 2 + 's';

                this.sparkleContainer.appendChild(sparkle);

                setTimeout(() => {
                    if (sparkle.parentNode) {
                        sparkle.parentNode.removeChild(sparkle);
                    }
                }, 4000);
            }, i * 200);
        }
    }

    // 音響ON/OFF切り替え
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        console.log(`🔊 音響: ${this.soundEnabled ? 'ON' : 'OFF'}`);
        return this.soundEnabled;
    }

    // エフェクトON/OFF切り替え
    toggleEffects() {
        this.effectsEnabled = !this.effectsEnabled;
        console.log(`✨ エフェクト: ${this.effectsEnabled ? 'ON' : 'OFF'}`);
        return this.effectsEnabled;
    }

    // 設定状態の取得
    getSettings() {
        return {
            soundEnabled: this.soundEnabled,
            effectsEnabled: this.effectsEnabled,
            audioContextState: this.audioContext ? this.audioContext.state : 'unavailable'
        };
    }

    // 音響コンテキストの再開（ユーザー操作後に必要）
    async resumeAudioContext() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            try {
                await this.audioContext.resume();
                console.log('🎵 音響コンテキストを再開');
            } catch (error) {
                console.warn('音響コンテキスト再開エラー:', error);
            }
        }
    }

    // 簡単なテスト音
    playTestSound() {
        this.playTone(440, 0.5, 'sine'); // A音
    }
}

// グローバルインスタンス作成
const takarazukaEffects = new TakarazukaEffects();

// ユーザー操作で音響を有効化（ブラウザ制限対策）
document.addEventListener('click', () => {
    takarazukaEffects.resumeAudioContext();
}, { once: true });

// ブラウザ環境でグローバルに公開
if (typeof window !== 'undefined') {
    window.takarazukaEffects = takarazukaEffects;
}

// Node.js環境用エクスポート
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TakarazukaEffects, takarazukaEffects };
}