(function(){var a=window,e=undefined;var f=this,g=function(c,b,d){c=c.split(".");d=d||f;!(c[0]in d)&&d.execScript&&d.execScript("var "+c[0]);for(var h;c.length&&(h=c.shift());)if(!c.length&&b!==e)d[h]=b;else d=d[h]?d[h]:(d[h]={})};Math.floor(Math.random()*2147483648).toString(36);g("yt.config_",a.yt&&a.yt.config_||{},e);g("yt.globals_",a.yt&&a.yt.globals_||[],e);g("yt.msgs_",a.yt&&a.yt.msgs_||{},e);g("yt.timeout_ids_",a.yt&&a.yt.timeout_ids_||[],e);g("yt.interval_ids_",a.yt&&a.yt.interval_ids_||[],e);eval("/*@cc_on!@*/false");if(a.yt.timing){var q=a.yt.timing;q.a=a.yt.timing.tick;q.i=1;q.b={};q.g=0;q.c=0;q.e=function(c,b){c=c||"load";var d=q.timers[c],h=d.start,l="",k=[],j="",m="",i="";delete d.start;if(q.pt)l="&srt="+q.pt;for(var n in d)k.push(n+"."+Math.round(d[n]-h));d.aft&&d.gv&&k.push("vl."+Math.round(d.aft-d.gv));if(q.experiment)m="&e="+q.experiment;if(a.yt.timing.addomain){i=a.yt.timing.addomain;i=i.split(".");if(i.length>1)i="&ad="+i[0]}q.timers[c]={};if(q.fmt)j+="&fmt="+q.fmt;if(q.asv)j+="&asv="+q.asv;if(b)for(var o in b)j+=
"&"+o+"="+b[o];b=new Image;var p=q.i++;q.b[p]=b;b.onload=b.onerror=function(){delete q.b[p]};b.src=["http://csi.gstatic.com/csi?v=2&s=youtube&action=",c,l,j,"&rt=",k.join(","),m,i].join("");b=eval("null")};q.d=function(){var c=q.default_action,b=q.timers[c];if(b.ol&&(!q.wff||b.aft))q.e(c)};q.h=function(){q.a("ol");q.d()};q.f=function(c){var b=++q.g;typeof c!="undefined"&&c<4&&q.c++;q.c==4&&q.a("tn_c4");b!=1&&b!=5&&b!=10&&b!=20&&b!=30||q.a("tn"+b)}};if(a.yt.timing){g("yt.timing.report",q.e,e);g("yt.timing.maybeReport",q.d,e);g("yt.timing.onLoad",q.h,e);g("yt.timing.handleThumbnailLoad",q.f,e)};})();