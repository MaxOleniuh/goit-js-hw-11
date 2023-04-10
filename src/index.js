import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import fetchImages from './fetch.js';

const input = document.querySelector('input');
const form = document.querySelector('form#search-form');
const imagesBox = document.querySelector('.gallery');

const renderImages = images => {
  const { webformatURL, tags, likes, views, comments, downloads } = images;
  return `<div class="photo-card">
   <a> <img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
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
      const imageCount = response.data.totalHits;
      console.log(imageCount);
      imagesBox.innerHTML = '';
      images.forEach(image => {
        imagesBox.insertAdjacentHTML('beforeend', renderImages(image));
      });
      if (q && imageCount > 0) {
        Notify.success(`Hurray! We found ${imageCount}`);
        return;
      } else
        Notify.failure(
          'Sorry, there are no images matching your query. Please try again.'
        );

      imagesBox.innerHTML = '';
    })
    .catch(error => {
      Notify.failure(
        'Sorry, there are no images matching your query. Please try again.'
      );
    });
};

function pictureClickHandler(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const instance = basicLightbox.create(
    `
         <img width="1400" height="900" src="${e.target.src}">
`,
    {
      onClose: instance => {
        document.removeEventListener('keydown', pressedEscKeyHandler);
      },
    }
  );
  instance.show();
  document.addEventListener('keydown', pressedEscKeyHandler);
  function pressedEscKeyHandler(e) {
    if (e.code === 'Escape') {
      instance.close();
    }
  }
}
form.addEventListener('submit', searchImages);
imagesBox.addEventListener('click', pictureClickHandler);
