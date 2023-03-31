export const fetchImages = image => {
  return fetch(
    `https://pixabay.com/api/?key=34859456-27066b05c1480cb7e2dfb47d0&q=${image}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(responce => {
    if (!responce.ok) {
      throw new Error(responce.status);
    }
    return responce.json();
  });
};
