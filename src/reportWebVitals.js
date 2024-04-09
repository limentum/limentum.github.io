const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getLargestContentfulPaint, getFirstInputDelay, getCumulativeLayoutShift, getTotalBlockingTime, getTimeToFirstByte }) => {
      getLargestContentfulPaint(onPerfEntry);
      getFirstInputDelay(onPerfEntry);
      getCumulativeLayoutShift(onPerfEntry);
      getTotalBlockingTime(onPerfEntry);
      getTimeToFirstByte(onPerfEntry);
    });
  }
};

export default reportWebVitals;