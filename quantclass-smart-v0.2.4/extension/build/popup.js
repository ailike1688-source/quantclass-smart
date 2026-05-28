(()=>{var An=Object.defineProperty;var vt=(e,t)=>()=>(e&&(t=e(e=0)),t);var Tn=(e,t)=>{for(var n in t)An(e,n,{get:t[n],enumerable:!0})};var de,Le,Fn,Ge,Pt,q,Je=vt(()=>{de={backendUrl:"http://127.0.0.1:8700",apiBasePath:"/api",defaultModel:"claude-4.6-sonnet",defaultProvider:"anthropic",showRawDownload:!1,llmApiKeys:{openai:"",claude:"",kimi:"",qwen:""}},Le={CONFIG:"quantclass_config",BOOKMARKS:"quantclass_bookmarks",SUMMARIES:"quantclass_summaries",CURRENT_SUMMARY:"quantclass_current_summary",LOCALE:"quantclass_locale"},Fn=[],Ge=[{id:"openai",name:"OpenAI",defaultBaseUrl:"https://api.openai.com/v1",models:["gpt-5","gpt-5.1","gpt-5.2","gpt-5.3","gpt-5.4","o1-preview","gpt-4o"]},{id:"anthropic",name:"Anthropic",defaultBaseUrl:"https://api.anthropic.com/v1",models:["claude-sonnet-4-6","claude-opus-4-6","claude-sonnet-4-6-thinking","claude-sonnet-4-5","claude-opus-4-5","claude-haiku-4-5"]},{id:"gemini",name:"Google Gemini",defaultBaseUrl:"https://generativelanguage.googleapis.com/v1beta/openai/",models:["gemini-3.1-pro-preview","gemini-3.1-flash"]},{id:"deepseek",name:"DeepSeek",defaultBaseUrl:"https://api.deepseek.com",models:["deepseek-chat","deepseek-reasoner"]},{id:"moonshot",name:"Kimi (\u6708\u4E4B\u6697\u9762)",defaultBaseUrl:"https://api.moonshot.cn/v1",models:["kimi-k2.5","kimi-k2"]},{id:"qwen",name:"Qwen (\u901A\u4E49\u5343\u95EE)",defaultBaseUrl:"https://dashscope.aliyuncs.com/compatible-mode/v1",models:["qwen3.6-plus","qwen3.5-plus","qwen3-max"]},{id:"glm",name:"GLM (\u667A\u8C31 AI)",defaultBaseUrl:"https://open.bigmodel.cn/api/paas/v4",models:["glm-5.1","glm-4.7","glm-4-flash"]},{id:"minimax",name:"MiniMax",defaultBaseUrl:"https://api.minimax.chat/v1",models:["minimax-m2.7","abab7-chat"]}],Pt=[...Fn,...Ge],q={GENERATE_SUMMARY:"GENERATE_SUMMARY",GET_SUMMARY:"GET_SUMMARY",SUMMARY_RESULT:"SUMMARY_RESULT",CREATE_BOOKMARK:"CREATE_BOOKMARK",GET_BOOKMARKS:"GET_BOOKMARKS",DELETE_BOOKMARK:"DELETE_BOOKMARK",SEARCH:"SEARCH",GET_CONFIG:"GET_CONFIG",UPDATE_CONFIG:"UPDATE_CONFIG",GET_HEALTH:"GET_HEALTH",POLISH_TEXT:"POLISH_TEXT",FORMAT_TEXT:"FORMAT_TEXT",CHECK_CODE:"CHECK_CODE",LIST_AGENTS:"LIST_AGENTS",AGENT_DISCUSS:"AGENT_DISCUSS",AGENT_CHAT_SINGLE:"AGENT_CHAT_SINGLE",EXTRACT_PDF:"EXTRACT_PDF",UPLOAD_PDF:"UPLOAD_PDF",CHAT:"CHAT",ADD_NOTE:"ADD_NOTE",GET_BOOKMARK_DETAIL:"GET_BOOKMARK_DETAIL",GET_CURRENT_PAGE:"GET_CURRENT_PAGE",SHOW_NOTIFICATION:"SHOW_NOTIFICATION",LIST_SKILLS:"LIST_SKILLS",GET_SKILL:"GET_SKILL",IMPORT_SKILLS:"IMPORT_SKILLS",RECORD_READING:"RECORD_READING",CREATE_CHAT_SESSION:"CREATE_CHAT_SESSION",CHAT_IN_SESSION:"CHAT_IN_SESSION",GET_CHAT_SESSIONS:"GET_CHAT_SESSIONS",DELETE_CHAT_SESSION:"DELETE_CHAT_SESSION",SEARCH_CONVERSATIONS:"SEARCH_CONVERSATIONS",GET_MEMORY_ITEMS:"GET_MEMORY_ITEMS",ADD_MEMORY_ITEM:"ADD_MEMORY_ITEM",DELETE_MEMORY_ITEM:"DELETE_MEMORY_ITEM",GET_USER_PROFILE:"GET_USER_PROFILE",EXTRACT_STRATEGY:"EXTRACT_STRATEGY",GET_MEMORY_STATS:"GET_MEMORY_STATS"}});async function yn(){let e=chrome.runtime.id||"default-dev-id",t=await crypto.subtle.importKey("raw",new TextEncoder().encode(e),{name:"PBKDF2"},!1,["deriveKey"]);return crypto.subtle.deriveKey({name:"PBKDF2",salt:zn,iterations:1e5,hash:"SHA-256"},t,{name:"AES-GCM",length:256},!1,["encrypt","decrypt"])}async function bn(e){if(!e)return"";let t=await yn(),n=crypto.getRandomValues(new Uint8Array(12)),s=new TextEncoder().encode(e),r=await crypto.subtle.encrypt({name:"AES-GCM",iv:n},t,s),a=new Uint8Array(n.byteLength+r.byteLength);return a.set(n,0),a.set(new Uint8Array(r),n.byteLength),btoa(String.fromCharCode(...a))}async function Rt(e){if(!e)return"";try{let t=await yn(),n=Uint8Array.from(atob(e),u=>u.charCodeAt(0)),s=n.slice(0,12),r=n.slice(12),a=await crypto.subtle.decrypt({name:"AES-GCM",iv:s},t,r);return new TextDecoder().decode(a)}catch(t){return console.warn("Decryption failed, returning empty string:",t.message),""}}var zn,vn=vt(()=>{zn=new TextEncoder().encode("quantclass-extension-v1-salt")});var Ot={};Tn(Ot,{apiKeyStorage:()=>_t,bookmarkStorage:()=>at,configStorage:()=>Pe,storage:()=>ke,summaryStorage:()=>jn});var ke,Pe,jn,at,_t,je=vt(()=>{vn();Je();ke={async get(e,t=null){try{let n=await chrome.storage.local.get(e);return n[e]!==void 0?n[e]:t}catch(n){return console.error("Storage get error:",n),t}},async set(e,t){try{return await chrome.storage.local.set({[e]:t}),!0}catch(n){return console.error("Storage set error:",n),!1}},async remove(e){try{return await chrome.storage.local.remove(e),!0}catch(t){return console.error("Storage remove error:",t),!1}},async clear(){try{return await chrome.storage.local.clear(),!0}catch(e){return console.error("Storage clear error:",e),!1}}},Pe={async get(){return await ke.get(Le.CONFIG,null)},async set(e){return await ke.set(Le.CONFIG,e)}},jn={async get(e){return(await ke.get(Le.SUMMARIES,{}))[e]||null},async set(e,t){let n=await ke.get(Le.SUMMARIES,{});return n[e]=t,await ke.set(Le.SUMMARIES,n)},async getAll(){return await ke.get(Le.SUMMARIES,{})}},at={async getAll(){return await ke.get(Le.BOOKMARKS,[])},async add(e){let t=await this.getAll();return e.id=Date.now().toString(),e.createdAt=new Date().toISOString(),t.unshift(e),await ke.set(Le.BOOKMARKS,t)},async update(e,t){let n=await this.getAll(),s=n.findIndex(r=>r.id===e);return s!==-1?(n[s]={...n[s],...t,updatedAt:new Date().toISOString()},await ke.set(Le.BOOKMARKS,n)):!1},async delete(e){let n=(await this.getAll()).filter(s=>s.id!==e);return await ke.set(Le.BOOKMARKS,n)},async search(e){let t=await this.getAll(),n=e.toLowerCase();return t.filter(s=>s.title&&s.title.toLowerCase().includes(n)||s.summary&&s.summary.toLowerCase().includes(n)||s.tags&&s.tags.some(r=>r.toLowerCase().includes(n)))}},_t={async set(e,t){if(!t)return ke.remove(`quantclass_apikey_${e}`);let n=await bn(t);return ke.set(`quantclass_apikey_${e}`,n)},async get(e){let t=await ke.get(`quantclass_apikey_${e}`,"");return t?Rt(t):""},async getAll(){let e="quantclass_apikey_";try{let t=await chrome.storage.local.get(null),n={};for(let[s,r]of Object.entries(t)){if(!s.startsWith(e))continue;let a=s.slice(e.length);if(!r){n[a]="";continue}try{n[a]=await Rt(r)}catch(u){console.warn(`Failed to decrypt api key for ${a}:`,u),n[a]=""}}return n}catch(t){return console.error("apiKeyStorage.getAll error:",t),{}}},async remove(e){return ke.remove(`quantclass_apikey_${e}`)}}});var pt,J,qt,Cn,Ne,Kt,Gt,zt,jt,St,kt,$t,En,ct={},dt=[],Mn=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,gt=Array.isArray;function Oe(e,t){for(var n in t)e[n]=t[n];return e}function xt(e){e&&e.parentNode&&e.parentNode.removeChild(e)}function At(e,t,n){var s,r,a,u={};for(a in t)a=="key"?s=t[a]:a=="ref"?r=t[a]:u[a]=t[a];if(arguments.length>2&&(u.children=arguments.length>3?pt.call(arguments,2):n),typeof e=="function"&&e.defaultProps!=null)for(a in e.defaultProps)u[a]===void 0&&(u[a]=e.defaultProps[a]);return lt(e,u,s,r,null)}function lt(e,t,n,s,r){var a={type:e,props:t,key:n,ref:s,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:r??++qt,__i:-1,__u:0};return r==null&&J.vnode!=null&&J.vnode(a),a}function mt(e){return e.children}function tt(e,t){this.props=e,this.context=t}function Xe(e,t){if(t==null)return e.__?Xe(e.__,e.__i+1):null;for(var n;t<e.__k.length;t++)if((n=e.__k[t])!=null&&n.__e!=null)return n.__e;return typeof e.type=="function"?Xe(e):null}function Ln(e){if(e.__P&&e.__d){var t=e.__v,n=t.__e,s=[],r=[],a=Oe({},t);a.__v=t.__v+1,J.vnode&&J.vnode(a),Tt(e.__P,a,t,e.__n,e.__P.namespaceURI,32&t.__u?[n]:null,s,n??Xe(t),!!(32&t.__u),r),a.__v=t.__v,a.__.__k[a.__i]=a,Qt(s,a,r),t.__e=t.__=null,a.__e!=n&&Wt(a)}}function Wt(e){if((e=e.__)!=null&&e.__c!=null)return e.__e=e.__c.base=null,e.__k.some(function(t){if(t!=null&&t.__e!=null)return e.__e=e.__c.base=t.__e}),Wt(e)}function Ft(e){(!e.__d&&(e.__d=!0)&&Ne.push(e)&&!ut.__r++||Kt!=J.debounceRendering)&&((Kt=J.debounceRendering)||Gt)(ut)}function ut(){try{for(var e,t=1;Ne.length;)Ne.length>t&&Ne.sort(zt),e=Ne.shift(),t=Ne.length,Ln(e)}finally{Ne.length=ut.__r=0}}function Yt(e,t,n,s,r,a,u,h,f,d,v){var p,_,w,H,z,P,D,U=s&&s.__k||dt,V=t.length;for(f=In(n,t,U,f,V),p=0;p<V;p++)(w=n.__k[p])!=null&&(_=w.__i!=-1&&U[w.__i]||ct,w.__i=p,P=Tt(e,w,_,r,a,u,h,f,d,v),H=w.__e,w.ref&&_.ref!=w.ref&&(_.ref&&Ct(_.ref,null,w),v.push(w.ref,w.__c||H,w)),z==null&&H!=null&&(z=H),(D=!!(4&w.__u))||_.__k===w.__k?f=Vt(w,f,e,D):typeof w.type=="function"&&P!==void 0?f=P:H&&(f=H.nextSibling),w.__u&=-7);return n.__e=z,f}function In(e,t,n,s,r){var a,u,h,f,d,v=n.length,p=v,_=0;for(e.__k=new Array(r),a=0;a<r;a++)(u=t[a])!=null&&typeof u!="boolean"&&typeof u!="function"?(typeof u=="string"||typeof u=="number"||typeof u=="bigint"||u.constructor==String?u=e.__k[a]=lt(null,u,null,null,null):gt(u)?u=e.__k[a]=lt(mt,{children:u},null,null,null):u.constructor===void 0&&u.__b>0?u=e.__k[a]=lt(u.type,u.props,u.key,u.ref?u.ref:null,u.__v):e.__k[a]=u,f=a+_,u.__=e,u.__b=e.__b+1,h=null,(d=u.__i=Pn(u,n,f,p))!=-1&&(p--,(h=n[d])&&(h.__u|=2)),h==null||h.__v==null?(d==-1&&(r>v?_--:r<v&&_++),typeof u.type!="function"&&(u.__u|=4)):d!=f&&(d==f-1?_--:d==f+1?_++:(d>f?_--:_++,u.__u|=4))):e.__k[a]=null;if(p)for(a=0;a<v;a++)(h=n[a])!=null&&!(2&h.__u)&&(h.__e==s&&(s=Xe(h)),Jt(h,h));return s}function Vt(e,t,n,s){var r,a;if(typeof e.type=="function"){for(r=e.__k,a=0;r&&a<r.length;a++)r[a]&&(r[a].__=e,t=Vt(r[a],t,n,s));return t}e.__e!=t&&(s&&(t&&e.type&&!t.parentNode&&(t=Xe(e)),n.insertBefore(e.__e,t||null)),t=e.__e);do t=t&&t.nextSibling;while(t!=null&&t.nodeType==8);return t}function Pn(e,t,n,s){var r,a,u,h=e.key,f=e.type,d=t[n],v=d!=null&&(2&d.__u)==0;if(d===null&&h==null||v&&h==d.key&&f==d.type)return n;if(s>(v?1:0)){for(r=n-1,a=n+1;r>=0||a<t.length;)if((d=t[u=r>=0?r--:a++])!=null&&!(2&d.__u)&&h==d.key&&f==d.type)return u}return-1}function Nt(e,t,n){t[0]=="-"?e.setProperty(t,n??""):e[t]=n==null?"":typeof n!="number"||Mn.test(t)?n:n+"px"}function rt(e,t,n,s,r){var a,u;e:if(t=="style")if(typeof n=="string")e.style.cssText=n;else{if(typeof s=="string"&&(e.style.cssText=s=""),s)for(t in s)n&&t in n||Nt(e.style,t,"");if(n)for(t in n)s&&n[t]==s[t]||Nt(e.style,t,n[t])}else if(t[0]=="o"&&t[1]=="n")a=t!=(t=t.replace(jt,"$1")),u=t.toLowerCase(),t=u in e||t=="onFocusOut"||t=="onFocusIn"?u.slice(2):t.slice(2),e.l||(e.l={}),e.l[t+a]=n,n?s?n.u=s.u:(n.u=St,e.addEventListener(t,a?$t:kt,a)):e.removeEventListener(t,a?$t:kt,a);else{if(r=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in e)try{e[t]=n??"";break e}catch{}typeof n=="function"||(n==null||n===!1&&t[4]!="-"?e.removeAttribute(t):e.setAttribute(t,t=="popover"&&n==1?"":n))}}function Bt(e){return function(t){if(this.l){var n=this.l[t.type+e];if(t.t==null)t.t=St++;else if(t.t<n.u)return;return n(J.event?J.event(t):t)}}}function Tt(e,t,n,s,r,a,u,h,f,d){var v,p,_,w,H,z,P,D,U,V,Y,re,ae,le,te,j=t.type;if(t.constructor!==void 0)return null;128&n.__u&&(f=!!(32&n.__u),a=[h=t.__e=n.__e]),(v=J.__b)&&v(t);e:if(typeof j=="function")try{if(D=t.props,U=j.prototype&&j.prototype.render,V=(v=j.contextType)&&s[v.__c],Y=v?V?V.props.value:v.__:s,n.__c?P=(p=t.__c=n.__c).__=p.__E:(U?t.__c=p=new j(D,Y):(t.__c=p=new tt(D,Y),p.constructor=j,p.render=Un),V&&V.sub(p),p.state||(p.state={}),p.__n=s,_=p.__d=!0,p.__h=[],p._sb=[]),U&&p.__s==null&&(p.__s=p.state),U&&j.getDerivedStateFromProps!=null&&(p.__s==p.state&&(p.__s=Oe({},p.__s)),Oe(p.__s,j.getDerivedStateFromProps(D,p.__s))),w=p.props,H=p.state,p.__v=t,_)U&&j.getDerivedStateFromProps==null&&p.componentWillMount!=null&&p.componentWillMount(),U&&p.componentDidMount!=null&&p.__h.push(p.componentDidMount);else{if(U&&j.getDerivedStateFromProps==null&&D!==w&&p.componentWillReceiveProps!=null&&p.componentWillReceiveProps(D,Y),t.__v==n.__v||!p.__e&&p.shouldComponentUpdate!=null&&p.shouldComponentUpdate(D,p.__s,Y)===!1){t.__v!=n.__v&&(p.props=D,p.state=p.__s,p.__d=!1),t.__e=n.__e,t.__k=n.__k,t.__k.some(function(ue){ue&&(ue.__=t)}),dt.push.apply(p.__h,p._sb),p._sb=[],p.__h.length&&u.push(p);break e}p.componentWillUpdate!=null&&p.componentWillUpdate(D,p.__s,Y),U&&p.componentDidUpdate!=null&&p.__h.push(function(){p.componentDidUpdate(w,H,z)})}if(p.context=Y,p.props=D,p.__P=e,p.__e=!1,re=J.__r,ae=0,U)p.state=p.__s,p.__d=!1,re&&re(t),v=p.render(p.props,p.state,p.context),dt.push.apply(p.__h,p._sb),p._sb=[];else do p.__d=!1,re&&re(t),v=p.render(p.props,p.state,p.context),p.state=p.__s;while(p.__d&&++ae<25);p.state=p.__s,p.getChildContext!=null&&(s=Oe(Oe({},s),p.getChildContext())),U&&!_&&p.getSnapshotBeforeUpdate!=null&&(z=p.getSnapshotBeforeUpdate(w,H)),le=v!=null&&v.type===mt&&v.key==null?Xt(v.props.children):v,h=Yt(e,gt(le)?le:[le],t,n,s,r,a,u,h,f,d),p.base=t.__e,t.__u&=-161,p.__h.length&&u.push(p),P&&(p.__E=p.__=null)}catch(ue){if(t.__v=null,f||a!=null)if(ue.then){for(t.__u|=f?160:128;h&&h.nodeType==8&&h.nextSibling;)h=h.nextSibling;a[a.indexOf(h)]=null,t.__e=h}else{for(te=a.length;te--;)xt(a[te]);wt(t)}else t.__e=n.__e,t.__k=n.__k,ue.then||wt(t);J.__e(ue,t,n)}else a==null&&t.__v==n.__v?(t.__k=n.__k,t.__e=n.__e):h=t.__e=Dn(n.__e,t,n,s,r,a,u,f,d);return(v=J.diffed)&&v(t),128&t.__u?void 0:h}function wt(e){e&&(e.__c&&(e.__c.__e=!0),e.__k&&e.__k.some(wt))}function Qt(e,t,n){for(var s=0;s<n.length;s++)Ct(n[s],n[++s],n[++s]);J.__c&&J.__c(t,e),e.some(function(r){try{e=r.__h,r.__h=[],e.some(function(a){a.call(r)})}catch(a){J.__e(a,r.__v)}})}function Xt(e){return typeof e!="object"||e==null||e.__b>0?e:gt(e)?e.map(Xt):Oe({},e)}function Dn(e,t,n,s,r,a,u,h,f){var d,v,p,_,w,H,z,P=n.props||ct,D=t.props,U=t.type;if(U=="svg"?r="http://www.w3.org/2000/svg":U=="math"?r="http://www.w3.org/1998/Math/MathML":r||(r="http://www.w3.org/1999/xhtml"),a!=null){for(d=0;d<a.length;d++)if((w=a[d])&&"setAttribute"in w==!!U&&(U?w.localName==U:w.nodeType==3)){e=w,a[d]=null;break}}if(e==null){if(U==null)return document.createTextNode(D);e=document.createElementNS(r,U,D.is&&D),h&&(J.__m&&J.__m(t,a),h=!1),a=null}if(U==null)P===D||h&&e.data==D||(e.data=D);else{if(a=a&&pt.call(e.childNodes),!h&&a!=null)for(P={},d=0;d<e.attributes.length;d++)P[(w=e.attributes[d]).name]=w.value;for(d in P)w=P[d],d=="dangerouslySetInnerHTML"?p=w:d=="children"||d in D||d=="value"&&"defaultValue"in D||d=="checked"&&"defaultChecked"in D||rt(e,d,null,w,r);for(d in D)w=D[d],d=="children"?_=w:d=="dangerouslySetInnerHTML"?v=w:d=="value"?H=w:d=="checked"?z=w:h&&typeof w!="function"||P[d]===w||rt(e,d,w,P[d],r);if(v)h||p&&(v.__html==p.__html||v.__html==e.innerHTML)||(e.innerHTML=v.__html),t.__k=[];else if(p&&(e.innerHTML=""),Yt(t.type=="template"?e.content:e,gt(_)?_:[_],t,n,s,U=="foreignObject"?"http://www.w3.org/1999/xhtml":r,a,u,a?a[0]:n.__k&&Xe(n,0),h,f),a!=null)for(d=a.length;d--;)xt(a[d]);h||(d="value",U=="progress"&&H==null?e.removeAttribute("value"):H!=null&&(H!==e[d]||U=="progress"&&!H||U=="option"&&H!=P[d])&&rt(e,d,H,P[d],r),d="checked",z!=null&&z!=e[d]&&rt(e,d,z,P[d],r))}return e}function Ct(e,t,n){try{if(typeof e=="function"){var s=typeof e.__u=="function";s&&e.__u(),s&&t==null||(e.__u=e(t))}else e.current=t}catch(r){J.__e(r,n)}}function Jt(e,t,n){var s,r;if(J.unmount&&J.unmount(e),(s=e.ref)&&(s.current&&s.current!=e.__e||Ct(s,null,t)),(s=e.__c)!=null){if(s.componentWillUnmount)try{s.componentWillUnmount()}catch(a){J.__e(a,t)}s.base=s.__P=null}if(s=e.__k)for(r=0;r<s.length;r++)s[r]&&Jt(s[r],t,n||typeof e.type!="function");n||xt(e.__e),e.__c=e.__=e.__e=void 0}function Un(e,t,n){return this.constructor(e,n)}function Et(e,t,n){var s,r,a,u;t==document&&(t=document.documentElement),J.__&&J.__(e,t),r=(s=typeof n=="function")?null:n&&n.__k||t.__k,a=[],u=[],Tt(t,e=(!s&&n||t).__k=At(mt,null,[e]),r||ct,ct,t.namespaceURI,!s&&n?[n]:r?null:t.firstChild?pt.call(t.childNodes):null,a,!s&&n?n:r?r.__e:t.firstChild,s,u),Qt(a,e,u)}pt=dt.slice,J={__e:function(e,t,n,s){for(var r,a,u;t=t.__;)if((r=t.__c)&&!r.__)try{if((a=r.constructor)&&a.getDerivedStateFromError!=null&&(r.setState(a.getDerivedStateFromError(e)),u=r.__d),r.componentDidCatch!=null&&(r.componentDidCatch(e,s||{}),u=r.__d),u)return r.__E=r}catch(h){e=h}throw e}},qt=0,Cn=function(e){return e!=null&&e.constructor===void 0},tt.prototype.setState=function(e,t){var n;n=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=Oe({},this.state),typeof e=="function"&&(e=e(Oe({},n),this.props)),e&&Oe(n,e),e!=null&&this.__v&&(t&&this._sb.push(t),Ft(this))},tt.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),Ft(this))},tt.prototype.render=mt,Ne=[],Gt=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,zt=function(e,t){return e.__v.__b-t.__v.__b},ut.__r=0,jt=/(PointerCapture)$|Capture$/i,St=0,kt=Bt(!1),$t=Bt(!0),En=0;var nt,ne,Mt,Zt,ft=0,ln=[],oe=J,en=oe.__b,tn=oe.__r,nn=oe.diffed,an=oe.__c,sn=oe.unmount,on=oe.__;function It(e,t){oe.__h&&oe.__h(ne,e,ft||t),ft=0;var n=ne.__H||(ne.__H={__:[],__h:[]});return e>=n.__.length&&n.__.push({}),n.__[e]}function $(e){return ft=1,Rn(dn,e)}function Rn(e,t,n){var s=It(nt++,2);if(s.t=e,!s.__c&&(s.__=[n?n(t):dn(void 0,t),function(h){var f=s.__N?s.__N[0]:s.__[0],d=s.t(f,h);f!==d&&(s.__N=[d,s.__[1]],s.__c.setState({}))}],s.__c=ne,!ne.__f)){var r=function(h,f,d){if(!s.__c.__H)return!0;var v=s.__c.__H.__.filter(function(_){return _.__c});if(v.every(function(_){return!_.__N}))return!a||a.call(this,h,f,d);var p=s.__c.props!==h;return v.some(function(_){if(_.__N){var w=_.__[0];_.__=_.__N,_.__N=void 0,w!==_.__[0]&&(p=!0)}}),a&&a.call(this,h,f,d)||p};ne.__f=!0;var a=ne.shouldComponentUpdate,u=ne.componentWillUpdate;ne.componentWillUpdate=function(h,f,d){if(this.__e){var v=a;a=void 0,r(h,f,d),a=v}u&&u.call(this,h,f,d)},ne.shouldComponentUpdate=r}return s.__N||s.__}function ie(e,t){var n=It(nt++,3);!oe.__s&&cn(n.__H,t)&&(n.__=e,n.u=t,ne.__H.__h.push(n))}function ve(e){return ft=5,On(function(){return{current:e}},[])}function On(e,t){var n=It(nt++,7);return cn(n.__H,t)&&(n.__=e(),n.__H=t,n.__h=e),n.__}function Hn(){for(var e;e=ln.shift();){var t=e.__H;if(e.__P&&t)try{t.__h.some(ht),t.__h.some(Lt),t.__h=[]}catch(n){t.__h=[],oe.__e(n,e.__v)}}}oe.__b=function(e){ne=null,en&&en(e)},oe.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),on&&on(e,t)},oe.__r=function(e){tn&&tn(e),nt=0;var t=(ne=e.__c).__H;t&&(Mt===ne?(t.__h=[],ne.__h=[],t.__.some(function(n){n.__N&&(n.__=n.__N),n.u=n.__N=void 0})):(t.__h.some(ht),t.__h.some(Lt),t.__h=[],nt=0)),Mt=ne},oe.diffed=function(e){nn&&nn(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&(ln.push(t)!==1&&Zt===oe.requestAnimationFrame||((Zt=oe.requestAnimationFrame)||Kn)(Hn)),t.__H.__.some(function(n){n.u&&(n.__H=n.u),n.u=void 0})),Mt=ne=null},oe.__c=function(e,t){t.some(function(n){try{n.__h.some(ht),n.__h=n.__h.filter(function(s){return!s.__||Lt(s)})}catch(s){t.some(function(r){r.__h&&(r.__h=[])}),t=[],oe.__e(s,n.__v)}}),an&&an(e,t)},oe.unmount=function(e){sn&&sn(e);var t,n=e.__c;n&&n.__H&&(n.__H.__.some(function(s){try{ht(s)}catch(r){t=r}}),n.__H=void 0,t&&oe.__e(t,n.__v))};var rn=typeof requestAnimationFrame=="function";function Kn(e){var t,n=function(){clearTimeout(s),rn&&cancelAnimationFrame(t),setTimeout(e)},s=setTimeout(n,35);rn&&(t=requestAnimationFrame(n))}function ht(e){var t=ne,n=e.__c;typeof n=="function"&&(e.__c=void 0,n()),ne=t}function Lt(e){var t=ne;e.__c=e.__(),ne=t}function cn(e,t){return!e||e.length!==t.length||t.some(function(n,s){return n!==e[s]})}function dn(e,t){return typeof t=="function"?t(e):t}var pn=function(e,t,n,s){var r;t[0]=0;for(var a=1;a<t.length;a++){var u=t[a++],h=t[a]?(t[0]|=u?1:2,n[t[a++]]):t[++a];u===3?s[0]=h:u===4?s[1]=Object.assign(s[1]||{},h):u===5?(s[1]=s[1]||{})[t[++a]]=h:u===6?s[1][t[++a]]+=h+"":u?(r=e.apply(h,pn(e,h,n,["",null])),s.push(r),h[0]?t[0]|=2:(t[a-2]=0,t[a]=r)):s.push(h)}return s},un=new Map;function gn(e){var t=un.get(this);return t||(t=new Map,un.set(this,t)),(t=pn(this,t.get(e)||(t.set(e,t=function(n){for(var s,r,a=1,u="",h="",f=[0],d=function(_){a===1&&(_||(u=u.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?f.push(0,_,u):a===3&&(_||u)?(f.push(3,_,u),a=2):a===2&&u==="..."&&_?f.push(4,_,0):a===2&&u&&!_?f.push(5,0,!0,u):a>=5&&((u||!_&&a===5)&&(f.push(a,0,u,r),a=6),_&&(f.push(a,_,0,r),a=6)),u=""},v=0;v<n.length;v++){v&&(a===1&&d(),d(v));for(var p=0;p<n[v].length;p++)s=n[v][p],a===1?s==="<"?(d(),f=[f],a=3):u+=s:a===4?u==="--"&&s===">"?(a=1,u=""):u=s+u[0]:h?s===h?h="":u+=s:s==='"'||s==="'"?h=s:s===">"?(d(),a=1):a&&(s==="="?(a=5,r=u,u=""):s==="/"&&(a<5||n[v][p+1]===">")?(d(),a===3&&(f=f[0]),a=f,(f=f[0]).push(2,0,a),a=0):s===" "||s==="	"||s===`
`||s==="\r"?(d(),a=2):u+=s),a===3&&u==="!--"&&(a=4,f=f[0])}return d(),f}(e)),t),arguments,[])).length>1?t:t[0]}var m=gn.bind(At);function mn({tabs:e,activeTab:t,onChange:n}){function s(r,a){let u=a;if(r.key==="ArrowRight")u=(a+1)%e.length;else if(r.key==="ArrowLeft")u=(a-1+e.length)%e.length;else return;r.preventDefault(),n(e[u].id),r.target.parentElement.children[u]?.focus()}return m`
    <nav class="tabs" role="tablist">
      ${e.map((r,a)=>m`
        <button
          key=${r.id}
          role="tab"
          aria-selected=${t===r.id}
          tabindex=${t===r.id?0:-1}
          class="tab ${t===r.id?"active":""}"
          onClick=${()=>n(r.id)}
          onKeyDown=${u=>s(u,a)}
        >
          <span class="tab-icon">${r.icon}</span>
          <span class="tab-label">${r.label}</span>
        </button>
      `)}
    </nav>
  `}Je();var Dt={zh:{"tab.summary":"\u6458\u8981","tab.knowledge":"\u77E5\u8BC6\u5E93","tab.chat":"\u804A\u5929","tab.settings":"\u8BBE\u7F6E","common.popOut":"\u5F39\u51FA\u72EC\u7ACB\u7A97\u53E3\uFF08\u53EF\u81EA\u7531\u62D6\u62FD\u5927\u5C0F\uFF09","common.loading":"\u52A0\u8F7D\u4E2D...","common.save":"\u4FDD\u5B58","common.cancel":"\u53D6\u6D88","common.delete":"\u5220\u9664","common.open":"\u6253\u5F00","common.reset":"\u91CD\u7F6E","common.refresh":"\u91CD\u65B0\u751F\u6210","summary.notTopicPage":"\u5F53\u524D\u9875\u9762\u4E0D\u662F\u5E16\u5B50\u8BE6\u60C5\u9875","summary.notTopicHint":"\u6253\u5F00\u8BBA\u575B\u5E16\u5B50\u5373\u53EF\u67E5\u770B AI \u6458\u8981","summary.regenerate":"\u91CD\u65B0\u751F\u6210","summary.generating":"\u6B63\u5728\u751F\u6210\u6458\u8981...","summary.empty":"\u6682\u65E0\u6458\u8981","summary.generate":"\u751F\u6210\u6458\u8981","knowledge.searchPlaceholder":"\u641C\u7D22\u6536\u85CF...","knowledge.confirmDelete":"\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u6536\u85CF\u5417\uFF1F","knowledge.noMatch":"\u6CA1\u6709\u5339\u914D\u7684\u6536\u85CF","knowledge.empty":"\u77E5\u8BC6\u5E93\u4E3A\u7A7A","knowledge.emptyHint":"\u5728\u5E16\u5B50\u9875\u9762\u70B9\u51FB\u6536\u85CF\u6309\u94AE\u6DFB\u52A0","knowledge.sortLabel":"\u6392\u5E8F","knowledge.sortCreatedDesc":"\u6700\u65B0\u6536\u85CF","knowledge.sortCreatedAsc":"\u6700\u65E9\u6536\u85CF","knowledge.sortUpdatedDesc":"\u6700\u8FD1\u66F4\u65B0","knowledge.sortTitleAsc":"\u6807\u9898 A\u2192Z","knowledge.sortTitleDesc":"\u6807\u9898 Z\u2192A","knowledge.loadMore":"\u52A0\u8F7D\u66F4\u591A","knowledge.loadingMore":"\u52A0\u8F7D\u4E2D...","knowledge.loadedAll":"\u5DF2\u5168\u90E8\u52A0\u8F7D ({total})","knowledge.countLabel":"\u5171 {total} \u6761","knowledge.refresh":"\u5237\u65B0","knowledge.refreshing":"\u5237\u65B0\u4E2D","knowledge.refreshed":"\u2713 \u5DF2\u5237\u65B0\uFF0C\u5171 {total} \u6761","knowledge.backendUnreachable":"\u540E\u7AEF\u4E0D\u53EF\u8FBE","knowledge.loadFallbackWarning":"\u26A0\uFE0F \u540E\u7AEF\u52A0\u8F7D\u5931\u8D25\uFF0C\u663E\u793A\u7684\u662F\u672C\u5730\u7F13\u5B58\uFF1A{error}","knowledge.loadMoreFailed":"\u2717 \u52A0\u8F7D\u66F4\u591A\u5931\u8D25\uFF1A{error}","knowledge.tagEdit":"\u7BA1\u7406\u6807\u7B7E","knowledge.tagDone":"\u5B8C\u6210","knowledge.tagAddPlaceholder":"\u8F93\u5165\u65B0\u6807\u7B7E...","knowledge.deleteSuccess":"\u2713 \u5DF2\u5220\u9664","knowledge.deleteBackendFailed":"\u26A0\uFE0F \u672C\u5730\u5DF2\u5220\u9664\uFF0C\u4F46\u540E\u7AEF\u540C\u6B65\u5931\u8D25\uFF1A{error}","knowledge.openLink":"\u6253\u5F00\u94FE\u63A5","knowledge.copyPath":"\u590D\u5236\u8DEF\u5F84","knowledge.openOriginal":"\u6253\u5F00\u539F\u6587","knowledge.summaryLabel":"\u{1F4DD} AI \u6458\u8981","knowledge.notesLabel":"\u{1F4C4} \u4FDD\u5B58\u7684\u539F\u6587","search.placeholder":"\u641C\u7D22\u77E5\u8BC6\u5E93...","search.searching":"\u641C\u7D22\u4E2D...","search.button":"\u641C\u7D22","search.history":"\u641C\u7D22\u5386\u53F2","search.clearHistory":"\u6E05\u9664","search.noResults":"\u672A\u627E\u5230\u76F8\u5173\u7ED3\u679C","search.resultCount":"\u627E\u5230 {count} \u4E2A\u7ED3\u679C","search.relevance":"\u76F8\u5173\u5EA6: {score}%","search.errorGeneric":"\u641C\u7D22\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5","search.errorPrefix":"\u641C\u7D22\u5931\u8D25\uFF1A","settings.saved":"\u2713 \u8BBE\u7F6E\u5DF2\u4FDD\u5B58","settings.savedLocalOnly":"\u26A0\uFE0F \u672C\u5730\u5DF2\u4FDD\u5B58\uFF0C\u4F46\u540E\u7AEF\u540C\u6B65\u5931\u8D25\uFF1A{error}","settings.saveFailed":"\u2717 \u4FDD\u5B58\u5931\u8D25\uFF1A{error}","settings.testNoResponse":"\u540E\u7AEF\u65E0\u54CD\u5E94","settings.language":"\u8BED\u8A00 / Language","settings.fontSize":"\u5B57\u4F53\u5927\u5C0F","settings.fontSizeHint":"\u8C03\u8282\u804A\u5929\u548C Agent \u5BF9\u8BDD\u533A\u57DF\u7684\u5B57\u4F53\u5927\u5C0F","settings.backend":"\u540E\u7AEF\u670D\u52A1","settings.backendUrl":"\u540E\u7AEF\u5730\u5740","settings.backendHint":"QuantClass \u540E\u7AEF\u670D\u52A1\u5730\u5740","settings.testConnection":"\u6D4B\u8BD5\u8FDE\u63A5","settings.testing":"\u6D4B\u8BD5\u4E2D...","settings.testOk":"\u8FDE\u63A5\u6B63\u5E38 ({model})","settings.testFail":"\u8FDE\u63A5\u5931\u8D25\uFF1A{error}","settings.agentManage":"Agent \u7BA1\u7406","settings.agentHint":"\u7BA1\u7406 AI \u8BA8\u8BBA\u89D2\u8272\uFF0C\u6BCF\u4E2A Agent \u6709\u72EC\u7ACB\u7684 .md \u6587\u4EF6\u5B58\u4E8E\u672C\u5730","settings.agentSkill":"\u5173\u8054\u89C6\u89D2\uFF08\u53EF\u9009\uFF09","settings.agentNoSkill":"\u4E0D\u5173\u8054","settings.agentSkillHint":"\u5173\u8054\u540E\uFF0CAgent \u4F1A\u4EE5\u8BE5\u4EBA\u7269\u7684\u601D\u7EF4\u6846\u67B6\u56DE\u7B54","settings.skillManage":"\u89C6\u89D2 / Skill \u7BA1\u7406","settings.skillHint":"\u540D\u4EBA\u601D\u7EF4\u6846\u67B6 \u2014 \u8BA9 AI \u4EE5\u4E0D\u540C\u89C6\u89D2\u5206\u6790\u95EE\u9898","settings.skillInstalled":"\u4E2A\u89C6\u89D2\u5DF2\u5B89\u88C5","settings.skillEmpty":"\u6682\u65E0\u89C6\u89D2\uFF08\u542F\u52A8\u540E\u7AEF\u540E\u81EA\u52A8\u5B89\u88C5 14 \u4E2A\u5185\u7F6E\u89C6\u89D2\uFF09","settings.skillImport":"\u5BFC\u5165\u89C6\u89D2\u5E93","settings.skillImportPrompt":"\u8BF7\u8F93\u5165 people-skill \u76EE\u5F55\u8DEF\u5F84","settings.skillImported":"\u5BFC\u5165\u6210\u529F","settings.skillEnabled":"\u542F\u7528","settings.skillDisabled":"\u7981\u7528","settings.agentAdd":"\u6DFB\u52A0\u81EA\u5B9A\u4E49 Agent","settings.agentNamePrompt":"\u8F93\u5165 Agent \u540D\u79F0\uFF08\u5982\uFF1A\u4EA7\u54C1\u7ECF\u7406\uFF09","settings.agentIconPrompt":"\u8F93\u5165 Emoji \u56FE\u6807","settings.agentDescPrompt":"\u8F93\u5165\u4E00\u53E5\u8BDD\u63CF\u8FF0","settings.agentPromptPrompt":"\u8F93\u5165 Agent \u7684\u89D2\u8272\u8BBE\u5B9A\uFF08System Prompt\uFF09","settings.agentCreated":"\u2713 Agent \u5DF2\u521B\u5EFA","settings.storagePath":"\u77E5\u8BC6\u5E93\u5B58\u50A8","settings.storagePathLabel":"\u5B58\u50A8\u8DEF\u5F84","settings.storagePathHint":"MD \u6587\u4EF6\u4FDD\u5B58\u5728\u6B64\u76EE\u5F55\u4E0B\u7684 knowledge/ \u5B50\u6587\u4EF6\u5939\uFF08macOS/Linux: ~/.quantclass/data\uFF0CWindows: C:\\Users\\\u4F60\u7684\u7528\u6237\u540D\\.quantclass\\data\uFF09","settings.defaultModel":"\u9ED8\u8BA4\u6A21\u578B","settings.selectModel":"\u9009\u62E9\u6A21\u578B","settings.customModelLabel":"\u6216\u8F93\u5165\u81EA\u5B9A\u4E49\u6A21\u578B\u540D","settings.customModelPlaceholder":"\u5982 deepseek-chat, llama-3.1-70b...","settings.customModelApply":"\u5E94\u7528","settings.customModelHint":"\u8F93\u5165\u540E\u70B9\u5E94\u7528\u6216\u6309 Enter\uFF0C\u6A21\u578B\u540D\u5C06\u7528\u4E8E\u4E0B\u6B21 LLM \u8C03\u7528","settings.apiKeys":"LLM \u670D\u52A1\u5546","settings.apiKeysHint":"\u914D\u7F6E LLM \u670D\u52A1\u7684 Base URL \u4E0E API Key\uFF08Key \u52A0\u5BC6\u5B58\u50A8\u5728\u672C\u5730\uFF0CBase URL \u540C\u6B65\u5230\u540E\u7AEF\uFF09","settings.apiKeyLabel":"API Key","settings.apiKeyPlaceholder":"\u8F93\u5165 {provider} API Key","settings.apiKeyConfigured":"\u2713 \u5DF2\u914D\u7F6E\uFF08\u8F93\u5165\u65B0\u503C\u5C06\u8986\u76D6\uFF09","settings.customAdd":"\u6DFB\u52A0\u81EA\u5B9A\u4E49 LLM","settings.customCancel":"\u53D6\u6D88","settings.customName":"\u540D\u79F0","settings.customModels":"\u6A21\u578B\u540D\uFF08\u9017\u53F7\u5206\u9694\uFF09","settings.customConfirm":"\u786E\u8BA4\u6DFB\u52A0","settings.customAdded":"\u2713 \u81EA\u5B9A\u4E49 LLM \u5DF2\u6DFB\u52A0","settings.customDeleted":"\u2713 \u5DF2\u5220\u9664","settings.apiBaseUrlLabel":"Base URL","settings.apiBaseUrlPlaceholder":"\u4F8B\u5982 {url}\uFF08\u7559\u7A7A\u4FDD\u6301\u4E0D\u53D8\uFF09","settings.saving":"\u4FDD\u5B58\u4E2D...","settings.saveButton":"\u4FDD\u5B58\u8BBE\u7F6E","content.addedToKnowledge":"\u5DF2\u6DFB\u52A0\u5230\u77E5\u8BC6\u5E93","panel.aiSummary":"AI \u6458\u8981","panel.regenerate":"\u91CD\u65B0\u751F\u6210","panel.bookmark":"\u6536\u85CF","panel.generating":"\u6B63\u5728\u751F\u6210\u6458\u8981...","panel.emptySummary":"\u6682\u65E0\u6458\u8981\uFF0C\u70B9\u51FB\u5237\u65B0\u6309\u94AE\u751F\u6210","panel.generationFailed":"\u6458\u8981\u751F\u6210\u5931\u8D25\uFF1A{error}","panel.noResult":"\u540E\u7AEF\u672A\u8FD4\u56DE\u7ED3\u679C\uFF0C\u8BF7\u68C0\u67E5\u540E\u7AEF\u662F\u5426\u542F\u52A8\u3001API Key \u662F\u5426\u914D\u7F6E","chat.placeholder":"\u8F93\u5165\u95EE\u9898...","chat.error":"\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5","chat.contextLoaded":"\u5DF2\u52A0\u8F7D\u5F53\u524D\u5E16\u5B50\u5185\u5BB9","chat.welcomeTopic":"\u6211\u5DF2\u8BFB\u53D6\u4E86\u5F53\u524D\u9875\u9762\uFF0C\u4F60\u53EF\u4EE5\u95EE\u6211\u4EFB\u4F55\u5173\u4E8E\u8FD9\u7BC7\u6587\u7AE0\u7684\u95EE\u9898\u3002","chat.welcomeGeneral":"\u4F60\u597D\uFF01\u6709\u4EC0\u4E48\u91CF\u5316\u6216\u7F16\u7A0B\u95EE\u9898\u53EF\u4EE5\u5E2E\u4F60\uFF1F","chat.welcomePdf":"\u{1F4C4} \u68C0\u6D4B\u5230 PDF \u9875\u9762\u3002\u70B9\u51FB\u4E0A\u65B9 \u{1F4CE} PDF \u6309\u94AE\u7C98\u8D34 PDF \u4E0B\u8F7D\u94FE\u63A5\uFF0C\u5373\u53EF\u5206\u6790 PDF \u5185\u5BB9\u3002","chat.pdfUrlPlaceholder":"\u7C98\u8D34 PDF \u6587\u4EF6\u7684\u76F4\u63A5\u4E0B\u8F7D\u94FE\u63A5...","chat.pdfUrlHint":"\u7C98\u8D34\u94FE\u63A5\u6216\u4E0A\u4F20\u672C\u5730\u6587\u4EF6","chat.btnSaveSummary":"\u6536\u85CF","chat.btnSaveFull":"\u539F\u6587","chat.btnHistory":"\u5386\u53F2","chat.btnNew":"\u65B0\u5EFA","chat.savedSummary":"\u6458\u8981\u5DF2\u5B58\u5165\u77E5\u8BC6\u5E93","chat.savedFull":"\u539F\u6587\u5DF2\u5B58\u5165\u77E5\u8BC6\u5E93","agent.inviteTitle":"\u9080\u8BF7 Agent \u4E00\u8D77\u9605\u8BFB","agent.startReading":"\u5F00\u59CB\u9605\u8BFB \xB7 Agent \u5C06\u53C2\u4E0E\u8BA8\u8BBA","agent.defaultQuestion":"\u8BF7\u5404\u4F4D Agent \u4ECE\u5404\u81EA\u89D2\u5EA6\u5206\u6790\u4E00\u4E0B\u8FD9\u7BC7\u6587\u7AE0\u7684\u6838\u5FC3\u5185\u5BB9","agent.discussing":"Agent \u8BA8\u8BBA\u4E2D...","agent.saveToKb":"\u6536\u85CF","agent.saveToKbTitle":"\u628A\u6574\u4E2A\u8BA8\u8BBA\u5B58\u5165\u77E5\u8BC6\u5E93","agent.savedToKnowledge":"\u5DF2\u5B58\u5165\u77E5\u8BC6\u5E93","agent.savedWithoutNote":"\u4E66\u7B7E\u5DF2\u4FDD\u5B58\uFF0C\u4F46\u7B14\u8BB0\u9644\u52A0\u5931\u8D25","agent.saveFailed":"\u4FDD\u5B58\u5931\u8D25","agent.saveEmpty":"\u6682\u65E0\u8BA8\u8BBA\u5185\u5BB9\u53EF\u4FDD\u5B58","agent.discussionTitle":"Agent \u5706\u684C\u8BA8\u8BBA","agent.inputPlaceholder":"\u8F93\u5165\u95EE\u9898\uFF0C\u6216 @agent\u540D \u5355\u72EC\u8FFD\u95EE...","chat.thinking":"\u601D\u8003","chat.thinkingHint":"\u70B9\u51FB\u9009\u62E9\u601D\u8003\u5F3A\u5EA6\uFF0C\u518D\u6B21\u70B9\u51FB\u5173\u95ED","chat.effortLow":"\u5FEB\u901F\u56DE\u7B54","chat.effortMedium":"\u9002\u5EA6\u601D\u8003","chat.effortHigh":"\u6DF1\u5EA6\u5206\u6790","chat.effortMax":"\u6781\u81F4\u63A8\u7406","chat.skill":"\u89C6\u89D2","chat.skillSearch":"\u641C\u7D22\u89C6\u89D2...","chat.copyMd":"\u590D\u5236 Markdown","chat.saveMd":"\u53E6\u5B58\u4E3A .md \u6587\u4EF6","chat.regenerate":"\u91CD\u65B0\u751F\u6210","chat.pdfOr":"\u2014 \u6216 \u2014","chat.pdfUpload":"\u4E0A\u4F20\u672C\u5730 PDF","chat.pdfExtractFailed":"PDF \u89E3\u6790\u5931\u8D25\uFF0C\u8BF7\u786E\u8BA4\u6587\u4EF6\u53EF\u8BFB","chat.summarize":"\u6458\u8981","chat.summarizePrompt":"\u8BF7\u7528\u4E2D\u6587\u5BF9\u8FD9\u7BC7\u5E16\u5B50\u505A\u4E00\u4E2A\u7ED3\u6784\u5316\u6458\u8981","chat.keyPoints":"\u8981\u70B9","chat.keyPointsPrompt":"\u8FD9\u7BC7\u5E16\u5B50\u7684\u6838\u5FC3\u8981\u70B9\u548C\u5173\u952E\u7ED3\u8BBA\u662F\u4EC0\u4E48\uFF1F","chat.explain":"\u89E3\u91CA","chat.explainPrompt":"\u8BF7\u7528\u901A\u4FD7\u7684\u8BED\u8A00\u89E3\u91CA\u8FD9\u7BC7\u5E16\u5B50\u8BB2\u4E86\u4EC0\u4E48","chat.newSession":"\u65B0\u4F1A\u8BDD","chat.history":"\u5386\u53F2\u4F1A\u8BDD","chat.historyTitle":"\u5386\u53F2\u4F1A\u8BDD","chat.noHistory":"\u6682\u65E0\u5386\u53F2\u4F1A\u8BDD","chat.generalChat":"\u901A\u7528\u5BF9\u8BDD","chat.messages":"\u6761\u6D88\u606F","chat.saveToKb":"\u5B58\u5165\u77E5\u8BC6\u5E93","chat.savedToKnowledge":"\u2713 \u5DF2\u5B58\u5165\u77E5\u8BC6\u5E93","chat.saveEmpty":"\u6CA1\u6709\u5185\u5BB9\u53EF\u4FDD\u5B58","chat.clearAll":"\u6E05\u7A7A\u5168\u90E8","chat.clear7days":"\u6E05\u96647\u5929\u524D","chat.confirmClearAll":"\u786E\u5B9A\u8981\u6E05\u7A7A\u6240\u6709\u5386\u53F2\u4F1A\u8BDD\u5417\uFF1F","summary.systemPage":"\u5F53\u524D\u4E3A\u7CFB\u7EDF\u9875\u9762\uFF0C\u65E0\u6CD5\u5206\u6790","summary.systemPageHint":"\u8BF7\u6253\u5F00\u4E00\u4E2A\u7F51\u9875\u540E\u518D\u4F7F\u7528","summary.contentScriptUnavailable":"\u65E0\u6CD5\u8BFB\u53D6\u9875\u9762\u5185\u5BB9\uFF0C\u8BF7\u5237\u65B0\u9875\u9762\u540E\u91CD\u8BD5","summary.noContent":"\u9875\u9762\u5185\u5BB9\u4E3A\u7A7A\uFF0C\u8BF7\u786E\u8BA4\u5E16\u5B50\u5DF2\u5B8C\u5168\u52A0\u8F7D","summary.generateFailed":"\u6458\u8981\u751F\u6210\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5","summary.saveSummary":"\u6536\u85CF\u6458\u8981","summary.saveFullPost":"\u6536\u85CF\u539F\u6587","summary.savedToKnowledge":"\u2713 \u5DF2\u5B58\u5165\u77E5\u8BC6\u5E93","summary.saveFailed":"\u5B58\u5165\u5931\u8D25","bookmark.bookmarked":"\u5DF2\u6536\u85CF","bookmark.bookmark":"\u6536\u85CF","bookmark.tagsLabel":"\u6807\u7B7E\uFF08\u7528\u9017\u53F7\u5206\u9694\uFF09","bookmark.tagsPlaceholder":"\u5982\uFF1A\u91CF\u5316, \u7B56\u7565, Python","bookmark.noteLabel":"\u5907\u6CE8","bookmark.notePlaceholder":"\u6DFB\u52A0\u5907\u6CE8\uFF08\u652F\u6301 Markdown \u683C\u5F0F\uFF09...","bookmark.saving":"\u4FDD\u5B58\u4E2D...","bookmark.savedBackend":"\u2713 \u5DF2\u6536\u85CF\u5230\u77E5\u8BC6\u5E93","bookmark.savedLocalOnly":"\u26A0\uFE0F \u540E\u7AEF\u4E0D\u53EF\u8FBE\uFF0C\u5DF2\u4FDD\u5B58\u5230\u672C\u5730\u7F13\u5B58\uFF08{error}\uFF09","bookmark.saveFailed":"\u2717 \u6536\u85CF\u5931\u8D25\uFF1A{error}","assist.toolbarTitle":"AI \u8F85\u52A9","assist.polish":"AI \u6DA6\u8272","assist.polishHint":"\u8BF7\u5148\u5728\u7F16\u8F91\u5668\u4E2D\u9009\u4E2D\u8981\u6DA6\u8272\u7684\u6587\u5B57","assist.polishing":"\u6DA6\u8272\u4E2D...","assist.polishDone":"\u6DA6\u8272\u5B8C\u6210\uFF0C\u5DF2\u66FF\u6362\u9009\u4E2D\u6587\u5B57","assist.format":"\u683C\u5F0F\u5316","assist.formatting":"\u683C\u5F0F\u5316\u4E2D...","assist.formatDone":"\u5DF2\u683C\u5F0F\u5316\u4E3A Markdown","assist.checkCode":"\u68C0\u67E5\u4EE3\u7801","assist.checkCodeHint":"\u8BF7\u5148\u5728\u7F16\u8F91\u5668\u4E2D\u9009\u4E2D\u4EE3\u7801","assist.checking":"\u68C0\u67E5\u4E2D...","assist.checkDone":"\u4EE3\u7801\u68C0\u67E5\u5B8C\u6210","assist.noIssues":"\u672A\u53D1\u73B0\u660E\u663E\u95EE\u9898","assist.issuesFound":"\u53D1\u73B0 {count} \u4E2A\u95EE\u9898","assist.callFailed":"\u8C03\u7528\u5931\u8D25\uFF1A{error}","assist.jumpToLine":"\u8DF3\u8F6C\u5230\u7B2C {line} \u884C","assist.jumpFailed":"\u65E0\u6CD5\u5B9A\u4F4D\u5230\u7B2C {line} \u884C\uFF08\u4EE3\u7801\u53EF\u80FD\u5DF2\u6539\u52A8\uFF09","assist.styleProfessional":"\u4E13\u4E1A","assist.styleCasual":"\u53E3\u8BED","assist.styleConcise":"\u7CBE\u7B80"},en:{"tab.summary":"Summary","tab.knowledge":"Knowledge","tab.chat":"Chat","tab.settings":"Settings","common.popOut":"Open in resizable window","common.loading":"Loading...","common.save":"Save","common.cancel":"Cancel","common.delete":"Delete","common.open":"Open","common.reset":"Reset","common.refresh":"Refresh","summary.notTopicPage":"This page is not a topic detail page","summary.notTopicHint":"Open a forum topic to view AI summary","summary.regenerate":"Regenerate","summary.generating":"Generating summary...","summary.empty":"No summary yet","summary.generate":"Generate Summary","knowledge.searchPlaceholder":"Search bookmarks...","knowledge.confirmDelete":"Are you sure you want to delete this bookmark?","knowledge.noMatch":"No matching bookmarks","knowledge.empty":"Knowledge base is empty","knowledge.emptyHint":"Click the bookmark button on a topic page to add","knowledge.sortLabel":"Sort","knowledge.sortCreatedDesc":"Newest first","knowledge.sortCreatedAsc":"Oldest first","knowledge.sortUpdatedDesc":"Recently updated","knowledge.sortTitleAsc":"Title A\u2192Z","knowledge.sortTitleDesc":"Title Z\u2192A","knowledge.loadMore":"Load more","knowledge.loadingMore":"Loading...","knowledge.loadedAll":"All loaded ({total})","knowledge.countLabel":"{total} total","knowledge.refresh":"Refresh","knowledge.refreshing":"Refreshing","knowledge.refreshed":"\u2713 Refreshed \u2014 {total} items","knowledge.backendUnreachable":"backend unreachable","knowledge.loadFallbackWarning":"\u26A0\uFE0F Backend load failed, showing local cache: {error}","knowledge.loadMoreFailed":"\u2717 Load more failed: {error}","knowledge.tagEdit":"Edit tags","knowledge.tagDone":"Done","knowledge.tagAddPlaceholder":"New tag...","knowledge.deleteSuccess":"\u2713 Deleted","knowledge.deleteBackendFailed":"\u26A0\uFE0F Deleted locally but backend sync failed: {error}","knowledge.openLink":"Open link","knowledge.copyPath":"Copy path","knowledge.openOriginal":"Open original","knowledge.summaryLabel":"\u{1F4DD} AI Summary","knowledge.notesLabel":"\u{1F4C4} Saved Content","search.placeholder":"Search knowledge base...","search.searching":"Searching...","search.button":"Search","search.history":"Search History","search.clearHistory":"Clear","search.noResults":"No results found","search.errorGeneric":"Search request failed, please try again","search.errorPrefix":"Search failed:","search.resultCount":"Found {count} results","search.relevance":"Relevance: {score}%","settings.saved":"\u2713 Settings saved","settings.savedLocalOnly":"\u26A0\uFE0F Saved locally but backend sync failed: {error}","settings.saveFailed":"\u2717 Save failed: {error}","settings.testNoResponse":"No response from backend","settings.language":"Language / \u8BED\u8A00","settings.fontSize":"Font Size","settings.fontSizeHint":"Adjust font size for chat and agent conversation areas","settings.backend":"Backend Service","settings.backendUrl":"Backend URL","settings.backendHint":"QuantClass backend service address","settings.testConnection":"Test Connection","settings.testing":"Testing...","settings.testOk":"Connected ({model})","settings.testFail":"Connection failed: {error}","settings.agentManage":"Agent Management","settings.agentHint":"Manage AI discussion roles. Each agent has its own .md file stored locally.","settings.agentSkill":"Linked Perspective (optional)","settings.agentNoSkill":"None","settings.agentSkillHint":"When linked, the agent will respond using this thinking framework","settings.skillManage":"Perspectives / Skills","settings.skillHint":"Thinking frameworks from famous thinkers \u2014 let AI analyze from different perspectives","settings.skillInstalled":"perspectives installed","settings.skillEmpty":"No perspectives yet (14 built-in ones auto-install on backend startup)","settings.skillImport":"Import Skill Library","settings.skillImportPrompt":"Enter the path to the people-skill directory","settings.skillImported":"Import successful","settings.skillEnabled":"Enabled","settings.skillDisabled":"Disabled","settings.agentAdd":"Add Custom Agent","settings.agentNamePrompt":"Enter agent name (e.g., Product Manager)","settings.agentIconPrompt":"Enter emoji icon","settings.agentDescPrompt":"Enter one-line description","settings.agentPromptPrompt":"Enter the agent system prompt","settings.agentCreated":"\u2713 Agent created","settings.storagePath":"Knowledge Storage","settings.storagePathLabel":"Storage Path","settings.storagePathHint":"MD files are saved under knowledge/ in this directory (macOS/Linux: ~/.quantclass/data, Windows: C:\\Users\\YourName\\.quantclass\\data)","settings.defaultModel":"Default Model","settings.selectModel":"Select Model","settings.customModelLabel":"Or enter custom model name","settings.customModelPlaceholder":"e.g. deepseek-chat, llama-3.1-70b...","settings.customModelApply":"Apply","settings.customModelHint":"Enter and click Apply or press Enter. Used for next LLM call.","settings.apiKeys":"LLM Providers","settings.apiKeysHint":"Configure Base URL and API Key for each provider (keys encrypted locally, URLs synced to backend)","settings.apiKeyLabel":"API Key","settings.apiKeyPlaceholder":"Enter {provider} API Key","settings.apiKeyConfigured":"\u2713 Configured (enter new value to override)","settings.customAdd":"Add custom LLM","settings.customCancel":"Cancel","settings.customName":"Name","settings.customModels":"Models (comma separated)","settings.customConfirm":"Add","settings.customAdded":"\u2713 Custom LLM added","settings.customDeleted":"\u2713 Deleted","settings.apiBaseUrlLabel":"Base URL","settings.apiBaseUrlPlaceholder":"e.g. {url} (leave blank to keep current)","settings.saving":"Saving...","settings.saveButton":"Save Settings","content.addedToKnowledge":"Added to knowledge base","panel.aiSummary":"AI Summary","panel.regenerate":"Regenerate","panel.bookmark":"Bookmark","panel.generating":"Generating summary...","panel.emptySummary":"No summary yet. Click refresh to generate.","panel.generationFailed":"Summary generation failed: {error}","panel.noResult":"No response from backend \u2014 check that the server is running and the API key is configured","chat.placeholder":"Ask a question...","chat.error":"Request failed, please try again","chat.contextLoaded":"Current post content loaded","chat.welcomeTopic":"I've read the current page. Ask me anything about this article.","chat.welcomeGeneral":"Hi! How can I help with quant or coding questions?","chat.welcomePdf":"\u{1F4C4} PDF page detected. Click \u{1F4CE} PDF above to paste the download URL for analysis.","chat.pdfUrlPlaceholder":"Paste the direct PDF download URL...","chat.pdfUrlHint":"Paste a URL or upload a local file","chat.btnSaveSummary":"Save","chat.btnSaveFull":"Full","chat.btnHistory":"History","chat.btnNew":"New","chat.savedSummary":"Summary saved to knowledge base","chat.savedFull":"Full content saved to knowledge base","agent.inviteTitle":"Invite Agents to Read Together","agent.startReading":"Start Reading \xB7 Agents Will Join","agent.defaultQuestion":"Please analyze the core content of this article from your respective perspectives","agent.discussing":"Agents discussing...","agent.saveToKb":"Save","agent.saveToKbTitle":"Save this whole discussion to the knowledge base","agent.savedToKnowledge":"Saved to knowledge base","agent.savedWithoutNote":"Bookmark saved, but note attachment failed","agent.saveFailed":"Save failed","agent.saveEmpty":"Nothing to save yet","agent.discussionTitle":"Agent Roundtable Discussion","agent.inputPlaceholder":"Ask a question, or @agent for single follow-up...","chat.thinking":"Think","chat.thinkingHint":"Click to select thinking effort, click again to turn off","chat.effortLow":"Quick","chat.effortMedium":"Moderate","chat.effortHigh":"Deep","chat.effortMax":"Maximum","chat.skill":"Perspective","chat.skillSearch":"Search perspectives...","chat.copyMd":"Copy Markdown","chat.saveMd":"Save as .md file","chat.regenerate":"Regenerate","chat.pdfOr":"\u2014 or \u2014","chat.pdfUpload":"Upload local PDF","chat.pdfExtractFailed":"PDF extraction failed. Check the file is readable.","chat.summarize":"Summarize","chat.summarizePrompt":"Please summarize this post in a structured way","chat.keyPoints":"Key Points","chat.keyPointsPrompt":"What are the key takeaways and conclusions from this post?","chat.explain":"Explain","chat.explainPrompt":"Please explain what this post is about in simple terms","chat.newSession":"New Chat","chat.history":"History","chat.historyTitle":"Chat History","chat.noHistory":"No chat history","chat.generalChat":"General Chat","chat.messages":"messages","chat.saveToKb":"Save to Knowledge","chat.savedToKnowledge":"\u2713 Saved to knowledge base","chat.saveEmpty":"Nothing to save","chat.clearAll":"Clear all","chat.clear7days":"Clear older than 7 days","chat.confirmClearAll":"Clear all chat history?","summary.systemPage":"System page \u2014 cannot analyze","summary.systemPageHint":"Open a web page to use this feature","summary.contentScriptUnavailable":"Cannot read page content. Please refresh the page and try again.","summary.noContent":"Page content is empty. Make sure the post is fully loaded.","summary.generateFailed":"Summary generation failed. Please try again.","summary.saveSummary":"Save Summary","summary.saveFullPost":"Save Full Post","summary.savedToKnowledge":"\u2713 Saved to knowledge base","summary.saveFailed":"Save failed","bookmark.bookmarked":"Bookmarked","bookmark.bookmark":"Bookmark","bookmark.tagsLabel":"Tags (comma-separated)","bookmark.tagsPlaceholder":"e.g.: quantitative, strategy, Python","bookmark.noteLabel":"Note","bookmark.notePlaceholder":"Add a note (Markdown supported)...","bookmark.saving":"Saving...","bookmark.savedBackend":"\u2713 Saved to knowledge base","bookmark.savedLocalOnly":"\u26A0\uFE0F Backend unreachable, saved locally only ({error})","bookmark.saveFailed":"\u2717 Bookmark failed: {error}","assist.toolbarTitle":"AI Assist","assist.polish":"AI Polish","assist.polishHint":"Please select the text you want to polish first","assist.polishing":"Polishing...","assist.polishDone":"Polished. Selection replaced.","assist.format":"Format","assist.formatting":"Formatting...","assist.formatDone":"Formatted as Markdown","assist.checkCode":"Check Code","assist.checkCodeHint":"Please select a code block first","assist.checking":"Checking...","assist.checkDone":"Code check complete","assist.noIssues":"No issues found","assist.issuesFound":"Found {count} issues","assist.callFailed":"Request failed: {error}","assist.jumpToLine":"Jump to line {line}","assist.jumpFailed":"Could not locate line {line} (code may have changed)","assist.styleProfessional":"Professional","assist.styleCasual":"Casual","assist.styleConcise":"Concise"}},Ze="zh",Ut=new Set;function l(e,t){let s=(Dt[Ze]||Dt.zh)[e]??Dt.zh[e]??e;if(t)for(let[r,a]of Object.entries(t))s=s.replace(`{${r}}`,a);return s}async function hn(){try{Ze=(await chrome.storage.local.get("quantclass_locale")).quantclass_locale||"zh"}catch{Ze="zh"}return Ze}async function fn(e){Ze=e,await chrome.storage.local.set({quantclass_locale:e});for(let t of Ut)t(e)}function Ie(){return Ze}function _n(e){return Ut.add(e),()=>Ut.delete(e)}var Nn=[[/\*\*\*(.+?)\*\*\*/g,"<strong><em>$1</em></strong>"],[/\*\*(.+?)\*\*/g,"<strong>$1</strong>"],[/\*(.+?)\*/g,"<em>$1</em>"],[/`([^`]+)`/g,"<code>$1</code>"],[/!\[([^\]]*)\]\(([^)]+)\)/g,'<img src="$2" alt="$1" style="max-width:100%;border-radius:4px;margin:4px 0">'],[/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>']];function ze(e){let t=e;for(let[n,s]of Nn)t=t.replace(n,s);return t}function He(e){if(!e)return"";let n=e.replace(/\r\n/g,`
`).split(`
`),s=[],r=0;for(;r<n.length;){let u=n[r];if(u.trim().startsWith("```")){let d=u.trim().slice(3).trim(),v=[];for(r++;r<n.length&&!n[r].trim().startsWith("```");)v.push(n[r]),r++;r++,s.push(`<pre><code class="language-${d}">${qn(v.join(`
`))}</code></pre>`);continue}let h=u.match(/^(#{1,6})\s+(.+)$/);if(h){let d=h[1].length,v=`h${Math.min(d+1,6)}`;s.push(`<${v}>${ze(h[2].trim())}</${v}>`),r++;continue}if(/^---+$/.test(u.trim())){s.push("<hr>"),r++;continue}if(u.trim().startsWith("|")&&u.trim().endsWith("|")){let d=[];for(;r<n.length&&n[r].trim().startsWith("|")&&n[r].trim().endsWith("|");)d.push(n[r].trim()),r++;s.push(Bn(d));continue}if(u.startsWith(">")){let d=[];for(;r<n.length&&(n[r].startsWith(">")||n[r].trim()&&d.length>0&&!n[r].startsWith("#"));)d.push(n[r].replace(/^>\s?/,"")),r++;s.push(`<blockquote>${He(d.join(`
`))}</blockquote>`);continue}if(/^[*\-+]\s+/.test(u)){let d=[];for(;r<n.length&&/^[*\-+]\s+/.test(n[r]);)d.push(n[r].replace(/^[*\-+]\s+/,"")),r++;s.push("<ul>"+d.map(v=>`<li>${ze(v)}</li>`).join("")+"</ul>");continue}if(/^\d+\.\s+/.test(u)){let d=[];for(;r<n.length&&/^\d+\.\s+/.test(n[r]);)d.push(n[r].replace(/^\d+\.\s+/,"")),r++;s.push("<ol>"+d.map(v=>`<li>${ze(v)}</li>`).join("")+"</ol>");continue}if(!u.trim()){r++;continue}let f=[];for(;r<n.length&&n[r].trim()&&!n[r].match(/^#{1,6}\s/)&&!n[r].trim().startsWith("|")&&!n[r].startsWith(">")&&!n[r].trim().startsWith("```")&&!/^[*\-+]\s+/.test(n[r])&&!/^\d+\.\s+/.test(n[r])&&!/^---+$/.test(n[r].trim());)f.push(n[r]),r++;f.length&&s.push(`<p>${ze(f.join("<br>"))}</p>`)}let a=s.join(`
`);if(typeof katex<"u"){let u=h=>h.replace(/<br\s*\/?>/gi,`
`).replace(/<\/?p>/gi,`
`).replace(/<\/?[^>]+>/g,"").trim();a=a.replace(/\$\$([\s\S]+?)\$\$/g,(h,f)=>{try{return katex.renderToString(u(f),{displayMode:!0,throwOnError:!1})}catch{return`<code>${f}</code>`}}),a=a.replace(/(?<![`\\])\$([^\$\n]+?)\$/g,(h,f)=>{try{return katex.renderToString(u(f),{displayMode:!1,throwOnError:!1})}catch{return`<code>${f}</code>`}})}return a}function Bn(e){if(e.length<2)return e.map(a=>`<p>${ze(a)}</p>`).join("");let t=a=>a.split("|").slice(1,-1).map(u=>u.trim()),n=t(e[0]),s=1;e[1]&&/^[\s|:-]+$/.test(e[1])&&(s=2);let r="<table><thead><tr>";n.forEach(a=>{r+=`<th>${ze(a)}</th>`}),r+="</tr></thead><tbody>";for(let a=s;a<e.length;a++){let u=t(e[a]);r+="<tr>",u.forEach(h=>{r+=`<td>${ze(h)}</td>`}),r+="</tr>"}return r+="</tbody></table>",r}function qn(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function Be({timeoutMs:e=5e3}={}){try{let[t]=await chrome.tabs.query({active:!0,currentWindow:!0});if(!t?.id)return null;let n=chrome.scripting.executeScript({target:{tabId:t.id},func:Gn}).then(r=>r?.[0]?.result||null),s=new Promise(r=>setTimeout(()=>r(null),e));return await Promise.race([n,s])}catch(t){return console.warn("getPageContent failed:",t),null}}function Gn(){let e=["h1.topic-title","h1.post-title",".topic-header h1",".post-header h1","h1",'[data-testid="topic-title"]'],t="";for(let d of e){let v=document.querySelector(d);if(v){t=v.textContent.trim();break}}if(!t){let d=document.title.match(/(.+?)\s*[-|]/);t=d?d[1].trim():document.title}let n=document.querySelectorAll(".textLayer span, .pdfViewer .page .textLayer span, [data-text-layer] span, .text-layer span, .react-pdf__Page__textContent span");if(n.length>10){let d=Array.from(n).map(v=>v.textContent).join(" ").replace(/\s+/g," ").trim();if(d.length>100)return{title:t,content:d,markdown:`# ${t}

${d}`,pdfUrl:s()}}function s(){for(let p of["embed","iframe","object"]){let _=document.querySelector(`${p}[src*=".pdf"], ${p}[data*=".pdf"]`);if(_)return _.src||_.data||_.getAttribute("src")||_.getAttribute("data")}let d=document.querySelector('a[download][href*=".pdf"], a[href$=".pdf"]');if(d)return d.href;let v=document.querySelector('meta[content*=".pdf"]');return v?v.content:null}let r=[".post-content",".topic-content",".post-body",'[data-testid="post-content"]',"article",".thread-content",".entry-content",".rich_media_content",".post_body",".message-body"],a=null;for(let d of r){let v=document.querySelector(d);if(v&&v.innerText.trim().length>50){a=v;break}}if(!a){let d=document.querySelector("main")||document.querySelector("#app")||document.body,v=null,p=0;for(let _ of d.querySelectorAll("div, section, article")){let w=_.innerText?.trim().length||0;w>p&&w>100&&(v=_,p=w)}a=v||d}function u(d){if(d.nodeType===Node.TEXT_NODE)return d.textContent.replace(/\n\s+/g," ");if(d.nodeType!==Node.ELEMENT_NODE)return"";let v=d.tagName.toLowerCase(),p=()=>Array.from(d.childNodes).map(u).join("");switch(v){case"h1":return`
# ${d.textContent.trim()}

`;case"h2":return`
## ${d.textContent.trim()}

`;case"h3":return`
### ${d.textContent.trim()}

`;case"h4":return`
#### ${d.textContent.trim()}

`;case"p":return`${p().trim()}

`;case"br":return`
`;case"hr":return`
---

`;case"strong":case"b":return`**${p().trim()}**`;case"em":case"i":return`*${p().trim()}*`;case"code":return d.parentElement?.tagName==="PRE"?d.textContent:`\`${d.textContent}\``;case"pre":{let _=d.querySelector("code");return`
\`\`\`${_?.className?.match(/language-(\w+)/)?.[1]||""}
${(_||d).textContent.trim()}
\`\`\`

`}case"a":{let _=d.getAttribute("href");if(!_||_.startsWith("javascript:"))return d.textContent.trim();let w=_.startsWith("http")?_:new URL(_,location.origin).href;return`[${d.textContent.trim()}](${w})`}case"img":{let _=d.getAttribute("src")||d.getAttribute("data-src")||"";if(!_||_.startsWith("data:"))return"";let w=_.startsWith("http")?_:new URL(_,location.origin).href;return`
![${d.getAttribute("alt")||"\u56FE\u7247"}](${w})

`}case"ul":return`
`+Array.from(d.querySelectorAll(":scope > li")).map(_=>`- ${u(_).trim()}`).join(`
`)+`

`;case"ol":return`
`+Array.from(d.querySelectorAll(":scope > li")).map((_,w)=>`${w+1}. ${u(_).trim()}`).join(`
`)+`

`;case"li":return p();case"blockquote":return`
${p().trim().split(`
`).map(_=>`> ${_}`).join(`
`)}

`;case"table":{let _=Array.from(d.querySelectorAll("tr"));if(!_.length)return"";let w=Array.from(_[0].querySelectorAll("th, td"));return`
| ${w.map(H=>H.textContent.trim()).join(" | ")} |
| ${w.map(()=>"---").join(" | ")} |
`+_.slice(1).map(H=>"| "+Array.from(H.querySelectorAll("td, th")).map(z=>z.textContent.trim()).join(" | ")+" |").join(`
`)+`

`}case"script":case"style":case"noscript":case"svg":return"";default:return p()}}let h=a.innerText.trim(),f=`# ${t}

${u(a)}`.replace(/\n{3,}/g,`

`).trim();return{title:t,content:h,markdown:f,pdfUrl:s()}}je();function Wn(e,t=14){if(!e)return"";if(e.icon_url||e.skill_icon_url){let n=de.backendUrl,s=e.icon_url||e.skill_icon_url;return m`<img src="${n}${s}" style="width:${t}px;height:${t}px;border-radius:50%;vertical-align:middle" alt="" />`}return m`<span>${e.icon||e.skill_icon||"\u{1F9E0}"}</span>`}var We="quantclass_agent_history",st="quantclass_agent_session";function kn({currentPage:e}){let[t,n]=$([]),[s,r]=$(new Set),[a,u]=$(!1),[h,f]=$([]),[d,v]=$(""),[p,_]=$(!1),[w,H]=$(null),[z,P]=$(!1),[D,U]=$([]),[V,Y]=$(!1),[re,ae]=$(!1),[le,te]=$(""),[j,ue]=$(!1),[Se,xe]=$(!1),[pe,W]=$(()=>Date.now().toString()),[G,Ae]=$(null),De=ve(null),he=ve(null);function $e(g,x=5e3){Ae(g),setTimeout(()=>{Ae(k=>k===g?null:k)},x)}let fe=ve({url:null,title:null});function _e(g,x){if(!g||!x)return!1;let k=g.match(/\/(thread|topic|t|d)\/(\d+)/)?.[2],C=x.match(/\/(thread|topic|t|d)\/(\d+)/)?.[2];if(k&&C)return k===C;try{let B=new URL(g),i=new URL(x);return B.origin+B.pathname===i.origin+i.pathname}catch{return g===x}}ie(()=>{Ue()},[]),ie(()=>{let g=e?.url,x=e?.title||"";if(!g)return;if(fe.current.url&&_e(fe.current.url,g)){fe.current.title=x;return}let k=fe.current.url,C=fe.current.title;(async()=>{k&&h.length>0&&(clearTimeout(ge.current),await se({id:pe,rounds:h,context:w,pageUrl:k,pageTitle:C,selected:[...s],updatedAt:new Date().toISOString()}));let B=await chrome.storage.local.get([st,We]),i=B[st],c=null;if(i?.rounds?.length>0&&_e(i.pageUrl,g))c=i;else{let K=(B[We]||[]).find(N=>_e(N.pageUrl,g));K&&(c=K)}c?(f(c.rounds||[]),u((c.rounds||[]).length>0),H(c.context||null),Array.isArray(c.selected)&&r(new Set(c.selected)),c.id&&W(c.id)):(f([]),u(!1),H(null),W(Date.now().toString())),k&&!(c&&c===i)&&await chrome.storage.local.remove(st),fe.current={url:g,title:x}})()},[e?.url,e?.title]),ie(()=>{e?.isAnalyzable&&Be().then(g=>{g?.content?.length>50&&H(g.content)}).catch(()=>{})},[e?.url]);async function Ue(){try{let g=await chrome.runtime.sendMessage({type:q.LIST_AGENTS}),x=g?.data?.data??g?.data;Array.isArray(x)&&(n(x),r(new Set(x.filter(k=>k.enabled).map(k=>k.id))))}catch{}}let ge=ve(null);ie(()=>{if(h.length!==0)return clearTimeout(ge.current),ge.current=setTimeout(()=>{let g={id:pe,rounds:h,context:w,pageUrl:e?.url,pageTitle:e?.title,selected:[...s],updatedAt:new Date().toISOString()};chrome.storage.local.set({[st]:g}),se(g)},500),()=>clearTimeout(ge.current)},[h,pe]);async function se(g){let k=(await chrome.storage.local.get([We]))[We]||[],C=k.findIndex(B=>B.id===g.id);C>=0?k[C]=g:k.unshift(g),await chrome.storage.local.set({[We]:k.slice(0,20)})}async function Z(g){ue(!0);try{let x=null;if(g.url){let k=await chrome.runtime.sendMessage({type:q.EXTRACT_PDF,payload:{url:g.url}});k?.success&&k.data?.text?.length>100&&(x=k.data.text)}else if(g.file){let{configStorage:k}=await Promise.resolve().then(()=>(je(),Ot)),B=((await k.get())?.backendUrl||"http://127.0.0.1:8700")+"/api",i=new FormData;i.append("file",g.file);let S=await(await fetch(`${B}/pdf/upload`,{method:"POST",body:i})).json();S.code===0&&S.data?.text?.length>100&&(x=S.data.text)}x&&(H(x.substring(0,6e4)),ae(!1),te(""),a||(u(!0),setTimeout(()=>y(l("agent.defaultQuestion")),100)))}catch{}finally{ue(!1)}}function me(){setTimeout(()=>{he.current&&(he.current.scrollTop=he.current.scrollHeight)},50)}async function y(g){let x=(g||d).trim();if(!x||p)return;v(""),_(!0),u(!0),me();let k=w;if(!k&&e?.isAnalyzable)try{k=(await Be())?.content?.substring(0,6e4)||null,k&&H(k)}catch{}let C=Ie()==="en"?"English":"\u4E2D\u6587";await R({question:x,context:k,agentIds:[...s],language:C,type:"all"}),_(!1),me()}async function T(g,x){_(!0),Y(!1),me();let k=Ie()==="en"?"English":"\u4E2D\u6587",C=t.find(B=>B.id===g);await R({question:x,context:w,agentIds:[g],language:k,type:"single",target:C?{id:C.id,name:C.name,icon:C.icon}:{id:g,name:g,icon:"\u{1F916}"}}),_(!1),me()}async function R({question:g,context:x,agentIds:k,language:C,type:B,target:i}){let K=`${(await Pe.get())?.backendUrl||de.backendUrl}${de.apiBasePath}/agents/discuss`,N=fe.current.url,o=pe,b=()=>fe.current.url===N&&pe===o,L=E=>{let O={question:g,responses:E,type:B};return i&&(O.target=i),O},M=E=>L(k.map(O=>{let F=t.find(Q=>Q.id===O);return{agent_id:O,name:F?.name||O,icon:F?.icon||"\u{1F916}",content:`\u26A0\uFE0F ${E}`}})),I;try{I=await fetch(K,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:g,context:x,agents:k,language:C})})}catch(E){if(!b())return;f(O=>[...O,M(E.message||"network error")]);return}if(!b())return;if(!I.ok){let E=await I.text().catch(()=>"");if(!b())return;f(O=>[...O,M(`HTTP ${I.status}: ${E.substring(0,120)||I.statusText}`)]);return}let A;try{A=await I.json()}catch(E){if(!b())return;f(O=>[...O,M(`Invalid response: ${E.message}`)]);return}if(b()){if(!A||A.code!==0||!Array.isArray(A.data?.responses)){f(E=>[...E,M(A?.message||"empty response")]);return}f(E=>[...E,L(A.data.responses)]),me()}}function ee(g){if(g.key==="Enter"&&!g.shiftKey){g.preventDefault();let k=d.trim().match(/^@(\w+)\s+(.*)/s);k?(T(k[1],k[2]),v("")):y()}g.key==="@"||d.endsWith("@")&&g.key!=="Backspace"?Y(!0):V&&g.key==="Escape"&&Y(!1)}function ce(g){v(g.target.value),g.target.value.endsWith("@")?Y(!0):g.target.value.includes("@")||Y(!1)}function ye(g){v(x=>{let k=x.endsWith("@")?x.slice(0,-1):x;return`@${g} ${k}`}),Y(!1)}async function Te(){clearTimeout(ge.current),h.length>0&&await se({id:pe,rounds:h,context:w,pageUrl:e?.url,pageTitle:e?.title,selected:[...s],updatedAt:new Date().toISOString()}),f([]),u(!1),W(Date.now().toString()),await chrome.storage.local.remove(st)}async function qe(){clearTimeout(ge.current),h.length>0&&await se({id:pe,rounds:h,context:w,pageUrl:e?.url,pageTitle:e?.title,selected:[...s],updatedAt:new Date().toISOString()});let g=await chrome.storage.local.get([We]);U(g[We]||[]),P(!0)}function Ke(g){g.id&&W(g.id),f(g.rounds||[]),H(g.context||null),g.selected&&r(new Set(g.selected)),u(!0),P(!1)}function Ve(){let g=`# Agent \u5706\u684C\u8BA8\u8BBA

`;g+=`> \u9875\u9762\uFF1A${e?.title||""}

`;for(let x of h){g+=`## Q: ${x.question}

`;for(let k of x.responses)g+=`### ${k.icon} ${k.name}

${k.content}

---

`}return g}function Ce(){let g=Ve(),x=new Blob([g],{type:"text/markdown"}),k=URL.createObjectURL(x),C=document.createElement("a");C.href=k,C.download=`agent_discussion_${new Date().toISOString().slice(0,10)}.md`,C.click(),URL.revokeObjectURL(k)}async function Fe(){if(!Se){if(h.length===0){$e({type:"warning",text:l("agent.saveEmpty")||"\u6682\u65E0\u8BA8\u8BBA\u5185\u5BB9\u53EF\u4FDD\u5B58"});return}xe(!0);try{let g=Ve(),x=(e?.url||"").match(/\/(thread|topic|t|d)\/(\d+)/),k=Date.now().toString(36),C=x?`agent-${x[2]}-${k}`:`agent-${k}`,B=`\u{1F916} ${e?.title||l("agent.discussionTitle")||"Agent \u5706\u684C\u8BA8\u8BBA"}`,i=await chrome.runtime.sendMessage({type:q.CREATE_BOOKMARK,payload:{thread_id:C,title:B,url:e?.url||"",summary:g.substring(0,500),tags:["Agent \u8BA8\u8BBA"]}});if(!i?.success){$e({type:"error",text:`\u274C ${i?.error||l("agent.saveFailed")||"\u4FDD\u5B58\u5931\u8D25"}`});return}let c=i.data?.bookmark_id||i.data?.id;if(c&&!(await chrome.runtime.sendMessage({type:q.ADD_NOTE,payload:{bookmarkId:c,content:g}}))?.success){$e({type:"warning",text:`\u26A0\uFE0F ${l("agent.savedWithoutNote")||"\u4E66\u7B7E\u5DF2\u4FDD\u5B58\uFF0C\u4F46\u7B14\u8BB0\u9644\u52A0\u5931\u8D25"}`});return}$e({type:"success",text:`\u2705 ${l("agent.savedToKnowledge")||"\u5DF2\u5B58\u5165\u77E5\u8BC6\u5E93"}`})}catch(g){$e({type:"error",text:`\u274C ${g.message||"save failed"}`})}finally{xe(!1)}}}let Ee=g=>{if(!g)return"";let x=new Date(g);return`${x.getMonth()+1}/${x.getDate()} ${String(x.getHours()).padStart(2,"0")}:${String(x.getMinutes()).padStart(2,"0")}`};if(!a)return m`
      <div class="agent-tab">
        <div class="agent-select-header">${l("agent.inviteTitle")}</div>

        <div class="agent-list">
          ${t.map(g=>m`
            <label key=${g.id} class="agent-card ${s.has(g.id)?"selected":""}">
              <input type="checkbox"
                checked=${s.has(g.id)}
                onChange=${()=>r(x=>{let k=new Set(x);return k.has(g.id)?k.delete(g.id):k.add(g.id),k})}
              />
              <span class="agent-icon">${g.icon}</span>
              <span class="agent-name">${g.name}</span>
              <span class="agent-desc">${g.description}</span>
            </label>
          `)}
        </div>

        <button class="agent-start-btn" onClick=${()=>y(l("agent.defaultQuestion"))} disabled=${s.size===0||p}>
          🚀 ${l("agent.startReading")}
        </button>

        <div class="agent-toolbar-bottom">
          <button class="chat-tool-btn" onClick=${()=>ae(g=>!g)}>📎 PDF</button>
          <button class="chat-tool-btn" onClick=${qe}>📋 ${l("chat.btnHistory")}</button>
          <button class="chat-tool-btn" onClick=${Te}>＋ ${l("chat.btnNew")}</button>
        </div>

        ${re&&m`
          <div class="pdf-input-panel" style="margin-top:8px">
            <div class="pdf-input-row">
              <input type="text" class="pdf-url-input" value=${le}
                onInput=${g=>te(g.target.value)}
                onKeyDown=${g=>g.key==="Enter"&&Z({url:le.trim()})}
                placeholder="粘贴 PDF 下载链接..."
                disabled=${j} />
              <button class="pdf-load-btn" onClick=${()=>Z({url:le.trim()})} disabled=${j||!le.trim()}>
                ${j?"\u23F3":"\u{1F4E5}"}
              </button>
            </div>
            <div class="pdf-input-divider">— 或 —</div>
            <button class="pdf-upload-btn" onClick=${()=>De.current?.click()} disabled=${j}>
              📁 上传本地 PDF
            </button>
            <input ref=${De} type="file" accept=".pdf" style="display:none"
              onChange=${g=>{Z({file:g.target.files[0]}),g.target.value=""}} />
          </div>
        `}

        ${z&&m`
          <div class="chat-history-panel">
            <div class="chat-history-header">
              <span>${l("chat.historyTitle")}</span>
              <button class="chat-hist-action" onClick=${()=>P(!1)}></button>
            </div>
            ${D.length===0&&m`<div class="chat-history-empty">${l("chat.noHistory")}</div>`}
            ${D.map(g=>m`
              <div key=${g.id} class="chat-history-item" onClick=${()=>Ke(g)}>
                <div class="chat-history-body">
                  <div class="chat-history-title">${g.pageTitle||"Discussion"}</div>
                  <div class="chat-history-meta">${g.rounds?.length||0} rounds    ${Ee(g.updatedAt)}</div>
                </div>
              </div>
            `)}
          </div>
        `}
      </div>
    `;function Re(g){f(x=>x.filter((k,C)=>C!==g))}async function Qe(g){if(p)return;let x=h[g];if(!x)return;let k=x.question,C=x.type==="single"&&x.target?[x.target.id]:[...s];f(B=>B.filter((i,c)=>c!==g)),x.type==="single"&&x.target?await T(x.target.id,k):await y(k)}return m`
    <div class="agent-tab">
      <div class="agent-toolbar">
        <span class="agent-toolbar-info">🧠 ${s.size} agents    ${h.length} rounds</span>
        <div class="chat-toolbar-right">
          <button class="chat-tool-btn" onClick=${Fe} disabled=${Se||h.length===0} title="${l("agent.saveToKbTitle")||"\u628A\u6574\u4E2A\u8BA8\u8BBA\u5B58\u5165\u77E5\u8BC6\u5E93"}">
            ${Se?"\u23F3":"\u{1F4DA}"} ${l("agent.saveToKb")||"\u6536\u85CF"}
          </button>
          <button class="chat-tool-btn" onClick=${Ce}>💾 MD</button>
          <button class="chat-tool-btn" onClick=${qe}>📋 ${l("chat.btnHistory")}</button>
          <button class="chat-tool-btn" onClick=${Te}>＋ ${l("chat.btnNew")}</button>
        </div>
      </div>

      ${G&&m`
        <div class="message ${G.type}">${G.text}</div>
      `}

      ${z&&m`
        <div class="chat-history-panel">
          <div class="chat-history-header">
            <span>${l("chat.historyTitle")}</span>
            <button class="chat-hist-action" onClick=${()=>P(!1)}></button>
          </div>
          ${D.length===0&&m`<div class="chat-history-empty">${l("chat.noHistory")}</div>`}
          ${D.map(g=>m`
            <div key=${g.id} class="chat-history-item" onClick=${()=>Ke(g)}>
              <div class="chat-history-body">
                <div class="chat-history-title">${g.pageTitle||"Discussion"}</div>
                <div class="chat-history-meta">${g.rounds?.length||0} rounds    ${Ee(g.updatedAt)}</div>
              </div>
            </div>
          `)}
        </div>
      `}

      <div class="agent-discussion" ref=${he}>
        ${h.map((g,x)=>m`
          <div key=${x} class="agent-round">
            <div class="agent-question">
              <span class="agent-q-label">${g.target?`@${g.target.icon}`:"Q"}</span>
              ${g.target?m`<span class="agent-q-target">@${g.target.name}</span> `:""}
              <span class="agent-q-text markdown-body" dangerouslySetInnerHTML=${{__html:He(g.question)}}></span>
              <span class="agent-round-actions">
                <button class="bubble-action-btn" onClick=${()=>Qe(x)}
                  title="${l("chat.regenerate")||"\u91CD\u65B0\u751F\u6210"}" disabled=${p}>🔄</button>
                <button class="bubble-action-btn danger-btn" onClick=${()=>Re(x)}
                  title="${l("common.delete")||"\u5220\u9664"}">🗑️</button>
              </span>
            </div>
            ${g.responses.map(k=>m`
              <div key=${k.agent_id} class="agent-response" onClick=${()=>{v(`@${k.agent_id} `)}}>
                <div class="agent-response-header">
                  <span class="agent-icon-sm">${k.icon}</span>
                  <span class="agent-name-sm">${k.name}</span>
                  ${k.skill_name&&m`<span class="skill-badge" style="margin-left:4px;font-size:9px">${Wn(k,14)} ${k.skill_name}</span>`}
                  <button class="bubble-action-btn" onClick=${C=>{C.stopPropagation(),navigator.clipboard.writeText(k.content),C.target.textContent="\u2713",setTimeout(()=>{C.target.textContent="\u{1F4CB}"},1500)}}>📋</button>
                </div>
                <div class="markdown-body" dangerouslySetInnerHTML=${{__html:He(k.content)}}></div>
                ${k.content&&m`
                  <div class="bubble-actions-inline">
                    <button class="bubble-action-btn-label" onClick=${C=>{C.stopPropagation(),navigator.clipboard.writeText(k.content);let B=C.currentTarget.querySelector("span"),i=B.textContent;B.textContent="\u2713 \u5DF2\u590D\u5236",setTimeout(()=>{B.textContent=i},1500)}}>📋 <span>${l("chat.copyMd")||"\u590D\u5236"}</span></button>
                    <button class="bubble-action-btn-label" onClick=${C=>{C.stopPropagation();let B=new Blob([k.content],{type:"text/markdown"}),i=URL.createObjectURL(B),c=document.createElement("a");c.href=i,c.download=(k.name||"agent")+"_"+new Date().toISOString().slice(0,10)+".md",c.click(),URL.revokeObjectURL(i)}}>💾 <span>${l("chat.saveMd")||"\u4E0B\u8F7D"}</span></button>
                    <button class="bubble-action-btn-label" onClick=${async C=>{C.stopPropagation();let B=C.currentTarget.querySelector("span");B.textContent="\u23F3";try{let i=Date.now().toString(36),c=await chrome.runtime.sendMessage({type:q.CREATE_BOOKMARK,payload:{thread_id:"agent-reply-"+k.agent_id+"-"+i,title:k.icon+" "+k.name+" \u2014 "+(e?.title||"Agent"),url:e?.url||"",summary:k.content.substring(0,500),tags:["Agent \u56DE\u590D"]}});if(c?.success){let S=c.data?.bookmark_id||c.data?.id;S&&await chrome.runtime.sendMessage({type:q.ADD_NOTE,payload:{bookmarkId:S,content:k.content}}),B.textContent="\u2713 \u5DF2\u6536\u85CF"}else B.textContent="\u2717"}catch{B.textContent="\u2717"}setTimeout(()=>{B.textContent=l("chat.saveToKb")||"\u6536\u85CF"},2e3)}}>📚 <span>${l("chat.saveToKb")||"\u6536\u85CF"}</span></button>
                    <button class="bubble-action-btn-label" onClick=${C=>{C.stopPropagation(),!p&&(f(B=>{let i=[...B],c={...i[x]};return c.responses=c.responses.filter(S=>S.agent_id!==k.agent_id),i[x]=c,i}),T(k.agent_id,g.question))}}>🔄 <span>${l("chat.regenerate")||"\u91CD\u65B0\u751F\u6210"}</span></button>
                    <button class="bubble-action-btn-label danger-label" onClick=${C=>{C.stopPropagation(),f(B=>{let i=[...B],c={...i[x]};return c.responses=c.responses.filter(S=>S.agent_id!==k.agent_id),c.responses.length===0?i.filter((S,K)=>K!==x):(i[x]=c,i)})}}>🗑️ <span>${l("common.delete")||"\u5220\u9664"}</span></button>
                  </div>
                `}
              </div>
            `)}
          </div>
        `)}

        ${p&&m`
          <div class="agent-loading">
            <div class="spinner"></div>
            <span>${l("agent.discussing")}</span>
          </div>
        `}
      </div>

      <div class="chat-input-area" style="position:relative">
        ${V&&m`
          <div class="mention-popup">
            ${t.filter(g=>s.has(g.id)).map(g=>m`
              <div key=${g.id} class="mention-item" onClick=${()=>ye(g.id)}>
                ${g.icon} ${g.name}
              </div>
            `)}
          </div>
        `}
        <div class="chat-input-bar">
          <textarea
            class="chat-input"
            value=${d}
            onInput=${ce}
            onKeyDown=${ee}
            placeholder=${l("agent.inputPlaceholder")}
            rows="1"
            disabled=${p}
          ></textarea>
          <button class="chat-send-btn" onClick=${()=>{let x=d.trim().match(/^@(\w+)\s+(.*)/s);x?(T(x[1],x[2]),v("")):y()}} disabled=${p||!d.trim()}>➜</button>
        </div>
      </div>
    </div>
  `}Je();je();var $n=20,ot=[{key:"created_desc",sortBy:"created",sortOrder:"desc",labelKey:"knowledge.sortCreatedDesc"},{key:"created_asc",sortBy:"created",sortOrder:"asc",labelKey:"knowledge.sortCreatedAsc"},{key:"updated_desc",sortBy:"updated",sortOrder:"desc",labelKey:"knowledge.sortUpdatedDesc"},{key:"title_asc",sortBy:"title",sortOrder:"asc",labelKey:"knowledge.sortTitleAsc"},{key:"title_desc",sortBy:"title",sortOrder:"desc",labelKey:"knowledge.sortTitleDesc"}];function wn(){let[e,t]=$([]),[n,s]=$(!0),[r,a]=$(!1),[u,h]=$(""),[f,d]=$([]),[v,p]=$([]),[_,w]=$("created_desc"),[H,z]=$({page:1,total:0,totalPages:1}),[P,D]=$(null);function U(y,T=5e3){D(y),setTimeout(()=>{D(R=>R===y?null:R)},T)}let V=ve(!1);async function Y(){V.current=!0,await re()}ie(()=>{re()},[_,f.join(",")]);async function re(){s(!0);try{let y=ot.find(ce=>ce.key===_)||ot[0],T=await chrome.runtime.sendMessage({type:q.GET_BOOKMARKS,payload:{page:1,page_size:$n,sort_by:y.sortBy,sort_order:y.sortOrder,...f.length===1?{tag:f[0]}:{}}}),R=le(T),ee=te(T);if(R){if(t(R),z(ee),V.current?(U({type:"success",text:l("knowledge.refreshed",{total:ee.total})||`\u2713 \u5DF2\u5237\u65B0\uFF0C\u5171 ${ee.total} \u6761`},3e3),V.current=!1):D(null),f.length===0){let ce=new Set;R.forEach(ye=>(ye.tags||[]).forEach(Te=>ce.add(Te))),p(Array.from(ce))}}else{let ce=await at.getAll();t(ce),z({page:1,total:ce.length,totalPages:1}),U({type:"warning",text:l("knowledge.loadFallbackWarning",{error:T?.error||l("knowledge.backendUnreachable")})},6e3)}}catch(y){console.error("Failed to load bookmarks:",y);let T=await at.getAll();t(T),z({page:1,total:T.length,totalPages:1}),U({type:"warning",text:l("knowledge.loadFallbackWarning",{error:y.message})},6e3)}finally{s(!1)}}async function ae(){if(!r&&!(H.page>=H.totalPages)){a(!0);try{let y=ot.find(ye=>ye.key===_)||ot[0],T=H.page+1,R=await chrome.runtime.sendMessage({type:q.GET_BOOKMARKS,payload:{page:T,page_size:$n,sort_by:y.sortBy,sort_order:y.sortOrder,...f.length===1?{tag:f[0]}:{}}}),ee=le(R),ce=te(R);ee&&ee.length>0?(t(ye=>[...ye,...ee]),z(ce)):R?.success||U({type:"error",text:l("knowledge.loadMoreFailed",{error:R?.error||l("knowledge.backendUnreachable")})})}catch(y){console.error("Failed to load more bookmarks:",y),U({type:"error",text:l("knowledge.loadMoreFailed",{error:y.message})})}finally{a(!1)}}}function le(y){if(!y||!y.success)return null;let T=y.data;return T?Array.isArray(T)?T:Array.isArray(T.items)?T.items:null:null}function te(y){let T=y?.data,R=T?.pagination;return R?{page:R.page||1,total:R.total||0,totalPages:R.total_pages||1}:{page:1,total:Array.isArray(T)?T.length:T?.items?.length||0,totalPages:1}}let j=e.filter(y=>{if(u){let T=u.toLowerCase();if(!(y.title?.toLowerCase().includes(T)||y.summary?.toLowerCase().includes(T)||y.tags?.some(ee=>ee.toLowerCase().includes(T))))return!1}return!(f.length>0&&(!y.tags||!f.some(T=>y.tags.includes(T))))});async function ue(y){if(!confirm(l("knowledge.confirmDelete")))return;let T=!1,R=null;try{let ee=await chrome.runtime.sendMessage({type:q.DELETE_BOOKMARK,payload:{id:y}});ee?.success?T=!0:R=ee?.error||l("knowledge.backendUnreachable")}catch(ee){R=ee.message||l("knowledge.backendUnreachable")}await at.delete(y),await re(),T?U({type:"success",text:l("knowledge.deleteSuccess")},3e3):U({type:"warning",text:l("knowledge.deleteBackendFailed",{error:R})},6e3)}let[Se,xe]=$(null),[pe,W]=$(null),[G,Ae]=$(!1);async function De(y){if(Se===y){xe(null),W(null);return}xe(y),W(null),Ae(!0);try{let T=await chrome.runtime.sendMessage({type:q.GET_BOOKMARK_DETAIL,payload:{id:y}});T?.success&&T.data&&W(T.data)}catch{}Ae(!1)}let[he,$e]=$(!1),[fe,_e]=$("");function Ue(y){he||d(T=>T.includes(y)?T.filter(R=>R!==y):[...T,y])}async function ge(y){try{let T=await chrome.runtime.sendMessage({type:q.SEARCH,payload:{query:y}})}catch{}p(T=>T.filter(R=>R!==y)),d(T=>T.filter(R=>R!==y))}async function se(){let y=fe.trim();!y||v.includes(y)||(p(T=>[...T,y]),_e(""))}function Z(y){chrome.tabs.create({url:y})}if(n)return m`
      <div class="loading-state">
        <div class="spinner"></div>
        <span>${l("common.loading")}</span>
      </div>
    `;let me=H.page<H.totalPages;return m`
    <div class="knowledge-tab">
      ${P&&m`
        <div class="message ${P.type}" role="alert">${P.text}</div>
      `}
      <div class="search-bar">
        <input
          type="text"
          class="search-input"
          placeholder=${l("knowledge.searchPlaceholder")}
          value=${u}
          onInput=${y=>h(y.target.value)}
        />
        <button class="search-btn" onClick=${Y} disabled=${n} title="${l("knowledge.refresh")||"\u5237\u65B0"}">
          <span class=${n?"spin":""}>🔄</span>
        </button>
      </div>

      <div class="knowledge-toolbar">
        <label class="sort-selector">
          <span class="sort-label">${l("knowledge.sortLabel")}</span>
          <select
            value=${_}
            onChange=${y=>w(y.target.value)}
            class="sort-select"
          >
            ${ot.map(y=>m`
              <option key=${y.key} value=${y.key}>${l(y.labelKey)}</option>
            `)}
          </select>
        </label>
        <button class="kb-refresh-btn" onClick=${Y} disabled=${n} title="${l("knowledge.refresh")||"\u5237\u65B0\u77E5\u8BC6\u5E93"}">
          <span class=${n?"spin":""}>🔄</span>
          ${n?l("knowledge.refreshing")||"\u5237\u65B0\u4E2D":l("knowledge.refresh")||"\u5237\u65B0"}
        </button>
        <span class="total-count">
          ${l("knowledge.countLabel",{total:H.total})}
        </span>
      </div>

      <div class="tag-filter-section">
        <div class="tag-filter-header">
          <button class="tag-edit-toggle" onClick=${()=>$e(y=>!y)}>
            ${he?"\u2713 "+l("knowledge.tagDone"):"\u270F\uFE0F "+l("knowledge.tagEdit")}
          </button>
        </div>

        ${v.length>0&&m`
          <div class="tag-filter">
            ${v.map(y=>m`
              <span key=${y} class="filter-tag ${f.includes(y)?"active":""}" onClick=${()=>Ue(y)}>
                ${y}
                ${he&&m`
                  <button class="tag-remove" onClick=${T=>{T.stopPropagation(),ge(y)}}>×</button>
                `}
              </span>
            `)}
          </div>
        `}

        ${he&&m`
          <div class="tag-add-row">
            <input
              type="text"
              class="tag-add-input"
              value=${fe}
              onInput=${y=>_e(y.target.value)}
              onKeyDown=${y=>y.key==="Enter"&&se()}
              placeholder=${l("knowledge.tagAddPlaceholder")}
            />
            <button class="tag-add-btn" onClick=${se}>+</button>
          </div>
        `}
      </div>

      <div class="bookmarks-list">
        ${j.length===0&&m`
          <div class="empty-state">
            <div class="empty-icon">📚</div>
            <p>${u||f.length>0?l("knowledge.noMatch"):l("knowledge.empty")}</p>
            <p class="empty-hint">${l("knowledge.emptyHint")}</p>
          </div>
        `}

        ${j.map(y=>{let T=Se===(y.bookmark_id||y.id);return m`
            <div key=${y.bookmark_id||y.id} class="bookmark-card ${T?"expanded":""}">
              <div class="bookmark-header" onClick=${()=>De(y.bookmark_id||y.id)}>
                <h4 class="bookmark-title">${y.title}</h4>
                <span class="bookmark-expand-icon">${T?"\u25B2":"\u25BC"}</span>
              </div>

              ${!T&&y.summary&&m`
                <p class="bookmark-summary">${y.summary.substring(0,100)}...</p>
              `}

              ${T&&m`
                <div class="bookmark-detail">
                  ${G&&m`
                    <div class="loading-state"><div class="spinner"></div></div>
                  `}

                  ${!G&&m`
                    <div class="detail-meta">
                      <span class="bookmark-date">${Yn(y.created_at||y.createdAt)}</span>
                      <a class="detail-link" href=${y.url} onClick=${R=>{R.preventDefault(),Z(y.url)}}>
                        ${l("knowledge.openOriginal")} ↗
                      </a>
                    </div>

                    ${(pe?.summary||y.summary)&&m`
                      <div class="detail-section">
                        <div class="detail-label">${l("knowledge.summaryLabel")}</div>
                        <div class="markdown-body"
                             dangerouslySetInnerHTML=${{__html:He(pe?.summary||y.summary)}}
                        ></div>
                      </div>
                    `}

                    ${pe?.notes?.length>0&&m`
                      <div class="detail-section">
                        <div class="detail-label">${l("knowledge.notesLabel")}</div>
                        ${pe.notes.map(R=>m`
                          <div key=${R.id} class="detail-note markdown-body"
                               dangerouslySetInnerHTML=${{__html:He(R.content)}}
                          ></div>
                        `)}
                      </div>
                    `}
                  `}
                </div>
              `}

              ${y.tags?.length>0&&m`
                <div class="bookmark-tags">
                  ${y.tags.map(R=>m`
                    <span class="tag-small" key=${R}>${R}</span>
                  `)}
                </div>
              `}

              <div class="bookmark-actions">
                <button class="action-btn" onClick=${()=>Z(y.url)}>↗ ${l("knowledge.openLink")}</button>
                <button class="action-btn" onClick=${R=>{let ee=y.notes?.file_path||"~/.quantclass/data/knowledge/posts/"+(y.thread_id||y.bookmark_id||y.id)+".md";navigator.clipboard.writeText(ee),R.target.textContent="\u2713 \u5DF2\u590D\u5236",setTimeout(()=>{R.target.textContent="\u{1F4C2} "+l("knowledge.copyPath")},1500)}}>📂 ${l("knowledge.copyPath")}</button>
                <button class="action-btn danger" onClick=${()=>ue(y.bookmark_id||y.id)}>${l("common.delete")}</button>
              </div>
            </div>
          `})}

        ${e.length>0&&m`
          <div class="load-more-container">
            ${me&&m`
              <button
                class="load-more-btn"
                onClick=${ae}
                disabled=${r}
              >
                ${r?l("knowledge.loadingMore"):l("knowledge.loadMore")}
              </button>
            `}
            ${!me&&H.total>0&&m`
              <div class="load-more-end">
                ${l("knowledge.loadedAll",{total:H.total})}
              </div>
            `}
          </div>
        `}
      </div>
    </div>
  `}function Yn(e){if(!e)return"";let t=new Date(e),n=Ie()==="en"?"en-US":"zh-CN";return t.toLocaleDateString(n,{month:"short",day:"numeric"})}Je();je();var Ye="quantclass_chat_session",we="quantclass_chat_history";function Ht(e,t=20){if(!e)return"";if(e.icon_url){let n=de.backendUrl;return m`<img src="${n}${e.icon_url}" style="width:${t}px;height:${t}px;border-radius:50%;vertical-align:middle" alt="" />`}return m`<span>${e.icon||"\u{1F9E0}"}</span>`}function Sn({currentPage:e}){let[t,n]=$([]),[s,r]=$(""),[a,u]=$(!1),[h,f]=$(null),d=de.showRawDownload,[v,p]=$(!1),[_,w]=$([]),[H,z]=$(!1),[P,D]=$(""),[U,V]=$(!1),[Y,re]=$(null),[ae,le]=$(null),[te,j]=$(!1),ue=ae!==null,[Se,xe]=$(null),[pe,W]=$(!1),[G,Ae]=$(null),[De,he]=$(!1),[$e,fe]=$([]),[_e,Ue]=$(""),ge=ve(null),se=ve({url:null,title:null}),Z=ve(null);function me(o,b){if(!o||!b)return!1;let L=o.match(/\/(thread|topic|t|d)\/(\d+)/)?.[2],M=b.match(/\/(thread|topic|t|d)\/(\d+)/)?.[2];if(L&&M)return L===M;try{let I=new URL(o),A=new URL(b);return I.origin+I.pathname===A.origin+A.pathname}catch{return o===b}}ie(()=>{let o=e?.url,b=e?.title||"";if(!o)return;if(se.current.url&&me(se.current.url,o)){se.current.title=b;return}let L=se.current.url,M=se.current.title;(async()=>{L&&t.length>0&&(clearTimeout(Ee.current),clearTimeout(y.current),await Re(Ce,{messages:t,context:h,pageUrl:L,pageTitle:M,updatedAt:new Date().toISOString()}));let I=Z.current&&me(Z.current,o);I&&(Z.current=null);let A=await chrome.storage.local.get([Ye,we]),E=A[Ye],O=null;if(!I)if(E?.messages?.length>0&&me(E.pageUrl,o))O=E;else{E?.messages?.length>0&&L===null&&Qe(E);let Q=(A[we]||[]).find(X=>me(X.pageUrl,o));Q&&(O=Q)}O?(n(O.messages||[]),f(O.context||null),O.id&&Fe(O.id)):(n([]),f(null),Fe(Date.now().toString())),L&&!(O&&O===E)&&await chrome.storage.local.remove(Ye),se.current={url:o,title:b}})()},[e?.url,e?.title]);let y=ve(null);ie(()=>{if(t.length!==0)return clearTimeout(y.current),y.current=setTimeout(()=>{chrome.storage.local.set({[Ye]:{messages:t,context:h,pageUrl:e?.url,pageTitle:e?.title,updatedAt:new Date().toISOString()}})},500),()=>clearTimeout(y.current)},[t]),ie(()=>{e?.isAnalyzable&&!h&&Be().then(o=>{o?.content?.length>50&&f(o.content)}).catch(()=>{})},[e?.url]),ie(()=>{chrome.runtime.sendMessage({type:q.LIST_SKILLS,payload:{enabledOnly:!0}}).then(o=>{let b=o?.data?.data??o?.data;Array.isArray(b)&&fe(b)}).catch(()=>{})},[]);function T(){setTimeout(()=>{ge.current&&(ge.current.scrollTop=ge.current.scrollHeight)},50)}function R(o){n(b=>{let L=[...b];return b[o]?.role==="user"&&b[o+1]?.role==="assistant"?L.splice(o,2):L.splice(o,1),L})}async function ee(o){if(a||t[o]?.role!=="assistant")return;let b=o-1;for(;b>=0&&t[b].role!=="user";)b--;if(b<0)return;let L=t[b].content;n(M=>M.filter((I,A)=>A!==o)),await ce(L,{skipUserBubble:!0})}async function ce(o,{skipUserBubble:b=!1}={}){let L=(o||s).trim();if(!(!L||a)){if(!b){let M=G?{id:G.id,icon:G.icon,icon_url:G.icon_url,name:G.display_name||G.name}:null,I={role:"user",content:L,_skill:M};n(A=>[...A,I])}r(""),u(!0),T();try{let M=Ie()==="en"?"English":"\u4E2D\u6587",I=t.map(F=>({role:F.role,content:F.content})),A=h;if(!A&&e?.isAnalyzable)try{let F=await Be();if(A=F?.content?.substring(0,6e4)||null,F?.pdfUrl&&(!A||A.length<200))try{let X=await chrome.runtime.sendMessage({type:q.EXTRACT_PDF,payload:{url:F.pdfUrl}});X?.success&&X.data?.text?.length>A?.length&&(A=X.data.text.substring(0,6e4))}catch{}let Q=e.url||"";if((!A||A.length<200)&&Q.toLowerCase().endsWith(".pdf"))try{let X=await chrome.runtime.sendMessage({type:q.EXTRACT_PDF,payload:{url:Q}});X?.success&&X.data?.text?.length>100&&(A=X.data.text.substring(0,6e4))}catch{}A&&f(A)}catch{}let E,O=Se;if(!O)try{let F=(e?.url||"").match(/\/(thread|topic|t|d)\/(\d+)/),Q=await chrome.runtime.sendMessage({type:q.CREATE_CHAT_SESSION,payload:{thread_id:F?F[2]:null,page_url:e?.url||null,page_title:e?.title||null}});Q?.success&&Q.data?.id&&(O=Q.data.id,xe(O))}catch{}if(O){if(!await ye({sid:O,message:ae?`[\u601D\u8003\u5F3A\u5EA6: ${ae}\uFF0C\u8BF7\u6DF1\u5EA6\u601D\u8003\u540E\u56DE\u7B54] ${L}`:L,context:A,language:M}))return}else E=await chrome.runtime.sendMessage({type:q.CHAT,payload:{message:ae?`[\u601D\u8003\u5F3A\u5EA6: ${ae}\uFF0C\u8BF7\u6DF1\u5EA6\u601D\u8003\u540E\u56DE\u7B54] ${L}`:L,context:A,images:Y||void 0,history:I,language:M,thinking:ue}}),E?.success&&E.data?.reply?n(F=>[...F,{role:"assistant",content:E.data.reply}]):n(F=>[...F,{role:"assistant",content:`\u26A0\uFE0F ${E?.error||l("chat.error")}`}])}catch(M){n(I=>[...I,{role:"assistant",content:`\u26A0\uFE0F ${M.message}`}])}finally{u(!1),T()}}}async function ye({sid:o,message:b,context:L,language:M}){let E=`${(await Pe.get())?.backendUrl||de.backendUrl}${de.apiBasePath}/chat/sessions/${encodeURIComponent(o)}/messages`,O=se.current.url,F=Ce,Q=()=>se.current.url===O&&Ce===F,X;try{X=await fetch(E,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:b,context:L,language:M,skill_id:G?.id||void 0})})}catch(Me){return Q()&&n(et=>[...et,{role:"assistant",content:`\u26A0\uFE0F ${Me.message||"network error"}`}]),!1}if(!Q())return!1;if(!X.ok){let Me=await X.text().catch(()=>"");return Q()&&n(et=>[...et,{role:"assistant",content:`\u26A0\uFE0F HTTP ${X.status}: ${Me.substring(0,200)||X.statusText}`}]),!1}let be;try{be=await X.json()}catch(Me){return Q()&&n(et=>[...et,{role:"assistant",content:`\u26A0\uFE0F Invalid response: ${Me.message}`}]),!1}if(!Q())return!1;if(!be||be.code!==0||!be.data?.reply)return n(Me=>[...Me,{role:"assistant",content:`\u26A0\uFE0F ${be?.message||"empty reply"}`}]),!1;be.data.memory_active&&W(!0);let bt=t.length>0?[...t].reverse().find(Me=>Me.role==="user")?._skill:null;return n(Me=>[...Me,{role:"assistant",content:be.data.reply,_skill:G?{id:G.id,icon:G.icon,icon_url:G.icon_url,name:G.display_name||G.name}:bt}]),T(),!0}let Te=ve(null);async function qe(o){if(!o||!o.name.toLowerCase().endsWith(".pdf")){alert("\u8BF7\u9009\u62E9 PDF \u6587\u4EF6");return}V(!0),z(!1);try{let{configStorage:b}=await Promise.resolve().then(()=>(je(),Ot)),M=((await b.get())?.backendUrl||"http://127.0.0.1:8700")+"/api",I=new FormData;I.append("file",o),I.append("max_pages","50");let E=await(await fetch(`${M}/pdf/upload`,{method:"POST",body:I})).json();if(E.code===0&&E.data?.text?.length>100){let O=E.data.text.substring(0,6e4);f(O),E.data.images?.length>0&&re(E.data.images);let F=E.data.title||o.name;n(be=>[...be,{role:"user",content:`\u{1F4C4} \u5DF2\u4E0A\u4F20 PDF\uFF1A${F} (${E.data.pages} \u9875)`}]),u(!0),T();let Q=Ie()==="en"?"English":"\u4E2D\u6587",X=await chrome.runtime.sendMessage({type:q.CHAT,payload:{message:"\u8BF7\u7528\u4E2D\u6587\u5BF9\u8FD9\u7BC7PDF\u505A\u4E00\u4E2A\u7ED3\u6784\u5316\u6458\u8981",context:O,history:[],language:Q}});X?.success&&X.data?.reply?n(be=>[...be,{role:"assistant",content:X.data.reply}]):n(be=>[...be,{role:"assistant",content:`\u26A0\uFE0F ${X?.error||"Failed"}`}]),u(!1),T()}else alert(E.message||l("chat.pdfExtractFailed"))}catch(b){alert(b.message)}finally{V(!1)}}async function Ke(){let o=P.trim();if(o){V(!0);try{let b=await chrome.runtime.sendMessage({type:q.EXTRACT_PDF,payload:{url:o}});if(b?.success&&b.data?.text?.length>100){f(b.data.text.substring(0,6e4)),z(!1),D("");let L=b.data.title||"PDF";n(A=>[...A,{role:"user",content:`\u8BF7\u5206\u6790\u8FD9\u7BC7 PDF\uFF1A${L}`}]),u(!0),T();let M=Ie()==="en"?"English":"\u4E2D\u6587",I=await chrome.runtime.sendMessage({type:q.CHAT,payload:{message:"\u8BF7\u7528\u4E2D\u6587\u5BF9\u8FD9\u7BC7PDF\u505A\u4E00\u4E2A\u7ED3\u6784\u5316\u6458\u8981\uFF0C\u5305\u542B\u6838\u5FC3\u89C2\u70B9\u3001\u5173\u952E\u8981\u70B9\u548C\u9002\u7528\u573A\u666F",context:b.data.text.substring(0,6e4),history:[],language:M}});I?.success&&I.data?.reply?n(A=>[...A,{role:"assistant",content:I.data.reply}]):n(A=>[...A,{role:"assistant",content:`\u26A0\uFE0F ${I?.error||"Failed"}`}]),u(!1),T()}else alert(b?.error||l("chat.pdfExtractFailed"))}catch(b){alert(b.message)}finally{V(!1)}}}function Ve(o){o.key==="Enter"&&!o.shiftKey&&(o.preventDefault(),ce())}let[Ce,Fe]=$(()=>Date.now().toString()),Ee=ve(null);ie(()=>{if(t.length!==0)return clearTimeout(Ee.current),Ee.current=setTimeout(()=>{Re(Ce,{messages:t,context:h,pageUrl:e?.url,pageTitle:e?.title,updatedAt:new Date().toISOString()})},500),()=>clearTimeout(Ee.current)},[t]);async function Re(o,b){let M=(await chrome.storage.local.get([we]))[we]||[],I=M.findIndex(E=>E.id===o),A={id:o,pageTitle:b.pageTitle||"",pageUrl:b.pageUrl||"",preview:b.messages?.[0]?.content?.substring(0,60)||"",messageCount:b.messages?.length||0,createdAt:I>=0?M[I].createdAt:new Date().toISOString(),updatedAt:b.updatedAt||new Date().toISOString(),messages:b.messages,context:b.context};I>=0?M[I]=A:M.unshift(A),await chrome.storage.local.set({[we]:M.slice(0,50)})}async function Qe(o){o?.messages?.length&&(await Re(Date.now().toString(),o),await chrome.storage.local.remove(Ye))}async function g(){clearTimeout(Ee.current),clearTimeout(y.current),t.length>0&&await Re(Ce,{messages:t,context:h,pageUrl:e?.url,pageTitle:e?.title,updatedAt:new Date().toISOString()}),n([]),f(null),Fe(Date.now().toString()),xe(null),Z.current=e?.url||null,await chrome.storage.local.remove(Ye),e?.isAnalyzable&&Be().then(o=>{o?.content&&f(o.content)}).catch(()=>{})}async function x(){clearTimeout(Ee.current),t.length>0&&await Re(Ce,{messages:t,context:h,pageUrl:e?.url,pageTitle:e?.title,updatedAt:new Date().toISOString()});let o=await chrome.storage.local.get([we]);w(o[we]||[]),p(!0)}function k(o){o.id&&Fe(o.id),n(o.messages||[]),f(o.context||null),p(!1),chrome.storage.local.set({[Ye]:{messages:o.messages,context:o.context,pageUrl:o.pageUrl,pageTitle:o.pageTitle,updatedAt:new Date().toISOString()}})}async function C(o){let L=((await chrome.storage.local.get([we]))[we]||[]).filter(M=>M.id!==o);await chrome.storage.local.set({[we]:L}),w(L)}async function B(o){let b=(o.pageUrl||"").match(/\/(thread|topic|t|d)\/(\d+)/),L=b?b[2]:"web",M=o.id||Date.now().toString(),I=Date.now().toString(36),A=`chat-${L}-${M}-${I}`,E=(o.messages||[]).map(F=>F.role==="user"?`**Q:** ${F.content}`:`**A:** ${F.content}`).join(`

---

`);if(!E){n(F=>[...F,{role:"assistant",content:`\u26A0\uFE0F ${l("chat.saveEmpty")||"Nothing to save"}`}]);return}let O=(F,Q)=>{let X=F?"\u2705":"\u26A0\uFE0F",be=F?l("chat.savedToKnowledge")||"Saved to knowledge base":Q;n(bt=>[...bt,{role:"assistant",content:`${X} ${be}`}]),T()};try{let F=await chrome.runtime.sendMessage({type:q.CREATE_BOOKMARK,payload:{thread_id:A,title:o.pageTitle||l("chat.generalChat"),url:o.pageUrl||"",summary:E.substring(0,500),tags:["\u804A\u5929\u8BB0\u5F55"]}});if(!F?.success){O(!1,F?.error||"save failed");return}let Q=F.data?.bookmark_id||F.data?.id;if(Q){let X=await chrome.runtime.sendMessage({type:q.ADD_NOTE,payload:{bookmarkId:Q,content:E}});if(!X?.success){O(!1,`saved without note: ${X?.error||"note attach failed"}`);return}}O(!0)}catch(F){O(!1,F.message||"save failed")}}async function i(){confirm(l("chat.confirmClearAll"))&&(await chrome.storage.local.set({[we]:[]}),w([]))}async function c(o){let b=new Date(Date.now()-o*864e5).toISOString(),M=((await chrome.storage.local.get([we]))[we]||[]).filter(I=>(I.updatedAt||I.createdAt)>b);await chrome.storage.local.set({[we]:M}),w(M)}function S(o){if(!o)return"";let b=new Date(o),L=M=>String(M).padStart(2,"0");return`${b.getFullYear()}/${L(b.getMonth()+1)}/${L(b.getDate())} ${L(b.getHours())}:${L(b.getMinutes())}`}let K=e?.url&&(e.url.toLowerCase().endsWith(".pdf")||e.url.includes("/pdf")||e.url.includes("smallpdf.com")||e.url.includes("drive.google.com/file")),N=e?.isAnalyzable?[{label:"\u{1F4DD} "+l("chat.summarize"),prompt:l("chat.summarizePrompt")},{label:"\u{1F511} "+l("chat.keyPoints"),prompt:l("chat.keyPointsPrompt")},{label:"\u{1F4A1} "+l("chat.explain"),prompt:l("chat.explainPrompt")}]:[];return m`
    <div class="chat-tab">
      <div class="chat-toolbar">
        <div class="chat-toolbar-left">
          ${h&&m`<span class="chat-context-dot" title="${l("chat.contextLoaded")}">🔗</span>`}
          ${pe&&m`<span class="chat-context-dot" title="记忆已激活" style="margin-left:2px">🧠</span>`}
          ${t.length>0&&m`
            <span class="chat-msg-count">${t.length} ${l("chat.messages")}</span>
          `}
        </div>
        <div class="chat-toolbar-right">
          ${d&&m`<button class="chat-tool-btn" onClick=${async()=>{try{let o=await Be(),b=o?.markdown||o?.content||"";if(!b)return;let L=(o?.title||"page").replace(/[^a-zA-Z0-9\u4e00-\u9fff]/g,"_").substring(0,40),M=new Blob([b],{type:"text/markdown"}),I=URL.createObjectURL(M),A=document.createElement("a");A.href=I,A.download=`${L}.md`,A.click(),URL.revokeObjectURL(I)}catch{}}}>📄 ${l("chat.btnSaveFull")}</button>`}
          <button class="chat-tool-btn" onClick=${()=>z(o=>!o)}>📎 PDF</button>
          <button class="chat-tool-btn" onClick=${x}>📋 ${l("chat.btnHistory")}</button>
          <button class="chat-tool-btn" onClick=${g}>＋ ${l("chat.btnNew")}</button>
        </div>
      </div>

      ${H&&m`
        <div class="pdf-input-panel">
          <div class="pdf-input-row">
            <input
              type="text"
              class="pdf-url-input"
              value=${P}
              onInput=${o=>D(o.target.value)}
              onKeyDown=${o=>o.key==="Enter"&&Ke()}
              placeholder=${l("chat.pdfUrlPlaceholder")}
              disabled=${U}
            />
            <button class="pdf-load-btn" onClick=${Ke} disabled=${U||!P.trim()}>
              ${U?"\u23F3":"\u{1F4E5}"}
            </button>
          </div>
          <div class="pdf-input-divider">${l("chat.pdfOr")}</div>
          <button class="pdf-upload-btn" onClick=${()=>Te.current?.click()} disabled=${U}>
            📁 ${l("chat.pdfUpload")}
          </button>
          <input
            ref=${Te}
            type="file"
            accept=".pdf"
            style="display:none"
            onChange=${o=>{qe(o.target.files[0]),o.target.value=""}}
          />
          <div class="pdf-input-hint">${l("chat.pdfUrlHint")}</div>
        </div>
      `}

      ${v&&m`
        <div class="chat-history-panel">
          <div class="chat-history-header">
            <span>${l("chat.historyTitle")} (${_.length})</span>
            <div class="chat-history-actions">
              <button class="chat-hist-action" onClick=${()=>c(7)} title="${l("chat.clear7days")}">🗓️</button>
              <button class="chat-hist-action" onClick=${i} title="${l("chat.clearAll")}">🗑️</button>
              <button class="chat-hist-action" onClick=${()=>p(!1)}></button>
            </div>
          </div>
          ${_.length===0&&m`
            <div class="chat-history-empty">${l("chat.noHistory")}</div>
          `}
          ${_.map(o=>m`
            <div key=${o.id} class="chat-history-item">
              <div class="chat-history-body" onClick=${()=>k(o)}>
                <div class="chat-history-title">${o.pageTitle||l("chat.generalChat")}</div>
                <div class="chat-history-preview">${o.preview}</div>
                <div class="chat-history-meta">
                  ${o.messageCount} ${l("chat.messages")}    ${S(o.updatedAt||o.createdAt)}
                </div>
              </div>
              <div class="chat-history-btns">
                <button class="chat-hist-action" onClick=${()=>B(o)} title="${l("chat.saveToKb")}">📚</button>
                <button class="chat-hist-action" onClick=${()=>C(o.id)} title="${l("common.delete")}">🗑️</button>
              </div>
            </div>
          `)}
        </div>
      `}

      <div class="chat-messages" ref=${ge}>
        ${t.length===0&&m`
          <div class="chat-welcome">
            <div class="chat-welcome-icon">💬</div>
            <p>${K?l("chat.welcomePdf"):e?.isAnalyzable?l("chat.welcomeTopic"):l("chat.welcomeGeneral")}</p>

            ${N.length>0&&m`
              <div class="chat-quick-actions">
                ${N.map(o=>m`
                  <button
                    key=${o.label}
                    class="chat-quick-btn"
                    onClick=${()=>ce(o.prompt)}
                  >
                    ${o.label}
                  </button>
                `)}
              </div>
            `}
          </div>
        `}

        ${t.map((o,b)=>m`
          <div key=${b} class="chat-msg chat-msg-${o.role}">
            <div class="chat-bubble chat-bubble-${o.role}">
              ${o.role==="assistant"&&o._skill&&m`
                <div class="skill-badge">${Ht(o._skill,14)} ${o._skill.name}</div>
              `}
              ${m`<div class="markdown-body" dangerouslySetInnerHTML=${{__html:He(o.content)}}></div>`}
              ${o.role==="user"&&m`
                <div class="bubble-actions-inline user-actions">
                  <button class="bubble-action-btn-label danger-label" onClick=${()=>R(b)}
                    >🗑️ <span>${l("common.delete")||"\u5220\u9664"}</span></button>
                </div>
              `}
              ${o.role==="assistant"&&o.content&&m`
                <div class="bubble-actions-inline">
                <button class="bubble-action-btn-label" onClick=${L=>{navigator.clipboard.writeText(o.content);let M=L.currentTarget.querySelector("span"),I=M.textContent;M.textContent="\u2713 \u5DF2\u590D\u5236",setTimeout(()=>{M.textContent=I},1500)}}>📋 <span>${l("chat.copyMd")||"\u590D\u5236"}</span></button>
                <button class="bubble-action-btn-label" onClick=${()=>{let L=new Blob([o.content],{type:"text/markdown"}),M=URL.createObjectURL(L),I=document.createElement("a");I.href=M,I.download="chat_"+new Date().toISOString().slice(0,16).replace(/[T:]/g,"-")+".md",I.click(),URL.revokeObjectURL(M)}}>💾 <span>${l("chat.saveMd")||"\u4E0B\u8F7D"}</span></button>
                <button class="bubble-action-btn-label" onClick=${async L=>{let M=L.currentTarget.querySelector("span");M.textContent="\u23F3";try{let I=Date.now().toString(36),A="msg-"+Ce+"-"+I,E=await chrome.runtime.sendMessage({type:q.CREATE_BOOKMARK,payload:{thread_id:A,title:(e?.title||"Chat")+" \u2014 AI \u56DE\u590D",url:e?.url||"",summary:o.content.substring(0,500),tags:["AI \u56DE\u590D"]}});if(E?.success){let O=E.data?.bookmark_id||E.data?.id;O&&await chrome.runtime.sendMessage({type:q.ADD_NOTE,payload:{bookmarkId:O,content:o.content}}),M.textContent="\u2713 \u5DF2\u6536\u85CF"}else M.textContent="\u2717 \u5931\u8D25"}catch{M.textContent="\u2717 \u5931\u8D25"}setTimeout(()=>{M.textContent=l("chat.saveToKb")||"\u6536\u85CF"},2e3)}}>📚 <span>${l("chat.saveToKb")||"\u6536\u85CF"}</span></button>
                <button class="bubble-action-btn-label" onClick=${()=>ee(b)}
                  >🔄 <span>${l("chat.regenerate")||"\u91CD\u65B0\u751F\u6210"}</span></button>
                <button class="bubble-action-btn-label danger-label" onClick=${()=>R(b)}
                  >🗑️ <span>${l("common.delete")||"\u5220\u9664"}</span></button>
                </div>
              `}
            </div>
          </div>
        `)}

        ${a&&m`
          <div class="chat-msg chat-msg-assistant">
            <div class="chat-bubble chat-bubble-assistant chat-typing">
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
            </div>
          </div>
        `}
      </div>

      <div class="chat-input-area">
        <div class="chat-input-bar">
          <textarea
            class="chat-input"
            value=${s}
            onInput=${o=>r(o.target.value)}
            onKeyDown=${Ve}
            placeholder=${l("chat.placeholder")}
            rows="1"
            disabled=${a}
          ></textarea>
          <button
            class="chat-send-btn"
            onClick=${()=>ce()}
            disabled=${a||!s.trim()}
          >
            ➜          </button>
        </div>
        <div class="chat-input-tools" style="position:relative">
          <button
            class="thinking-toggle ${ue?"active":""}"
            onClick=${()=>{ue?(le(null),j(!1)):j(o=>!o)}}
            title="${l("chat.thinkingHint")}"
          >
            🧠 ${ae?`${l("chat.thinking")} \xB7 ${ae.toUpperCase()}`:l("chat.thinking")}
          </button>
          ${te&&m`
            <div class="effort-menu">
              ${["low","medium","high","max"].map(o=>m`
                <button
                  key=${o}
                  class="effort-option ${ae===o?"active":""}"
                  onClick=${()=>{le(o),j(!1)}}
                >
                  ${{low:"\u{1F4A1}",medium:"\u{1F9E0}",high:"\u{1F525}",max:"\u26A1"}[o]} ${o.toUpperCase()}
                  <span class="effort-desc">${{low:l("chat.effortLow")||"\u5FEB\u901F\u56DE\u7B54",medium:l("chat.effortMedium")||"\u9002\u5EA6\u601D\u8003",high:l("chat.effortHigh")||"\u6DF1\u5EA6\u5206\u6790",max:l("chat.effortMax")||"\u6781\u81F4\u63A8\u7406"}[o]}</span>
                </button>
              `)}
            </div>
          `}

          ${$e.length>0&&m`
            <button
              class="thinking-toggle ${G?"active":""}"
              onClick=${()=>{G?(Ae(null),he(!1)):he(o=>!o)}}
            >
              ${G?m`${Ht(G,16)} ${G.display_name||G.name}`:`\u{1F464} ${l("chat.skill")||"\u89C6\u89D2"}`}
            </button>
            ${De&&m`
              <div class="effort-menu skill-menu">
                <input
                  type="text"
                  value=${_e}
                  onInput=${o=>Ue(o.target.value)}
                  placeholder="${l("chat.skillSearch")||"\u641C\u7D22\u89C6\u89D2..."}"
                  style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;margin-bottom:4px;font-size:11px;outline:none"
                />
                ${$e.filter(o=>!_e||(o.display_name||"").toLowerCase().includes(_e.toLowerCase())||(o.name||"").toLowerCase().includes(_e.toLowerCase())||(o.description||"").toLowerCase().includes(_e.toLowerCase())).map(o=>m`
                    <button
                      key=${o.id}
                      class="effort-option ${G?.id===o.id?"active":""}"
                      onClick=${()=>{Ae(o),he(!1),Ue("")}}
                    >
                      ${Ht(o,20)} ${o.display_name||o.name}
                    </button>
                  `)}
              </div>
            `}
          `}
        </div>
      </div>
    </div>
  `}Je();je();var it=Ge.map(e=>e.id);function yt(e,t=20){if(!e)return"";if(e.icon_url){let n=de.backendUrl;return m`<img src="${n}${e.icon_url}" style="width:${t}px;height:${t}px;border-radius:50%;vertical-align:middle" alt="" />`}return m`<span>${e.icon||"\u{1F9E0}"}</span>`}function xn(){let[e,t]=$(de),[n,s]=$({}),[r,a]=$({}),[u,h]=$({}),[f,d]=$({}),[v,p]=$(""),[_,w]=$([]),[H,z]=$([]),[P,D]=$([]),[U,V]=$(!1),[Y,re]=$({name:"",icon:"\u{1F916}",description:"",prompt:""}),[ae,le]=$(null),[te,j]=$({}),[ue,Se]=$(!1),[xe,pe]=$(!1),[W,G]=$({name:"",baseUrl:"",apiKey:"",models:"",protocol:"openai"}),[Ae,De]=$(!1),[he,$e]=$(0),[fe,_e]=$(!0),[Ue,ge]=$(!1),[se,Z]=$(null),[me,y]=$(Ie()),[T,R]=$(1),[ee,ce]=$(!1),[ye,Te]=$("checking");ie(()=>{Ke(),qe(),chrome.storage.local.get("_qc_dev",i=>{De(i._qc_dev===!0)}),chrome.storage.local.get("_qc_font_scale",i=>{let c=parseFloat(i._qc_font_scale)||1;R(c),document.documentElement.style.setProperty("--font-scale",c)})},[]);async function qe(){Te("checking");try{let i=await chrome.runtime.sendMessage({type:q.GET_HEALTH});Te(i?.success?"connected":"disconnected")}catch{Te("disconnected")}}async function Ke(){_e(!0);try{let i=await Pe.get(),c={...de,...i||{}};delete c.llmApiKeys,t(c);let S=await _t.getAll();s(S);let K={};for(let[N,o]of Object.entries(S))K[N]=!!(o&&o.trim());a(K);try{let N=await chrome.runtime.sendMessage({type:q.GET_CONFIG});if(N?.success&&N.data){t(A=>({...A,defaultModel:N.data.default_model||A.defaultModel,defaultProvider:N.data.default_provider||A.defaultProvider}));let o=N.data.providers||{};a(A=>{let E={...A};for(let O of it)o[O]?.has_api_key&&(E[O]=!0);return E});let b={},L={};for(let A of it){let E=o[A]?.base_url,O=Ge.find(Q=>Q.id===A);b[A]=E||O?.defaultBaseUrl||"";let F=o[A]?.models;L[A]=Array.isArray(F)&&F.length>0?[...F]:[...O?.models||[]]}h(b),d(L),N.data.data_dir&&p(N.data.data_dir);try{let A=await chrome.runtime.sendMessage({type:q.LIST_AGENTS}),E=A?.data?.data??A?.data;Array.isArray(E)&&z(E)}catch{}try{let A=await chrome.runtime.sendMessage({type:q.LIST_SKILLS}),E=A?.data?.data??A?.data;Array.isArray(E)&&D(E)}catch{}let M=new Set([...Ge.map(A=>A.id),"builtin_claude","builtin_gpt"]),I=[];for(let[A,E]of Object.entries(o))M.has(A)||I.push({id:A,name:E.name||A,base_url:E.base_url,models:E.models||[],has_api_key:E.has_api_key,protocol:E.protocol||"openai"});w(I)}}catch{}}catch(i){console.error("Failed to load config:",i)}finally{_e(!1)}}async function Ve(){ge(!0),Z(null);try{let i={backendUrl:e.backendUrl,apiBasePath:e.apiBasePath,defaultModel:e.defaultModel,defaultProvider:e.defaultProvider};await Pe.set(i);let c={};for(let o of it){let b=n[o];b!=null&&b!==""&&(await _t.set(o,b),c[o]=b)}let S={default_model:e.defaultModel,default_provider:e.defaultProvider,data_dir:v||void 0},K={};for(let[o,b]of Object.entries(c))K[o]={...K[o]||{},api_key:b};for(let o of it){let b=(u[o]||"").trim();b&&(K[o]={...K[o]||{},base_url:b})}for(let o of it){let b=f[o];Array.isArray(b)&&(K[o]={...K[o]||{},models:b})}Object.keys(K).length>0&&(S.providers=K);let N=null;try{let o=await chrome.runtime.sendMessage({type:q.UPDATE_CONFIG,payload:S});o?.success||(N=o?.error||"Backend update rejected")}catch(o){N=o.message||String(o)}a(o=>{let b={...o};for(let L of Object.keys(c))b[L]=!0;return b}),N?(Z({type:"warning",text:l("settings.savedLocalOnly",{error:N})}),setTimeout(()=>Z(null),6e3)):(Z({type:"success",text:l("settings.saved")}),setTimeout(()=>Z(null),5e3))}catch(i){Z({type:"error",text:l("settings.saveFailed",{error:i.message})}),setTimeout(()=>Z(null),6e3)}finally{ge(!1)}}async function Ce(){ce(!0),Z(null);let i=Date.now(),c;try{let K=await chrome.runtime.sendMessage({type:q.GET_HEALTH});if(K?.success&&K.data){let N=K.data.default_model||e.defaultModel;c={type:"success",text:l("settings.testOk",{model:N})}}else throw new Error(K?.error||l("settings.testNoResponse"))}catch(K){c={type:"error",text:l("settings.testFail",{error:K.message})}}let S=Date.now()-i;S<400&&await new Promise(K=>setTimeout(K,400-S)),Z(c),ce(!1),setTimeout(()=>Z(null),5e3)}function Fe(i,c){t(S=>({...S,[i]:c}))}function Ee(i,c){s(S=>({...S,[i]:c}))}function Re(i,c){h(S=>({...S,[i]:c}))}function Qe(i,c){let S=(c||"").trim();S&&d(K=>{let N=K[i]||[];return N.includes(S)?K:{...K,[i]:[...N,S]}})}function g(i,c){d(S=>{let K=S[i]||[];return{...S,[i]:K.filter(N=>N!==c)}})}async function x(){let i=W.name.toLowerCase().replace(/[^a-z0-9]/g,"_");if(!i||!W.baseUrl)return;let c=W.models.split(",").map(S=>S.trim()).filter(Boolean);try{await chrome.runtime.sendMessage({type:q.UPDATE_CONFIG,payload:{providers:{[i]:{name:W.name,base_url:W.baseUrl,api_key:W.apiKey,models:c,protocol:W.protocol||"openai"}}}}),w(S=>[...S,{id:i,name:W.name,base_url:W.baseUrl,models:c,has_api_key:!!W.apiKey,protocol:W.protocol}]),G({name:"",baseUrl:"",apiKey:"",models:"",protocol:"openai"}),pe(!1),C({type:"success",text:l("settings.customAdded")})}catch(S){C({type:"error",text:S.message})}}async function k(i){try{await chrome.runtime.sendMessage({type:q.UPDATE_CONFIG,payload:{delete_providers:[i]}}),w(c=>c.filter(S=>S.id!==i)),C({type:"success",text:l("settings.customDeleted")})}catch(c){C({type:"error",text:c.message})}}function C(i){Z(i),setTimeout(()=>Z(null),4e3)}async function B(i){await fn(i),y(i)}return fe?m`
      <div class="loading-state">
        <div class="spinner"></div>
        <span>${l("common.loading")}</span>
      </div>
    `:m`
    <div class="settings-tab">
      ${se&&m`
        <div class="message ${se.type}">${se.text}</div>
      `}

      <div class="settings-section">
        <h4>${l("settings.language")}</h4>
        <div class="form-group">
          <div class="language-switcher">
            <button
              class="btn-lang ${me==="zh"?"active":""}"
              onClick=${()=>B("zh")}
            >中文</button>
            <button
              class="btn-lang ${me==="en"?"active":""}"
              onClick=${()=>B("en")}
            >English</button>
          </div>
        </div>
      </div>

      <div class="settings-section">
        <h4>${l("settings.fontSize")||"\u5B57\u4F53\u5927\u5C0F"}</h4>
        <div class="form-group">
          <div style="display:flex;align-items:center;gap:10px">
            <span style="font-size:11px;color:var(--text-muted)">A</span>
            <input
              type="range" min="0.8" max="1.4" step="0.05"
              value=${T}
              style="flex:1"
              onInput=${i=>{let c=parseFloat(i.target.value);R(c),document.documentElement.style.setProperty("--font-scale",c),chrome.storage.local.set({_qc_font_scale:c})}}
            />
            <span style="font-size:16px;color:var(--text-muted)">A</span>
            <span style="font-size:11px;color:var(--text-muted);min-width:36px;text-align:right">${Math.round(T*100)}%</span>
          </div>
          <span class="hint">${l("settings.fontSizeHint")||"\u8C03\u8282\u804A\u5929\u548C Agent \u5BF9\u8BDD\u533A\u57DF\u7684\u5B57\u4F53\u5927\u5C0F"}</span>
        </div>
      </div>

      <div class="settings-section">
        <h4>${l("settings.backend")}</h4>
        <div class="form-group">
          <label>${l("settings.backendUrl")}</label>
          <div style="display:flex;align-items:center;gap:8px;">
            <input
              type="text"
              value=${e.backendUrl}
              onInput=${i=>Fe("backendUrl",i.target.value)}
              placeholder="http://127.0.0.1:8700"
              style="flex:1"
            />
            <span title=${ye==="connected"?l("settings.backendConnected")||"\u540E\u7AEF\u5DF2\u8FDE\u63A5":ye==="disconnected"?l("settings.backendDisconnected")||"\u540E\u7AEF\u672A\u8FDE\u63A5":l("settings.backendChecking")||"\u68C0\u6D4B\u4E2D..."} style="font-size:10px;line-height:1;flex-shrink:0;cursor:help">${ye==="connected"?"\u{1F7E2}":ye==="disconnected"?"\u{1F534}":"\u{1F7E1}"}</span>
          </div>
          <span class="hint">${ye==="disconnected"?l("settings.backendDisconnectedHint")||"\u65E0\u6CD5\u8FDE\u63A5\u540E\u7AEF\uFF0C\u8BF7\u786E\u8BA4 python main.py \u5DF2\u542F\u52A8":l("settings.backendHint")}</span>
        </div>
        <div class="form-group">
          <button class="btn-secondary" onClick=${()=>{Ce(),qe()}} disabled=${ee}>
            ${ee?l("settings.testing"):l("settings.testConnection")}
          </button>
        </div>
      </div>

      <div class="settings-section">
        <h4>${l("settings.storagePath")}</h4>
        <div class="form-group">
          <label>${l("settings.storagePathLabel")}</label>
          <input
            type="text"
            value=${v}
            onInput=${i=>p(i.target.value)}
            placeholder=${v||"~/.quantclass/data"}
            spellcheck="false"
            style="font-family:monospace;font-size:11px"
          />
          <span class="hint">${l("settings.storagePathHint")}</span>
        </div>
      </div>

      <div class="settings-section">
        <h4>${l("settings.defaultModel")}</h4>
        <div class="form-group">
          <label>${l("settings.selectModel")}</label>
          <select
            value=${e.defaultModel}
            onChange=${i=>{let c=i.target.value,S=Ge.find(o=>o.models.includes(c))||Pt.find(o=>o.models.includes(c)),K=S?null:_.find(o=>(o.models||[]).includes(c)),N=S||K;t(o=>({...o,defaultModel:c,defaultProvider:N?.id||o.defaultProvider}))}}
          >
            ${Pt.map(i=>m`
              <optgroup key=${i.id} label=${i.name}>
                ${i.models.map(c=>m`
                  <option key=${c} value=${c}>${c}</option>
                `)}
              </optgroup>
            `)}
            ${_.map(i=>m`
              <optgroup key=${i.id} label=${i.name}>
                ${(i.models||[]).map(c=>m`
                  <option key=${c} value=${c}>${c}</option>
                `)}
              </optgroup>
            `)}
          </select>
        </div>
      </div>

      <div class="settings-section">
        <h4>${l("settings.apiKeys")}</h4>
        <p class="section-hint">${l("settings.apiKeysHint")}</p>

        ${Ge.map(i=>m`
          <div class="provider-block" key=${i.id}>
            <div class="provider-name">${i.name}</div>

            <div class="form-group">
              <label class="sub-label">${l("settings.apiBaseUrlLabel")}</label>
              <input
                type="text"
                value=${u[i.id]||""}
                onInput=${c=>Re(i.id,c.target.value)}
                placeholder=${l("settings.apiBaseUrlPlaceholder",{url:i.defaultBaseUrl})}
                spellcheck="false"
                autocomplete="off"
              />
            </div>

            <div class="form-group">
              <label class="sub-label">${l("settings.apiKeyLabel")}</label>
              <input
                type="password"
                value=${n[i.id]||""}
                onInput=${c=>Ee(i.id,c.target.value)}
                placeholder=${l("settings.apiKeyPlaceholder",{provider:i.name})}
                autocomplete="off"
              />
              ${r[i.id]&&!n[i.id]&&m`
                <span class="hint">${l("settings.apiKeyConfigured")}</span>
              `}
            </div>

            <div class="form-group">
              <label class="sub-label">MODELS</label>
              <div style="display:flex;gap:4px;margin-bottom:4px">
                <select id="test-model-${i.id}" style="flex:1;font-size:11px;padding:4px 8px;font-family:monospace">
                  ${(f[i.id]||[]).map(c=>m`<option key=${c} value=${c}>${c}</option>`)}
                </select>
                <button class="btn-secondary" style="padding:4px 8px;font-size:10px;white-space:nowrap" onClick=${async c=>{let S=c.target,K=document.getElementById("test-model-"+i.id),N=f[i.id]||[],o=K?.value||N[0];if(!o){C({type:"error",text:`\u274C ${i.name}: no model configured`});return}S.textContent="\u23F3",S.disabled=!0;try{let b=await chrome.runtime.sendMessage({type:"TEST_PROVIDER",payload:{provider:i.id,model:o}});b?.success?C({type:"success",text:`\u2705 ${i.name}/${b.data?.model}: ${b.data?.response||"OK"}`}):C({type:"error",text:`\u274C ${i.name}: ${b?.error||"failed"}`})}catch(b){C({type:"error",text:`\u274C ${b.message}`})}finally{S.textContent="\u{1F50D} \u6D4B\u8BD5",S.disabled=!1}}}>🔍 测试</button>
              </div>
              <div style="display:flex;gap:4px;margin-bottom:4px">
                <input type="text" id="add-model-${i.id}" placeholder="添加模型名，回车或点击 ➜" style="flex:1;font-size:11px;padding:4px 8px;font-family:monospace" onKeyDown=${c=>{c.key==="Enter"&&(Qe(i.id,c.target.value),c.target.value="")}} />
                <button class="btn-secondary" style="padding:4px 6px;font-size:10px" onClick=${()=>{let c=document.getElementById("add-model-"+i.id);Qe(i.id,c?.value),c&&(c.value="")}}>➜</button>
              </div>
              ${(f[i.id]||[]).length>0&&m`
                <div style="display:flex;flex-wrap:wrap;gap:4px">
                  ${(f[i.id]||[]).map(c=>m`
                    <span key=${c} style="display:inline-flex;align-items:center;gap:4px;font-size:10px;padding:2px 6px;background:#f0f0f0;border-radius:10px;font-family:monospace">
                      ${c}
                      <button
                        style="background:none;border:none;cursor:pointer;color:#888;padding:0;font-size:11px;line-height:1"
                        title="删除"
                        onClick=${()=>g(i.id,c)}
                      >×</button>
                    </span>
                  `)}
                </div>
              `}
            </div>
          </div>
        `)}

        ${_.map(i=>m`
          <div class="provider-block" key=${i.id}>
            <div class="provider-name">
              ${i.name}
              <span style="font-size:10px;color:#888;font-weight:normal;margin-left:6px">${(i.protocol||"openai").toUpperCase()}</span>
              <button class="provider-delete" onClick=${()=>k(i.id)} title="${l("common.delete")}">🗑️</button>
            </div>
            <div class="form-group">
              <label class="sub-label">Base URL</label>
              <input type="text" value=${i.base_url} disabled class="input-disabled" />
            </div>
            <div class="form-group">
              <label class="sub-label">Models</label>
              <span class="hint">${i.models.join(", ")||"none"}</span>
            </div>
          </div>
        `)}

        <button class="btn-add-custom" onClick=${()=>pe(i=>!i)}>
          ${xe?"\u2715 "+l("settings.customCancel"):"\u2795 "+l("settings.customAdd")}
        </button>

        ${xe&&m`
          <div class="custom-form">
            <div class="form-group">
              <label class="sub-label">${l("settings.customName")}</label>
              <input type="text" value=${W.name} onInput=${i=>G(c=>({...c,name:i.target.value}))} placeholder="My LLM" />
            </div>
            <div class="form-group">
              <label class="sub-label">Base URL</label>
              <input type="text" value=${W.baseUrl} onInput=${i=>G(c=>({...c,baseUrl:i.target.value}))} placeholder="https://api.example.com/v1" />
            </div>
            <div class="form-group">
              <label class="sub-label">API Key</label>
              <input type="password" value=${W.apiKey} onInput=${i=>G(c=>({...c,apiKey:i.target.value}))} placeholder="sk-..." />
            </div>
            <div class="form-group">
              <label class="sub-label">${l("settings.customModels")}</label>
              <input type="text" value=${W.models} onInput=${i=>G(c=>({...c,models:i.target.value}))} placeholder="model-a, model-b" />
            </div>
            <div class="form-group">
              <label class="sub-label">${l("settings.protocol")||"\u534F\u8BAE"}</label>
              <select value=${W.protocol} onChange=${i=>G(c=>({...c,protocol:i.target.value}))}>
                <option value="openai">OpenAI 兼容（/v1/chat/completions）</option>
                <option value="anthropic">Anthropic 原生（/v1/messages）</option>
              </select>
              <span class="hint">${l("settings.protocolHint")||"\u5927\u90E8\u5206\u7B2C\u4E09\u65B9\u4EE3\u7406\u7528 OpenAI \u534F\u8BAE\uFF1B\u53EA\u6709\u5B98\u65B9 Anthropic API \u6216\u539F\u751F\u955C\u50CF\u624D\u9009 Anthropic"}</span>
            </div>
            <button class="btn-primary" style="width:100%" onClick=${x} disabled=${!W.name||!W.baseUrl}>
              ${l("settings.customConfirm")}
            </button>
          </div>
        `}
      </div>

      <div class="settings-section">
        <h4>${l("settings.skillManage")||"\u89C6\u89D2 / Skill \u7BA1\u7406"}</h4>
        <p class="section-hint">${l("settings.skillHint")||"\u540D\u4EBA\u601D\u7EF4\u6846\u67B6 \u2014 \u8BA9 AI \u4EE5\u4E0D\u540C\u89C6\u89D2\u5206\u6790\u95EE\u9898"}</p>

        ${P.length>0&&m`
          <div style="margin-bottom:8px;font-size:11px;color:var(--text-muted)">${P.length} ${l("settings.skillInstalled")||"\u4E2A\u89C6\u89D2\u5DF2\u5B89\u88C5"}</div>
          ${P.map(i=>m`
            <div class="provider-block" key=${i.id} style="padding:8px 10px">
              <div style="display:flex;align-items:center;gap:6px">
                <span style="font-size:16px">${yt(i,24)}</span>
                <span style="font-size:12px;font-weight:600;flex:1">${i.display_name||i.name}</span>
                <label style="font-size:11px;display:flex;align-items:center;gap:4px;cursor:pointer">
                  <input type="checkbox" checked=${i.enabled!==!1} onChange=${async c=>{let S=c.target.checked;await chrome.runtime.sendMessage({type:q.UPDATE_CONFIG,payload:{}});let N=(await Pe.get())?.backendUrl||de.backendUrl;await fetch(N+de.apiBasePath+"/skills/"+encodeURIComponent(i.id),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({enabled:S})}),D(o=>o.map(b=>b.id===i.id?{...b,enabled:S}:b))}} />
                  ${i.enabled!==!1?l("settings.skillEnabled")||"\u542F\u7528":l("settings.skillDisabled")||"\u7981\u7528"}
                </label>
                <button class="provider-delete" onClick=${async()=>{let S=(await Pe.get())?.backendUrl||de.backendUrl;await fetch(S+de.apiBasePath+"/skills/"+encodeURIComponent(i.id),{method:"DELETE"}),D(K=>K.filter(N=>N.id!==i.id))}} title="${l("common.delete")}">🗑️</button>
              </div>
              <div style="font-size:10px;color:var(--text-muted);margin-top:2px">${(i.description||"").substring(0,80)}${i.description?.length>80?"...":""}</div>
            </div>
          `)}
        `}

        ${P.length===0&&m`
          <div style="font-size:12px;color:var(--text-muted);padding:8px 0">${l("settings.skillEmpty")||"\u6682\u65E0\u89C6\u89D2\u3002\u53EF\u901A\u8FC7\u4E0B\u65B9\u5BFC\u5165\u3002"}</div>
        `}

        <div style="margin-top:8px">
          <button class="btn-add-custom" onClick=${async()=>{let i=prompt(l("settings.skillImportPrompt")||"\u8BF7\u8F93\u5165 people-skill \u76EE\u5F55\u8DEF\u5F84\uFF08\u5982 /Users/.../people-skill\uFF09");if(i){C({type:"success",text:"\u23F3 \u5BFC\u5165\u4E2D..."});try{let S=(await Pe.get())?.backendUrl||de.backendUrl,N=await(await fetch(S+de.apiBasePath+"/skills/import",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({source_dir:i})})).json();if(N.code===0){C({type:"success",text:"\u2705 "+(l("settings.skillImported")||"\u5BFC\u5165\u6210\u529F")+"\uFF1A"+N.data.imported+" \u4E2A\u89C6\u89D2"});let o=await chrome.runtime.sendMessage({type:q.LIST_SKILLS}),b=o?.data?.data??o?.data;Array.isArray(b)&&D(b)}else C({type:"error",text:"\u274C "+(N.message||"import failed")})}catch(c){C({type:"error",text:"\u274C "+c.message})}}}}>
            📥 ${l("settings.skillImport")||"\u5BFC\u5165\u89C6\u89D2\u5E93"}
          </button>
        </div>
      </div>

      <div class="settings-section">
        <h4>${l("settings.agentManage")}</h4>
        <p class="section-hint">${l("settings.agentHint")}</p>

        ${H.map(i=>m`
          <div class="provider-block" key=${i.id} style="margin-bottom:6px;padding:8px 12px">
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-size:18px">${i.icon}</span>
              <div style="flex:1;min-width:0">
                <div style="font-size:12px;font-weight:600">${i.name}</div>
                <div style="font-size:10px;color:var(--text-muted)">
                  ${i.description}
                  ${i.skill_id&&m`    <span style="color:var(--primary)">${yt(P.find(c=>c.id===i.skill_id),14)} ${(P.find(c=>c.id===i.skill_id)||{}).display_name||i.skill_id}</span>`}
                </div>
              </div>
              <button class="chat-hist-action" onClick=${()=>{ae===i.id?le(null):(le(i.id),j({name:i.name,icon:i.icon,description:i.description,prompt:i.prompt,skill_id:i.skill_id||""}),Se(!1))}} title="编辑">${ae===i.id?"\u25B2":"\u270F\uFE0F"}</button>
              <button class="chat-hist-action" onClick=${async()=>{if(confirm("\u5220\u9664 "+i.name+"?"))try{await chrome.runtime.sendMessage({type:"DELETE_AGENT",payload:{id:i.id}}),z(c=>c.filter(S=>S.id!==i.id)),C({type:"success",text:"\u2713 \u5DF2\u5220\u9664"})}catch(c){C({type:"error",text:c.message})}}} title="删除">🗑️</button>
            </div>

            ${ae===i.id&&m`
              <div class="custom-form" style="margin-top:8px">
                <div class="form-group">
                  <label class="sub-label">名称</label>
                  <input type="text" value=${te.name} onInput=${c=>j(S=>({...S,name:c.target.value}))} />
                </div>
                <div class="form-group">
                  <label class="sub-label">图标</label>
                  <input type="text" value=${te.icon} onInput=${c=>j(S=>({...S,icon:c.target.value}))} style="width:60px" />
                </div>
                <div class="form-group">
                  <label class="sub-label">描述</label>
                  <input type="text" value=${te.description} onInput=${c=>j(S=>({...S,description:c.target.value}))} />
                </div>
                <div class="form-group">
                  <label class="sub-label">System Prompt</label>
                  <textarea style="width:100%;min-height:100px;padding:8px;border:1px solid var(--border);border-radius:6px;font-size:12px;font-family:inherit;resize:vertical" value=${te.prompt} onInput=${c=>j(S=>({...S,prompt:c.target.value}))}></textarea>
                </div>
                <div class="form-group">
                  <label class="sub-label">${l("settings.agentSkill")||"\u5173\u8054\u89C6\u89D2\uFF08\u53EF\u9009\uFF09"}</label>
                  <button
                    type="button"
                    style="width:100%;padding:8px 10px;border:1px solid var(--border);border-radius:6px;background:var(--bg-card);font-size:12px;text-align:left;cursor:pointer;display:flex;align-items:center;gap:6px"
                    onClick=${()=>Se(c=>!c)}
                  >
                    ${te.skill_id?m`${yt(P.find(c=>c.id===te.skill_id),20)} <span style="flex:1">${(P.find(c=>c.id===te.skill_id)||{}).display_name||te.skill_id}</span>`:m`<span style="flex:1;color:var(--text-muted)">— ${l("settings.agentNoSkill")||"\u4E0D\u5173\u8054"} —</span>`}
                    <span style="font-size:10px;color:var(--text-muted)">${ue?"\u25B2":"\u25BC"}</span>
                  </button>
                  ${ue&&m`
                    <div style="border:1px solid var(--border-light,#e5e7eb);border-radius:8px;background:var(--bg-elevated,#fff);box-shadow:0 2px 8px rgba(0,0,0,0.08);margin-top:4px;padding:4px;max-height:240px;overflow-y:auto">
                      <button
                        class="effort-option ${te.skill_id?"":"active"}"
                        style="width:100%;text-align:left;padding:6px 8px;border:none;background:none;cursor:pointer;border-radius:6px;font-size:12px"
                        onClick=${()=>{j(c=>({...c,skill_id:""})),Se(!1)}}
                      >— ${l("settings.agentNoSkill")||"\u4E0D\u5173\u8054"} —</button>
                      ${P.map(c=>m`
                        <button
                          key=${c.id}
                          class="effort-option ${te.skill_id===c.id?"active":""}"
                          style="width:100%;text-align:left;padding:6px 8px;border:none;background:none;cursor:pointer;border-radius:6px;font-size:12px;display:flex;align-items:center;gap:8px"
                          onClick=${()=>{j(S=>({...S,skill_id:c.id})),Se(!1)}}
                        >
                          ${yt(c,24)} ${c.display_name||c.name}
                        </button>
                      `)}
                    </div>
                  `}
                  <span class="hint">${l("settings.agentSkillHint")||"\u5173\u8054\u540E\uFF0CAgent \u4F1A\u4EE5\u8BE5\u4EBA\u7269\u7684\u601D\u7EF4\u6846\u67B6\u56DE\u7B54"}</span>
                </div>
                <button class="btn-primary" style="width:100%" onClick=${async()=>{try{await chrome.runtime.sendMessage({type:"UPDATE_AGENT",payload:{id:i.id,...te}});let c=await chrome.runtime.sendMessage({type:q.LIST_AGENTS}),S=c?.data?.data??c?.data;Array.isArray(S)&&z(S),le(null),C({type:"success",text:"\u2713 \u5DF2\u66F4\u65B0"})}catch(c){C({type:"error",text:c.message})}}}>保存</button>
              </div>
            `}
          </div>
        `)}

        ${H.length===0&&m`<div style="color:var(--text-muted);font-size:12px;padding:8px">加载中...</div>`}

        <button class="btn-add-custom" onClick=${()=>V(i=>!i)}>
          ${U?"\u2715 \u53D6\u6D88":"\u2795 "+l("settings.agentAdd")}
        </button>

        ${U&&m`
          <div class="custom-form">
            <div class="form-group">
              <label class="sub-label">${l("settings.agentNamePrompt")}</label>
              <input type="text" value=${Y.name} onInput=${i=>re(c=>({...c,name:i.target.value}))} placeholder="产品经理" />
            </div>
            <div class="form-group">
              <label class="sub-label">Emoji 图标</label>
              <input type="text" value=${Y.icon} onInput=${i=>re(c=>({...c,icon:i.target.value}))} placeholder="💼" style="width:60px" />
            </div>
            <div class="form-group">
              <label class="sub-label">一句话描述</label>
              <input type="text" value=${Y.description} onInput=${i=>re(c=>({...c,description:i.target.value}))} placeholder="从产品角度分析" />
            </div>
            <div class="form-group">
              <label class="sub-label">System Prompt（角色设定）</label>
              <textarea style="width:100%;min-height:80px;padding:8px;border:1px solid var(--border);border-radius:6px;font-size:12px;font-family:inherit;resize:vertical" value=${Y.prompt} onInput=${i=>re(c=>({...c,prompt:i.target.value}))} placeholder="你是一个..."></textarea>
            </div>
            <button class="btn-primary" style="width:100%" disabled=${!Y.name||!Y.prompt} onClick=${async()=>{let i=Y.name.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]/g,"_").substring(0,30);try{await chrome.runtime.sendMessage({type:"CREATE_AGENT",payload:{id:i,...Y}});let c=await chrome.runtime.sendMessage({type:q.LIST_AGENTS}),S=c?.data?.data??c?.data;Array.isArray(S)&&z(S),re({name:"",icon:"\u{1F916}",description:"",prompt:""}),V(!1),C({type:"success",text:l("settings.agentCreated")})}catch(c){C({type:"error",text:c.message})}}}>
              ${l("settings.customConfirm")}
            </button>
          </div>
        `}
      </div>

      <div class="settings-section" style="text-align:center;border-bottom:none">
        <span style="font-size:11px;color:var(--text-muted);cursor:default;user-select:none" onClick=${()=>{let i=he+1;if($e(i),i>=5){let c=!Ae;chrome.storage.local.set({_qc_dev:c}),De(c),$e(0),C({type:"success",text:c?"\u{1F513} \u5F00\u53D1\u8005\u6A21\u5F0F\u5DF2\u6FC0\u6D3B":"\u{1F512} \u5F00\u53D1\u8005\u6A21\u5F0F\u5DF2\u5173\u95ED"})}setTimeout(()=>$e(0),3e3)}}>
          QuantClass Smart v0.2.0
        </span>
        ${Ae&&m`
          <div style="margin-top:6px">
            <span style="font-size:10px;color:var(--success)">🔧 开发者模式</span>
            <button class="chat-hist-action" onClick=${()=>{chrome.storage.local.set({_qc_dev:!1}),De(!1),C({type:"success",text:"\u{1F512} \u5DF2\u9000\u51FA\u5F00\u53D1\u8005\u6A21\u5F0F"})}} style="font-size:10px;margin-left:8px">退出</button>
          </div>
        `}
      </div>

      <div class="settings-actions">
        <button class="btn-primary" onClick=${Ve} disabled=${Ue}>
          ${Ue?l("settings.saving"):l("settings.saveButton")}
        </button>
        <button class="btn-secondary" onClick=${Ke}>${l("common.reset")}</button>
      </div>
    </div>
  `}function Vn({onDismiss:e}){return m`
    <div class="onboarding-card">
      <h3 style="margin:0 0 12px;font-size:15px">👋 欢迎使用 QuantClass Smart</h3>
      <ol style="margin:0;padding-left:20px;font-size:13px;line-height:1.8">
        <li><strong>启动后端</strong> — 在终端运行 <code>bash scripts/start.sh</code></li>
        <li><strong>打开论坛帖子</strong> — 访问 <a href="https://bbs.quantclass.cn" target="_blank">bbs.quantclass.cn</a> 任意帖子</li>
        <li><strong>生成摘要</strong> — 点击上方“摘要”页签，点击生成按钮</li>
      </ol>
      <button class="btn-secondary" style="margin-top:10px;font-size:12px" onClick=${e}>
        我知道了，不再显示
      </button>
    </div>
  `}function Qn(){let[e,t]=$("chat"),[n,s]=$(null),[r,a]=$(!0),[,u]=$(0),[h,f]=$(!1);ie(()=>(hn().then(()=>u(_=>_+1)),chrome.storage.local.get("_qc_font_scale",_=>{let w=parseFloat(_._qc_font_scale)||1;document.documentElement.style.setProperty("--font-scale",w)}),_n(()=>u(_=>_+1))),[]),ie(()=>{chrome.storage.local.get("quantclass_onboarding_done",_=>{_.quantclass_onboarding_done||f(!0)})},[]);function d(){chrome.storage.local.set({quantclass_onboarding_done:!0}),f(!1)}ie(()=>{function _(P){return P?{url:P.url,title:P.title,isTopicPage:/\/(thread|topic|t|d)\//.test(P.url||""),isAnalyzable:!/^(chrome|about|edge|brave|file|devtools):/.test(P.url||"")}:null}async function w(){try{let[P]=await chrome.tabs.query({active:!0,currentWindow:!0}),D=_(P);D&&s(D)}catch(P){console.warn("refreshActiveTab failed:",P)}finally{a(!1)}}w();let H=()=>{w()};chrome.tabs.onActivated.addListener(H);let z=(P,D,U)=>{if(U?.active&&(D.url||D.title||D.status==="complete")){let V=_(U);V&&s(V)}};return chrome.tabs.onUpdated.addListener(z),()=>{chrome.tabs.onActivated.removeListener(H),chrome.tabs.onUpdated.removeListener(z)}},[]);let v=[{id:"chat",label:l("tab.chat"),icon:"\u{1F4AC}"},{id:"agent",label:"Agent",icon:"\u{1F916}"},{id:"knowledge",label:l("tab.knowledge"),icon:"\u{1F4DA}"},{id:"settings",label:l("tab.settings"),icon:"\u2699\uFE0F"}];function p(){switch(e){case"chat":return m`<${Sn} currentPage=${n} />`;case"agent":return m`<${kn} currentPage=${n} />`;case"knowledge":return m`<${wn} />`;case"settings":return m`<${xn} />`;default:return null}}return r?m`
      <div class="loading-container">
        <div class="spinner"></div>
      </div>
    `:m`
    <div class="app">
      <div class="app-main">

        ${h&&m`<${Vn} onDismiss=${d} />`}

        <main class="tab-content">
          ${p()}
        </main>
      </div>

      <${mn}
        tabs=${v}
        activeTab=${e}
        onChange=${t}
      />
    </div>
  `}try{chrome.runtime&&chrome.runtime.sendMessage&&chrome.runtime.sendMessage({type:"GET_HEALTH"},()=>{chrome.runtime.lastError})}catch{}Et(m`<${Qn} />`,document.getElementById("app"));})();