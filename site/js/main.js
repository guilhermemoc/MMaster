

// blur on scroll
$(window).on('scroll', function () {
    var pixs, position = $(document).scrollTop()
    pixs = pixs / 200;
    $(".header").css({"-webkit-filter": "blur("+pixs+"px)","filter": "blur("+pixs+"px)" });

    var demoPosition = $('.demo:first').position().top;

    if(parseInt(position) >= parseInt(demoPosition)) {
      console.log(demoPosition , position);
      $('.burger_global').css("border-top", "5px solid #fff");
    } else {
      $('.burger_global').css("border-top" , "5px solid #f38181");
    }
});


$(document).ready(function() {

  $("#owl-demo").owlCarousel({

      navigation : false, // Show next and prev buttons
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem:true,
      pagination:false,
      arrows: true

      // "singleItem:true" is a shortcut for:
      // items : 1,
      // itemsDesktop : false,
      // itemsDesktopSmall : false,
      // itemsTablet: false,
      // itemsMobile : false

  });

});


$(function(){

$('.burger_deluxe').click(function() {

  $('.patty').toggleClass("pattyfade");
  $('.top_bun').toggleClass("rotate_top");
  $('.bottom_bun').toggleClass("rotate_bottom");

  var viewportHeight = $(window).height();
  if($('.top_bun').hasClass("rotate_top")) {
    $('.overlay').css('visibility','visible');
    $('.overlay').css('height', viewportHeight);
    $('.overlay').find('a').css('opacity', '1');
    setTimeout(function()
    {
    	$('.active').css('background-color', 'transparent');
    }, 750);
  }
  else
  {
    $('.overlay').css('height', '0');
    $('.overlay').find('a').css('opacity', '0');
    $('.overlay').css('visibility','hidden');
    $('.active').css('background-color', 'transparent');
  }
});
$('.nav-links a').click(function(){
  setTimeout(function(){
    $('.overlay').css('height', '0');
    $('.overlay').find('a').css('opacity', '0');
    $('.overlay').css('visibility','hidden');
    $('.active').css('background-color', 'transparent');
    $('.patty').toggleClass("pattyfade");
    $('.top_bun').toggleClass("rotate_top");
    $('.bottom_bun').toggleClass("rotate_bottom");
  },750);
});

$('.slide-center-out').click(function() {
  $('.slide-center-out').find('span').removeClass('active');
  $('.slide-center-out').find('span').css('background-color','');
  $(this).find('span').toggleClass('active');
});


$(window).resize(function() {
  var viewportHeight = $(window).height();
  if($('.top_bun').hasClass("rotate_top")) {
    $('.overlay').css('height', viewportHeight);
  }
});
});



