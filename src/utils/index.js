export function onLongTap(cb = () => {}, el = window) {
  if (!el) return;
  let start = 0;
  let end = 0;
  const onTouchStart = () => { start = Date.now(); };
  const onTouchEnd = () => {
    end = Date.now();
    if (end - start > 800) {
      cb();
    }
  };
  const destroy = () => {
    el.removeEventListener('touchstart', onTouchStart);
    el.removeEventListener('touchend', onTouchEnd);
  };
  el.addEventListener('touchstart', onTouchStart);
  el.addEventListener('touchend', onTouchEnd);

  return {
    destroy,
  };
}

export function onSwipe() {
  const onTouchStart = (e) => {

  };

  const onTouchEnd = (e) => {

  };
  window.addEventListener('touchstart', onTouchStart);
  window.addEventListener('touchend', onTouchEnd);
}

export function appendZero(num = 0) {
  if (+num < 10) {
    num = `0${+num}`;
  }
  return num;
}

export function showEl(el) {

}

export function className(name = '') {
  if (Array.isArray(name)) {
    return name.join(' ').trim();
  }

  return name;
}

window.className = className;

export function calcLeftTime(val, total) {
  val = +val;
  total = +total;
  const h = new Date().getHours();
  const m = new Date().getMinutes();
  if (total === 24) {
    if (val > h && val < total) {
      return val - h;
    }
    return total - 1 - h + val;
  } else {
    return total - 1 - m - val;
  }
}

export function createUUID() {
  const link = URL.createObjectURL(new Blob());
  const strArr = link.split('/');
  return strArr[strArr.length - 1];
}
