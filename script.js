document.addEventListener('DOMContentLoaded', () => {
    updateCartCounter();
    renderCartPage();
    if (typeof booksData !== 'undefined') {
        renderCatalog();
        initCatalogFilters();
        renderSingleBookPage();
        renderIndexPage();
    }
    initCarousel();
});

function renderCatalog() {
    const grid = document.getElementById('catalogGrid');
    if (!grid) return;

    let htmlContent = '';

    booksData.forEach(book => {
        let priceBlock = '';
        if (book.oldPrice) {
            const discount = Math.round(((book.oldPrice - book.price) / book.oldPrice) * 100);
            priceBlock = `
                <div style="display: flex; flex-direction: column; justify-content: center;">
                    <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                        <span style="color: #e74c3c; font-weight: 800; font-size: 20px; line-height: 1;">${book.price} ₼</span>
                        <span style="background: #e74c3c; color: white; padding: 2px 4px; border-radius: 4px; font-size: 11px; font-weight: bold; line-height: 1;">-${discount}%</span>
                    </div>
                    <span style="color: #95a5a6; font-size: 13px; text-decoration: line-through; line-height: 1;">${book.oldPrice} ₼</span>
                </div>
            `;
        } else {
            priceBlock = `
                <div style="display: flex; align-items: center; height: 100%;">
                    <span style="font-weight: 800; font-size: 20px; color: var(--color-text-main);">${book.price} ₼</span>
                </div>
            `;
        }

        htmlContent += `
            <article class="book-card" data-category="${book.filterCategory}">
                <a href="book.html?id=${book.id}" style="display: contents;">
                    <div class="book-cover" style="background-image: url('${book.coverImg}'); background-size: cover; background-position: center; border-radius: var(--radius-sm); height: 240px; margin-bottom: var(--space-md);">
                    </div>
                    <span class="book-category">${book.displayCategory}</span>
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">${book.author}</p>
                </a>
                <div class="book-rating">
                    <span class="stars">★★★★★</span>
                    <span class="rating-count">${book.rating} (${book.reviews})</span>
                </div>
                <div class="book-footer">
                    ${priceBlock}
                    <button class="btn btn-primary add-to-cart-btn" data-id="${book.id}" data-title="${book.title}" data-price="${book.price}">В корзину</button>
                </div>
            </article>
        `;
    });

    grid.innerHTML = htmlContent;
}

function initCatalogFilters() {
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('#catalogGrid .book-card');

    if (!searchInput && filterButtons.length === 0) return;

    let activeFilter = 'all';

    const urlParams = new URLSearchParams(window.location.search);
    const urlCategory = urlParams.get('category');
    
    if (urlCategory) {
        activeFilter = urlCategory;
        const targetBtn = document.querySelector(`.filter-btn[data-filter="${urlCategory}"]`);
        if (targetBtn) {
            filterButtons.forEach(b => b.classList.remove('active'));
            targetBtn.classList.add('active');
        }
    }

    function applyFilters() {
        const searchText = searchInput ? searchInput.value.toLowerCase() : '';

        cards.forEach(card => {
            const title = card.querySelector('.book-title').innerText.toLowerCase();
            const author = card.querySelector('.book-author').innerText.toLowerCase();
            const category = card.getAttribute('data-category');

            const matchesSearch = title.includes(searchText) || author.includes(searchText);
            const matchesFilter = activeFilter === 'all' || category === activeFilter;

            card.style.display = (matchesSearch && matchesFilter) ? 'flex' : 'none';
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            activeFilter = this.getAttribute('data-filter');
            applyFilters();
            
            window.history.replaceState({}, '', 'catalog.html');
        });
    });

    applyFilters();
}

