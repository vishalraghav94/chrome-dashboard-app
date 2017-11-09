(function () {

	//default time limit (if time parameter is not passed)
	var limit = 0;

	var nodeDetect = {
		/**
		 *
		 * @param callback - function to execute when node is detected
		 * @param selectors - list of selectors path in which node detection is to be implemented
		 */
		init: function (callback, selectors) {
					var selectorsString = selectors.join(",");
					var animationValues = "{animation: nodeInserted 0s; -webkit-animation: nodeInserted 0s; " +
						"-moz-animation: nodeInserted 0s; -ms-animation: nodeInserted 0s; " +
						"-o-animation: nodeInserted 0s;}";
					var css = "@keyframes nodeInserted {} @-moz-keyframes nodeInserted{} " +
						"@-webkit-keyframes nodeInserted {} " +
						"@-ms-keyframes nodeInserted {} @-o-keyframes nodeInserted{} " +
						selectorsString + animationValues;
					this.appendCSS(css);
					window.addEventListener('animationstart', this.throttle(function (event) {
						if (event.animationName === 'nodeInserted') {
							callback(event);
						}
					}, limit), true);
				},
		/**
		 *
		 * @param css - css styling to be added to style tag
		 */
		appendCSS: function (css) {
						var head = document.head || document.getElementsbyTagName('head')[0],
							style = document.createElement('style');
						style.type = 'text/css';
						if (style.styleSheet) {
							style.styleSheet.cssText = css;
						} else {
							style.appendChild(document.createTextNode(css));
						}
						head.appendChild(style);
					},
		throttle: function (fn, threshhold,scope) {
						var last,
							deferTimer;
						return function () {
							var context = scope || this;
							var now = +new Date,
								args = arguments;
							if (last && now < last + threshhold) {
								// hold on to it
								clearTimeout(deferTimer);
								deferTimer = setTimeout(function () {
									last = now;
									fn.apply(context, args);
								}, threshhold);
							} else {
								last = now;
								fn.apply(context, args);
							}
						}
					}
	};

	window.NodeDetect = function (callback,selectors,time) {
							limit = time || limit;
							if( !selectors || !selectors.length) {
								selectors = ["body *"];
							}

							if(!(selectors instanceof Array)) {
								selectors = [selectors];
							}
							nodeDetect.init(callback, selectors);
						};

							return nodeDetect;
						})();