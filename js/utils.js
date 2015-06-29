// based on code from http://stackoverflow.com/questions/8211744/convert-time-interval-given-in-seconds-into-more-human-readable-form
function human_time(milliseconds) {
    var seconds = milliseconds / 1000;
    var minutes = seconds / 60;
    if (minutes>=1) {
        return minutes.toFixed(1) + 'min.'
    }
    if (seconds>=1) {
        return seconds.toFixed(1) + 'sec.'
    }
    return milliseconds + 'ms'
}

function head_stringify(data, count) {
    if (typeof data == "string") {
        var txt = data.slice(0,count)
    } else if (data instanceof ArrayBuffer) {
        data = data.slice(0,count);
        data = new Int8Array(data);
        var txt="[ArrayBuffer:";
        for (var i=0; i<count; i++) {
            txt += " " + data[i];
        }
        txt += "...]";
        return txt
        console.log(txt);
    } else {
        var txt="";
        for (var i=0; i<count; i++) {
            txt += String.fromCharCode(data[i]);
        }
    }
    return JSON.stringify(txt)+"...";
}

// https://github.com/henrya/js-jquery/tree/master/BinaryTransport
function binarytransport() {
     /**
     *
     * jquery.binarytransport.js
     *
     * @description. jQuery ajax transport for making binary data type requests.
     * @version 1.0
     * @author Henry Algus <henryalgus@gmail.com>
     *
     */

    // use this transport for "binary" data type
    $.ajaxTransport("+binary", function(options, originalOptions, jqXHR){
        // check for conditions and support for blob / arraybuffer response type
        if (window.FormData && ((options.dataType && (options.dataType == 'binary')) || (options.data && ((window.ArrayBuffer && options.data instanceof ArrayBuffer) || (window.Blob && options.data instanceof Blob)))))
        {
            return {
                // create new XMLHttpRequest
                send: function(headers, callback){
            // setup all variables
                    var xhr = new XMLHttpRequest(),
            url = options.url,
            type = options.type,
            async = options.async || true,

            // blob or arraybuffer.
            dataType = options.responseType || "blob",

            data = options.data || null,
            username = options.username || null,
            password = options.password || null;

                    xhr.addEventListener('load', function(){
                var data = {};
                data[options.dataType] = xhr.response;
                // make callback and send data
                callback(xhr.status, xhr.statusText, data, xhr.getAllResponseHeaders());
                    });

                    xhr.open(type, url, async, username, password);

            // setup custom headers
            for (var i in headers ) {
                xhr.setRequestHeader(i, headers[i] );
            }

                    xhr.responseType = dataType;
                    xhr.send(data);
                },
                abort: function(){}
            };
        }
    });
}