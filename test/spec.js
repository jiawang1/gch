

describe("grand ch test suite", function(){
	"use strict";
	var rootEle, 
		grand,
		images = ["./../example/images/frame-1.jpg","./../example/images/frame-2.jpg"];

	before(function(){
		rootEle = document.getElementById("main");
		grand = new GrandCh(rootEle,images,{width: 200});
	});

	beforeEach(function(){

		grand.__isMoving = false;
	});

	it("check grand init",function(){
		expect(rootEle.childNodes.length).to.equal(1);
		expect(document.getElementsByClassName("gch-img").length).to.equal(images.length);
	});

	it("check mouse event",function(){

		var imgs = document.getElementsByClassName("gch-img");
		expect(rootEle.childNodes.length).to.equal(1);

		var eMouseDown = document.createEvent("Event");
		eMouseDown.initEvent('mousedown', true, true);
		rootEle.dispatchEvent(eMouseDown);
		expect(grand.__isMoving).to.equal(true);

		var eMouseUp = document.createEvent("Event");
		eMouseUp.initEvent('mouseup', true, true);
		rootEle.dispatchEvent(eMouseUp);
		expect(grand.__isMoving).to.equal(false);

		grand.__isMoving = true;

		var eMouseLeave = document.createEvent("Event");
		eMouseLeave.initEvent('mouseleave', true, true);
		rootEle.dispatchEvent(eMouseLeave);
		expect(grand.__isMoving).to.equal(false);

	});

	it("verify moving",function(){

		// sinon.spy(grand, "rotating");
		// var eMouseMove = document.createEvent("Event");
		// eMouseMove.initEvent('mousemove', true, true);
		// rootEle.dispatchEvent(eMouseMove);
		// console.log("done");
		// expect(grand.rotating.calledOnce).to.equal(true);

	});



});