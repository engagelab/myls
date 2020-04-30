(function(t){function e(e){for(var s,a,o=e[0],l=e[1],c=e[2],d=0,p=[];d<o.length;d++)a=o[d],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&p.push(r[a][0]),r[a]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(t[s]=l[s]);u&&u(e);while(p.length)p.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],s=!0,o=1;o<n.length;o++){var l=n[o];0!==r[l]&&(s=!1)}s&&(i.splice(e--,1),t=a(a.s=n[0]))}return t}var s={},r={main:0},i=[];function a(e){if(s[e])return s[e].exports;var n=s[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=s,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)a.d(n,s,function(e){return t[e]}.bind(null,s));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/myls/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=e,o=o.slice();for(var c=0;c<o.length;c++)e(o[c]);var u=l;i.push(["28bf","chunk-vendors"]),n()})({"28bf":function(t,e,n){"use strict";n.r(e);var s=n("2b0e"),r=(n("552d"),n("6ff8"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"p-2"},[n("h1",{staticClass:"font-bold"},[t._v("Browsing Survey")]),""==t.mode?n("button",{staticClass:"btn-myls",on:{click:function(e){return t.start()}}},[t._v("Begin")]):t._e(),t.submitStatus?n("div",[n("p",[t._v("Thank you for your submission!")])]):n("div",["consent"==t.mode?[n("p",{staticClass:"pt-2"},[t._v("Do you consent to the University of Oslo collecting this information?")]),n("AnswerInput",{attrs:{mode:"binary",value:t.consented},on:{input:function(e){return t.consented=e}}}),n("button",{staticClass:"btn-myls",class:{"btn-disabled":!t.consented},attrs:{disabled:!t.consented},on:{click:function(e){return t.giveConsent()}}},[t._v("Confirm")])]:t._e(),"intro"==t.mode?[n("p",{staticClass:"pt-2"},[t._v("I. Activities")]),t._l(t.tasks,(function(e,s){return n("div",{key:e.id,staticClass:"p-2"},[n("h2",{staticClass:"font-bold"},[t._v(t._s(s+1)+". "+t._s(e.title))]),n("p",{staticClass:"mb-2"},[t._v(t._s(e.description))]),t._l(e.details,(function(e){return n("div",{key:e.id,staticClass:"flex flex-row pl-2"},[n("span",{staticClass:"pr-2"},[t._v(t._s(e.title))]),n("AnswerInput",{attrs:{mode:"binary",value:e.selected},on:{input:function(t){return e.selected=t}}})],1)}))],2)})),n("button",{staticClass:"btn-myls",class:{"btn-disabled":t.detailItems.length<1},attrs:{disabled:t.detailItems.length<1},on:{click:function(e){return t.selectTasks()}}},[t._v("Confirm")])]:t._e(),"details"==t.mode?[n("p",{staticClass:"pt-2"},[t._v("II. Resources")]),n("URLSelection",{key:t.detail.id,staticClass:"p-2",attrs:{title:t.detail.title,taskTitle:t.detail.taskTitle,description:t.detail.description,urls:t.detail.urls,columns:t.detail.columns,entrytype:t.detail.entrytype},on:{"next-detail":function(e){return t.nextDetail(e,t.detail)}}})]:t._e(),"submit"==t.mode?[n("p",[t._v("We will now scan your browser history to count URLs matching only those you selected in the survey")]),n("p",[t._v("By clicking 'Submit' you agree to share both your survey answers and selective browser history for the selected URLs with the University of Oslo MyLS Project")]),n("button",{staticClass:"btn-myls",on:{click:function(e){return t.submitChoices()}}},[t._v("Submit")])]:t._e(),"error"==t.mode?[n("p",[t._v(t._s(t.errorMessage))]),n("p",[t._v("Ensure you are running Chrome web browser and have the Extension installed.")]),n("button",{staticClass:"btn-myls",on:{click:function(e){return t.getExtension()}}},[t._v("Get the Chrome extension...")])]:t._e()],2)])}),i=[],a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h1",{staticClass:"font-bold"},[t._v(t._s(t.taskTitle)+": "+t._s(t.title))]),n("p",[t._v(t._s(t.description))]),n("div",{staticClass:"flex flex-row content-start justify-between"},[n("table",{staticClass:"table-fixed"},[n("thead",[n("tr",t._l(t.columns,(function(e,s){return n("th",{key:"CH"+e.name,staticClass:"px-4 py-2",class:[0===s?"w-1/4":"w-1/6"]},[t._v(t._s(e.name))])})),0)]),n("tbody",t._l(t.urlList,(function(e,s){return n("tr",{key:e.id,class:{"bg-gray-100":s%2===0}},t._l(t.columns,(function(r,i){return n("td",{key:"CR"+r.name,staticClass:"border px-4 py-2"},["select"==t.entrytype?n("div",{staticClass:"flex flex-row justify-between"},[0===i?n("span",{staticClass:"font-mono text-sm text-green-900 break-words max-w-12"},[t._v(t._s(e.title))]):t._e(),0===i?n("AnswerInput",{attrs:{mode:"binary"},model:{value:e.selections.selected,callback:function(n){t.$set(e.selections,"selected",n)},expression:"u.selections.selected"}}):t._e(),i>0&&e.selections.selected?n("AnswerInput",{attrs:{mode:r.type},model:{value:e.selections[r.name],callback:function(n){t.$set(e.selections,r.name,n)},expression:"u.selections[c.name]"}}):t._e()],1):t._e(),"text"==t.entrytype?n("div",{staticClass:"flex flex-row items-center"},[0===i?n("AnswerInput",{attrs:{mode:"url"},model:{value:e.title,callback:function(n){t.$set(e,"title",n)},expression:"u.title"}}):t._e(),i>0?n("AnswerInput",{attrs:{mode:r.type},model:{value:e.selections[r.name],callback:function(n){t.$set(e.selections,r.name,n)},expression:"u.selections[c.name]"}}):t._e(),0===i?n("button",{staticClass:"btn-myls bg-red-400",on:{click:function(e){return t.removeRow(s)}}},[t._v("X")]):t._e()],1):t._e()])})),0)})),0)])]),n("div",{staticClass:"flex flex-row mt-4"},["text"==t.entrytype?n("button",{staticClass:"btn-myls mr-4",on:{click:function(e){return t.addRow()}}},[t._v("Add URL")]):t._e(),n("button",{staticClass:"btn-myls",on:{click:function(e){return t.nextDetail()}}},[t._v("Next")])])])},o=[],l=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"flex flex-row items-center ml-2"},["binary"==t.mode?[n("input",{directives:[{name:"model",rawName:"v-model",value:t.selectedBoolean,expression:"selectedBoolean"}],staticClass:"mr-1 mb-1",attrs:{type:"radio",id:"yes"},domProps:{value:!0,checked:t._q(t.selectedBoolean,!0)},on:{input:t.valueInput,change:function(e){t.selectedBoolean=!0}}}),n("label",{staticClass:"mr-2",attrs:{for:"yes"}},[t._v("Yes")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.selectedBoolean,expression:"selectedBoolean"}],staticClass:"mr-1 mb-1",attrs:{type:"radio",id:"no"},domProps:{value:!1,checked:t._q(t.selectedBoolean,!1)},on:{input:t.valueInput,change:function(e){t.selectedBoolean=!1}}}),n("label",{staticClass:"mr-1",attrs:{for:"no"}},[t._v("No")])]:t._e(),"url"==t.mode?[n("input",{staticClass:"mr-1 mb-1",attrs:{type:"url",id:"urlString",placeholder:"https://example.com",pattern:"https://.*",size:"30",required:""},on:{input:t.valueInput}})]:t._e(),"text"==t.mode?[n("input",{staticClass:"mr-1 mb-1 checkValid",attrs:{type:"text",id:"textString"},on:{input:t.valueInput}})]:t._e(),"quaternary"==t.mode?[n("input",{directives:[{name:"model",rawName:"v-model",value:t.selectedQuart,expression:"selectedQuart"}],staticClass:"mr-1 mb-1",attrs:{type:"radio",id:"1-25",value:"1-25%"},domProps:{checked:t._q(t.selectedQuart,"1-25%")},on:{input:t.valueInput,change:function(e){t.selectedQuart="1-25%"}}}),n("label",{staticClass:"inputQ",attrs:{for:"1-25"}},[t._v("1-25%")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.selectedQuart,expression:"selectedQuart"}],staticClass:"mr-1 mb-1",attrs:{type:"radio",id:"25-50",value:"25-50%"},domProps:{checked:t._q(t.selectedQuart,"25-50%")},on:{input:t.valueInput,change:function(e){t.selectedQuart="25-50%"}}}),n("label",{staticClass:"inputQ",attrs:{for:"25-50"}},[t._v("25-50%")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.selectedQuart,expression:"selectedQuart"}],staticClass:"mr-1 mb-1",attrs:{type:"radio",id:"50-75",value:"50-75%"},domProps:{checked:t._q(t.selectedQuart,"50-75%")},on:{input:t.valueInput,change:function(e){t.selectedQuart="50-75%"}}}),n("label",{staticClass:"inputQ",attrs:{for:"50-75"}},[t._v("50-75%")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.selectedQuart,expression:"selectedQuart"}],staticClass:"mr-1 mb-1",attrs:{type:"radio",id:"100",value:"100%"},domProps:{checked:t._q(t.selectedQuart,"100%")},on:{input:t.valueInput,change:function(e){t.selectedQuart="100%"}}}),n("label",{staticClass:"inputQ",attrs:{for:"100"}},[t._v("100%")])]:t._e()],2)},c=[],u={model:{prop:"value",event:"input"},props:{value:{default:""},mode:{value:String,default:"binary"}},data:function(){return{selectedBoolean:!1,selectedQuart:""}},methods:{valueInput:function(t){var e="binary"==this.mode?"true"==t.target.value:t.target.value;this.$emit("input",e)}}},d=u,p=(n("3f75"),n("2877")),m=Object(p["a"])(d,l,c,!1,null,"24973ac7",null),f=m.exports;function v(t){return _(t)||b(t)||h(t)||y()}function y(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function h(t,e){if(t){if("string"===typeof t)return g(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?g(t,e):void 0}}function b(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function _(t){if(Array.isArray(t))return g(t)}function g(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,s=new Array(e);n<e;n++)s[n]=t[n];return s}var x={name:"URLSelection",components:{AnswerInput:f},props:{taskTitle:{type:String,default:""},title:{type:String,default:""},description:{type:String,default:""},urls:{type:Array,default:function(){return[]}},columns:{type:Array,default:function(){return[]}},entrytype:{type:String,default:"select"}},data:function(){return{urlList:[]}},mounted:function(){this.urlList=v(this.urls)},methods:{nextDetail:function(){this.$emit("next-detail",this.urlList)},removeRow:function(t){this.urlList.splice(t,1)},addRow:function(){this.urlList.push({id:"url-".concat(Math.random()),title:"other",selections:{selected:!0,URL:"",Activity:"","Time Spent":""},info:"".concat(this.taskTitle," : ").concat(this.title)})}}},w=x,C=Object(p["a"])(w,a,o,!1,null,"932f3dc4",null),k=C.exports,I="hdjjofjopiphcfadpdmgejhdfhppenah",S={name:"app",components:{URLSelection:k,AnswerInput:f},data:function(){return{submitStatus:!1,domains:[],tasks:[],detailIndex:0,data:[],errorMessage:"",consented:!1,mode:""}},created:function(){},computed:{detailItems:function(){var t=[];return this.tasks.forEach((function(e){e.details.filter((function(t){return t.selected})).forEach((function(e){return t.push(e)}))})),t},detail:function(){return this.detailItems[this.detailIndex]}},methods:{start:function(){var t=this;this.mode="consent";try{chrome.runtime.sendMessage(I,{type:"HELLO"},(function(e){e&&e.success?t.getData():(console.log("Error connecting to Chrome Extension"),t.errorMessage="Chrome Extension not found",t.mode="error")}))}catch(e){console.log(e)}},submitChoices:function(){var t=this,e=(this.detailItems,this.detailItems.map((function(t){return t.urls.filter((function(t){return t.selections.selected}))})).reduce((function(t,e){return t.concat(e)}))),n={data:e,type:"SUBMIT"};chrome.runtime.sendMessage(I,n,(function(e){e.success?(t.submitStatus=!0,window.localStorage.setItem("submitStatus",!0)):console.log("Error sending data to server")}))},getData:function(){var t=this,e=new XMLHttpRequest,n={Accept:"application/json, text/plain, */*","Content-Type":"application/json"};e.addEventListener("loadend",(function(){t.data=e.response,t.configureData()}));var s="8080",r="192.168.1.11",i="https",a="/api/data",o="".concat(i,"://").concat(r,":").concat(s);e.open("GET","".concat(o).concat(a)),e.responseType="json",e.withCredentials=!1;var l=Object.keys(n);l.forEach((function(t){return e.setRequestHeader(t,n[t])}));try{e.send()}catch(c){console.log(c)}},configureData:function(){this.tasks=this.data.map((function(t,e){var n=t.details.map((function(e,n){var s=e.urls.map((function(n,s){var r={selected:!1};return e.columns.forEach((function(t){return r[t.name]="binary"!=t.type&&""})),{id:"url-".concat(s),title:n,selections:r,info:"".concat(t.title," : ").concat(e.title)}}));return{id:"detail-".concat(n),taskTitle:t.title,title:e.title,description:e.description,urls:s,columns:e.columns,entrytype:e.entrytype||"select",selected:!1}}));return{id:"task-".concat(e),title:t.title,description:t.description,details:n,selected:!1}}))},giveConsent:function(){this.mode="intro"},selectTasks:function(){this.mode="details"},getExtension:function(){window.open("localhost","_blank")},nextDetail:function(t,e){e.urls=t,this.detailIndex<this.detailItems.length-1?this.detailIndex++:this.mode="submit"}}},j=S,A=(n("75b5"),Object(p["a"])(j,r,i,!1,null,null,null)),O=A.exports;new s["a"]({el:"#app",render:function(t){return t(O)}})},"3f75":function(t,e,n){"use strict";var s=n("7751"),r=n.n(s);r.a},"6ff8":function(t,e,n){},"75b5":function(t,e,n){"use strict";var s=n("c173"),r=n.n(s);r.a},7751:function(t,e,n){},c173:function(t,e,n){}});
//# sourceMappingURL=main.f4b69fc9.js.map