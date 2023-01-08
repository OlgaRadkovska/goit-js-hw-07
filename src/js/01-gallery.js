import { galleryItems } from "./gallery-items.js";
// Change code below this line

const instance = basicLightbox.create(
    `
        <div class="modal">
            <img src="" alt="" width="800" height="600"/>
        </div>
      `,
    {
        onShow: (instance) => {
            window.addEventListener("keydown", handleEscapeClick);
            window.addEventListener("keydown", handleArrowScrolling);
        },
        onClose: (instance) => {
            window.removeEventListener("keydown", handleEscapeClick);
            window.removeEventListener("keydown", handleArrowScrolling);
        },
    }
);

const refs = {
    galleryList: document.querySelector(".gallery"),
    modalImage: instance.element().querySelector("img"),
};

const createGalleryListItem = function ({ preview, original, description }) {
    const listItem = document.createElement("div");
    listItem.classList.add("gallery__item");

    const listLink = document.createElement("a");
    listLink.classList.add("gallery__link");
    listLink.setAttribute("href", original);

    const listImage = document.createElement("img");
    listImage.classList.add("gallery__image");
    listImage.setAttribute("src", preview);
    listImage.setAttribute("data-source", original);
    listImage.setAttribute("alt", description);

    listLink.appendChild(listImage);
    listItem.appendChild(listLink);

    return listItem;
};

const renderGalleryList = (listRef, collection) => {
    const listItems = collection.map((item) => createGalleryListItem(item));

    listRef.append(...listItems);
};

renderGalleryList(refs.galleryList, galleryItems);

// Handlers
function handleGalleryItemClick(event) {
    event.preventDefault();
    const { target } = event;
    if (target.nodeName !== "IMG") return;

    refs.modalImage.src = target.dataset.source;
    refs.modalImage.alt = target.alt;

    instance.show();
}

function handleEscapeClick({ code }) {
    if (code === "Escape") {
        instance.close();
    }
}

function handleArrowScrolling({ code }) {
    const originalSources = galleryItems.map((item) => item.original);

    let index = originalSources.indexOf(refs.modalImage.src);

    if (code === "ArrowRight") {
        if (index < originalSources.length - 1) {
            refs.modalImage.src = originalSources[index + 1];
        } else {
            index = -1;
            refs.modalImage.src = originalSources[index + 1];
        }
    }

    if (code === "ArrowLeft") {
        if (index === 0) {
            index = originalSources.length;
            refs.modalImage.src = originalSources[index - 1];
        } else {
            refs.modalImage.src = originalSources[index - 1];
        }
    }
}

// Listeners
refs.galleryList.addEventListener("click", handleGalleryItemClick);