function renderSingleBookPage() {
    const titleEl = document.getElementById('b-title');
    if (!titleEl) return; 

    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');
    const book = booksData.find(b => String(b.id) === String(bookId)); 

    if (book) {
        titleEl.innerText = book.title;
        document.getElementById('b-author').innerText = book.author;
        document.getElementById('b-category').innerText = book.displayCategory;
        document.getElementById('b-desc').innerText = book.desc;
        
        const priceEl = document.getElementById('b-price');
        if (book.oldPrice) {
            const discount = Math.round(((book.oldPrice - book.price) / book.oldPrice) * 100);
            priceEl.innerHTML = `
                <div style="display: flex; flex-direction: column;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="color: #e74c3c; font-weight: 800; font-size: 42px; line-height: 1;">${book.price} ₼</span>
                        <span style="background: #e74c3c; color: white; padding: 4px 8px; border-radius: 6px; font-size: 16px; font-weight: bold;">-${discount}%</span>
                    </div>
                    <span style="color: #95a5a6; font-size: 18px; text-decoration: line-through; margin-top: 4px;">${book.oldPrice} ₼</span>
                </div>
            `;
        } else {
            priceEl.innerHTML = `<span style="font-weight: 800; font-size: 42px; color: var(--color-primary);">${book.price} ₼</span>`;
        }
        
        document.getElementById('b-reviews').innerText = `${book.rating} (${book.reviews} оценок)`;
        
        if (book.specs) {
            const pubEl = document.getElementById('s-publisher');
            const yearEl = document.getElementById('s-year');
            const pagesEl = document.getElementById('s-pages');
            const coverEl_type = document.getElementById('s-cover');
            const isbnEl = document.getElementById('s-isbn');
            const ageEl = document.getElementById('s-age');

            if(pubEl) pubEl.innerText = book.specs.publisher || 'Не указано';
            if(yearEl) yearEl.innerText = book.specs.year || 'Не указано';
            if(pagesEl) pagesEl.innerText = book.specs.pages || 'Не указано';
            if(coverEl_type) coverEl_type.innerText = book.specs.cover || 'Не указано';
            if(isbnEl) isbnEl.innerText = book.specs.isbn || 'Не указано';
            if(ageEl) ageEl.innerText = book.specs.age || '0+';
        }

        const coverEl = document.getElementById('b-cover');
        if(coverEl) {
            coverEl.style.backgroundImage = `url('${book.coverImg}')`;
            coverEl.style.backgroundSize = 'cover';
            coverEl.style.backgroundPosition = 'center';
            coverEl.innerHTML = ''; 
        }

        const buyBtn = document.getElementById('b-buy-btn');
        if (buyBtn) {
            buyBtn.setAttribute('data-id', book.id);
            buyBtn.setAttribute('data-title', book.title);
            buyBtn.setAttribute('data-price', book.price);
        }
        
        const reviewContainer = document.getElementById('b-review-container');
        if (reviewContainer) {
            const reviewsList = [
                { name: "Александр В.", letter: "А", text: "Книга пришла в идеальном состоянии. Отличный переплет и качество бумаги. Читать одно удовольствие!", stars: "★★★★★" },
                { name: "Мария С.", letter: "М", text: "Содержание потрясающее, не могла оторваться! Но доставка немного задержалась. В остальном всё супер.", stars: "★★★★☆" },
                { name: "Анонимный читатель", letter: "А", text: "Потрясающая книга, глубокие мысли и отличный слог. Обязательно куплю и другие работы этого автора.", stars: "★★★★★" },
                { name: "Дмитрий", letter: "Д", text: "Брал в подарок, именинник остался в полном восторге. Выглядит очень солидно!", stars: "★★★★★" },
                { name: "Елена К.", letter: "Е", text: "Хорошая книга, но местами было скучновато. В целом, на один раз прочитать пойдет.", stars: "★★★★☆" },
                { name: "Иван", letter: "И", text: "Это просто шедевр! Перечитываю уже второй раз. Очень рекомендую всем любителям жанра.", stars: "★★★★★" },
                { name: "Ольга", letter: "О", text: "Качество печати на высоте, шрифт крупный, глаза не устают. Сама история захватывает с первых страниц.", stars: "★★★★★" },
                { name: "Павел Т.", letter: "П", text: "Немного затянутое начало, но к середине сюжет так разгоняется, что не уснешь, пока не дочитаешь.", stars: "★★★★☆" },
                { name: "Екатерина", letter: "Е", text: "Отличная покупка. Цена полностью оправдывает содержание и качество издания. Доставили быстро.", stars: "★★★★★" },
                { name: "Сергей М.", letter: "С", text: "Я в полном восторге! Эта книга изменила мой взгляд на многие вещи. Однозначно рекомендую.", stars: "★★★★★" }
            ];

            let asciiSum = 0;
            for (let i = 0; i < book.id.length; i++) {
                asciiSum += book.id.charCodeAt(i);
            }
            
            const reviewIndex = asciiSum % reviewsList.length;
            const r = reviewsList[reviewIndex];

            reviewContainer.innerHTML = `
                <div class="review-card">
                    <div class="review-header" style="align-items: center;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div style="width: 40px; height: 40px; background: var(--color-primary-light); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">${r.letter}</div>
                            <div>
                                <strong style="display: block; font-size: 16px;">${r.name}</strong>
                                <span style="font-size: 12px; color: var(--color-text-muted);">Проверенный покупатель</span>
                            </div>
                        </div>
                        <span style="color: #F59E0B; font-size: 16px; letter-spacing: 1px;">${r.stars}</span>
                    </div>
                    <p style="margin-top: 12px; line-height: 1.6; color: var(--color-text-main);">
                        ${r.text}
                    </p>
                </div>
            `;
        }
        
        document.title = `${book.title} | Книговед`;
    } else {
        titleEl.innerText = "Книга не найдена";
        const descEl = document.getElementById('b-desc');
        if (descEl) descEl.innerText = "Возможно, ссылка устарела или книга удалена из каталога.";
    }
}

