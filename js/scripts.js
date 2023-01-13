(function($) {
    "use strict"; // Start of use strict

    // Toggle the side navigation
    $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
        $("body").toggleClass("sidebar-toggled");
        $(".sidebar").toggleClass("toggled");
        if ($(".sidebar").hasClass("toggled")) {
            $('.sidebar .collapse').collapse('hide');
        };
    });

    // Close any open menu accordions when window is resized below 768px
    $(window).resize(function() {
        if ($(window).width() < 768) {
            $('.sidebar .collapse').collapse('hide');
        };
    });

    // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
    $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
        if ($(window).width() > 768) {
            var e0 = e.originalEvent,
                delta = e0.wheelDelta || -e0.detail;
            this.scrollTop += (delta < 0 ? 1 : -1) * 30;
            e.preventDefault();
        }
    });

    // Scroll to top button appear
    $(document).on('scroll', function() {
        var scrollDistance = $(this).scrollTop();
        if (scrollDistance > 100) {
            $('.scroll-to-top').fadeIn();
        } else {
            $('.scroll-to-top').fadeOut();
        }
    });

    // Smooth scrolling using jQuery easing
    $(document).on('click', 'a.scroll-to-top', function(e) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top)
        }, 1000, 'easeInOutExpo');
        e.preventDefault();
    });
    Date.prototype.AddDays = function(days) {
        days = parseInt(days, 10);
        return new Date(this.valueOf() + 1000 * 60 * 60 * 24 * days);
    }



})(jQuery); // End of use strict

var curr_url = window.location.href;
var page = curr_url.split('/').pop();

if (page == 'registration.html') {
    localStorage.removeItem('access_link');
}
if (localStorage.getItem('access_link') != '' && localStorage.getItem('access_link') != null) {
    if (sessionStorage.getItem('username') != null && sessionStorage.getItem('password') != null && sessionStorage.getItem('username') != '' && sessionStorage.getItem('password') != '') {

    } else {
        if (page != 'index.html') {
            logout();
            window.location = 'index.html';
        }
    }
} else {

    if (page != 'registration.html') {
        logout();
        window.location = 'registration.html';
    }
}

function logout() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
    sessionStorage.removeItem('json');
    window.location.href = 'index.html';
}

function autocomplete(inp, arr, field = "") {
    var currentFocus;
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");

        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("DIV");
                if (field == 'cname') {
                    b.setAttribute("onclick", "get_data(\'" + arr[i] + "\')");
                }
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function(e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    inp.addEventListener("keydown", function(e) {
        if (field == 'cname') {
            $(".customer_data").html('');
            $(".customer_data").hide();
        }
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) { //up
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });
}

function only_alphanumeric(txt) {
    txt.value = txt.value.replace(/[^A-Za-z0-9 \n\r]+/g, '');
}
function only_alphanumeric1(txt) {
    //txt.value = txt.value.replace(/[^A-Za-z0-9 \n\r]+/g, '');
    txt.value=txt.value.replace(' ','',txt.value);
}
function only_numeric(txt) {
    txt.value = txt.value.replace(/[^0-9.\n\r]+/g, '');
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function capitalize(s) {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: { lat: -25.363882, lng: 131.044922 },
    });
    const goldStar = {
        path: "M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z",
        fillColor: "yellow",
        fillOpacity: 0.8,
        scale: 1,
        strokeColor: "gold",
        strokeWeight: 14,
    };
    new google.maps.Marker({
        position: map.getCenter(),
        icon: goldStar,
        map: map,
    });
}

function get_data(c_name1) {
    var cname = c_name1.value;
    if (cname != '') {
        var cid = customerIList[cname];
        var c_mob = customerCell[cname];
        var c_name = customerList[cname];

        $(".customer_data").show();
        $(".customer_data").html(cid + ' / ' + c_mob + ' / ' + c_name);
    } else {
        $(".customer_data").html('');
        $(".customer_data").hide();
    }
}

function get_lat_long(address) {
    /*var geocoder = new google.maps.Geocoder();
    console.log(geocoder);
    geocoder.geocode({
        'address': address
    }, function(results, status) {
        console.log(status);
        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.latitude;
            var longitude = results[0].geometry.location.longitude;
            return latitude + ',' + longitude;
        }
    });*/
    return '19.0759837,72.8776559';
}

function convertTime24to12(time24) {
    var tmpArr = time24.split(':'),
        time12;
    if (+tmpArr[0] == 12) {
        time12 = tmpArr[0] + ':' + tmpArr[1] + ' PM';
    } else {
        if (+tmpArr[0] == 0) {
            time12 = '12:' + tmpArr[1] + ' AM';
        } else {
            if (+tmpArr[0] > 12) {
                time12 = (+tmpArr[0] - 12) + ':' + tmpArr[1] + ' PM';
            } else {
                time12 = (+tmpArr[0]) + ':' + tmpArr[1] + ' AM';
            }
        }
    }
    //console.log(time12);
    return time12;
}

function convertTime12to24(time12h) {
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes] = time.split(':');

    if (hours === '12') {
        hours = '00';
    }
    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }

    if (hours < 10) {
        hours = '0' + hours;
    }
    return `${hours}:${minutes}`;
}