(()=>{var e={};e.id=308,e.ids=[308],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},7963:(e,t,a)=>{"use strict";a.r(t),a.d(t,{GlobalError:()=>n.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>d,routeModule:()=>z,tree:()=>c}),a(6784),a(4968),a(5866);var r=a(3191),i=a(8716),o=a(7922),n=a.n(o),s=a(5231),l={};for(let e in s)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>s[e]);a.d(t,l);let c=["",{children:["blog",{children:["[slug]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,6784)),"/home/runner/workspace/src/app/blog/[slug]/page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(a.bind(a,4968)),"/home/runner/workspace/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,5866,23)),"next/dist/client/components/not-found-error"]}],d=["/home/runner/workspace/src/app/blog/[slug]/page.tsx"],u="/blog/[slug]/page",p={require:a,loadChunk:()=>Promise.resolve()},z=new r.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/blog/[slug]/page",pathname:"/blog/[slug]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},4790:(e,t,a)=>{Promise.resolve().then(a.t.bind(a,9404,23)),Promise.resolve().then(a.bind(a,6063)),Promise.resolve().then(a.bind(a,2665))},1085:(e,t,a)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var a in t)Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}(t,{ReadonlyURLSearchParams:function(){return n},RedirectType:function(){return r.RedirectType},notFound:function(){return i.notFound},permanentRedirect:function(){return r.permanentRedirect},redirect:function(){return r.redirect}});let r=a(3953),i=a(6399);class o extends Error{constructor(){super("Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams")}}class n extends URLSearchParams{append(){throw new o}delete(){throw new o}set(){throw new o}sort(){throw new o}}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},6399:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var a in t)Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}(t,{isNotFoundError:function(){return i},notFound:function(){return r}});let a="NEXT_NOT_FOUND";function r(){let e=Error(a);throw e.digest=a,e}function i(e){return"object"==typeof e&&null!==e&&"digest"in e&&e.digest===a}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8586:(e,t)=>{"use strict";var a;Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"RedirectStatusCode",{enumerable:!0,get:function(){return a}}),function(e){e[e.SeeOther=303]="SeeOther",e[e.TemporaryRedirect=307]="TemporaryRedirect",e[e.PermanentRedirect=308]="PermanentRedirect"}(a||(a={})),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},3953:(e,t,a)=>{"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var a in t)Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}(t,{RedirectType:function(){return r},getRedirectError:function(){return l},getRedirectStatusCodeFromError:function(){return y},getRedirectTypeFromError:function(){return z},getURLFromRedirectError:function(){return p},isRedirectError:function(){return u},permanentRedirect:function(){return d},redirect:function(){return c}});let i=a(4580),o=a(2934),n=a(8586),s="NEXT_REDIRECT";function l(e,t,a){void 0===a&&(a=n.RedirectStatusCode.TemporaryRedirect);let r=Error(s);r.digest=s+";"+t+";"+e+";"+a+";";let o=i.requestAsyncStorage.getStore();return o&&(r.mutableCookies=o.mutableCookies),r}function c(e,t){void 0===t&&(t="replace");let a=o.actionAsyncStorage.getStore();throw l(e,t,(null==a?void 0:a.isAction)?n.RedirectStatusCode.SeeOther:n.RedirectStatusCode.TemporaryRedirect)}function d(e,t){void 0===t&&(t="replace");let a=o.actionAsyncStorage.getStore();throw l(e,t,(null==a?void 0:a.isAction)?n.RedirectStatusCode.SeeOther:n.RedirectStatusCode.PermanentRedirect)}function u(e){if("object"!=typeof e||null===e||!("digest"in e)||"string"!=typeof e.digest)return!1;let[t,a,r,i]=e.digest.split(";",4),o=Number(i);return t===s&&("replace"===a||"push"===a)&&"string"==typeof r&&!isNaN(o)&&o in n.RedirectStatusCode}function p(e){return u(e)?e.digest.split(";",3)[2]:null}function z(e){if(!u(e))throw Error("Not a redirect error");return e.digest.split(";",2)[1]}function y(e){if(!u(e))throw Error("Not a redirect error");return Number(e.digest.split(";",4)[3])}(function(e){e.push="push",e.replace="replace"})(r||(r={})),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},6784:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>g,generateStaticParams:()=>y});var r=a(9510),i=a(1085),o=a(7371),n=a(4448),s=a(727),l=a(9558),c=a(7039),d=a(2487);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let u=(0,a(7162).Z)("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);var p=a(2688),z=a(4120);async function y(){return d.n.map(e=>({slug:e.slug}))}function g({params:e}){let t=d.n.find(t=>t.slug===e.slug);return t||(0,i.notFound)(),(0,r.jsxs)("div",{className:"min-h-screen bg-background",children:[r.jsx(n.ZP,{}),r.jsx("main",{className:"section-padding",children:(0,r.jsxs)("div",{className:"max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",children:[r.jsx(o.default,{href:"/blog",children:(0,r.jsxs)(c.z,{variant:"ghost",className:"mb-8","data-testid":"button-back-to-blog",children:[r.jsx(u,{className:"w-4 h-4 mr-2"}),"Powr\xf3t do bloga"]})}),(0,r.jsxs)("article",{className:"space-y-8",children:[(0,r.jsxs)("header",{className:"space-y-4",children:[(0,r.jsxs)("div",{className:"flex items-center gap-4 text-sm text-muted-foreground",children:[(0,r.jsxs)("div",{className:"flex items-center",children:[r.jsx(p.Z,{className:"w-4 h-4 mr-2"}),r.jsx("span",{"data-testid":"text-post-date",children:t.date})]}),(0,r.jsxs)("div",{className:"flex items-center",children:[r.jsx(z.Z,{className:"w-4 h-4 mr-2"}),r.jsx("span",{"data-testid":"text-read-time",children:t.readTime})]})]}),r.jsx("h1",{className:"text-4xl lg:text-5xl font-bold text-foreground leading-tight","data-testid":"text-post-title",children:t.title}),r.jsx("p",{className:"text-xl text-muted-foreground leading-relaxed","data-testid":"text-post-excerpt",children:t.excerpt}),r.jsx(l.C,{variant:"secondary","data-testid":"badge-post-category",children:t.category})]}),r.jsx("div",{className:"w-full h-64 lg:h-96 bg-muted rounded-2xl overflow-hidden",children:r.jsx("img",{src:t.image,alt:t.title,className:"w-full h-full object-cover","data-testid":"img-post-featured"})}),r.jsx("div",{className:"prose prose-lg max-w-none","data-testid":"content-post-body",children:r.jsx("div",{dangerouslySetInnerHTML:{__html:t.content}})})]})]})}),r.jsx(s.ZP,{})]})}},9558:(e,t,a)=>{"use strict";a.d(t,{C:()=>s});var r=a(9510);a(1159);var i=a(6145),o=a(644);let n=(0,i.j)("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground hover:bg-primary/80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",destructive:"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",outline:"text-foreground"}},defaultVariants:{variant:"default"}});function s({className:e,variant:t,...a}){return r.jsx("div",{className:(0,o.cn)(n({variant:t}),e),...a})}},7039:(e,t,a)=>{"use strict";a.d(t,{z:()=>c});var r=a(9510),i=a(1159),o=a(3025),n=a(6145),s=a(644);let l=(0,n.j)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),c=i.forwardRef(({className:e,variant:t,size:a,asChild:i=!1,...n},c)=>{let d=i?o.g7:"button";return r.jsx(d,{className:(0,s.cn)(l({variant:t,size:a,className:e})),ref:c,...n})});c.displayName="Button"},2487:(e,t,a)=>{"use strict";a.d(t,{n:()=>r});let r=[{slug:"11-godzin-odpoczynku-jak-nie-popelnic-bledu",title:"11 godzin odpoczynku - jak nie popełnić błędu?",excerpt:"Najbardziej podstawowa zasada Kodeksu Pracy wytłumaczona na prostych przykładach. Kiedy liczyć od końca zmiany, a kiedy od wyjścia ze sklepu?",category:"Prawo Pracy",date:"15 grudnia 2024",readTime:"5 min czytania",image:"https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",content:`
      <h2>Podstawowa zasada odpoczynku</h2>
      <p>Zgodnie z art. 132 \xa7 1 Kodeksu Pracy, pracownik ma prawo do nieprzerwianego odpoczynku trwającego co najmniej 11 godzin w każdej dobie.</p>
      
      <h3>Kiedy zaczyna się liczyć czas odpoczynku?</h3>
      <p>Odpoczynek rozpoczyna się z chwilą zakończenia pracy, nie zaś opuszczenia miejsca pracy. To oznacza, że jeśli pracownik kończy pracę o 22:00, ale zostaje jeszcze 15 minut na przekazanie kasy, odpoczynek zaczyna się liczyć od 22:15.</p>
      
      <h3>Praktyczne przykłady</h3>
      <ul>
        <li><strong>Zmiana wieczorna:</strong> Pracownik kończy o 22:00 - następną zmianę może rozpocząć najwcześniej o 9:00</li>
        <li><strong>Zmiana nocna:</strong> Pracownik kończy o 6:00 - następną zmianę może rozpocząć najwcześniej o 17:00</li>
        <li><strong>Przekazanie zmiany:</strong> Jeśli przekazanie trwa 30 minut, to ten czas wlicza się do pracy</li>
      </ul>
      
      <h3>Najczęstsze błędy</h3>
      <p>Franczyzobiorcy często mylą się przy:</p>
      <ul>
        <li>Liczeniu czasu od wyjścia ze sklepu zamiast od zakończenia obowiązk\xf3w</li>
        <li>Nieuwzględnianiu czasu przekazania zmiany</li>
        <li>Planowaniu zmian "na granicy" bez marginesu bezpieczeństwa</li>
      </ul>
      
      <h3>Jak uniknąć problem\xf3w?</h3>
      <p>AutoŻaba automatycznie kontroluje przestrzeganie 11-godzinnego odpoczynku i ostrzega przed błędami jeszcze na etapie planowania grafiku.</p>
    `},{slug:"uop-vs-umowa-zlecenie-kiedy-co-wybrac",title:"UoP vs Umowa Zlecenie - kiedy co wybrać?",excerpt:"Praktyczny przewodnik po rodzajach um\xf3w w sklepie. Jak uniknąć przekwalifikowania i kar finansowych? Konkretne przykłady i checklisty.",category:"Umowy",date:"12 grudnia 2024",readTime:"7 min czytania",image:"https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",content:`
      <h2>R\xf3żnice między UoP a umową zlecenie</h2>
      <p>Wyb\xf3r rodzaju umowy w sklepie to jedna z najważniejszych decyzji, kt\xf3ra wpływa na koszty i bezpieczeństwo prawne.</p>
      
      <h3>Umowa o pracę (UoP)</h3>
      <h4>Kiedy stosować:</h4>
      <ul>
        <li>Pracownik pracuje regularnie, minimum 2-3 dni w tygodniu</li>
        <li>Ma stałe godziny pracy i miejsce wykonywania obowiązk\xf3w</li>
        <li>Podlega kierownictwu właściciela sklepu</li>
        <li>Wykonuje podstawowe czynności sprzedawcy</li>
      </ul>
      
      <h4>Korzyści:</h4>
      <ul>
        <li>Większa stabilność zatrudnienia</li>
        <li>Jasne reguły czasu pracy</li>
        <li>Ochrona przed nadużyciami</li>
      </ul>
      
      <h3>Umowa zlecenie</h3>
      <h4>Kiedy stosować:</h4>
      <ul>
        <li>Pracownik pracuje sporadycznie, zastępczo</li>
        <li>Wykonuje konkretne zadania (np. inwentaryzacja)</li>
        <li>Ma elastyczne godziny pracy</li>
        <li>Nie podlega ścisłemu nadzorowi</li>
      </ul>
      
      <h4>Uwaga na przekwalifikowanie!</h4>
      <p>Inspekcja Pracy może przekwalifikować umowę zlecenie na UoP jeśli:</p>
      <ul>
        <li>Praca ma charakter ciągły i regularny</li>
        <li>Pracownik podlega ścisłemu nadzorowi</li>
        <li>Wykonuje typowe obowiązki sprzedawcy</li>
        <li>Ma stałe miejsce i godziny pracy</li>
      </ul>
      
      <h3>Praktyczne wskaz\xf3wki</h3>
      <p>W większości przypadk\xf3w w sklepach Żabka najbezpieczniejsze jest stosowanie um\xf3w o pracę dla pracownik\xf3w stałych. Umowy zlecenie pozostaw dla prawdziwych zleceń - zastępstw, sprzątania, czy konkretnych projekt\xf3w.</p>
      
      <h3>Automatyczna kontrola w AutoŻaba</h3>
      <p>System AutoŻaba analizuje wzorce pracy i ostrzega przed ryzykiem przekwalifikowania um\xf3w, pomagając utrzymać zgodność z prawem.</p>
    `},{slug:"kontrola-pip-checklist-franczyzobiorcy",title:"Kontrola PIP - checklist franczyzobiorcy",excerpt:"Co sprawdza inspektor? Jak przygotować dokumenty? Lista 15 najważniejszych dokument\xf3w, kt\xf3re musisz mieć pod ręką.",category:"PIP",date:"8 grudnia 2024",readTime:"10 min czytania",image:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",content:`
      <h2>Przygotowanie do kontroli PIP</h2>
      <p>Kontrola Państwowej Inspekcji Pracy może nastąpić w każdej chwili. Przygotowanie odpowiedniej dokumentacji to klucz do uniknięcia kar.</p>
      
      <h3>15 najważniejszych dokument\xf3w</h3>
      
      <h4>Dokumenty osobowe pracownik\xf3w:</h4>
      <ol>
        <li><strong>Umowy o pracę/zlecenie</strong> - wszystkie aktualne i zakończone z ostatnich 3 lat</li>
        <li><strong>Regulamin pracy</strong> - musi być aktualny i dostępny dla pracownik\xf3w</li>
        <li><strong>Regulamin wynagradzania</strong> - jeśli został wprowadzony</li>
        <li><strong>Potwierdzenia zapoznania się z przepisami BHP</strong></li>
        <li><strong>Świadectwa pracy</strong> - dla pracownik\xf3w, kt\xf3rzy odeszli</li>
      </ol>
      
      <h4>Dokumentacja czasu pracy:</h4>
      <ol start="6">
        <li><strong>Ewidencja czasu pracy (RCP)</strong> - najważniejszy dokument!</li>
        <li><strong>Grafiki pracy</strong> - aktualne i archiwalne z ostatnich 12 miesięcy</li>
        <li><strong>Rejestry godzin nadliczbowych</strong></li>
        <li><strong>Wnioski o urlopy i ich rozliczenia</strong></li>
        <li><strong>Dokumentacja pracy w dni wolne od pracy</strong></li>
      </ol>
      
      <h4>Dokumenty płacowe:</h4>
      <ol start="11">
        <li><strong>Listy płac</strong> - z ostatnich 12 miesięcy</li>
        <li><strong>Dokumenty rozliczenia wynagrodzeń</strong></li>
        <li><strong>Faktury/rachunki za pracę na umowach zlecenia</strong></li>
        <li><strong>Dokumenty ZUS i US</strong></li>
        <li><strong>Ewidencja wypadk\xf3w przy pracy</strong> - jeśli wystąpiły</li>
      </ol>
      
      <h3>Na co szczeg\xf3lnie zwraca uwagę inspektor?</h3>
      
      <h4>Czas pracy:</h4>
      <ul>
        <li>Czy przestrzegana jest norma 8h/dobę i 40h/tydzień</li>
        <li>Czy zapewniony jest 11-godzinny odpoczynek</li>
        <li>Czy praca w niedziele jest zgodna z prawem</li>
        <li>Czy godziny nadliczbowe nie przekraczają limit\xf3w</li>
      </ul>
      
      <h4>Wynagrodzenia:</h4>
      <ul>
        <li>Czy płacona jest minimalna stawka godzinowa</li>
        <li>Czy dopłaty za nadgodziny są prawidłowe</li>
        <li>Czy składki są odprowadzane terminowo</li>
      </ul>
      
      <h4>Forma zatrudnienia:</h4>
      <ul>
        <li>Czy umowy zlecenie nie powinny być UoP</li>
        <li>Czy warunki pracy odpowiadają rodzajowi umowy</li>
      </ul>
      
      <h3>Najczęstsze naruszenia i kary</h3>
      <ul>
        <li><strong>Brak ewidencji czasu pracy:</strong> kara do 30 000 zł</li>
        <li><strong>Przekroczenie norm czasu pracy:</strong> kara do 30 000 zł</li>
        <li><strong>Niepłacenie za nadgodziny:</strong> kara do 30 000 zł + zwrot zaległości</li>
        <li><strong>Nieprawidłowe umowy:</strong> kara + przekwalifikowanie</li>
      </ul>
      
      <h3>Jak AutoŻaba chroni przed kontrolą?</h3>
      <p>AutoŻaba automatycznie:</p>
      <ul>
        <li>Generuje poprawną ewidencję czasu pracy (RCP)</li>
        <li>Sprawdza zgodność grafik\xf3w z Kodeksem Pracy</li>
        <li>Ostrzega przed przekroczeniami norm</li>
        <li>Przygotowuje raporty gotowe do kontroli PIP</li>
        <li>Archiwizuje całą dokumentację w spos\xf3b zgodny z prawem</li>
      </ul>
      
      <h3>Co robić w przypadku kontroli?</h3>
      <ol>
        <li><strong>Zachowaj spok\xf3j</strong> - inspektor to nie wr\xf3g</li>
        <li><strong>Wsp\xf3łpracuj</strong> - udostępnij wymagane dokumenty</li>
        <li><strong>Nie podpisuj niczego</strong> na siłę - możesz poprosić o czas na analizę</li>
        <li><strong>R\xf3b notatki</strong> - zapisuj pytania inspektora i swoje odpowiedzi</li>
        <li><strong>Skontaktuj się z prawnikiem</strong> - jeśli masz wątpliwości</li>
      </ol>
      
      <p><strong>Pamiętaj:</strong> Najlepsza obrona to profilaktyka. Regularnie aktualizuj dokumentację i korzystaj z narzędzi, kt\xf3re gwarantują zgodność z prawem.</p>
    `}]},644:(e,t,a)=>{"use strict";a.d(t,{cn:()=>o});var r=a(5761),i=a(2386);function o(...e){return(0,i.m6)((0,r.W)(e))}}};var t=require("../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),r=t.X(0,[90,542,62,556],()=>a(7963));module.exports=r})();