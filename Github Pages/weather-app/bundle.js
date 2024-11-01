(()=>{"use strict";class n{constructor({currentConditions:n}={},e="metric"){this.precipprob=null==n?null:n.precipprob,this.units=e}#n(){return null==this.precipprob?"":0===this.precipprob?"No":this.precipprob>0&&this.precipprob<30?"Probably":"Yes"}#e(){return`\n      <h1 class="nav__logo">\n        Do I need an umbrella? \n        <span class="nav__umbrella-required">${this.#n()}</span>\n      </h1>\n    `}#t(){return`\n      <div class="nav__units">\n        <input \n          form="search"\n          type="radio" \n          id="celsius" \n          name="units" \n          value="metric" \n          class="nav__unit"\n          ${"metric"==this.units?"checked":""}\n        />\n        <label for="celsius">ºC</label>\n\n        <input\n          form="search" \n          type="radio" \n          id="fahrenheit" \n          name="units" \n          value="us" \n          class="nav__unit" \n          ${"us"==this.units?"checked":""}\n        />\n        <label for="fahrenheit">ºF</label>\n      <div>\n    `}render(){return`\n      <nav class="nav">\n        ${this.#e()}\n        ${this.#t()}\n      </nav>\n    `}}class e{constructor({location:n=null}={}){this.location=n}#r(){return`\n      <input \n        type="text" \n        id="location" \n        name="location" \n        value="${null!=this.location?this.location:""}">\n      </input>\n    `}#s(){return'\n      <button type="submit" class="form__submit"></button>\n    '}render(){return`\n      <form class="search large" id="search">\n        ${this.#r()}\n        ${this.#s()}\n      </form>\n    `}}class t{constructor({currentConditions:n,forecast:e}){this.currentConditions=n,this.currentDate=new Date(e[1].datetime)}#e(){return`\n      <h2 class="weather-today__title large">\n        ${["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][this.currentDate.getDay()]}, \n        ${this.currentDate.getDate()} \n        ${["January","February","March","April","May","June","July","August","September","October","November","December"][this.currentDate.getMonth()]} \n        ${this.currentDate.getFullYear()}\n      </h2> \n    `}#a(){return`\n      <div class="weather-today__hero">\n        <div class="weather-today__hero-icon">\n          <span class=${this.currentConditions.icon}></span>\n        </div>\n        <div class="weather-today__hero-infos">\n          <h3 class="weather-today__hero-temp">\n            ${Math.round(this.currentConditions.temp)}º\n          </h3>\n          <h4 class="weather-today__hero-conditions">\n            ${this.currentConditions.conditions}\n          </h4>\n        </div>\n      </div> \n    `}#i(){return`\n      <div class="weather-today__key-stats">\n        <div class="weather-today__stat">\n          <h4>\n            Chance of rain\n          </h4>\n          <p>\n            ${Math.round(this.currentConditions.precipprob)}%\n          </p>\n        </div>\n        <div class="weather-today__stat">\n          <h4>\n            Humidity\n          </h4>\n          <p>\n            ${Math.round(this.currentConditions.humidity)}%\n          </p>\n        </div>\n        <div class="weather-today__stat">\n          <h4>\n            Sunrise\n          </h4>\n          <p>\n            ${this.currentConditions.sunrise.slice(0,5)}\n          </p>\n        </div>\n        <div class="weather-today__stat">\n          <h4>\n            Sunset\n          </h4>\n          <p>\n            ${this.currentConditions.sunset.slice(0,5)}\n          </p>\n        </div>\n      </div>\n    `}render(){return`\n      <div class="weather-today">\n        ${this.#e()}\n        <div class="weather-today__container">\n          ${this.#a()}\n          ${this.#i()}\n        </div>\n      </div>\n    `}}class r{constructor({forecast:n}){this.forecast=n.slice(1,8)}#e(){return'\n      <h2 class="weather-forecast__title">\n        Weekly forecast\n      </h2> \n    '}#c(n){let e=new Date(n.datetime);return`\n      <div class="weather-forecast__item">\n        <div class="weather-forecast__item-icon">\n          <span class=${n.icon}></span>\n        </div>\n        <div class="weather-forecast__item-info">\n          <p class="weather-forecast__item-date">\n            ${e.getDate()}/${e.getMonth()}\n          </p>\n          <p class="weather-forecast__item-temp">\n            ${Math.round(n.tempmin)}º - ${Math.round(n.tempmax)}º\n          </p>\n        </div>\n      </div>\n    `}render(){return`\n      \n      <div class="weather-forecast large">\n        ${this.#e()}\n        <div class="weather-forecast__container">\n          ${this.forecast.map((n=>this.#c(n))).join("")}\n        </div>\n      </div>\n    `}}class s{render(){return'\n      <img class="loading" src="assets/loading.gif" alt="Loading gif">\n    '}}const a=new class{refresh(s,a){const i=document.querySelector("body");switch(s.currentConditions.icon){case"clear-day":case"partly-cloudy-day":i.className="yellow";break;case"rain":case"wind":i.className="blue";break;case"clear-night":case"partly-cloudy-night":i.className="black";break;default:i.className="grey"}i.innerHTML=`\n      ${new n(s,a).render()}\n      ${new e(s).render()}\n      <main>\n        ${new t(s).render()}\n        ${new r(s).render()}\n      </main>\n    `}loading(){document.querySelector("main").innerHTML=`\n      ${(new s).render()}\n    `}render(){return`\n      ${(new n).render()}\n      ${(new e).render()}\n      <main></main>\n    `}};function i(){let n=document.querySelector("button"),e=document.querySelector("#location"),t=document.querySelectorAll("input[name='units']");function r(n){let t=document.querySelector("input[name='units']:checked");n.preventDefault(),async function(n,e){a.loading();try{const t=await async function(n="Perth",e="metric"){const t=`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${n}?unitGroup=${e}&key=HYYU9HLMDJNS65YRE96T5TQN4`;try{let n=await fetch(t,{mode:"cors"});if(n.ok){const e=await n.json();return{location:e.address,currentConditions:e.currentConditions,forecast:e.days}}throw new Error(`Response status: ${n.status} ${n.statusText}`)}catch(n){return n.message}}(n,e);a.refresh(t,e),i()}catch(n){console.error(n)}}(e.value,t.value)}n.addEventListener("click",r),t.forEach((n=>{n.addEventListener("click",r)}))}document.querySelector("body").innerHTML=a.render(),i()})();