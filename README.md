## gch
 ![grand cherokee](http://www.jeep.com/assets/images/vehicles/2015/grand-cherokee/vlp/mod-hero/Jeep_2014_header.png)
 
 this is a small UI widget used to show stuff 360 degree by rotating pictures.

## example
you can check example [here](https://rawgit.com/jiawang1/gch/master/example/index.html)

##how to use
- include js and css
```html
	<!--  import gch -->
	<script src="./../js/gch.js" type="text/javascript"></script>
	<!-- import css file-->
	<link rel="stylesheet" type="text/css" media="all" href="./../css/gch.css"/>
```
- create widget
```code
    var elements = document.getElementsByClassName("main");
    new GrandCh(elements[0],["./images/frame-1.jpg", "./images/frame-1.jpg",],{options});
```
###patameters
- **rootElement**: parent node for this widget
- **imgs**: array of images URL
- **options**: options currently supports four attributes:
      1. **width**: the width which support moving/rotating, the default value is width of the rootElement.
      2. **clockWise**: direction of rotating
      3. **speed**: speed of rotating, default value is 4.(means mouse/finger moving from one side to another, it will turn 4 round)
      4. **initPosition**: show which picture by default

  
