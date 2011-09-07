(function(window, document, undefined) {
    /**
     * @class The manager for manipulating the progress circles.
     * @param params.canvas Canvas on which the circles will be drawn.
     * @param params.minRadius Inner radius of the innermost circle, in px.
     * @param params.arcWidth Width of each arc(circle).
     * @param params.gapWidth Distance between each arc.
     * @param params.centerX X coordinate of the center of circles.
     * @param params.centerY Y coordinate of the center of circles.
     * @param params.infoLineBaseAngle Base angle of the info line.
     * @param params.infoLineAngleInterval Angles between the info lines.
     */
    var CircleManager = function(params) {
        this.canvas = params.canvas;
        this.minRadius = params.minRadius || 75;
        this.arcWidth = params.arcWidth || 20;
        this.gapWidth = params.gapWidth || 5;
        this.centerX = params.centerX || this.canvas.width / 2;
        this.centerY = params.centerY || this.canvas.height / 2;
        this.infoLineAngleInterval = params.infoLineAngleInterval || Math.PI / 8;
        this.infoLineBaseAngle = params.infoLineBaseAngle || Math.PI / 6;

        this.context = this.canvas.getContext('2d');

        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.circles = [];
    };

    CircleManager.prototype = {
        constructor: CircleManager,

        /**
         * Adds an progress monitor entry.
         * @param params.fillColor Color to fill in the circle.
         * @param params.outlineColor Color to outline the circle.
         * @param params.progressListener Callback function to fetch the progress.
         * @param params.infoListener Callback function to fetch the info.
         * @returns this 
         */
        addEntry: function(params) {
            this.circles.push(new ProgressCircle({
                canvas: this.canvas,
                context: this.context,
                centerX: this.centerX,
                centerY: this.centerY,
                innerRadius: this.minRadius + this.circles.length * 
                    (this.gapWidth + this.arcWidth),
                arcWidth: this.arcWidth,

                fillColor: params.fillColor,
                outlineColor: params.outlineColor,
                progressListener: params.progressListener,
                infoListener: params.infoListener,
                infoLineAngle: this.infoLineBaseAngle + 
                    this.circles.length * this.infoLineAngleInterval,
            }));

            return this;
        },

        /**
         * Starts the monitor and updates with the given interval.
         * @param interval Interval between updates, in millisecond.
         * @returns this 
         */
        start: function(interval) {
            var self = this;
            this.timer = setInterval(function() {
                self._update(); 
            }, interval || 33)

            return this;
        },

        /**
         * Stop the animation.
         */
        stop: function() {
            clearTimeout(this.timer);  
        },

        /**
         * Call update on each circle and redraw them.
         * @private
         * @returns this
         */ 
        _update: function() {
            this._clear();
            this.circles.forEach(function(circle, idx, array) {
                circle.update();
                circle.draw();
                circle.drawInfo();
            });    

            return this;
        },

        /**
         * Clear the canvas.
         * @private
         * @returns this
         */
        _clear: function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

            return this;
        },

    };

    /**
     * @class Individual progress circle.
     * @private
     * @param params.canvas Canvas on which the circle will be drawn.
     * @param params.context Context of the canvas.
     * @param params.innerRadius Inner radius of the circle, in px.
     * @param params.arcWidth Width of each arc(circle).
     * @param params.gapWidth Distance between each arc.
     * @param params.centerX X coordinate of the center of circles.
     * @param params.centerY Y coordinate of the center of circles.
     * @param params.fillColor Color to fill in the circle.
     * @param params.outlineColor Color to outline the circle.
     * @param params.progressListener Callback function to fetch the progress.
     * @param params.infoListener Callback function to fetch the info.
     * @param params.infoLineAngle Angle of info line.
     */
    var ProgressCircle = function(params) {
        this.canvas = params.canvas;
        this.context = params.context;
        this.centerX = params.centerX;
        this.centerY = params.centerY;
        this.arcWidth = params.arcWidth;
        this.innerRadius = params.innerRadius || 0;
        this.fillColor = params.fillColor || '#fff';
        this.outlineColor = params.outlineColor || this.fillColor;
        this.progressListener = params.progressListener;
        this.infoListener = params.infoListener;
        this.infoLineAngle = params.infoLineAngle;

        this.outerRadius = this.innerRadius + this.arcWidth;


        if (!this.infoListener) return;

        // calculate the info-line segment points
        var angle = this.infoLineAngle,
            arcDistance = (this.innerRadius + this.outerRadius) / 2,

            sinA = Math.sin(angle),
            cosA = Math.cos(angle),

            MID_LINE_LENGTH = 250;
            

        this.infoLineStartX = this.centerX + sinA * arcDistance;
        this.infoLineStartY = this.centerY - cosA * arcDistance;
       
        this.infoLineMidX = this.centerX + sinA * MID_LINE_LENGTH;
        this.infoLineMidY = this.centerY - cosA * MID_LINE_LENGTH;

        this.infoLineEndX = this.infoLineMidX + (sinA < 0 ? -50 : 50);
        this.infoLineEndY = this.infoLineMidY;

        var infoText = document.createElement('div'),
            style = infoText.style;

        style.color = this.fillColor;
        style.position = 'absolute';
        style.className = 'PC_Info'
        style.left = this.infoLineEndX + this.canvas.offsetLeft + 'px';
        style.top = this.infoLineEndY + this.canvas.offsetTop -8 + 'px';
        style.paddingLeft = '20px';

        document.body.appendChild(infoText);
        this.infoText = infoText;
    };

    ProgressCircle.prototype = {
        constructor: ProgressCircle,

        update: function() {
            this.progress = this.progressListener();
        },

        draw: function() {
            var ctx = this.context,

                ANGLE_OFFSET = -Math.PI / 2,

                startAngle = 0 + ANGLE_OFFSET,
                endAngle= startAngle + this.progress * Math.PI * 2;

                x = this.centerX,
                y = this.centerY,

                innerRadius = this.innerRadius,
                outerRadius = this.outerRadius;

            ctx.fillStyle = this.fillColor;
            ctx.strokeStyle = this.outlineColor;

            ctx.beginPath();
            ctx.arc(x, y, innerRadius, startAngle, endAngle, false);
            ctx.arc(x, y, outerRadius, endAngle, startAngle, true);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
        },

        drawInfo: function() {
            if (!this.infoListener) {
                return;
            }

            var pointList = [
                [this.infoLineStartX, this.infoLineStartY],
                [this.infoLineMidX, this.infoLineMidY],
                [this.infoLineEndX, this.infoLineEndY],
            ];
            this._drawSegments(pointList, false);

            this.infoText.innerHTML = this.infoListener();
        },

        _drawSegments: function(pointList, close) {
            var ctx = this.context;

            ctx.beginPath();
            ctx.moveTo(pointList[0][0], pointList[0][1])
            for (var i = 1; i < pointList.length; ++i) {
                ctx.lineTo(pointList[i][0], pointList[i][1]);
            }

            if (close) {
                ctx.closePath();
            }
            ctx.stroke();
        },
    };
    
    window.CircleManager = CircleManager;

})(window, document);