document.addEventListener('click', function(e) {
    const btn = e.target.closest('.add-to-cart-btn');
    
    if (btn) {
        e.preventDefault();
        e.stopPropagation(); 
        
        const bookId = btn.getAttribute('data-id');
        const bookTitle = btn.getAttribute('data-title');
        const bookPrice = parseFloat(btn.getAttribute('data-price')); 

        if(bookId && bookTitle && !isNaN(bookPrice)) {
            addToCart(bookId, bookTitle, bookPrice);

            const originalText = btn.innerText;
            btn.innerText = '✓ Добавлено';
            btn.style.backgroundColor = '#27AE60';
            btn.style.color = '#FFFFFF';
            btn.style.borderColor = '#27AE60';

            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.backgroundColor = '';
                btn.style.color = '';
                btn.style.borderColor = '';
            }, 1500);
        }
    }
});

function addToCart(id, title, price) {
    let cart = JSON.parse(localStorage.getItem('knigoved_cart')) || [];
    const existingIndex = cart.findIndex(item => String(item.id) === String(id));
    
    if (existingIndex !== -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({ id: id, title: title, price: price, quantity: 1 });
    }
    
    localStorage.setItem('knigoved_cart', JSON.stringify(cart));
    updateCartCounter();
}

function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('knigoved_cart')) || [];
    const counterElement = document.getElementById('cart-counter');
    if (counterElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        counterElement.innerText = totalItems;
        counterElement.style.display = totalItems === 0 ? 'none' : 'inline-block';
    }
}

