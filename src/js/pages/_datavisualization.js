'use strict';

var	$ = require('jQuery');

var Numbers = function(options) {

	var defaults = {
		debug:			false,
		initialized: 	false
	};

	this.options = $.extend(true, defaults, options);
	
    this.numbers = {
        large: {
            total: 19
        },
        normal: {
            total: 39
        },
        small: {
            total: 77
        }
    };

    this.$numbers;
    this.availableWidth;
    this.availableHeight;

	return this;
};


Numbers.prototype = {

	init: function() {
		var self = this;
		self.initialized = true;

		self.generateNumbers();

        self.availableWidth = $('.main-content').width();
        self.availableHeight = $('.main-content').height();

		return self;

	},

	start: function() {
		var self = this;

		self.init();
	    var $numbers = $(".number");
	    $numbers.each(self.animateNumbers);
	    $(".numbers-wrapper").fadeTo(1000, 0.13); 
	},

    generateSingleNumber: function() {
        return ((Math.random() * 200) - 100).toFixed(2);
    },

    getNumberColor: function(num) {
        return  (num > 0 ? 'green' : 'red');
    },

    generateNumberDOM: function(numberType) {
    	var self = this;

        var rand = self.generateSingleNumber();
        $('.numbers-wrapper').append("<div class='number "+numberType+" "+self.getNumberColor(rand)+"'>"+rand+"</div>")
    },

    generateNumbers: function() {

    	var self = this;
        for(var type in self.numbers) {
            if(self.numbers.hasOwnProperty(type)) {
                for(var i = 0; i < self.numbers[type].total; i++) {
                    $('.numbers-wrapper').append(self.generateNumberDOM('number-'+type));
                }
            }
        }
    },

    positionNumber: function($el) {
    	var self = this;
        var xPos = Math.random() * self.availableWidth,
            yPos = Math.random() * self.availableHeight;

        $el.css({'top': yPos+'px', 'left': xPos+'px'});
    },

    animateNumbers: function(ndx, el) {
        var $el = $(this);
        var interval = (Math.random() * 7000) + 777;
        var blink = function() {
            $el.fadeOut(interval, function() {
                self.positionNumber($el);
                $el.fadeIn(interval);
            });
        };
        window.setInterval(blink, interval);
    }
};

module.exports = Numbers;