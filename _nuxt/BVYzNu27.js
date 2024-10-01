import f from"./CJxLGDo5.js";import _ from"./h0EI9ZfU.js";import{u as h}from"./VQp-3XPd.js";import{f as v,g,r as x,h as s,c as y,a as R,b as i,i as l,j as b,k as B,o as N}from"./DP6iaQAV.js";import"./OUNLjZMp.js";import"./DQT_VdUS.js";import"./BtfSvAeU.js";import"./CTZ2Hakn.js";import"./rgl6QvXy.js";import"./CHOj1P8S.js";const V={class:"h-full"},k={class:"flex flex-col gap-5 items-center justify-center h-full mt-[-48px]"},M=v({__name:"index",setup(A){const{cards:o,updateCardNames:c}=h();g(()=>{if(o&&o.value.length!==0){const t=o.value.map(e=>e.name);n.value="1 "+t.join(`
1 `)}});const n=x(`1 Kenrith, the Returned King
1 Archivist of Oghma`),r=s(()=>{if(n.value==="")return[];const t=n.value.split(`
`);return t.every(e=>/\d+ (.*)/.test(e))?t.map(e=>{const a=e.match(/\d+ (.*)/);return a?a[1]:""}):[]}),m=s(()=>r.value.length!==0),u=async()=>{const t=B();c(r.value),t.push("/select")};return(t,e)=>{const a=f,d=_;return N(),y("main",V,[R("section",k,[i(a,{modelValue:l(n),"onUpdate:modelValue":e[0]||(e[0]=p=>b(n)?n.value=p:null),variant:"outline",size:"xl",rows:10,resize:"",placeholder:`1 Kenrith, the Returned King
1 Archivist of Oghma
1 Avacyn's Pilgrim
1 Biomancer's Familiar
...`},null,8,["modelValue"]),i(d,{onClick:u,icon:"i-material-symbols-image-search-rounded",size:"xl",color:"primary",variant:"solid",label:"Search",trailing:!1,disabled:!l(m)},null,8,["disabled"])])])}}});export{M as default};
