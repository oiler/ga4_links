<script>
/* IFFY */
;(function (window, document, undefined) {


'use strict';
var events = document.querySelectorAll('a');
var this_hostname = location.hostname;

function get_ga_class(previousValue, currentValue, currentIndex, array) {
    var output = '';
    if( currentValue.substring(0,3) == 'ga-' ) {
        output = currentValue.slice(3);
        return output;
    }
}

function ga_assign(event) {
    // assign link_class
    var classList_string = event.classList.value;
    var classList_array = classList_string.split(" ");
    var event_className = classList_array.reduce(get_ga_class);
    // assign link_ID
    var event_elementId = (event.id === '') ? '' : event.id;
    // assign link_URL    
    var event_linkURL = (event.href === '') ? '' : event.href;
    // assign link_type
    var event_linkType = '';
    var event_hostname = (event.hostname === '') ? '' : event.hostname;
    if( event_hostname == this_hostname ) {
        event_linkType = 'internal';
    } else {
        event_linkType = 'external';
    }
    // assign link_custom
    if ( typeof event.attributes['data-ga-custom'] !== 'object' ) {
        var event_customAttr = '';
    } else {
        var event_customAttr = event.attributes['data-ga-custom'].nodeValue;
    }
    
    var output = {};
    if( typeof(event_className) == 'string' && event_className !== '' ) { output["link_class"] = event_className; }
    if( typeof(event_elementId) == 'string' && event_elementId !== '' ) { output["link_ID"] = event_elementId; }
    if( typeof(event_linkURL) == 'string' && event_linkURL !== '' ) { output["link_URL"] = event_linkURL; }
    if( typeof(event_linkType) == 'string' && event_linkType !== '' ) { output["link_type"] = event_linkType; }
    if( typeof(event_customAttr) == 'string' && event_customAttr !== '' ) { output["link_custom"] = event_customAttr; }
    return output;
}

Object.keys(events).forEach(function(key) {
    var this_event = events[key];
    var ga_object = ga_assign(this_event);
    // console.log(ga_object);
    this_event.addEventListener("click", function() {
        gtag('event', 'click_link', ga_object);
    });
    this_event.addEventListener("auxclick", function() {
        gtag('event', 'click_link', ga_object);
    });
});

})(window, document);
</script>