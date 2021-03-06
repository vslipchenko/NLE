import { mainContentHasOverflow, isElementIntoView, hasScrolled, getCssVariable, setCssVariable } from './utils.js';

(() => {
    const defineFooterIndent = () => {
        const footer = document.getElementById('footer');
        footer.classList.toggle('has-indent', mainContentHasOverflow());
    };

    const animateContacts = () => {
        const contacts = document.getElementById('contacts');
        contacts.classList.toggle('animate', isElementIntoView(contacts));
    };

    const defineArrow = () => {
        document.getElementById('arrow').classList.toggle('scrolled', hasScrolled());
    };

    const attachHeaderClick = () => {
        const header = document.getElementById('header');

        header.addEventListener('click', () => {
            hasScrolled() ? window.scrollTo({
                top: 0,
                behavior: 'smooth'
            }) : header.scrollIntoView({ behavior: 'smooth' });
        });
    };

    const attachCopyClick = () => {
        const copyButtons = document.getElementsByClassName('copy-wallet');

        [...copyButtons].forEach((button) => {
            button.addEventListener('click', (event) => {
                navigator.clipboard.writeText(event.target.previousElementSibling.textContent);
            });
        });
    };

    const setTopOffset = () => {
        const topOffset = document.documentElement.clientHeight - parseInt(getCssVariable('header-height')) + 'px';

        setCssVariable('main-top-offset', topOffset);
    };

    const renderMainContents = () => {
        document.getElementById('main').classList.add('initialized');
    };

    // React on browser's address bar toggling on mobile devices
    window.addEventListener('resize', () => {
        animateContacts(); // Has to be called on resize as well, as at this point window.innerHeight contains a relevant value 
    });

    window.addEventListener('scroll', () => {
        animateContacts();
        defineArrow();
    });
    // P.S. we can not depend on orientation solely, as we want to react to document size changes as well
    window.resizeApi.pushCallbacks(setTopOffset, defineFooterIndent);

    setTopOffset();
    renderMainContents();
    attachHeaderClick();
    defineArrow();
    attachCopyClick();
    defineFooterIndent();
    animateContacts();
})();
