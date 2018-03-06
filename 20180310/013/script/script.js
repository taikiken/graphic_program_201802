
(() => {
    let cu;
    let gui;
    let startTime;
    let nowTime;
    let vec;
    let balls;

    const FIRE_MAX_LIFE = Ball.maxLife;
    const FIRE_COUNT = 15;
    const FIRE_RADIUS = 30;
    const FIRE_MIN_SPEED = 4;
    const FIRE_ADD_SPEED = 6;
    const FIRE_COLORS = [
        'rgba(255, 200,   0, 0.5)',
        'rgba(255,   0, 200, 0.5)',
        'rgba(200, 255,   0, 0.5)',
        'rgba(  0, 255, 200, 0.5)',
        'rgba(200,   0, 255, 0.5)',
        'rgba(  0, 200, 255, 0.5)'
    ];

    window.addEventListener('load', () => {
        gui = new Gui();
        cu = new CanvasUtil(document.getElementById('canvas'));
        cu.matchSize();
        cu.clear();

        window.addEventListener('click', (eve) => {
            // ランダムに色を決める
            let colorIndex = Math.floor(Math.random() * FIRE_COLORS.length);

            // 初期位置を決める
            let x = eve.clientX;
            let y = eve.clientY;

            // 初期位置に FIRE_COUNT 個の火花を生成する
            for(let i = 0; i < FIRE_COUNT; ++i){
                // ランダムに飛び散る方向を変える
                let rotatePower = Math.PI * 2 * Math.random();
                let vx = Math.cos(rotatePower);
                let vy = Math.sin(rotatePower);

                // ランダムに飛び散るスピードを変える
                let speedPower = FIRE_MIN_SPEED + Math.random() * FIRE_ADD_SPEED;

                // パラメータをもとにボールを生成
                balls.push(new Ball(
                    x,
                    y,
                    vx,
                    vy,
                    speedPower,
                    FIRE_COLORS[colorIndex]
                ));
            }
        }, false);

        balls = [];

        startTime = Date.now();

        render();
    }, false);

    function render(){
        nowTime = Date.now() - startTime;

        // 背景は黒で塗りつぶす
        cu.fillRect(0, 0, window.innerWidth, window.innerHeight, 'black');

        // すべてのボールの位置を更新する
        balls.map((ball, index) => {
            // ボールを動かす
            ball.move();

            // ボールを描く
            let position = ball.getPosition();
            let life = ball.getLife() / FIRE_MAX_LIFE;
            let color = ball.getColor();
            cu.fillCircle(
                position.x,
                position.y,
                life * FIRE_RADIUS,
                color
            );

            // ボールのライフが無くなったら配列から削除する
            if(ball.getLife() === 0){
                balls.splice(index, 1);
            }
        });

        gui.text({count: balls.length});

        requestAnimationFrame(render);
    }

    function easeInCubic(t){
        return t * t * t;
    }

    function easeOutCubic(t){
        return (--t) * t * t + 1;
    }

    /**
     * canvas 2d context を操作するクラス
     * @class
     */
    class CanvasUtil {
        /**
         * @constructor
         * @param {HTMLCanvasElement} canvas - このインスタンスに紐付ける canvas
         */
        constructor(canvas){
            this.canvas = canvas;
            this.ctx = this.canvas.getContext('2d');
            this.ctx.globalCompositeOperation = 'lighter';
        }
        /**
         * canvas 全体をクリアする
         */
        clear(){
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        /**
         * canvas に文字列を描画する
         * @param {string} text - 描画する文字列
         * @param {number} x - 文字列描画の基準位置の x 座標
         * @param {number} y - 文字列描画の基準位置の y 座標
         * @param {number} [maxWidth] - 文字列を描画できる最大幅
         * @param {string} [font] - フォントの指定（CSS Style）
         * @param {string} [color] - 塗りつぶす色（CSS Style）
         */
        fillText(text, x, y, maxWidth, font, color){
            if(font != null){
                this.ctx.font = font;
            }
            if(color != null){
                this.ctx.fillStyle = color;
            }
            if(maxWidth != null){
                this.ctx.fillText(text, x, y, maxWidth);
            }else{
                this.ctx.fillText(text, x, y);
            }
        }
        /**
         * canvas に矩形を fill モードで描く
         * @param {number} x0 - ラインの始点の x 座標
         * @param {number} y0 - ラインの始点の y 座標
         * @param {number} x1 - ラインの終点の x 座標
         * @param {number} y1 - ラインの終点の y 座標
         * @param {number} [lineWidth=1] - ラインの幅
         * @param {string} [color] - ラインの色（CSS Style）
         */
        strokeLine(x0, y0, x1, y1, lineWidth = 1, color){
            if(color != null){
                this.ctx.strokeStyle = color;
            }
            this.ctx.beginPath();
            this.ctx.lineWidth = lineWidth;
            this.ctx.moveTo(x0, y0);
            this.ctx.lineTo(x1, y1);
            this.ctx.closePath();
            this.ctx.stroke();
        }
        /**
         * canvas に矩形を fill モードで描く
         * @param {number} x - 円の中心位置の x 座標
         * @param {number} y - 円の中心位置の y 座標
         * @param {number} rad - 円の半径
         * @param {string} [color] - 塗りつぶす色（CSS Style）
         */
        fillCircle(x, y, rad, color){
            if(color != null){
                this.ctx.fillStyle = color;
            }
            this.ctx.beginPath();
            this.ctx.arc(x, y, rad, 0, Math.PI * 2, false);
            this.ctx.closePath();
            this.ctx.fill();
        }
        /**
         * canvas に矩形を fill モードで描く
         * @param {number} x - 矩形の左上角の x 座標
         * @param {number} y - 矩形の左上角の y 座標
         * @param {number} w - 矩形の幅
         * @param {number} h - 矩形の高さ
         * @param {string} [color] - 塗りつぶす色（CSS Style）
         */
        fillRect(x, y, w, h, color){
            if(color != null){
                this.ctx.fillStyle = color;
            }
            this.ctx.fillRect(x, y, w, h);
        }
        /**
         * canvas の大きさをウィンドウサイズに揃える
         */
        matchSize(){
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
    }
})();
