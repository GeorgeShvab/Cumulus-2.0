function debounce(func: (...args: any[]) => void, ms: number = 500) {
  let time: NodeJS.Timeout

  return function (this: any, ...args: any[]) {
    clearTimeout(time)

    time = setTimeout(() => {
      func.apply(this, args)
    }, ms)
  }
}

export default debounce