function renderCartPage() {
    const cartContainer = document.getElementById('cart-container');
    const totalPriceEl = document.getElementById('cart-total-price');
    if (!cartContainer) return;

    let cart = JSON.parse(localStorage.getItem('knigoved_cart')) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div style="text-align:center; padding: 60px 0;">
                <p style="font-size:20px; color:var(--color-text-muted); margin-bottom: 24px;">Ваша корзина пуста.</p>
                <a href="catalog.html" class="btn btn-primary">Перейти в каталог</a>
            </div>`;
        if (totalPriceEl) totalPriceEl.innerText = '0 ₼';
        return;
    }

    let totalSum = 0;
    let cartHtml = '';

    cart.forEach(item => {
        totalSum += item.price * item.quantity;
        
        let coverHtml = '<div class="cart-item-thumb">📖</div>';
        if (typeof booksData !== 'undefined') {
            const bookData = booksData.find(b => b.id === item.id);
            if (bookData && bookData.coverImg) {
                coverHtml = `<div class="cart-item-thumb" style="background-image: url('${bookData.coverImg}'); background-size: cover; background-position: center; border-radius: 4px; border: 1px solid var(--color-border); color: transparent;"></div>`;
            }
        }

        cartHtml += `
            <div class="cart-item">
                ${coverHtml}
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">${(item.price * item.quantity)} ₼</div>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="changeQty('${item.id}', -1)">−</button>
                    <span style="min-width:24px; text-align:center; font-weight:bold;">${item.quantity}</span>
                    <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
                    <button class="remove-btn" onclick="removeItem('${item.id}')">Удалить</button>
                </div>
            </div>`;
    });

    cartContainer.innerHTML = cartHtml;
    if (totalPriceEl) totalPriceEl.innerText = totalSum + ' ₼';

    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.onsubmit = function(e) {
            e.preventDefault();
            alert('Заказ успешно оформлен! Спасибо, что выбрали Книговед.');
            localStorage.removeItem('knigoved_cart');
            window.location.href = 'index.html';
        };
    }
}

window.changeQty = function(id, delta) {
    let cart = JSON.parse(localStorage.getItem('knigoved_cart')) || [];
    const item = cart.find(i => String(i.id) === String(id));
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) cart = cart.filter(i => String(i.id) !== String(id));
    }
    localStorage.setItem('knigoved_cart', JSON.stringify(cart));
    updateCartCounter();
    renderCartPage();
};

window.removeItem = function(id) {
    let cart = JSON.parse(localStorage.getItem('knigoved_cart')) || [];
    cart = cart.filter(i => String(i.id) !== String(id));
    localStorage.setItem('knigoved_cart', JSON.stringify(cart));
    updateCartCounter();
    renderCartPage();
};

function initCarousel() {
    const carousel = document.getElementById('categoriesCarousel');
    const scrollLeftBtn = document.getElementById('scrollLeftBtn');
    const scrollRightBtn = document.getElementById('scrollRightBtn');

    if (carousel && scrollLeftBtn && scrollRightBtn) {
        const scrollAmount = 260; 
        scrollRightBtn.addEventListener('click', () => carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' }));
        scrollLeftBtn.addEventListener('click', () => carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));

        carousel.addEventListener('scroll', () => {
            if (carousel.scrollLeft <= 0) {
                scrollLeftBtn.style.opacity = '0';
                scrollLeftBtn.style.pointerEvents = 'none';
            } else {
                scrollLeftBtn.style.opacity = '1';
                scrollLeftBtn.style.pointerEvents = 'all';
            }
            if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 1) {
                scrollRightBtn.style.opacity = '0';
                scrollRightBtn.style.pointerEvents = 'none';
            } else {
                scrollRightBtn.style.opacity = '1';
                scrollRightBtn.style.pointerEvents = 'all';
            }
        });
        carousel.dispatchEvent(new Event('scroll'));
    }
}

function renderIndexPage() {
    const popularGrid = document.getElementById('popular-books-grid');
    if (popularGrid && typeof booksData !== 'undefined') {
        const popularIds = ['k1', 'it1', 'p1', 'f1']; 
        
        let popularHtml = '';
        
        popularIds.forEach(id => {
            const book = booksData.find(b => b.id === id);
            if (book) {
                let badgeHtml = '';
                if (id === 'k1') badgeHtml = '<div class="badge badge-hit">Хит продаж</div>';
                if (id === 'it1') badgeHtml = '<div class="badge badge-new">Новинка</div>';

                let priceBlock = '';
                if (book.oldPrice) {
                    const discount = Math.round(((book.oldPrice - book.price) / book.oldPrice) * 100);
                    priceBlock = `
                        <div style="display: flex; flex-direction: column; justify-content: center;">
                            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                                <span style="color: #e74c3c; font-weight: 800; font-size: 20px; line-height: 1;">${book.price} ₼</span>
                                <span style="background: #e74c3c; color: white; padding: 2px 4px; border-radius: 4px; font-size: 11px; font-weight: bold; line-height: 1;">-${discount}%</span>
                            </div>
                            <span style="color: #95a5a6; font-size: 13px; text-decoration: line-through; line-height: 1;">${book.oldPrice} ₼</span>
                        </div>
                    `;
                } else {
                    priceBlock = `
                        <div style="display: flex; align-items: center; height: 100%;">
                            <span style="font-weight: 800; font-size: 20px; color: var(--color-text-main);">${book.price} ₼</span>
                        </div>
                    `;
                }

                popularHtml += `
                    <article class="book-card" data-category="${book.filterCategory}">
                        ${badgeHtml}
                        <a href="book.html?id=${book.id}" style="display: contents;">
                            <div class="book-cover" style="background-image: url('${book.coverImg}'); background-size: cover; background-position: center; border-radius: var(--radius-sm); height: 240px; margin-bottom: var(--space-md);">
                            </div>
                            <span class="book-category">${book.displayCategory}</span>
                            <h3 class="book-title">${book.title}</h3>
                            <p class="book-author">${book.author}</p>
                        </a>
                        <div class="book-rating">
                            <span class="stars">★★★★★</span>
                            <span class="rating-count">${book.rating} (${book.reviews})</span>
                        </div>
                        <div class="book-footer">
                            ${priceBlock}
                            <button class="btn btn-primary add-to-cart-btn" data-id="${book.id}" data-title="${book.title}" data-price="${book.price}">В корзину</button>
                        </div>
                    </article>
                `;
            }
        });
        
        popularGrid.innerHTML = popularHtml;
    }

    const monthBookContainer = document.getElementById('book-of-month-container');
    if (monthBookContainer && typeof booksData !== 'undefined') {
        const sapiensBook = booksData.find(b => b.id === 'h1');
        
        if (sapiensBook) {
            monthBookContainer.innerHTML = `
                <section class="editor-choice" style="background: linear-gradient(135deg, #2C3E50 0%, #34495E 100%);">
                    <div class="editor-text" style="cursor: pointer;" onclick="window.location.href='book.html?id=${sapiensBook.id}'">
                        <h2>Книга месяца</h2>
                        <p style="margin-bottom: 0;">Мировой бестселлер, который переведен на десятки языков. ${sapiensBook.desc}</p>
                    </div>
                    <div class="editor-book">
                        <div class="book-cover" style="height: 180px; background-image: url('${sapiensBook.coverImg}'); background-size: cover; background-position: center; border-radius: var(--radius-sm); margin-bottom: 10px; cursor: pointer;" onclick="window.location.href='book.html?id=${sapiensBook.id}'"></div>
                        <h3 class="book-title" style="font-size: 16px; margin-bottom: 4px; line-height: 1.3; cursor: pointer;" onclick="window.location.href='book.html?id=${sapiensBook.id}'">${sapiensBook.title}</h3>
                        <p class="book-author" style="font-size: 13px; color: var(--color-text-muted); margin-bottom: 0;">${sapiensBook.author}</p>
                        <button class="btn btn-primary add-to-cart-btn" style="width: 100%; margin-top: 10px; display: block; padding: 10px 0; border: none; border-radius: var(--radius-sm); background: var(--color-primary); color: white; cursor: pointer; font-weight: 600;" data-id="${sapiensBook.id}" data-title="${sapiensBook.title}" data-price="${sapiensBook.price}">В корзину - ${sapiensBook.price} ₼</button>
                    </div>
                </section>
            `;
        }
    }
}