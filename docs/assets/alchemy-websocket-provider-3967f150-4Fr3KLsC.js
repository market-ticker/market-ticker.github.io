import{L as k,B as V,_ as f,n as X,C as W,i as E,v as Q,E as Z,g as _,D as ee,A as P,a as U,b as I,c as G,f as p,t as N,V as te,d as se}from"./index-AMkB9DT1.js";import{v as J,J as ne,d as g,A as x,g as ie}from"./alchemy-provider-5e530ed5-2WHQiyWX.js";let v=null;try{if(v=WebSocket,v==null)throw new Error("inject please")}catch{const e=new k(J);v=function(){e.throwError("WebSockets not supported in this environment",k.errors.UNSUPPORTED_OPERATION,{operation:"new WebSocket()"})}}var H=function(i,e,t,s){function n(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function c(d){try{a(s.next(d))}catch(u){o(u)}}function l(d){try{a(s.throw(d))}catch(u){o(u)}}function a(d){d.done?r(d.value):n(d.value).then(c,l)}a((s=s.apply(i,e||[])).next())})};const S=new k(J);let re=1;class oe extends ne{constructor(e,t){t==="any"&&S.throwError("WebSocketProvider does not support 'any' network yet",k.errors.UNSUPPORTED_OPERATION,{operation:"network:any"}),typeof e=="string"?super(e,t):super("_websocket",t),this._pollingInterval=-1,this._wsReady=!1,typeof e=="string"?g(this,"_websocket",new v(this.connection.url)):g(this,"_websocket",e),g(this,"_requests",{}),g(this,"_subs",{}),g(this,"_subIds",{}),g(this,"_detectNetwork",super.detectNetwork()),this.websocket.onopen=()=>{this._wsReady=!0,Object.keys(this._requests).forEach(n=>{this.websocket.send(this._requests[n].payload)})},this.websocket.onmessage=n=>{const r=n.data,o=JSON.parse(r);if(o.id!=null){const c=String(o.id),l=this._requests[c];if(delete this._requests[c],o.result!==void 0)l.callback(null,o.result),this.emit("debug",{action:"response",request:JSON.parse(l.payload),response:o.result,provider:this});else{let a=null;o.error?(a=new Error(o.error.message||"unknown error"),g(a,"code",o.error.code||null),g(a,"response",r)):a=new Error("unknown error"),l.callback(a,void 0),this.emit("debug",{action:"response",error:a,request:JSON.parse(l.payload),provider:this})}}else if(o.method==="eth_subscription"){const c=this._subs[o.params.subscription];c&&c.processFunc(o.params.result)}else console.warn("this should not happen")};const s=setInterval(()=>{this.emit("poll")},1e3);s.unref&&s.unref()}get websocket(){return this._websocket}detectNetwork(){return this._detectNetwork}get pollingInterval(){return 0}resetEventsBlock(e){S.throwError("cannot reset events block on WebSocketProvider",k.errors.UNSUPPORTED_OPERATION,{operation:"resetEventBlock"})}set pollingInterval(e){S.throwError("cannot set polling interval on WebSocketProvider",k.errors.UNSUPPORTED_OPERATION,{operation:"setPollingInterval"})}poll(){return H(this,void 0,void 0,function*(){return null})}set polling(e){e&&S.throwError("cannot set polling on WebSocketProvider",k.errors.UNSUPPORTED_OPERATION,{operation:"setPolling"})}send(e,t){const s=re++;return new Promise((n,r)=>{function o(l,a){return l?r(l):n(a)}const c=JSON.stringify({method:e,params:t,id:s,jsonrpc:"2.0"});this.emit("debug",{action:"request",request:JSON.parse(c),provider:this}),this._requests[String(s)]={callback:o,payload:c},this._wsReady&&this.websocket.send(c)})}static defaultUrl(){return"ws://localhost:8546"}_subscribe(e,t,s){return H(this,void 0,void 0,function*(){let n=this._subIds[e];n==null&&(n=Promise.all(t).then(o=>this.send("eth_subscribe",o)),this._subIds[e]=n);const r=yield n;this._subs[r]={tag:e,processFunc:s}})}_startEvent(e){switch(e.type){case"block":this._subscribe("block",["newHeads"],t=>{const s=V.from(t.number).toNumber();this._emitted.block=s,this.emit("block",s)});break;case"pending":this._subscribe("pending",["newPendingTransactions"],t=>{this.emit("pending",t)});break;case"filter":this._subscribe(e.tag,["logs",this._getFilter(e.filter)],t=>{t.removed==null&&(t.removed=!1),this.emit(e.filter,this.formatter.filterLog(t))});break;case"tx":{const t=s=>{const n=s.hash;this.getTransactionReceipt(n).then(r=>{r&&this.emit(n,r)})};t(e),this._subscribe("tx",["newHeads"],s=>{this._events.filter(n=>n.type==="tx").forEach(t)});break}case"debug":case"poll":case"willPoll":case"didPoll":case"error":break;default:console.log("unhandled:",e);break}}_stopEvent(e){let t=e.tag;if(e.type==="tx"){if(this._events.filter(n=>n.type==="tx").length)return;t="tx"}else if(this.listenerCount(e.event))return;const s=this._subIds[t];s&&(delete this._subIds[t],s.then(n=>{this._subs[n]&&(delete this._subs[n],this.send("eth_unsubscribe",[n]))}))}destroy(){return H(this,void 0,void 0,function*(){this.websocket.readyState===v.CONNECTING&&(yield new Promise(e=>{this.websocket.onopen=function(){e(!0)},this.websocket.onerror=function(){e(!1)}})),this.websocket.close(1e3)})}}var $={};Object.defineProperty($,"__esModule",{value:!0});var ce="Provided shouldReconnect() returned false. Closing permanently.",le="Provided shouldReconnect() resolved to false. Closing permanently.",F=function(){function i(e,t,s){if(s===void 0&&(s={}),this.url=e,this.onclose=null,this.onerror=null,this.onmessage=null,this.onopen=null,this.ondown=null,this.onreopen=null,this.CONNECTING=i.CONNECTING,this.OPEN=i.OPEN,this.CLOSING=i.CLOSING,this.CLOSED=i.CLOSED,this.hasBeenOpened=!1,this.isClosed=!1,this.messageBuffer=[],this.nextRetryTime=0,this.reconnectCount=0,this.lastKnownExtensions="",this.lastKnownProtocol="",this.listeners={},t==null||typeof t=="string"||Array.isArray(t)?this.protocols=t:s=t,this.options=ue(s),!this.options.wsConstructor)if(typeof WebSocket<"u")this.options.wsConstructor=WebSocket;else throw new Error("WebSocket not present in global scope and no wsConstructor option was provided.");this.openNewWebSocket()}return Object.defineProperty(i.prototype,"binaryType",{get:function(){return this.binaryTypeInternal||"blob"},set:function(e){this.binaryTypeInternal=e,this.ws&&(this.ws.binaryType=e)},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"bufferedAmount",{get:function(){var e=this.ws?this.ws.bufferedAmount:0,t=!1;return this.messageBuffer.forEach(function(s){var n=he(s);n!=null?e+=n:t=!0}),t&&this.debugLog("Some buffered data had unknown length. bufferedAmount() return value may be below the correct amount."),e},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"extensions",{get:function(){return this.ws?this.ws.extensions:this.lastKnownExtensions},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"protocol",{get:function(){return this.ws?this.ws.protocol:this.lastKnownProtocol},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"readyState",{get:function(){return this.isClosed?i.CLOSED:i.OPEN},enumerable:!0,configurable:!0}),i.prototype.close=function(e,t){this.disposeSocket(e,t),this.shutdown(),this.debugLog("WebSocket permanently closed by client.")},i.prototype.send=function(e){if(this.isClosed)throw new Error("WebSocket is already in CLOSING or CLOSED state.");this.ws&&this.ws.readyState===this.OPEN?this.ws.send(e):this.messageBuffer.push(e)},i.prototype.reconnect=function(){if(this.isClosed)throw new Error("Cannot call reconnect() on socket which is permanently closed.");this.disposeSocket(1e3,"Client requested reconnect."),this.handleClose(void 0)},i.prototype.addEventListener=function(e,t){this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t)},i.prototype.dispatchEvent=function(e){return this.dispatchEventOfType(e.type,e)},i.prototype.removeEventListener=function(e,t){this.listeners[e]&&(this.listeners[e]=this.listeners[e].filter(function(s){return s!==t}))},i.prototype.openNewWebSocket=function(){var e=this;if(!this.isClosed){var t=this.options,s=t.connectTimeout,n=t.wsConstructor;this.debugLog("Opening new WebSocket to "+this.url+".");var r=new n(this.url,this.protocols);r.onclose=function(o){return e.handleClose(o)},r.onerror=function(o){return e.handleError(o)},r.onmessage=function(o){return e.handleMessage(o)},r.onopen=function(o){return e.handleOpen(o)},this.connectTimeoutId=setTimeout(function(){e.clearConnectTimeout(),e.disposeSocket(),e.handleClose(void 0)},s),this.ws=r}},i.prototype.handleOpen=function(e){var t=this;if(!(!this.ws||this.isClosed)){var s=this.options.allClearResetTime;this.debugLog("WebSocket opened."),this.binaryTypeInternal!=null?this.ws.binaryType=this.binaryTypeInternal:this.binaryTypeInternal=this.ws.binaryType,this.clearConnectTimeout(),this.hasBeenOpened?this.dispatchEventOfType("reopen",e):(this.dispatchEventOfType("open",e),this.hasBeenOpened=!0),this.messageBuffer.forEach(function(n){return t.send(n)}),this.messageBuffer=[],this.allClearTimeoutId=setTimeout(function(){t.clearAllClearTimeout(),t.nextRetryTime=0,t.reconnectCount=0;var n=s/1e3|0;t.debugLog("WebSocket remained open for "+n+" seconds. Resetting retry time and count.")},s)}},i.prototype.handleMessage=function(e){this.isClosed||this.dispatchEventOfType("message",e)},i.prototype.handleClose=function(e){var t=this;if(!this.isClosed){var s=this.options,n=s.maxReconnectAttempts,r=s.shouldReconnect;if(this.clearConnectTimeout(),this.clearAllClearTimeout(),this.ws&&(this.lastKnownExtensions=this.ws.extensions,this.lastKnownProtocol=this.ws.protocol,this.disposeSocket()),this.dispatchEventOfType("down",e),this.reconnectCount>=n){this.stopReconnecting(e,this.getTooManyFailedReconnectsMessage());return}var o=!e||r(e);typeof o=="boolean"?this.handleWillReconnect(o,e,ce):o.then(function(c){t.isClosed||t.handleWillReconnect(c,e,le)})}},i.prototype.handleError=function(e){this.dispatchEventOfType("error",e),this.debugLog("WebSocket encountered an error.")},i.prototype.handleWillReconnect=function(e,t,s){e?this.reestablishConnection():this.stopReconnecting(t,s)},i.prototype.reestablishConnection=function(){var e=this,t=this.options,s=t.minReconnectDelay,n=t.maxReconnectDelay,r=t.reconnectBackoffFactor;this.reconnectCount++;var o=this.nextRetryTime;this.nextRetryTime=Math.max(s,Math.min(this.nextRetryTime*r,n)),setTimeout(function(){return e.openNewWebSocket()},o);var c=o/1e3|0;this.debugLog("WebSocket was closed. Re-opening in "+c+" seconds.")},i.prototype.stopReconnecting=function(e,t){this.debugLog(t),this.shutdown(),e&&this.dispatchEventOfType("close",e)},i.prototype.shutdown=function(){this.isClosed=!0,this.clearAllTimeouts(),this.messageBuffer=[],this.disposeSocket()},i.prototype.disposeSocket=function(e,t){this.ws&&(this.ws.onerror=B,this.ws.onclose=B,this.ws.onmessage=B,this.ws.onopen=B,this.ws.close(e,t),this.ws=void 0)},i.prototype.clearAllTimeouts=function(){this.clearConnectTimeout(),this.clearAllClearTimeout()},i.prototype.clearConnectTimeout=function(){this.connectTimeoutId!=null&&(clearTimeout(this.connectTimeoutId),this.connectTimeoutId=void 0)},i.prototype.clearAllClearTimeout=function(){this.allClearTimeoutId!=null&&(clearTimeout(this.allClearTimeoutId),this.allClearTimeoutId=void 0)},i.prototype.dispatchEventOfType=function(e,t){var s=this;switch(e){case"close":this.onclose&&this.onclose(t);break;case"error":this.onerror&&this.onerror(t);break;case"message":this.onmessage&&this.onmessage(t);break;case"open":this.onopen&&this.onopen(t);break;case"down":this.ondown&&this.ondown(t);break;case"reopen":this.onreopen&&this.onreopen(t);break}return e in this.listeners&&this.listeners[e].slice().forEach(function(n){return s.callListener(n,t)}),!t||!t.defaultPrevented},i.prototype.callListener=function(e,t){typeof e=="function"?e.call(this,t):e.handleEvent.call(this,t)},i.prototype.debugLog=function(e){this.options.debug&&console.log(e)},i.prototype.getTooManyFailedReconnectsMessage=function(){var e=this.options.maxReconnectAttempts;return"Failed to reconnect after "+e+" "+de("attempt",e)+". Closing permanently."},i.DEFAULT_OPTIONS={allClearResetTime:5e3,connectTimeout:5e3,debug:!1,minReconnectDelay:1e3,maxReconnectDelay:3e4,maxReconnectAttempts:Number.POSITIVE_INFINITY,reconnectBackoffFactor:1.5,shouldReconnect:function(){return!0},wsConstructor:void 0},i.CONNECTING=0,i.OPEN=1,i.CLOSING=2,i.CLOSED=3,i}(),ae=$.default=F;function ue(i){var e={};return Object.keys(F.DEFAULT_OPTIONS).forEach(function(t){var s=i[t];e[t]=s===void 0?F.DEFAULT_OPTIONS[t]:s}),e}function he(i){return typeof i=="string"?2*i.length:i instanceof ArrayBuffer?i.byteLength:i instanceof Blob?i.size:void 0}function de(i,e){return e===1?i:i+"s"}function B(){}const fe=120;class be{constructor(e){this.provider=e,this.maxBackfillBlocks=fe}getNewHeadsBackfill(e,t,s){return f(this,void 0,void 0,function*(){m(e);const n=yield this.getBlockNumber();if(m(e),t.length===0)return this.getHeadEventsInRange(Math.max(s,n-this.maxBackfillBlocks)+1,n+1);const r=p(t[t.length-1].number),o=n-this.maxBackfillBlocks+1;if(r<=o)return this.getHeadEventsInRange(o,n+1);const c=yield this.getReorgHeads(e,t);m(e);const l=yield this.getHeadEventsInRange(r+1,n+1);return m(e),[...c,...l]})}getLogsBackfill(e,t,s,n){return f(this,void 0,void 0,function*(){m(e);const r=yield this.getBlockNumber();if(m(e),s.length===0)return this.getLogsInRange(t,Math.max(n,r-this.maxBackfillBlocks)+1,r+1);const o=p(s[s.length-1].blockNumber),c=r-this.maxBackfillBlocks+1;if(o<c)return this.getLogsInRange(t,c,r+1);const l=yield this.getCommonAncestor(e,s);m(e);const a=s.filter(h=>p(h.blockNumber)>l.blockNumber).map(h=>Object.assign(Object.assign({},h),{removed:!0})),d=l.blockNumber===Number.NEGATIVE_INFINITY?p(s[0].blockNumber):l.blockNumber;let u=yield this.getLogsInRange(t,d,r+1);return u=u.filter(h=>h&&(p(h.blockNumber)>l.blockNumber||p(h.logIndex)>l.logIndex)),m(e),[...a,...u]})}setMaxBackfillBlock(e){this.maxBackfillBlocks=e}getBlockNumber(){return f(this,void 0,void 0,function*(){const e=yield this.provider.send("eth_blockNumber");return p(e)})}getHeadEventsInRange(e,t){return f(this,void 0,void 0,function*(){if(e>=t)return[];const s=[];for(let r=e;r<t;r++)s.push({method:"eth_getBlockByNumber",params:[N(r),!1]});return(yield this.provider.sendBatch(s)).map(j)})}getReorgHeads(e,t){return f(this,void 0,void 0,function*(){const s=[];for(let n=t.length-1;n>=0;n--){const r=t[n],o=yield this.getBlockByNumber(p(r.number));if(m(e),r.hash===o.hash)break;s.push(j(o))}return s.reverse()})}getBlockByNumber(e){return f(this,void 0,void 0,function*(){return this.provider.send("eth_getBlockByNumber",[N(e),!1])})}getCommonAncestor(e,t){return f(this,void 0,void 0,function*(){let s=yield this.getBlockByNumber(p(t[t.length-1].blockNumber));m(e);for(let n=t.length-1;n>=0;n--){const r=t[n];if(r.blockNumber!==s.number&&(s=yield this.getBlockByNumber(p(r.blockNumber))),r.blockHash===s.hash)return{blockNumber:p(r.blockNumber),logIndex:p(r.logIndex)}}return{blockNumber:Number.NEGATIVE_INFINITY,logIndex:Number.NEGATIVE_INFINITY}})}getLogsInRange(e,t,s){return f(this,void 0,void 0,function*(){if(t>=s)return[];const n=Object.assign(Object.assign({},e),{fromBlock:N(t),toBlock:N(s-1)});return this.provider.send("eth_getLogs",[n])})}}function j(i){const e=Object.assign({},i);return delete e.totalDifficulty,delete e.transactions,delete e.uncles,e}function pe(i){return z(i,e=>e.hash)}function me(i){return z(i,e=>`${e.blockHash}/${e.logIndex}`)}function z(i,e){const t=new Set,s=[];return i.forEach(n=>{const r=e(n);t.has(r)||(t.add(r),s.push(n))}),s}const ge=new Error("Cancelled");function m(i){if(i())throw ge}const ye=3e4,ke=1e4,K=6e4,Y=5,Ee=10;class Pe extends oe{constructor(e,t){var s;const n=x.getApiKey(e.apiKey),r=x.getAlchemyNetwork(e.network),o=x.getAlchemyConnectionInfo(r,n,"wss"),c=`alchemy-sdk-${te}`,l=new ae((s=e.url)!==null&&s!==void 0?s:o.url,c,{wsConstructor:t??_e()}),a=se[r];super(l,a),this._events=[],this.virtualSubscriptionsById=new Map,this.virtualIdsByPhysicalId=new Map,this.handleMessage=d=>{const u=JSON.parse(d.data);if(!Ae(u))return;const h=u.params.subscription,b=this.virtualIdsByPhysicalId.get(h);if(!b)return;const T=this.virtualSubscriptionsById.get(b);if(T.method==="eth_subscribe")switch(T.params[0]){case"newHeads":{const w=T,C=u,{isBackfilling:O,backfillBuffer:L}=w,{result:y}=C.params;O?Re(L,y):h!==b?this.emitAndRememberEvent(b,y,A):this.rememberEvent(b,y,A);break}case"logs":{const w=T,C=u,{isBackfilling:O,backfillBuffer:L}=w,{result:y}=C.params;O?Ce(L,y):b!==h?this.emitAndRememberEvent(b,y,R):this.rememberEvent(b,y,R);break}default:if(h!==b){const{result:w}=u.params;this.emitEvent(b,w)}}},this.handleReopen=()=>{this.virtualIdsByPhysicalId.clear();const{cancel:d,isCancelled:u}=ve();this.cancelBackfill=d;for(const h of this.virtualSubscriptionsById.values())f(this,void 0,void 0,function*(){try{yield this.resubscribeAndBackfill(u,h)}catch(b){u()||console.error(`Error while backfilling "${h.params[0]}" subscription. Some events may be missing.`,b)}});this.startHeartbeat()},this.stopHeartbeatAndBackfill=()=>{this.heartbeatIntervalId!=null&&(clearInterval(this.heartbeatIntervalId),this.heartbeatIntervalId=void 0),this.cancelBackfill()},this.apiKey=n,this.backfiller=new be(this),this.addSocketListeners(),this.startHeartbeat(),this.cancelBackfill=X}static getNetwork(e){return typeof e=="string"&&e in W?W[e]:ie(e)}on(e,t){return this._addEventListener(e,t,!1)}once(e,t){return this._addEventListener(e,t,!0)}off(e,t){return E(e)?this._off(e,t):super.off(e,t)}removeAllListeners(e){return e!==void 0&&E(e)?this._removeAllListeners(e):super.removeAllListeners(e)}listenerCount(e){return e!==void 0&&E(e)?this._listenerCount(e):super.listenerCount(e)}listeners(e){return e!==void 0&&E(e)?this._listeners(e):super.listeners(e)}_addEventListener(e,t,s){if(E(e)){Q(e);const n=new Z(_(e),t,s);return this._events.push(n),this._startEvent(n),this}else return super._addEventListener(e,t,s)}_startEvent(e){[...P,"block","filter"].includes(e.type)?this.customStartEvent(e):super._startEvent(e)}_subscribe(e,t,s,n){return f(this,void 0,void 0,function*(){let r=this._subIds[e];const o=yield this.getBlockNumber();r==null&&(r=Promise.all(t).then(a=>this.send("eth_subscribe",a)),this._subIds[e]=r);const c=yield r,l=yield Promise.all(t);this.virtualSubscriptionsById.set(c,{event:n,method:"eth_subscribe",params:l,startingBlockNumber:o,virtualId:c,physicalId:c,sentEvents:[],isBackfilling:!1,backfillBuffer:[]}),this.virtualIdsByPhysicalId.set(c,c),this._subs[c]={tag:e,processFunc:s}})}emit(e,...t){if(E(e)){let s=!1;const n=[],r=_(e);return this._events=this._events.filter(o=>o.tag!==r?!0:(setTimeout(()=>{o.listener.apply(this,t)},0),s=!0,o.once?(n.push(o),!1):!0)),n.forEach(o=>{this._stopEvent(o)}),s}else return super.emit(e,...t)}sendBatch(e){return f(this,void 0,void 0,function*(){let t=0;const s=e.map(({method:n,params:r})=>({method:n,params:r,jsonrpc:"2.0",id:`alchemy-sdk:${t++}`}));return this.sendBatchConcurrently(s)})}destroy(){return this.removeSocketListeners(),this.stopHeartbeatAndBackfill(),super.destroy()}isCommunityResource(){return this.apiKey===ee}_stopEvent(e){let t=e.tag;if(P.includes(e.type)){if(this._events.filter(n=>P.includes(n.type)).length)return}else if(e.type==="tx"){if(this._events.filter(n=>n.type==="tx").length)return;t="tx"}else if(this.listenerCount(e.event))return;const s=this._subIds[t];s&&(delete this._subIds[t],s.then(n=>{this._subs[n]&&(delete this._subs[n],this.send("eth_unsubscribe",[n]))}))}addSocketListeners(){this._websocket.addEventListener("message",this.handleMessage),this._websocket.addEventListener("reopen",this.handleReopen),this._websocket.addEventListener("down",this.stopHeartbeatAndBackfill)}removeSocketListeners(){this._websocket.removeEventListener("message",this.handleMessage),this._websocket.removeEventListener("reopen",this.handleReopen),this._websocket.removeEventListener("down",this.stopHeartbeatAndBackfill)}resubscribeAndBackfill(e,t){return f(this,void 0,void 0,function*(){const{virtualId:s,method:n,params:r,sentEvents:o,backfillBuffer:c,startingBlockNumber:l}=t;t.isBackfilling=!0,c.length=0;try{const a=yield this.send(n,r);switch(m(e),t.physicalId=a,this.virtualIdsByPhysicalId.set(a,s),r[0]){case"newHeads":{const d=yield q(()=>D(this.backfiller.getNewHeadsBackfill(e,o,l),K),Y,()=>!e());m(e),pe([...d,...c]).forEach(h=>this.emitNewHeadsEvent(s,h));break}case"logs":{const d=r[1]||{},u=yield q(()=>D(this.backfiller.getLogsBackfill(e,d,o,l),K),Y,()=>!e());m(e),me([...u,...c]).forEach(b=>this.emitLogsEvent(s,b));break}default:break}}finally{t.isBackfilling=!1,c.length=0}})}emitNewHeadsEvent(e,t){this.emitAndRememberEvent(e,t,A)}emitLogsEvent(e,t){this.emitAndRememberEvent(e,t,R)}emitAndRememberEvent(e,t,s){this.rememberEvent(e,t,s),this.emitEvent(e,t)}emitEvent(e,t){const s=this.virtualSubscriptionsById.get(e);s&&this.emitGenericEvent(s,t)}rememberEvent(e,t,s){const n=this.virtualSubscriptionsById.get(e);n&&M(n.sentEvents,Object.assign({},t),s)}emitGenericEvent(e,t){this.emitProcessFn(e.event)(t)}startHeartbeat(){this.heartbeatIntervalId==null&&(this.heartbeatIntervalId=setInterval(()=>f(this,void 0,void 0,function*(){try{yield D(this.send("net_version"),ke)}catch{this._websocket.reconnect()}}),ye))}sendBatchConcurrently(e){return f(this,void 0,void 0,function*(){return Promise.all(e.map(t=>this.send(t.method,t.params)))})}customStartEvent(e){if(e.type===U){const{fromAddress:t,toAddress:s,hashesOnly:n}=e;this._subscribe(e.tag,[I.PENDING_TRANSACTIONS,{fromAddress:t,toAddress:s,hashesOnly:n}],this.emitProcessFn(e),e)}else if(e.type===G){const{addresses:t,includeRemoved:s,hashesOnly:n}=e;this._subscribe(e.tag,[I.MINED_TRANSACTIONS,{addresses:t,includeRemoved:s,hashesOnly:n}],this.emitProcessFn(e),e)}else e.type==="block"?this._subscribe("block",["newHeads"],this.emitProcessFn(e),e):e.type==="filter"&&this._subscribe(e.tag,["logs",this._getFilter(e.filter)],this.emitProcessFn(e),e)}emitProcessFn(e){switch(e.type){case U:return t=>this.emit({method:I.PENDING_TRANSACTIONS,fromAddress:e.fromAddress,toAddress:e.toAddress,hashesOnly:e.hashesOnly},t);case G:return t=>this.emit({method:I.MINED_TRANSACTIONS,addresses:e.addresses,includeRemoved:e.includeRemoved,hashesOnly:e.hashesOnly},t);case"block":return t=>{const s=V.from(t.number).toNumber();this._emitted.block=s,this.emit("block",s)};case"filter":return t=>{t.removed==null&&(t.removed=!1),this.emit(e.filter,this.formatter.filterLog(t))};default:throw new Error("Invalid event type to `emitProcessFn()`")}}_off(e,t){if(t==null)return this.removeAllListeners(e);const s=[];let n=!1;const r=_(e);return this._events=this._events.filter(o=>o.tag!==r||o.listener!=t||n?!0:(n=!0,s.push(o),!1)),s.forEach(o=>{this._stopEvent(o)}),this}_removeAllListeners(e){let t=[];if(e==null)t=this._events,this._events=[];else{const s=_(e);this._events=this._events.filter(n=>n.tag!==s?!0:(t.push(n),!1))}return t.forEach(s=>{this._stopEvent(s)}),this}_listenerCount(e){if(!e)return this._events.length;const t=_(e);return this._events.filter(s=>s.tag===t).length}_listeners(e){if(e==null)return this._events.map(s=>s.listener);const t=_(e);return this._events.filter(s=>s.tag===t).map(s=>s.listener)}}function _e(){return we()?require("websocket").w3cwebsocket:WebSocket}function we(){return typeof process<"u"&&process!=null&&process.versions!=null&&process.versions.node!=null}function ve(){let i=!1;return{cancel:()=>i=!0,isCancelled:()=>i}}const Te=1e3,Ie=2,Ne=3e4;function q(i,e,t=()=>!0){return f(this,void 0,void 0,function*(){let s=0,n=0;for(;;)try{return yield i()}catch(r){if(n++,n>=e||!t(r)||(yield Se(s),!t(r)))throw r;s=s===0?Te:Math.min(Ne,Ie*s)}})}function Se(i){return new Promise(e=>setTimeout(e,i))}function D(i,e){return Promise.race([i,new Promise((t,s)=>setTimeout(()=>s(new Error("Timeout")),e))])}function A(i){return p(i.number)}function R(i){return p(i.blockNumber)}function Be(i){return Array.isArray(i)||i.jsonrpc==="2.0"&&i.id!==void 0}function Ae(i){return!Be(i)}function Re(i,e){M(i,e,A)}function Ce(i,e){M(i,e,R)}function M(i,e,t){const s=t(e),n=i.findIndex(r=>t(r)>s-Ee);n===-1?i.length=0:i.splice(0,n),i.push(e)}export{Pe as AlchemyWebSocketProvider};
