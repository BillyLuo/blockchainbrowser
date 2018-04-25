(function () {
	Particles.init({
    selector: '.bg-paticles',
    maxParticles:15,
    sizeVariations:3,
    speed:0.2,
    color:'#f1f1f1',
    minDistance:500,
    connectParticles:true
  });
})()
function initEarth () {
	(function() {
	  var globe = planetaryjs.planet();
	  // Load our custom `autorotate` plugin; see below.
	  globe.loadPlugin(autorotate(10));
	  // The `earth` plugin draws the oceans and the land; it's actually
	  // a combination of several separate built-in plugins.
	  //
	  // Note that we're loading a special TopoJSON file
	  // (world-110m-withlakes.json) so we can render lakes.
	  globe.loadPlugin(planetaryjs.plugins.earth({
	    topojson: { world: world },
	    oceans:   { fill:   '#082137' },
	    land:     { fill:   '#3C6679' },
	    borders:  { stroke: '#3C6679' }
	  }));
	  // Load our custom `lakes` plugin to draw lakes; see below.
	  globe.loadPlugin(lakes({
	    fill: '#f1f1f1'
	  }));
	  // The `pings` plugin draws animated pings on the globe.
	  globe.loadPlugin(planetaryjs.plugins.pings());
	  // The `zoom` and `drag` plugins enable
	  // manipulating the globe with the mouse.缩放
	//globe.loadPlugin(planetaryjs.plugins.zoom({
	//  scaleExtent: [100, 300]
	//}));
	  globe.loadPlugin(planetaryjs.plugins.drag({
	    // Dragging the globe should pause the
	    // automatic rotation until we release the mouse.
	    onDragStart: function() {
	      this.plugins.autorotate.pause();
	    },
	    onDragEnd: function() {
	      this.plugins.autorotate.resume();
	    }
	  }));
	  // Set up the globe's initial scale, offset, and rotation.
	  globe.projection.scale(100).translate([100,100]).rotate([0, -10, 0]);
	
	  // Every few hundred milliseconds, we'll draw another random ping.
	  //漂亮的圆圈
//	var colors = ['red', 'yellow', 'white', 'orange', 'green', 'cyan', 'pink'];
//	setInterval(function() {
//	  var lat = Math.random() * 170 - 85;
//	  var lng = Math.random() * 360 - 180;
//	  var color = colors[Math.floor(Math.random() * colors.length)];
//	  globe.plugins.pings.add(lng, lat, { color: color, ttl: 2000, angle: Math.random() * 10 });
//	}, 150);
	
	  var canvas = document.getElementById('earth');
	  // Special code to handle high-density displays (e.g. retina, some phones)
	  // In the future, Planetary.js will handle this by itself (or via a plugin).
	  if (window.devicePixelRatio == 2) {
	    canvas.width = 400;
	    canvas.height = 400;
	    context = canvas.getContext('2d');
	    context.scale(2, 2);
	  }
	  // Draw that globe!
	  globe.draw(canvas);
	
	  // This plugin will automatically rotate the globe around its vertical
	  // axis a configured number of degrees every second.
	  function autorotate(degPerSec) {
	    // Planetary.js plugins are functions that take a `planet` instance
	    // as an argument...
	    return function(planet) {
	      var lastTick = null;
	      var paused = false;
	      planet.plugins.autorotate = {
	        pause:  function() { paused = true;  },
	        resume: function() { paused = false; }
	      };
	      // ...and configure hooks into certain pieces of its lifecycle.
	      planet.onDraw(function() {
	        if (paused || !lastTick) {
	          lastTick = new Date();
	        } else {
	          var now = new Date();
	          var delta = now - lastTick;
	          // This plugin uses the built-in projection (provided by D3)
	          // to rotate the globe each time we draw it.
	          var rotation = planet.projection.rotate();
	          rotation[0] += degPerSec * delta / 1000;
	          if (rotation[0] >= 180) rotation[0] -= 360;
	          planet.projection.rotate(rotation);
	          lastTick = now;
	        }
	      });
	    };
	  };
	
	  // This plugin takes lake data from the special
	  // TopoJSON we're loading and draws them on the map.
	  function lakes(options) {
	    options = options || {};
	    var lakes = null;
	
	    return function(planet) {
	      planet.onInit(function() {
	        // We can access the data loaded from the TopoJSON plugin
	        // on its namespace on `planet.plugins`. We're loading a custom
	        // TopoJSON file with an object called "ne_110m_lakes".
	        var world = planet.plugins.topojson.world;
	        lakes = topojson.feature(world, world.objects.ne_110m_lakes);
	      });
	
	      planet.onDraw(function() {
	        planet.withSavedContext(function(context) {
	          context.beginPath();
	          planet.path.context(context)(lakes);
	          context.fillStyle = options.fill || 'black';
	          context.fill();
	        });
	      });
	    };
	  };
	})();
}
function initNumType () {
	var options = {
	  strings: [
	  		'823923.0902'
	  ],
	  typeSpeed: 50,
	  showCursor:false
	}
	
	var typed = new Typed("#num", options);
}
function initCoinType(){
	var items = $('coin-item');
	var arr = ['BTC','ETH','TRX','EOS'];
	$.each($('.coin-item'), function(index,elem) {
		var option = {
			strings:[arr[index]],
			typeSpeed:50,
			showCursor:false
		}
		console.log(arr[index]);
		var types = new Typed('.coin-item'+(index+1),option);
	});
}
function initType() {
	setTimeout(function () {
		initNumType();
	},700)
	setTimeout(function () {
		initCoinType();
	},1700)
}
initType();
initEarth();