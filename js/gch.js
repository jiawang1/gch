(function(gloabl) {
		"use strict";

		var MIN_INTERVAL = 5;

		var GrandCh = function(root, imgs, options) {

			if (Object.prototype.toString.call(imgs) !== "[object Array]" ){
					console.error && console.error('impiut param "imgs" should be array of image URL');
					throw {"message": 'impiut param "imgs" should be array of image URL, current value is ' + imgs};
				}

				if(typeof root.nodeType === "undefined"){
					console.error && console.error('impiut param "root" should be DOM element');
					throw {"message": 'impiut param "imgs" should be DOM element, current value is ' + root};
				}
				if (!(this instanceof GrandCh)) {
					return new GrandCh(root, imgs, options);
				}

				/*  current configuration options:
				 *		initPosition
				 *		clockWise
				 *		speed
				 *		showLoadingCover
				 *		width
				 *		maxWaitingTime: if showLoadingCover is true, this value must provided, this is the max waiting millisecond for 
				 *						image loading, after this time, cover will be removed
				 */
				var _default = {initPosition: 0, clockWise: true, speed: 4, showLoadingCover: true, maxWaitingTime: 5000};

				this.__imgs = imgs; 
				this.__ops = extend(_default, options); 
				this.__root = root; 
				this.__ops.width = this.__ops.width?this.__ops.width:root.offsetWidth;
				this.__currentInx = 0;
				this.__currentPoz = this.__ops.initPosition; 
				this.__imgIDs = [];
				this.__conClass = "gch-container";
				this.__isMoving = false;
				this.__interval = MIN_INTERVAL;
				this.__init();
			};

			GrandCh.prototype.__init = function() {

				var con = document.createElement("div");
				con.className = this.__conClass;
				this.__root.appendChild(con);
				var confr = document.createDocumentFragment();

				if(this.__ops.showLoadingCover){
					var cover = document.createElement("div");
					cover.className = "gch-show-cover";
					confr.appendChild(cover);

					var timeHandler = setTimeout(function(){
						cover.style.display ="none";
					}, this.__ops.maxWaitingTime);
				}

				var imagContainer = document.createElement("div");
				imagContainer.className = "gch-img-container";

				this.__imgs.forEach(bind(function(imgURL, inx) {
					var img = document.createElement("img");
					img.className = "gch-img";
					img.src = imgURL;
					img.setAttribute("data-gch-id",inx);
					img.draggable = false;
					this.__imgIDs.push(false);
					img.onload = bind(function(e){
						this.__imgIDs[inx] = true;
						if(this.__ops.showLoadingCover){
							var shouldRemove = true;
							for(var i =0, j = this.__imgIDs.length; i < j; i++){
								if(!this.__imgIDs[i]){
									shouldRemove = false;
									break;
								}
							}
							shouldRemove && (function(){
								cover.style.display ="none";
								clearTimeout(timeHandler);
							})();
						}

					},this);
					if (inx === this.__currentInx) {
						img.style.visibility = "visible";
					}
					imagContainer.appendChild(img);

				}, this));
				confr.appendChild(imagContainer);
				con.appendChild(confr);
				this.__interval = Math.max(MIN_INTERVAL,Math.ceil(this.__ops.width/(this.__imgs.length*Math.max(1,this.__ops.speed))));
				bindEventHandler(imagContainer,"mousedown touchstart", bind(this.rotateStart,this));
				bindEventHandler(imagContainer,"mousemove touchmove", bind(this.rotating,this));
				bindEventHandler(imagContainer,"mouseup mouseleave touchend", bind(this.rotateEnd,this));
				this.__root = null;
			};

			GrandCh.prototype.rotateStart = function(e){

				if(e.type === "touchstart"){
					this.__currentPoz = window.event.touches[0].pageX;
				}else{
					this.__currentPoz = e.pageX;
				}
				this.__isMoving = true;

			};

			GrandCh.prototype.rotating = function(e){
					
				if(this.__isMoving){
					var pointerPosition;
					if(e.type === "touchmove"){
						pointerPosition =  window.event.targetTouches[0].pageX;
					}else{
						pointerPosition = e.pageX;
					}	
					var movement = pointerPosition - this.__currentPoz;

					if(Math.abs(movement) >= this.__interval){

						this.__currentPoz = pointerPosition;
						var pre = this.__currentInx;
						if((movement > 0 && this.__ops.clockWise)||(movement < 0 && !this.__ops.clockWise)){
							this.__currentInx = getNext(this.__currentInx, this.__imgIDs);
						}else{
							this.__currentInx = getLast(this.__currentInx, this.__imgIDs);
						}
						var pre = document.querySelector('[data-gch-id = "' + pre+ '"]');
						pre.style.visibility = "hidden";
						document.querySelector('[data-gch-id = "' + this.__currentInx+'"]').style.visibility = "visible";
					}
					e.preventDefault();
					e.stopPropagation();
				}
			};

			GrandCh.prototype.rotateEnd = function(e){
				this.__isMoving = false;
				
			};

			var getNext = function(id, aPool){
				id = id=== aPool.length - 1? 0: ++id;
				return aPool[id]?id:getNext(id, aPool);
			}

			var getLast = function(id, aPool){
				id = id=== 0?aPool.length - 1: --id;
				return aPool[id]?id:getLast(id,aPool);
			};

			var bind = function(fuc, ob){
				if(Function.prototype.bind){
					return Function.prototype.bind.call(fuc, ob);
				}else{
					return function(){
						return fuc.apply(ob, toArray(arguments));
					};
				}
			};

			var toArray = function(arrayLike){
				return Array.prototype.slice.call(arrayLike, 0);
			};
			var extend = function(_default, opt){
				for(var i in opt){
					if(opt.hasOwnProperty(i)){
						_default[i] = opt[i];
					}
				}
				return _default;
			};

			var bindEventHandler = function(ele, eventType, handler){
				var eventTypes = eventType.split(" ");
				eventTypes.forEach(function(et){
					et = et.trim();	
					if(window.addEventListener){
						ele.addEventListener(et, handler);
					}else if(window.attachEvent){
						ele.attachEvent("on" + et, handler);
					}else{
						ele["on" + et] = handler;
					}
				});
			};
	
	gloabl.GrandCh = GrandCh;

})(window);