$(function(){

;(function(window, document, undefined) {

  'use strict';

  var DonutChart = DonutChart || {

    /**
      * Initialize Chart
      */

    init: function(options) {

      this.settings(options);
      this.createChartStructre();
      this.setChartMeta();
      this.build();

    }, // init()

    /**
      * Update Chart
      */

    update: function(options) {

      this.settings(options);
      this.setChartMeta();
      this.build();

    }, // update()

    /**
      * Chart Settings
      */

    settings: function(options) {

      this.config = {
        container: options.container ? options.container : this.config.container,
        data: options.data ? options.data : this.config.data,
        label: options.label ? this.label : 'Total',
        offset: options.offset ? options.offset : 0
      };

    }, // settings()

    /**
      * Build chart
      */

    build: function() {

      var container = this.config.container.querySelector('.outer-circle');
      var wedges = container.querySelectorAll('[data-wedge-id]');
      var wedgesIdArray = [];

      for (var i = 0; i < wedges.length; i++) {
        wedgesIdArray.push(wedges[i].dataset.wedgeId);
      }

      for (var j = 0; j < this.config.data.wedges.length; j++) {
        if (wedgesIdArray.indexOf(this.config.data.wedges[j].id) == -1) {
          var wedge = this.createWedge(this.config.data.wedges[j]);
          container.appendChild(wedge);
        }
        this.setWedge(this.config.data.wedges[j]);
      }

    }, // createWedges()

    /**
      * Create chart structure
      */

    createChartStructre: function() {

      var outer = document.createElement('div');
      var inner = document.createElement('div');
      var label = document.createElement('span');
      var value = document.createElement('span');

      outer.className = 'outer-circle';
      inner.className = 'inner-circle';
      label.className = 'inner-circle-label';
      value.className = 'inner-circle-value';

      this.config.container.appendChild(outer);
      this.config.container.appendChild(inner);
      inner.appendChild(label);
      inner.appendChild(value);

    }, // createChartStructre()

    /**
      * Set chart meta
      */

    setChartMeta: function() {

      var label = this.config.container.querySelector('.inner-circle-label');
      var value = this.config.container.querySelector('.inner-circle-value');

      label.innerHTML = this.config.label;
      value.innerHTML = this.config.data.total;

    }, // setChartMeta()

    /**
      * Create wedge
      */

    createWedge: function(data) {

      var container = document.createElement('div');
      var wedge = document.createElement('div');
      var extension = document.createElement('div');
      var label = document.createElement('div');
      var value = document.createElement('span');

      container.setAttribute('data-wedge-id', data.id);

      container.className = 'wedge-container';
      wedge.className = 'wedge';
      extension.className = 'wedge-extension';
      label.className = 'wedge-label';
      value.className = 'wedge-value';

      container.appendChild(wedge);
      container.appendChild(extension);
      container.appendChild(label);
      label.appendChild(value);

      return container;

    }, // createWedge()

    /**
      * Set wedge
      */

    setWedge: function(data) {

      var container = this.config.container.querySelector('[data-wedge-id="' + data.id + '"]');
      var wedge = container.querySelector('.wedge');
      var extension = container.querySelector('.wedge-extension');
      var label = container.querySelector('.wedge-label');
      var value = container.querySelector('.wedge-value');

      var wedgeDegrees = (360 * data.value) / this.config.data.total;
      var labelDegrees = wedgeDegrees / 2;
      var w = container.offsetWidth;

      container.style.transform = 'rotate(' + this.config.offset + 'deg)';
      container.style.webkitTransform = 'rotate(' + this.config.offset + 'deg)';
      container.style.clip = wedgeDegrees > 180 ? 'auto' : 'rect(0, ' + w + 'px, ' + w +'px, ' + (w / 2) + 'px)';

      wedge.style.transform = 'rotate(' + wedgeDegrees + 'deg)';
      wedge.style.webkitTransform = 'rotate(' + wedgeDegrees + 'deg)';
      wedge.style.backgroundColor = this.color(data.color, 5);
      wedge.style.clip = 'rect(0, ' + (w / 2) + 'px, ' + w +'px, 0)';

      if (wedgeDegrees > 180) {
        extension.style.opacity = 1;
        extension.style.transform = 'rotate(' + 180 + 'deg)';
        extension.style.webkitTransform = 'rotate(' + 180 + 'deg)';
        extension.style.backgroundColor = this.color(data.color, 5);
        extension.style.clip = 'rect(0, ' + (w / 2) + 'px, ' + w +'px, 0)';
      } else {
        extension.style.opacity = 0;
      }

      label.style.transform = 'rotate(' + labelDegrees + 'deg)';
      label.style.webkitTransform = 'rotate(' + labelDegrees + 'deg)';
      label.style.color = this.color(data.color, -30);

      value.innerHTML = data.value;

      this.config.offset += wedgeDegrees;

    }, // setWedge()

    /**
      * Color Utility
      */

    color: function( color, percent ) {

      var num = parseInt(color.slice(1), 16);
      var amt = Math.round(2.55 * percent);
      var R = (num >> 16) + amt;
      var B = (num >> 8 & 0x00FF) + amt;
      var G = (num & 0x0000FF) + amt;

      return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);

    } // color()

  }; // DonutChart

  window.DonutChart = DonutChart;

})(window, document);


/**
  * Demo
  * --------------------------------------------------
  */

// Object.create() polyfill
if (typeof Object.create !== 'function') {
  Object.create = function(obj) {
    function F() {}
    F.prototype = obj;
    return new F();
  };
}

// Select containers
var chartContainer1 = document.querySelector('[data-donut-chart="1"]');
var chartContainer2 = document.querySelector('[data-donut-chart="2"]');

// Data
var chartData1a = {
  total: 64,
  wedges: [
    { id: 'a', color: '#4FC1E9', value: 10 },
    { id: 'b', color: '#A0D468', value: 16 },
    { id: 'c', color: '#ED5565', value: 24 },
    { id: 'd', color: '#AC92EC', value: 14 }
  ]
};

var chartData1b = {
  total: 96,
  wedges: [
    { id: 'a', color: '#4FC1E9', value: 26 },
    { id: 'b', color: '#A0D468', value: 20 },
    { id: 'c', color: '#ED5565', value: 18 },
    { id: 'd', color: '#AC92EC', value: 32 }
  ]
};

var chartData2a = {
  total: 200,
  wedges: [
    { id: 'a', color: '#5D9CEC', value: 45 },
    { id: 'b', color: '#48CFAD', value: 25 },
    { id: 'c', color: '#FFCE54', value: 30 },
    { id: 'd', color: '#FC6E51', value: 100 }
  ]
};

var chartData2b = {
  total: 220,
  wedges: [
    { id: 'a', color: '#5D9CEC', value: 65 },
    { id: 'b', color: '#48CFAD', value: 40 },
    { id: 'c', color: '#FFCE54', value: 60 },
    { id: 'd', color: '#FC6E51', value: 55 }
  ]
};

// Create new chart objects
var Chart1 = Object.create(DonutChart);
var Chart2 = Object.create(DonutChart);

Chart1.init({
  container: chartContainer1,
  data: chartData1a
});

Chart2.init({
  container: chartContainer2,
  data: chartData2a
});

setTimeout(function() {
  setInterval(function() {

    Chart1.update({
      data: chartData1a
    });

    Chart2.update({
      data: chartData2a
    });

  }, 4000);
}, 2000);

setInterval(function() {

  Chart1.update({
    data: chartData1b
  });

  Chart2.update({
    data: chartData2b
  });

}, 4000);

});


