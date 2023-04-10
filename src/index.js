import { Notify } from 'notiflix';
import axios from 'axios';
import fetchFunction from './fetch.js';
import fetchImages from './fetch.js';

const input = document.querySelector('input');
const form = document.querySelector('form#search-form');
const imagesBox = document.querySelector('.gallery');

const renderImages = image => {
  const { webformatURL, tags } = image;
  return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>`;
};
const searchImages = () => {
  const q = input.value.trim();
  fetchImages(q)
    .then(images => {
      imagesBox.insertAdjacentHTML('beforeend', renderImages(images));
      Notify.success('Ura!');
    })
    .catch(error => {
      throw new Error(response.status);
    });
};
input.addEventListener('input', searchImages);
