(function () {
    const locations = [
        'Patna', 'Lucknow', 'Ranchi', 'Muzaffarpur', 'Gomti Nagar',
        'Aliganj', 'Indira Nagar', 'Hazratganj', 'Vikas Nagar', 'Ashiyana'
    ];
    const services = [
        'invisible grills', 'balcony invisible grills', 'window invisible grills',
        'staircase safety grills', 'SS316 invisible grills', 'balcony safety nets',
        'child safety nets', 'pet safety nets', 'bird netting', 'pigeon netting',
        'balcony pigeon nets', 'mesh doors', 'sliding mesh doors',
        'magnetic mesh doors', 'pleated mesh doors', 'aluminium mesh doors',
        'terrace safety nets', 'window safety nets', 'anti bird nets',
        'custom safety grills'
    ];
    const intents = [
        'near me', 'installation price', 'installation service',
        'best installer', 'for home'
    ];
    const keywords = locations.flatMap((location) => services.flatMap((service) =>
        intents.map((intent) => `${service} in ${location} ${intent}`)
    ));
    const pageSize = 100;
    const grid = document.querySelector('[data-keyword-grid]');
    const pagination = document.querySelector('[data-keyword-pagination]');
    const search = document.querySelector('[data-keyword-search]') || document.querySelector('#keyword-search');
    const count = document.querySelector('[data-results-count]');
    const status = document.querySelector('[data-page-status]');

    if (!grid || !pagination || !search) return;

    let currentPage = 1;
    let filteredKeywords = keywords;

    function render() {
        const totalPages = Math.max(1, Math.ceil(filteredKeywords.length / pageSize));
        currentPage = Math.min(currentPage, totalPages);
        const start = (currentPage - 1) * pageSize;
        grid.innerHTML = filteredKeywords.slice(start, start + pageSize)
            .map((keyword) => `<a class="keyword-item" href="contact.html?service=${encodeURIComponent(keyword)}">${keyword}</a>`)
            .join('');
        count.textContent = `${filteredKeywords.length.toLocaleString('en-IN')} keywords`;
        status.textContent = `Page ${currentPage} of ${totalPages}`;
        pagination.innerHTML = Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            return `<button type="button" class="keyword-page${page === currentPage ? ' is-active' : ''}" data-page="${page}" aria-label="Go to keyword page ${page}" aria-current="${page === currentPage ? 'page' : 'false'}">${page}</button>`;
        }).join('');
    }

    search.addEventListener('input', () => {
        const query = search.value.trim().toLowerCase();
        filteredKeywords = query ? keywords.filter((keyword) => keyword.toLowerCase().includes(query)) : keywords;
        currentPage = 1;
        render();
    });

    pagination.addEventListener('click', (event) => {
        const button = event.target.closest('[data-page]');
        if (!button) return;
        currentPage = Number(button.dataset.page);
        render();
        document.querySelector('#explore').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    render();
})();