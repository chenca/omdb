(function(){var f=true,g=null,h=false,i=window,j=undefined,k=parseInt,n=document,o=Array,p="appendChild",q="slice",r="dataset",s="indexOf",t="createElement",u="length",v="prototype",w="removeEventListener",y="split",z="style",A="body",B="call",C="detachEvent",D="apply",E="offsetHeight",F;var G=this,H=function(a,b,c){a=a[y](".");c=c||G;!(a[0]in c)&&c.execScript&&c.execScript("var "+a[0]);for(var d;a[u]&&(d=a.shift());)if(!a[u]&&b!==j)c[d]=b;else c=c[d]?c[d]:(c[d]={})},aa=function(a){a.l=function(){return a.o||(a.o=new a)}},ca=function(a){if(a.hasOwnProperty&&a.hasOwnProperty(K))return a[K];a[K]||(a[K]=++ba);return a[K]},K="closure_hashCode_"+Math.floor(Math.random()*2147483648).toString(36),ba=0,da=function(a,b){var c=b||G;if(arguments[u]>2){var d=o[v][q][B](arguments,2);return function(){var e=
o[v][q][B](arguments);o[v].unshift[D](e,d);return a[D](c,e)}}else return function(){return a[D](c,arguments)}},ea=Date.now||function(){return(new Date).getTime()},fa=function(a,b){function c(){}c.prototype=b[v];a.z=b[v];a.prototype=new c};H("yt.config_",i.yt&&i.yt.config_||{},j);H("yt.globals_",i.yt&&i.yt.globals_||[],j);H("yt.msgs_",i.yt&&i.yt.msgs_||{},j);H("yt.timeout_ids_",i.yt&&i.yt.timeout_ids_||[],j);H("yt.interval_ids_",i.yt&&i.yt.interval_ids_||[],j);eval("/*@cc_on!@*/false");var ga={};var ha=function(a,b,c){if(a[s])return a[s](b,c);if(o[s])return o[s](a,b,c);for(c=c==g?0:c<0?Math.max(0,a[u]+c):c;c<a[u];c++)if(c in a&&a[c]===b)return c;return-1},L=function(a,b){if(a.contains)return a.contains(b);return ha(a,b)>-1},ia=function(a,b,c){return arguments[u]<=2?o[v][q][B](a,b):o[v][q][B](a,b,c)};var M=function(a,b){a.className=b},ja=function(a){return(a=a.className)&&typeof a[y]=="function"?a[y](" "):[]},N=function(a){var b=ja(a),c;c=ia(arguments,1);for(var d=0,e=0;e<c[u];e++)if(!L(b,c[e])){b.push(c[e]);d++}c=d==c[u];a.className=b.join(" ");return c};var ka=function(a,b){this.x=a!==j?a:0;this.y=b!==j?b:0};ka[v].toString=function(){return"("+this.x+", "+this.y+")"};var O=function(a,b){this.width=a;this.height=b};O[v].toString=function(){return"("+this.width+" x "+this.height+")"};O[v].floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};var la=function(a,b,c){for(var d in a)if(b[B](c,a[d],d,a))return d;return j};var ma=function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},P=function(a,b){return a[s](b)!=-1},oa=function(a,b){var c=0;a=ma(String(a))[y](".");b=ma(String(b))[y](".");for(var d=Math.max(a[u],b[u]),e=0;c==0&&e<d;e++){var m=a[e]||"",l=b[e]||"",S=new RegExp("(\\d*)(\\D*)","g"),I=new RegExp("(\\d*)(\\D*)","g");do{var x=S.exec(m)||["","",""],J=I.exec(l)||["","",""];if(x[0][u]==0&&J[0][u]==0)break;c=x[1][u]==0?0:k(x[1],10);var La=J[1][u]==0?0:k(J[1],10);c=na(c,La)||na(x[2][u]==0,J[2][u]==0)||na(x[2],
J[2])}while(c==0)}return c},na=function(a,b){if(a<b)return-1;else if(a>b)return 1;return 0};ea();var Q,pa,R,qa,ra,sa,ta,ua,va,wa,xa=function(){return G.navigator?G.navigator.userAgent:g},T=function(){return G.navigator};(function(){sa=ra=qa=R=pa=Q=h;var a;if(a=xa()){var b=T();Q=a[s]("Opera")==0;pa=!Q&&a[s]("MSIE")!=-1;qa=(R=!Q&&a[s]("WebKit")!=-1)&&a[s]("Mobile")!=-1;sa=(ra=!Q&&!R&&b.product=="Gecko")&&b.vendor=="Camino"}})();var ya=Q,za=pa,Aa=ra,U=R,Ba=qa,Ca=function(){var a=T();return a&&a.platform||""}();
(function(){ta=P(Ca,"Mac");ua=P(Ca,"Win");va=P(Ca,"Linux");wa=!!T()&&P(T().appVersion||"","X11")})();var Da=function(){var a="",b;if(ya&&G.opera){a=G.opera.version;a=typeof a=="function"?a():a}else{if(Aa)b=/rv\:([^\);]+)(\)|;)/;else if(za)b=/MSIE\s+([^\);]+)(\)|;)/;else if(U)b=/WebKit\/(\S+)/;if(b)a=(a=b.exec(xa()))?a[1]:""}return a}(),Ea={},V=function(a){return Ea[a]||(Ea[a]=oa(Da,a)>=0)};var W=function(a){return typeof a=="string"?n.getElementById(a):a},Fa=function(a){var b=a.document;if(U&&!V("500")&&!Ba){if(typeof a.innerHeight=="undefined")a=i;b=a.innerHeight;var c=a.document.documentElement.scrollHeight;if(a==a.top)if(c<b)b-=15;return new O(a.innerWidth,b)}a=b.compatMode=="CSS1Compat"&&(!ya||ya&&V("9.50"))?b.documentElement:b[A];return new O(a.clientWidth,a.clientHeight)},Ga=function(a){a=!U&&a.compatMode=="CSS1Compat"?a.documentElement:a[A];return new ka(a.scrollLeft,a.scrollTop)};
U&&V("522");var Ia=function(a,b,c){return Ha(a,function(d){return(!b||d.nodeName==b)&&(!c||L(ja(d),c))},f)},Ha=function(a,b,c,d){if(!c)a=a.parentNode;c=d==g;for(var e=0;a&&(c||e<=d);){if(b(a))return a;a=a.parentNode;e++}return g};var Ja=function(a,b,c){var d=n;c=c||d;a=a&&a!="*"?a.toLowerCase():"";if(c.querySelectorAll&&(a||b)&&(!U||d.compatMode=="CSS1Compat"||V("528")))b=c.querySelectorAll(a+(b?"."+b:""));else if(b&&c.getElementsByClassName){d=c.getElementsByClassName(b);if(a){c={};for(var e=0,m=0,l;l=d[m];m++)if(a==l.nodeName.toLowerCase())c[e++]=l;c.length=e;b=c}else b=d}else{d=c.getElementsByTagName(a||"*");if(b){c={};for(m=e=0;l=d[m];m++){a=l.className;if(typeof a[y]=="function"&&L(a[y](" "),b))c[e++]=l}c.length=e;b=
c}else b=d}return b[u]?b[0]:g};var Ka,Ma,Na,Oa,Pa,Qa;(function(){Qa=Pa=Oa=Na=Ma=Ka=h;var a=xa();if(a)if(a[s]("Firefox")!=-1)Ka=f;else if(a[s]("Camino")!=-1)Ma=f;else if(a[s]("iPhone")!=-1||a[s]("iPod")!=-1)Na=f;else if(a[s]("Android")!=-1)Oa=f;else if(a[s]("Chrome")!=-1)Pa=f;else if(a[s]("Safari")!=-1)Qa=f})();var Ra=function(a){a=W(a);if(!a)return g;var b=0,c=0;if(a.offsetParent){do{b+=a.offsetLeft;c+=a.offsetTop}while(a=a.offsetParent)}return new ka(b,c)};var Sa=function(){this.d={}};fa(Sa,function(){});F=Sa[v];F.e=h;F.v=function(a,b,c){var d=this.d[a];d||(d=this.d[a]=[]);d.push(b,c)};F.w=function(a,b,c){if(this.e){if(!this.c)this.c=[];this.c.push([a,b,c]);return h}if(a=this.d[a]){b=this.n(a,b,c);if(b!=-1){a.splice(b,2);return f}}return h};F.s=function(a){var b=this.d[a];if(b){this.e=f;for(var c=ia(arguments,1),d=0,e=b[u];d<e;)b[d++][D](b[d++],c);this.e=h;if(this.c)for(;b=this.c.pop();)this.w[D](this,b);return d!=0}return h};
F.n=function(a,b,c){for(var d=-1;(d=ha(a,b,d+1))!=-1;)if(a[d+1]===c)break;return d};var X={},Ta=0,Ua=function(a,b,c){return la(X,function(d){return d[0]==a&&d[1]==b&&d[2]==c})},Va=function(){return i.addEventListener?function(a,b,c){var d=++Ta+"";X[d]=[a,b,c];a.addEventListener(b,c,h);return d}:i.attachEvent?function(a,b,c){var d=++Ta+"";X[d]=[a,b,c];var e=function(){return c[B](a,i.event)};if(!a.b)a.b={};a.b[b]||(a.b[b]={});a.b[b][c]=e;a.attachEvent("on"+b,e);return d}:function(){}}();
(function(){return i[w]?function(a,b,c){a[w](b,c,h);(a=Ua(a,b,c))&&delete X[a]}:i[C]?function(a,b,c){a.b&&a.b[b]&&a.b[b][c]&&a[C]("on"+b,a.b[b][c]);(a=Ua(a,b,c))&&delete X[a]}:function(){}})();(function(){return i[w]?function(a){if(a in X){var b=X[a];b[0][w](b[1],b[2],h);delete X[a]}}:i[C]?function(a){if(a in X){var b=X[a],c=b[0],d=b[1];b=b[2];c.b&&c.b[d]&&c.b[d][b]&&c[C]("on"+d,c.b[d][b]);delete X[a]}}:function(){}})();var Y={},Z=function(a){var b;b=a||i.event;b=b.target||b.srcElement;if(b.nodeType==3)b=b.parentNode;b=b;if(b.tagName!="HTML"){a=(a||i.event).type;if(a in Y)for(var c in Y[a]){var d=Ia(b,g,c);d&&Y[a][c].s("dummy_topic",d,a)}}};Va(n,"click",Z);Va(n,"mouseover",Z);Va(n,"mouseout",Z);var Wa=function(){this.g={}};F=Wa[v];F.p=!!eval("/*@cc_on!@*/false");F.f=function(a,b,c){c=this.a(c);var d=da(b,this);a in Y||(Y[a]={});c in Y[a]||(Y[a][c]=new Sa);Y[a][c].v("dummy_topic",d);this.g[b]=d};F.getData=function(a,b){return a[r]?a[r][b]:a.getAttribute("data-"+b)};F.setData=function(a,b,c){if(a[r])a[r][b]=c;else a.setAttribute("data-"+b,c)};F.i=function(a){return Ia(a,g,this.a())};F.a=function(a){return this.j()+(a?"-"+a:"")};F.j=function(){return"yt-uix"+(this.h?"-"+this.h:"")};var $=function(){this.g={}};fa($,Wa);aa($);F=$[v];F.h="hovercard";F.t=function(){this.f("mouseover",this.r,"target");this.f("mouseout",this.q,"target")};F.r=function(a){var b=da(this.u,this,a);b=i.setTimeout(b,625);this.setData(a,"hovercard-timer",b.toString());if(a.alt){this.setData(a,"hovercard-alt",a.alt);a.alt=""}if(a.title){this.setData(a,"hovercard-title",a.title);a.title=""}};
F.q=function(a){var b=k(this.getData(a,"hovercard-timer"),10);i.clearTimeout(b);this.m(a);if(b=this.getData(a,"hovercard-alt"))a.alt=b;if(b=this.getData(a,"hovercard-title"))a.title=b};
F.u=function(a){var b=this.i(a);if(b){var c=this.a("popup"),d=c+ca(b),e=W(d);if(!e){var m=this.k(b);if(m){b=Ra(a);b.y+=a[E]/2;e=n[t]("div");e.id=d;e.className=c;e[z].left=b.x+"px";e[z].top=b.y+"px";d=n[t]("div");M(d,this.a("popup-border"));var l=n[t]("div");M(l,this.a("popup-border-arrow"));c=n[t]("div");M(c,this.a("popup-body"));var S=n[t]("div");M(S,this.a("popup-body-arrow"));var I=n[t]("div");M(I,this.a("popup-content"));I.innerHTML=m.innerHTML;c[p](I);d[p](S);d[p](c);e[p](l);e[p](d);n[A][p](e);
var x=this.a("popup-visible");i.setTimeout(function(){N(e,x)},10);l=Fa(i);d=Ga(n);if(m=e.offsetWidth+10>b.x){b.x+=a.offsetWidth;e[z].left=b.x+"px";N(e,this.a("popup-flip"))}if(a=(a=e[E]+b.y>l.height+d.y)&&b.y-e[E]>d.y){b.y-=e[E];e[z].top=b.y+"px";N(e,this.a("popup-reverse"))}if(this.p){a=e.cloneNode(f);a.id=e.id+"ie";N(a,this.a("popup-ie"));if(d=Ja("div",this.a("popup-body"),a)){d.innerHTML="";d[z].width=c.offsetWidth+"px";d[z].height=c[E]+"px"}n[A].insertBefore(a,e);if(c=a.filters["DXImageTransform.Microsoft.Blur"]){c.Enabled=
f;if(!m)a[z].left=b.x-c.PixelRadius+"px";a[z].top=b.y-c.PixelRadius+"px"}}}}}};F.m=function(a){if(a=this.i(a)){a=this.a("popup")+ca(a);var b=W(a);b&&n[A].removeChild(b);(a=W(a+"ie"))&&n[A].removeChild(a)}};F.k=function(a){var b=this.a("content");return Ja(g,b,a)};var Xa=$.l(),Ya=Xa.a();if(!(Ya in ga)){Xa.t();ga[Ya]=Xa}H("uix_onEvent_",Z,j);})();
