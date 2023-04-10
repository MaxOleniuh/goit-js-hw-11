import { Notify } from 'notiflix';
import fetchImages from './fetch.js';
const input = document.querySelector('input');
const form = document.querySelector('form#search-form');
const imagesBox = document.querySelector('.gallery');
const renderImages = images => {
  const { webformatURL, tags, likes, views, comments, downloads } = images;
  return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${downloads}
    </p>
  </div>
</div>`;
};
const searchImages = e => {
  e.preventDefault();
  const q = input.value.trim();
  fetchImages(q)
    .then(response => {
      const images = response.data.hits;
      const imageCount = response.data.total;
      imagesBox.innerHTML = '';
      images.forEach(image => {
        imagesBox.insertAdjacentHTML('beforeend', renderImages(image));
      });
      Notify.success(`Hurray! We found ${imageCount}`); // DO IT
    })
    .catch(error => {
      Notify.failure(
        'Sorry, there are no images matching your query. Please try again.'
      );
    });
};
form.addEventListener('submit', searchImages);
