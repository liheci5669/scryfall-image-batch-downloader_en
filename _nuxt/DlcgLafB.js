import{_ as l,U as g,V as u,f as p,n as f,h as c,a1 as b,a2 as y,o as s,K as m,w as k,c as r,E as d,Z as o,L as i,$ as v,aa as h}from"./DP6iaQAV.js";import{u as $}from"./OUNLjZMp.js";const C={base:"",background:"bg-white dark:bg-gray-900",divide:"divide-y divide-gray-200 dark:divide-gray-800",ring:"ring-1 ring-gray-200 dark:ring-gray-800",rounded:"rounded-lg",shadow:"shadow",body:{base:"",background:"",padding:"px-4 py-5 sm:p-6"},header:{base:"",background:"",padding:"px-4 py-5 sm:px-6"},footer:{base:"",background:"",padding:"px-4 py-4 sm:px-6"}},w=g(u.ui.strategy,u.ui.card,C),S=p({inheritAttrs:!1,props:{as:{type:String,default:"div"},class:{type:[String,Object,Array],default:()=>""},ui:{type:Object,default:()=>({})}},setup(a){const{ui:e,attrs:n}=$("card",f(a,"ui"),w),t=c(()=>b(y(e.value.base,e.value.rounded,e.value.divide,e.value.ring,e.value.shadow,e.value.background),a.class));return{ui:e,attrs:n,cardClass:t}}});function B(a,e,n,t,j,A){return s(),m(h(a.$attrs.onSubmit?"form":a.as),v({class:a.cardClass},a.attrs),{default:k(()=>[a.$slots.header?(s(),r("div",{key:0,class:d([a.ui.header.base,a.ui.header.padding,a.ui.header.background])},[o(a.$slots,"header")],2)):i("",!0),a.$slots.default?(s(),r("div",{key:1,class:d([a.ui.body.base,a.ui.body.padding,a.ui.body.background])},[o(a.$slots,"default")],2)):i("",!0),a.$slots.footer?(s(),r("div",{key:2,class:d([a.ui.footer.base,a.ui.footer.padding,a.ui.footer.background])},[o(a.$slots,"footer")],2)):i("",!0)]),_:3},16,["class"])}const U=l(S,[["render",B]]);export{U as default};
