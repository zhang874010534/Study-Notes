export function download({ url, name = '', success, next, fail, complete }) {
  axios({
    url: url,
    responseType: 'blob',
    onDownloadProgress(progress) {
      next && next(progress);
    }
  })
    .then((response) => {
      const blob = response.data;
      let downloadUrl = null;
      const URL = window.URL || window.webkitURL;
      downloadUrl = URL.createObjectURL(blob);
      downloadFile({
        file: downloadUrl,
        name: name
      });

      downloadUrl && URL.revokeObjectURL(downloadUrl);

      success && success(response.data);
      complete && complete(response.data);
    })
    .catch((error) => {
      fail && fail(error);
      complete && complete(error);
    });
}

export function downloadFile({ file, name = '' }) {
  const eleLink = document.createElement('a');
  eleLink.setAttribute('href', file);
  eleLink.setAttribute('download', name);
  eleLink.setAttribute('target', '_blank');
  eleLink.style.display = 'none';

  document.body.appendChild(eleLink);
  eleLink.click();
  document.body.removeChild(eleLink);
}