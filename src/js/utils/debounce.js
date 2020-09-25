function debounce(fn, time) {
  let timer;

  return function() {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, time)
  }
}

export default debounce;