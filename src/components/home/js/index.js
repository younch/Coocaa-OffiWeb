var mt = 0;
		window.onload = function () {
		    var mydiv = document.getElementById("nav");
		    var mt = mydiv.offsetTop;
		    window.onscroll = function () {
		        var t = document.documentElement.scrollTop || document.body.scrollTop;
		        if (t > mt) {
		            mydiv.style.position = "fixed";                    
		            mydiv.style.top = "0";
		        }
		        else {
		            mydiv.style.position = "static";
		        }
			}
		}