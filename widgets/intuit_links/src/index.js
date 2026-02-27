import displayLinks from "./display_links.js";
import { loadLinkListPage } from "./link_list.js";

const urlParams = new URLSearchParams(window.location.search);
const currentPage = parseInt(urlParams.get('page')) || 1;
const linksPerPage = 1000;


function updatePage(page) {
  // Update URL without reloading
  window.history.pushState({ page }, '', `?page=${page}`);
  loadLinkListPage(page)
    .then(() => {
      displayLinks(page, linksPerPage);
      renderPagination(page);
    })
    .catch((error) => {
      console.error(error);
    });
}

function renderPagination(page) {
  let pagination = document.getElementById('pagination');
  if (!pagination) {
    pagination = document.createElement('div');
    pagination.id = 'pagination';
    pagination.style.margin = '1em 0';
    const container = document.getElementById('intuit_links');
    container.appendChild(pagination);
  }
  pagination.innerHTML = '';
  // Previous link
  if (page > 1) {
    const prev = document.createElement('a');
    prev.href = `?page=${page - 1}`;
    prev.textContent = 'Previous Page';
    prev.style.marginRight = '1em';
    prev.onclick = (e) => {
      e.preventDefault();
      updatePage(page - 1);
    };
    pagination.appendChild(prev);
  }
  // Next link (always show, or add logic for max page)
  const next = document.createElement('a');
  next.href = `?page=${page + 1}`;
  next.textContent = 'Next Page';
  next.onclick = (e) => {
    e.preventDefault();
    updatePage(page + 1);
  };
  pagination.appendChild(next);
}

// Handle browser navigation (back/forward)
window.addEventListener('popstate', (event) => {
  const page = (event.state && event.state.page) || 1;
  updatePage(page);
});


// Wait for DOM ready
document.addEventListener('DOMContentLoaded', () => {
//   const urlParams = new URLSearchParams(window.location.search);
  const hasPageParam = urlParams.has('page');
//   const page = hasPageParam ? parseInt(urlParams.get('page')) || 1 : 1;
  if (hasPageParam) {
    updatePage(currentPage);
  } else {
    // Just load first page, don't add ?page param
    loadLinkListPage(1)
      .then(() => {
        displayLinks(1, linksPerPage);
        renderPagination(1);
      })
      .catch((error) => {
        console.error(error);
      });
  }
});
