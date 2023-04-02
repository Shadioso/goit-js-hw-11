function renderImages(images) {
  const readyGallery = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
          <div class="photo-card">
          <a class="gallery__link" href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" class="gallery__image" />
        </a>
        <ul class="info">
        <li class="info-item">
          <p class ="info_title">Likes</p>
          <p class="info-description">${likes}</p>
        </li>
        <li class="info-item">
          <p class ="info_title">Views</p>
          <p class="info-description">${views}</p>
        </li>
        <li class="info-item">
          <p class ="info_title">Comments</p>
          <p class="info-description">${comments}</p>
        </li>
        <li class="info-item">
          <p class ="info_title">Downloads</p>
          <p class="info-description">${downloads}</p>
        </li>
      </ul>
      </div>`;
      }
    )
    .join(``);
  return readyGallery;
}

export { renderImages };