$(function(){
  var spline_chart_options = {
  grid: {
    hoverable: true,
    borderWidth: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    clickable: true,
    margin: {
      top: 10,
      right: 10,
      bottom: 0,
      left: 10
    },
    mouseActiveRadius: 30
  },
  xaxis: {
    tickLength: 0,
    show: true,
    color: '#fff',
    ticks: [
      [1, "Seg"],
      [2, "Ter"],
      [3, "Qua"],
      [4, "Qui"],
      [5, "Sex"],
      [6, "Sáb"],
      [7, "Dom"]
    ]
  },
  yaxis: {
    ticks: false,
    tickLength: 0
  },
  tooltip: {
    show: true,
    cssClass: "flot-tt",
    content: "%y",
    defaultTheme: false
  },
  colors: ["#f38181"]
};
// Chart 1
var chart_data = {
  splines: {
    show: true,
    tension: 0.5,
    lineWidth:8,
    fill:0
  },
  points: {
    show: true,
    lineWidth: 0.5,
    radius: 3,
    symbol: "circle",
    fill: true,
    fillColor: "#ffffff"
  },
  data: [
    [1, 4000],
    [2, 3600],
    [3, 6000],
    [4, 3700],
    [5, 4000],
    [6, 3400],
    [7, 5200]
  ]
};
// Chart 2
var spline_chart_data = {
  splines: {
    show: true,
    tension: 0.4,
    lineWidth:4,
    fill:0
  },
  points: {
    show: true,
    lineWidth: 1.5,
    radius: 3,
    symbol: "circle",
    fill: true,
    fillColor: "#fff"
  },
  data: [
    [1, 3500],
    [2, 3600],
    [3, 4000],
    [4, 3800],
    [5, 5000],
    [6, 3800],
    [7, 4200]
  ]
};
var SpLineChart = $.plot($("#spline-chart"), [chart_data], spline_chart_options);
var SpLineChart = $.plot($("#chart"), [spline_chart_data], spline_chart_options);
});




