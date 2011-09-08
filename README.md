ProgressCircle.js
=================

### A progress indicator in HTML5 canvas ###

homepage: http://qiao.github.com/ProgressCircle.js/

## Usage ##

Download the file and include it in your page.

```html
<script type="text/javascript" src="ProgressCircle.js"></script>
```

You should first create the canvas element in either HTML or Javascript, 
and specify its width and height. 

**Note**: you should NOT specify the size of the canvas in CSS.

```html
<canvas id="my_canvas" width="100" height="40"></canvas>
```

Then proceed with codes like the following ones.

```javascript
var myCanvas = document.getElementById('my_canvas');

var circle = new ProgressCircle({
    canvas: myCanvas,
});

circle.addEntry({
    fillColor: 'rgba(255, 255, 0, 0.5)',
    progressListener: function() {
        return THE_PROGRESS_VARIABLE_TO_LISTEN;
    },
});
```

You can add multiple progress indicators:

```javascript
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
```

The call `start` to start the animation.

```javascript
circle.start(33); // 33 is the interval(ms) between each update
```

If you want to stop the animation, call the `stop` method.

```javascript
circle.stop();
```
        
## Optional Parameters ##

```javascript
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
```
