(function() {
    var mainCanvas = document.getElementById('main_canvas');
    var p1 = p2 = p3 = 0;

    var circle = new ProgressCircle({
        canvas: mainCanvas,
        centerX: 120,
        centerY: 100,
        minRadius: 15,
        arcWidth: 7,
        gapWidth: 3,
        infoLineLength: 100,
        horizLineLength: 50,
        infoLineBaseAngle: Math.PI / 10,
        infoLineAngleInterval: Math.PI / 10,
    });


    circle.addEntry({
        fillColor: 'rgba(255, 255, 0, 0.5)',
        progressListener: function() {return p1;},
        infoListener: function() {
            return Math.round(p1 * 100) + '% of 256MB' + 
                ' foobar.mkv';
        },
    }).addEntry({
        fillColor: 'rgba(102, 255, 0, 0.5)',
        progressListener: function() {return p2;},
        infoListener: function() {
            return Math.round(p2 * 100) + '% of 13MB' + 
                ' production.sqlite3';
        },
    }).addEntry({
        fillColor: 'rgba(0, 255, 255, 0.5)',
        progressListener: function() {return p3;},
        infoListener: function() {
            return Math.round(p3 * 100) + '% of 46MB' + 
                ' memoria.pdf';
        },
    }).start(33);

    setInterval(function() {
        p1 = p1 < 1 ? p1 + 0.0025 : 0;
        p2 = p2 < 1 ? p2 + 0.0015 : 0;
        p3 = p3 < 1 ? p3 + 0.002 : 0;
    }, 20);
    
})();
