'use strict';

(function() {
    
    var addBtn = document.querySelector(".btn-add");
    var resetBtn = document.querySelector(".btn-delete");
    var clickNbr = document.querySelector("#click-nbr");
    var apiURL = window.location.href + "api/clicks";
    
    function ready(fn) {
        // if the argument passed in is not a function then do nothing
        if (typeof fn !== 'function') {
            return;
        }
        
        if (document.readyState === 'complete') {
            // execute the function fn by adding ()
            return fn();
        }
        
        // if the document has not yet loaded then add an event listener that will call the function once its loaded
        document.addEventListener('DOMContentLoaded', fn, false);
    }
    
    function ajaxRequest(method, url, callback) {
        var xmlhttp = new XMLHttpRequest();
        
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                callback(xmlhttp.response);
            }
        };
        
        xmlhttp.open(method, url, true);
        xmlhttp.send();
    }
    
    function updateClickCount(data) {
        var clickObject = JSON.parse(data);
        clickNbr.innerHTML = clickObject.clicks;
    }
    
    ready(ajaxRequest('GET', apiURL, updateClickCount));
    
    // respond to user clicking the add button by first updating the click count and then getting the current click count
    addBtn.addEventListener('click', function() {
        ajaxRequest('POST', apiURL, function() {
            ajaxRequest('GET', apiURL, updateClickCount)
        });
    }, false);
    
    // respond to the user clicking the reset button by first resetting the click count and then getting the current count
    resetBtn.addEventListener('click', function() {
        ajaxRequest('DELETE', apiURL, function() {
            ajaxRequest('GET', apiURL, updateClickCount)
        });
    }, false);
})();