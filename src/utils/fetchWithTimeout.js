export const fetchWithTimeout = (url, options = {}, timeout = 30000, retries = 3, backoff = 3000) => {
  return new Promise((resolve, reject) => {
    const attemptFetch = (retryCount) => {
      const timer = setTimeout(() => {
        if (retryCount > 0) {
          console.warn(`Retrying fetch... (${retries - retryCount + 1})`);
          setTimeout(() => attemptFetch(retryCount - 1), backoff * (retries - retryCount + 1));
        } else {
          reject(new Error("Network timeout"));
        }
      }, timeout);

      fetch(url, options)
        .then(response => {
          clearTimeout(timer);
          resolve(response);
        })
        .catch(error => {
          clearTimeout(timer);
          if (retryCount > 0) {
            console.warn(`Retrying fetch... (${retries - retryCount + 1})`);
            setTimeout(() => attemptFetch(retryCount - 1), backoff * (retries - retryCount + 1));
          } else {
            reject(error);
          }
        });
    };

    attemptFetch(retries);
  });
};
