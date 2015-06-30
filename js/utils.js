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