$(function(){
  (function(c, e, l, j) {
    var d = function(a, b) {
        arguments.length && this.init(a, b);
    };
    d.CANVAS_NAMES = [ "back", "fill", "front" ];
    var i = d, f;
    f = l.createElement("canvas");
    f.getContext ? (f = f.getContext("2d"), f = (e.devicePixelRatio || 1) / (f.webkitBackingStorePixelRatio || f.mozBackingStorePixelRatio || f.msBackingStorePixelRatio || f.oBackingStorePixelRatio || f.backingStorePixelRatio || 1)) : f = 1;
    i.PIXEL_RATIO = f;
    i = [ "ms", "moz", "webkit", "o" ];
    for (f = 0; f < i.length && !e.requestAnimationFrame; f++) e.requestAnimationFrame = e[i[f] + "RequestAnimationFrame"], e.cancelAnimationFrame = e[i[f] + "CancelAnimationFrame"] || e[i[f] + "CancelRequestAnimationFrame"];
    e.requestAnimationFrame || (e.requestAnimationFrame = function(a) {
        return e.setTimeout(function() {
            a();
        }, 16);
    });
    e.cancelAnimationFrame || (e.cancelAnimationFrame = function(a) {
        clearTimeout(a);
    });
    var q = function(a) {
        arguments.length && this.init(a);
    };
    q.prototype = {
        attributes: {
            onLoop: null,
            afterStop: null,
            afterStopRequest: null,
            params: {},
            owner: null
        },
        init: function(a) {
            this.options = c.extend({}, this.attributes, a);
            this.animationHandle = null;
            this.loops = 0;
            this.stopRequested = !1;
        },
        start: function() {
            var a = this;
            this.animationHandle = e.requestAnimationFrame(function() {
                a.options.onLoop.apply(a.options.owner, [ a._getThreadInfo() ]) && a._loop();
            });
        },
        _getThreadInfo: function() {
            return {
                loops: ++this.loops,
                params: this.options.params,
                stopRequested: this.stopped
            };
        },
        _kill: function() {
            this.animationHandle && e.cancelAnimationFrame(this.animationHandle);
            c.isFunction(this.options.afterStop) && this.options.afterStop.call(this.options.owner);
            c.isFunction(this.options.afterStopRequest) && this.options.afterStopRequest.call(this.options.owner);
        },
        _loop: function() {
            var a = this;
            this.animationHandle = e.requestAnimationFrame(function() {
                a.options.onLoop.apply(a.options.owner, [ a._getThreadInfo() ]) ? a._loop() : a._kill();
            });
        },
        stop: function(a) {
            this.stopped = !0;
            this.options.afterStopRequest = a;
        }
    };
    d.prototype = {
        defaults: {
            initialValue: 0,
            maxValue: 100,
            label: "",

            labelClassName: "text-label",
            title: "",

            titleClassName: "text-title",
            dates: "",
            datesClassName: "text-dates",

            percent: !1,
            decimals: 0,
            digitClassName: "digit-label",
            format: null,
            duration: 4e3,
            fillColor: "#eeeeee",
            wrapperClassName: "circular-stat",
            outerThickness: 8,
            fillThickness: 10
        },
        init: function(a, b) {
            this.element = c(a);
            this.options = c.extend({}, this.defaults, b, this.element.data());
            this.attributes = {};
            this.labels = {};
            this.canvases = {};
            this.activeAnimationThread = null;
            this._parseOptions();
            if (this.canvases = this._build()) this._drawBackside(this.canvases.back), this._drawFrontside(this.canvases.front), this.labels = this._attachLabels(), this._updateVal(0), this.animate(this.options.initialValue, !1);
            return this;
        },
        _parseOptions: function() {
            var a = Math.max(this.element.width(), this.element.height()) / 2, b = this.options.outerThickness;
            this.attributes = c.extend({}, this.attributes, {
                currentValue: 0,
                radius: {
                    back: a,
                    fill: a - b,
                    front: a - b - this.options.fillThickness
                }
            });
        },
        _createCanvas: function(a, b) {
            if (0 === a || 0 === b) return console.log("Invalid canvas dimensions"), !1;
            var g = l.createElement("canvas");
            g.width = a * d.PIXEL_RATIO;
            g.height = b * d.PIXEL_RATIO;
            1 < d.PIXEL_RATIO && (g.style.width = a + "px", g.style.height = b + "px");
            if (!g.getContext) if ("undefined" !== typeof G_vmlCanvasManager) G_vmlCanvasManager.initElement(g); else return console.log("Your browser does not support HTML5 Canvas, or excanvas is missing on IE"), !1;
            return g;
        },
        _attachLabels: function() {
            var a = c("<span></span>").addClass(this.options.digitClassName), b = c("<span></span>").addClass(this.options.labelClassName).text(this.options.label),  z = c("<span></span>").addClass(this.options.titleClassName).text(this.options.title), y = c("<span></span>").addClass(this.options.datesClassName).text(this.options.dates);;

            this.element.append([ a, b, z, y ]);
            return {
                digit: a,
                text: b,
                text: z,
                text: y
            };
        },
        _build: function() {
            for (var a = {}, b, g = 2 * this.attributes.radius.back, m = 0; m < d.CANVAS_NAMES.length; ++m) {
                if (!(b = this._createCanvas(g, g))) return !1;
                b.style.position = "absolute";
                b.style.top = 0;
                b.style.left = 0;
                b.className = d.CANVAS_NAMES[m];
                a[d.CANVAS_NAMES[m]] = b;
            }
            this.element.addClass(this.options.wrapperClassName).append(c.map(a, function(a) {
                return a;
            }));
            return a;
        },
        _drawBackside: function(a) {
            var b = this.attributes.radius.back, g = this.attributes.radius.fill, a = a.getContext("2d"), c = a.createLinearGradient(0, 0, 0, 2 * b);
            c.addColorStop(0, "#fff");
            c.addColorStop(1, "#fff");
            1 < d.PIXEL_RATIO && a.scale(d.PIXEL_RATIO, d.PIXEL_RATIO);
            this._drawCircle(a, b, b, b);
            a.fillStyle = c;
            a.fill();
            this._drawCircle(a, b, b, g);
            a.fillStyle = "transparent";
            a.fill();
        },
        _drawFrontside: function(a) {
            var b = this.attributes.radius.back, c = this.attributes.radius.front, a = a.getContext("2d");
            1 < d.PIXEL_RATIO && a.scale(d.PIXEL_RATIO, d.PIXEL_RATIO);
            this._drawCircle(a, b, b, c);
            a.shadowColor = "rgba(0, 0, 0, 0.3)";
            a.shadowBlur = 3;
            a.shadowOffsetY = 1;
            a.fillStyle = "transparent";
            a.fill();
        },
        _drawCircle: function(a, b, c, d) {
            a.beginPath();
            a.arc(b, c, d, 0, 2 * Math.PI, !1);
            a.closePath();
        },
        _updateVal: function(a, b, d) {
            c.isNumeric(a) && c.isNumeric(b) && c.isNumeric(d) ? (d = (d - b) * a, a = Math.max(0, Math.min(b + 100 * d / this.options.maxValue, 100)), b = Math.max(0, Math.min(b + d, this.options.maxValue))) : (a = Math.min(this.attributes.currentValue / this.options.maxValue, 100), b = Math.min(this.attributes.currentValue, this.options.maxValue));
            this.labels.digit[0].innerHTML = (c.isFunction(this.options.format) ? this.options.format : function(a, b, c) {
                return this.options.percent ? a.toFixed(this.options.decimals) + "%" : b.toFixed(this.options.decimals) + "/" + c.toFixed(this.options.decimals);
            }).apply(this, [ a, b, this.options.maxValue ]);
        },
        _redraw: function() {
            var a = this.canvases.fill, b = a.getContext("2d"), c = this.attributes.radius.back, f = this.attributes.radius.fill, e = 2 * (this.attributes.currentValue / this.options.maxValue) * Math.PI;
            b.fillStyle = this.options.fillColor;
            b.clearRect(0, 0, a.width, a.height);
            0 !== e && (b.save(), 1 < d.PIXEL_RATIO && b.scale(d.PIXEL_RATIO, d.PIXEL_RATIO), b.translate(c, c), b.rotate(-Math.PI / 2), b.beginPath(), b.arc(0, 0, f, 0, e, !1), b.lineTo(0, 0), b.closePath(), b.fill(), b.restore());
            this._updateVal();
        },
        animate: function(a, b) {
            function f(b) {
                1 === b.loops && (j = (new Date).getTime(), r = 2 * (a / this.options.maxValue) * Math.PI, p = 2 * (this.attributes.currentValue / this.options.maxValue) * Math.PI);
                var c = Math.min(((new Date).getTime() - j) / this.options.duration, 1), e = p + (r - p) * c;
                h.clearRect(0, 0, n.width, n.height);
                0 !== e && (h.save(), 1 < d.PIXEL_RATIO && h.scale(d.PIXEL_RATIO, d.PIXEL_RATIO), h.translate(i, i), h.rotate(-Math.PI / 2), h.beginPath(), h.arc(0, 0, l, 0, e, !1), h.lineTo(0, 0), h.closePath(), h.fill(), h.restore());
                k._updateVal(c, k.attributes.currentValue, a);
                return b.stopRequested || 1 <= c ? (k.attributes.currentValue += (a - k.attributes.currentValue) * c, !1) : !0;
            }
            function e(a) {
                c(this).queue("circular", function(a) {
                    (this.activeAnimationThread = new q({
                        onLoop: function() {
                            return f.apply(this, arguments);
                        },
                        afterStop: function() {
                            a();
                            0 === c(this).queue("circular").length && (this.activeAnimationThread = null);
                        },
                        owner: this
                    })).start();
                });
                a && c(this).dequeue("circular");
            }
            if (c.isNumeric(a) && !(0 > a || a > this.options.maxValue)) {
                var k = this, n = this.canvases.fill, h = n.getContext("2d"), i = this.attributes.radius.back, l = this.attributes.radius.fill, j, r, p;
                h.fillStyle = this.options.fillColor;
                !b && this.activeAnimationThread ? (c(this).clearQueue("circular"), this.activeAnimationThread.stop(function() {
                    e.apply(this, [ !0 ]);
                })) : e.apply(this, [ !this.activeAnimationThread ]);
            }
        },
        option: function(a, b) {
            if (0 === arguments.length) return c.extend({}, this.options);
            if ("string" === typeof a) {
                if (b === j) return this.options[a];
                switch (a) {
                  case "label":
                    this.options[a] = b;
                    this.labels.text.html(b);
                    break;
                  case "maxValue":
                    this.options.percent || (this.attributes.currentValue = Math.max(Math.min(this.attributes.currentValue, b), 0), this.options[a] = b, this._redraw());
                    break;
                  case "percent":
                    b && (this.options.maxValue = 100, this.attributes.currentValue = Math.max(Math.min(this.attributes.currentValue, 100), 0));
                  case "format":
                  case "decimals":
                  case "fillColor":
                  case "duration":
                    this.options[a] = b, this._redraw();
                }
            }
            return this;
        }
    };
    d.defaults = d.prototype.defaults;
    c.fn.CircularStat = function(a) {
        var b = "string" === typeof a, e = Array.prototype.slice.call(arguments, 1), f = this;
        if (b && "_" === a.charAt(0)) return f;
        b ? this.each(function() {
            var b = c.data(this, "circular-stat"), d = b && c.isFunction(b[a]) ? b[a].apply(b, e) : b;
            if (d !== b && d !== j) return f = d, !1;
        }) : this.each(function() {
            c.data(this, "circular-stat") || c.data(this, "circular-stat", new d(this, a));
        });
        return f;
    };
    c(function() {
        c('[data-provide="circular"]').each(function() {
            var a = c(this);
            a.CircularStat(a.data());
        });
    });
})(jQuery, window, document);
});
