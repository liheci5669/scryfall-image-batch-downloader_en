import{U as T,V as m,_ as $,f as q,n as B,r as h,a8 as F,g as z,v as A,a7 as H,h as R,a1 as x,a2 as D,o as E,c as U,a as G,$ as J,Z as P,E as Z,ad as K}from"./DP6iaQAV.js";import{t as L,u as Q}from"./OUNLjZMp.js";import{u as W}from"./DQT_VdUS.js";const r=T(m.ui.strategy,m.ui.textarea,L),X=q({inheritAttrs:!1,props:{modelValue:{type:[String,Number],default:""},id:{type:String,default:null},name:{type:String,default:null},placeholder:{type:String,default:null},required:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},rows:{type:Number,default:3},maxrows:{type:Number,default:0},autoresize:{type:Boolean,default:!1},autofocus:{type:Boolean,default:!1},autofocusDelay:{type:Number,default:100},resize:{type:Boolean,default:!1},padded:{type:Boolean,default:!0},size:{type:String,default:null,validator(e){return Object.keys(r.size).includes(e)}},color:{type:String,default:()=>r.default.color,validator(e){return[...m.ui.colors,...Object.keys(r.color)].includes(e)}},variant:{type:String,default:()=>r.default.variant,validator(e){return[...Object.keys(r.variant),...Object.values(r.color).flatMap(t=>Object.keys(t))].includes(e)}},textareaClass:{type:String,default:null},class:{type:[String,Object,Array],default:()=>""},ui:{type:Object,default:()=>({})},modelModifiers:{type:Object,default:()=>({})}},emits:["update:modelValue","blur","change"],setup(e,{emit:t}){const{ui:l,attrs:c}=Q("textarea",B(e,"ui"),r,B(e,"class")),{emitFormBlur:p,emitFormInput:v,inputId:n,color:g,size:y,name:C}=W(e,r),s=h(F({},e.modelModifiers,{trim:!1,lazy:!1,number:!1})),o=h(null),w=()=>{var a;e.autofocus&&((a=o.value)==null||a.focus())},d=()=>{if(e.autoresize){if(!o.value)return;o.value.rows=e.rows;const a=o.value.style.overflow;o.value.style.overflow="hidden";const u=window.getComputedStyle(o.value),i=parseInt(u.paddingTop),k=parseInt(u.paddingBottom),M=i+k,V=parseInt(u.lineHeight),{scrollHeight:N}=o.value,f=(N-M)/V;f>e.rows&&(o.value.rows=e.maxrows?Math.min(f,e.maxrows):f),o.value.style.overflow=a}},b=a=>{s.value.trim&&(a=a.trim()),s.value.number&&(a=K(a)),t("update:modelValue",a),v()},I=a=>{d(),s.value.lazy||b(a.target.value)},S=a=>{const u=a.target.value;t("change",u),s.value.lazy&&b(u),s.value.trim&&(a.target.value=u.trim())},j=a=>{t("blur",a),p()};z(()=>{setTimeout(()=>{w()},e.autofocusDelay)}),A(()=>e.modelValue,()=>{H(d)}),z(()=>{setTimeout(()=>{w(),d()},100)});const O=R(()=>{var u,i;const a=((i=(u=l.value.color)==null?void 0:u[g.value])==null?void 0:i[e.variant])||l.value.variant[e.variant];return x(D(l.value.base,l.value.form,l.value.rounded,l.value.placeholder,l.value.size[y.value],e.padded?l.value.padding[y.value]:"p-0",a==null?void 0:a.replaceAll("{color}",g.value),!e.resize&&"resize-none"),e.textareaClass)});return{ui:l,attrs:c,name:C,inputId:n,textarea:o,textareaClass:O,onInput:I,onChange:S,onBlur:j}}}),Y=["id","value","name","rows","required","disabled","placeholder"];function _(e,t,l,c,p,v){return E(),U("div",{class:Z(e.ui.wrapper)},[G("textarea",J({id:e.inputId,ref:"textarea",value:e.modelValue,name:e.name,rows:e.rows,required:e.required,disabled:e.disabled,placeholder:e.placeholder,class:e.textareaClass},e.attrs,{onInput:t[0]||(t[0]=(...n)=>e.onInput&&e.onInput(...n)),onBlur:t[1]||(t[1]=(...n)=>e.onBlur&&e.onBlur(...n)),onChange:t[2]||(t[2]=(...n)=>e.onChange&&e.onChange(...n))}),null,16,Y),P(e.$slots,"default")],2)}const le=$(X,[["render",_]]);export{le as default};
