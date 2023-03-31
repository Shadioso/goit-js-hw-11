import { fetchImages } from './fetch_images';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
//
const form = document.querySelector(`#search-form`);
const button = document.querySelector(`.search-button`);
const imageGallary = document.querySelector(`.gallery`);
let searchImage = ``;
//
const searchImages = evt => {
  evt.preventDefault();
  imageGallary.innerHTML = ``;
  const input = document.querySelector(`.input-form`);
  searchImage = input.value.trim();
  if (searchImage === ``) {
    imageGallary.innerHTML = ``;
    Notiflix.Notify.info('Please enter the search images');
    return;
  } else if (searchImage.length < 3) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  }

  fetchImages(searchImage)
    .then(image => {
      if (image.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      imageGallary.insertAdjacentHTML(`beforeend`, renderImages(image.hits));
      lightbox.refresh();
      //   console.log(image.hits);
    })
    .catch(error => console.log(`Oops!Something went wrong: ${error}`));
};

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
        <a class="gallery__item" href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" class="gallery__image" />
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes<br>${likes}</br></b>
        </p>
        <p class="info-item">
          <b>Views<br>${views}</br></b>
        </p>
        <p class="info-item">
          <b>Comments<br>${comments}</br></b>
        </p>
        <p class="info-item">
          <b>Downloads<br>${downloads}</br></b>
        </p>
      </div>
    </div>`;
      }
    )
    .join(``);
  return readyGallery;
}
form.addEventListener(`submit`, searchImages);
//
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// .map(
//   ({
//     webformatURL,
//     largeImageURL,
//     tags,
//     likes,
//     views,
//     comments,
//     downloads,
//   }) => {
//     return `<a class="gallery__item" href="${largeImageURL}">
//     <div class="photo-card">
//   <img src="${webformatURL}" alt="${tags}" loading="lazy" class="gallery__image" />
//   </a>
//   <div class="info">
//     <p class="info-item">
//       <b>Likes<br>${likes}</br></b>
//     </p>
//     <p class="info-item">
//       <b>Views<br>${views}</br></b>
//     </p>
//     <p class="info-item">
//       <b>Comments<br>${comments}</br></b>
//     </p>
//     <p class="info-item">
//       <b>Downloads<br>${downloads}</br></b>
//     </p>
//   </div>
// </div>`;
//   }
// )
// .join(``);
