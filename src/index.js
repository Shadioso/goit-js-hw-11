import { fetchImages } from './fetch_images';
import { renderImages } from './renderImg';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
//
const loadMoreBtn = document.querySelector(`#load-more`);
const axios = require('axios');
const form = document.querySelector(`#search-form`);
const button = document.querySelector(`.search-button`);
const imageGallary = document.querySelector(`.gallery`);
let searchImage = ``;
let page = 1;
let perPage = 40;
//
const loadMoreImg = async e => {
  e.preventDefault();
  page += 1;
  try {
    const result = await fetchImages(searchImage, page);
    let totalPages = result.totalHits / perPage;
    // searchImage = input.value.trim();
    if (page >= totalPages) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      loadMoreBtn.disabled = true;
    }
    imageGallary.insertAdjacentHTML(`beforeend`, renderImages(result.hits));
    lightbox.refresh();
  } catch (error) {
    console.log(`ERROR!`);
  }
};

const searchImages = async evt => {
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
    loadMoreBtn.classList.add(`is-hidden`);
    return;
  }
  try {
    page = 1;
    loadMoreBtn.classList.add(`is-hidden`);
    const result = await fetchImages(searchImage, page);
    if (result.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    Notiflix.Notify.success(`Hooray! We found ${result.totalHits} images.`);
    imageGallary.insertAdjacentHTML(`beforeend`, renderImages(result.hits));
    lightbox.refresh();
    if (page === 1) {
      loadMoreBtn.classList.remove(`is-hidden`);
      loadMoreBtn.addEventListener(`click`, loadMoreImg);
    } else if (page === 0) {
      loadMoreBtn.classList.add(`is-hidden`);
    }
  } catch (error) {
    console.log(`Oops!Something went wrong: ${error}`);
  }
};
//
form.addEventListener(`submit`, searchImages);
//
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
