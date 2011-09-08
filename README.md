ProgressCircle.js
=================

#### A progress indicator in HTML5 canvas ####

## Usage ##

You should first create the canvas element in either HTML or Javascript, 
and specify its width and height. 

**Note**: you should NOT specify the size of the canvas by CSS styles.

Then proceed with codes like the following ones.

        var myCanvas = document.getElementById('my_canvas');

        var circle = new ProgressCircle({
            canvas: myCanvas,
        });

        circle.addEntry({
            fillColor: 'rgba(255, 255, 0, 0.5)',
            progressListener: function() {
                return THE_PROGRESS_VARIABLE_TO_LISTEN;
            },
        }).start(33); // 33 is the interval(ms) between each update
        
You can add multiple progress indicators:

        circle.addEntry({
            fillColor: 'rgba(102, 255, 0, 0.5)',
            progressListener: function() {return p1;},
        }).addEntry({
            fillColor: 'rgba(255, 255, 0, 0.5)',
            progressListener: function() {return p2;},
        }).addEntry({
            fillColor: 'rgba(0, 0, 255, 0.5)',
            progressListener: function() {return p3;},
        });
        
If you want to stop the animation, call the `stop` method.

        circle.stop();
        
## Optional Parameters ##

        var circle = new ProgressCircle({
            canvas: myCanvas, 
            minRadius: 10, // Inner radius of the innermost circle
            arcWidth: 3, // Width of each circle
            gapWidth: 2, // Space between adjacent circles
            centerX: 20, // X coordinate of the circle center
            centerY: 20, // Y coordinate of the circle center
            infoLineLength: 200, // Length of the info line
            horizLineLength: 50, // Length of the horizontal info line
            infoLineBaseAngle: Math.PI / 6, // Start angle of the info line
            infoLineAngleInterval: Math.PI / 8, // Angle between info lines
        });

        circle.addEntry({
            fillColor: 'rgba(255, 255, 0, 0.5)',
            outlineColor: 'rgba(255, 255, 255, 0.5)' // (Optional)
            progressListener: function() {return p1;},
            infoListener: function() {return text1;},// (Optional)
        });
        
