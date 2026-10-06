import '@testing-library/jest-dom';

window.matchMedia = () => new MediaQueryList();
window.ResizeObserver = new ResizeObserver(() => null);