// js/animation.js
export function setAnimation(condition) {
  const app = document.getElementById('app');
  if (condition.includes('rain')) {
    app.style.background = 'url(/assets/rainy-animation.gif)';
  } else if (condition.includes('cloud')) {
    app.style.background = 'url(/assets/cloudy-animation.gif)';
  } else {
    app.style.background = 'url(/assets/sunny-animation.gif)';
  }
}
