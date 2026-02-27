

function displayLinks(currentPage, linksPerPage = 1000) {
  console.log(`Displaying links for page ${currentPage} with ${linksPerPage} links per page`);
  // const startIndex = (currentPage - 1) * linksPerPage;
  // const endIndex = startIndex + linksPerPage;
  // const paginatedLinks = window.linkList.slice(startIndex, endIndex);
  const paginatedLinks = window.linkList;
  console.log(`Paginated links: ${paginatedLinks.length}`);

  const linksListElement = document.getElementById('links_list');
  linksListElement.innerHTML = '';

  paginatedLinks.forEach(link => {
    const listItem = document.createElement('li');
    const anchor = document.createElement('a');
    // console.log(`Adding link: ${link}`);
    anchor.href = link;
    anchor.textContent = link;
    anchor.target = '_blank';
    listItem.appendChild(anchor);
    linksListElement.appendChild(listItem);
  });
}

export default displayLinks;