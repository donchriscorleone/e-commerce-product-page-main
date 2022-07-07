const cartBtn = document.querySelector('button.btn-badge');
const cartBadge = document.querySelector('span.badge-text');
const quantity = document.querySelector('span.quantity');

cartBtn.addEventListener('click', (e) => {
    const classList = cartBtn.classList;
    const isDesktop = window.innerWidth > 950;
    if (isDesktop) {
        classList.contains('active') ? classList.remove('active') : classList.add('active');
    }
})

const base = document.querySelector('.product-calculation__base-price');
const prodCalcQuantity= document.querySelector('.product-calculation__quantity');
const total = document.querySelector('.product-calculation__total-price');
const basketCardContent = document.querySelector('.basket-card__content');
const basketEmptyText = document.querySelector('.basket-card__content-empty-text');
parseInt(total.innerHTML) <= 0 ? basketCardContent.classList.add('basket-card__content-empty') : basketCardContent.classList.remove('basket-card__content-empty');

const minBtn = document.querySelector('button.btn-minus');
const addBtn = document.querySelector('button.btn-add');
const addToCart = document.querySelector('.content-actions .btn.btn-primary.btn-action-cart');

minBtn.addEventListener('click', (e) => {
    if (quantity.innerHTML === '0' || cartBadge.innerHTML === '0') {
        return;
    }

    if (quantity.innerHTML === '1' && basketEmptyText.classList.contains('none')) {
        basketEmptyText.classList.remove('none');
    }

    prodCalcQuantity.innerHTML = cartBadge.innerHTML = quantity.innerHTML = parseInt(quantity.innerHTML) - 1;
    total.innerHTML = parseInt(base.innerHTML) * parseInt(prodCalcQuantity.innerHTML);
    parseInt(total.innerHTML) <= 0 ? basketCardContent.classList.add('basket-card__content-empty') : basketCardContent.classList.remove('basket-card__content-empty');
})

addBtn.addEventListener('click', (e) => {
    prodCalcQuantity.innerHTML = cartBadge.innerHTML = quantity.innerHTML = parseInt(quantity.innerHTML) + 1;
    total.innerHTML = parseInt(base.innerHTML) * parseInt(prodCalcQuantity.innerHTML);
    parseInt(total.innerHTML) <= 0 ? basketCardContent.classList.add('basket-card__content-empty') : basketCardContent.classList.remove('basket-card__content-empty');
    basketEmptyText.classList.add('none');
})

addToCart.addEventListener('click', (e) => {
    prodCalcQuantity.innerHTML = cartBadge.innerHTML = quantity.innerHTML = parseInt(quantity.innerHTML) + 1;
    basketEmptyText.classList.add('none');
})

const menu = document.querySelector('.btn-menu');
const aside = document.querySelector('aside');
menu.addEventListener('click', (e) => {
    aside.style.display = 'initial';
})

const asideClose = document.querySelector('.aside .btn-close');
asideClose.addEventListener('click', (e) => {
    aside.style.display = 'none';
});

// Highlight

let thumbnailIndex = 1;
const btnProducts = document.querySelectorAll('.main .gallery .highlight-buttons .btn-product');
const thumbnails = document.querySelectorAll('.main-highlight');
btnProducts.forEach((b, index) => {
    b.addEventListener('click', (e) => {
        thumbnailIndex = index + 1;
        changeThumbnail(thumbnailIndex);
        const classList = b.classList;
        if (!classList.contains('btn-product-active')) classList.add('btn-product-active');

        btnProducts.forEach(x => {
            if (x !== b) {
                x.classList.remove('btn-product-active');
            }
        })
    })
})

const btnPrev = document.querySelectorAll('.btn-prev')
const btnNext = document.querySelectorAll('.btn-next');
btnPrev.forEach(b => {
    b.addEventListener('click', (e) => {
        if (thumbnailIndex === 1) return;
    
        --thumbnailIndex;
        changeThumbnail(thumbnailIndex);
        changeProductButtonsActive(thumbnailIndex - 1);
    })
})

btnNext.forEach(b => {
    b.addEventListener('click', (e) => {
        if (thumbnailIndex === 4) return;
    
        ++thumbnailIndex;
        changeThumbnail(thumbnailIndex);
        changeProductButtonsActive(thumbnailIndex - 1);
        let classList = btnProducts.item(thumbnailIndex - 1).classList;
        if (!classList.contains('btn-product-active')) classList.add('btn-product-active');
    })
})


const mainHighlight = document.querySelector('.gallery .main-highlight');
const dialog = document.querySelector('dialog');
mainHighlight.addEventListener('click', (e) => {
    if (window.innerWidth < 1000) return;

    dialog.show();
    dialog.classList.add('active');
})

const dialogClose = document.querySelector('dialog .btn-close');
dialogClose.addEventListener('click', (e) => {
    dialog.close();
    dialog.classList.remove('active');
})

const dialogBtnProducts = document.querySelectorAll('.lightbox .highlight-buttons .btn-product');
dialogBtnProducts.forEach((b, index) => {
    b.addEventListener('click', (e) => {
        thumbnailIndex = index + 1;
        changeThumbnail(thumbnailIndex);
        const classList = b.classList;
        if (!classList.contains('btn-product-active')) classList.add('btn-product-active');

        dialogBtnProducts.forEach(x => {
            if (x !== b) {
                x.classList.remove('btn-product-active');
            }
        })
    })
})

function changeThumbnail(index) {
    thumbnails.forEach(x => {
        x.style.backgroundImage = `url(./images/image-product-${index}.jpg)`
    })
}

function changeProductButtonsActive(index) {
    let classList1 = btnProducts.item(index).classList;
    if (!classList1.contains('btn-product-active')) classList1.add('btn-product-active');
    btnProducts.forEach(x => {
        if (x !== btnProducts.item(index)) {
            x.classList.remove('btn-product-active');
        }
    })

    if (dialog.open) {
        let classList2 = dialogBtnProducts.item(index).classList;
        if (!classList2.contains('btn-product-active')) classList2.add('btn-product-active');
        dialogBtnProducts.forEach(x => {
            if (x !== dialogBtnProducts.item(index)) {
                x.classList.remove('btn-product-active');
            }
        })
    }
}