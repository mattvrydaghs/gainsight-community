/**
 * Dynamically loads a linkList JS file for the given page number.
 * @param {number} pageNumber - The page number to load (e.g., 1 loads linkList_1.js)
 * @returns {Promise<any>} Resolves when the script is loaded, rejects on error.
 */
function loadLinkListPage(pageNumber) {
	return new Promise((resolve, reject) => {
		if (typeof pageNumber !== 'number' || pageNumber < 1) {
			reject(new Error('Invalid page number'));
			return;
		}
		const scriptId = `linkListScript_${pageNumber}`;
		// Remove any existing script for this page
		const existing = document.getElementById(scriptId);
		if (existing) {
			existing.parentNode.removeChild(existing);
		}
		// Remove any previous global linkList
		if (window.linkList) {
			delete window.linkList;
		}
		const script = document.createElement('script');
		script.id = scriptId;
		script.type = 'text/javascript';
		script.src = `../linkList_${pageNumber}.js`;
		script.onload = () => {
			if (window.linkList) {
				const result = window.linkList;
				// Optionally clean up global after use
				// delete window.linkList;
				resolve(result);
			} else {
				reject(new Error(`linkList object not found after loading linkList_${pageNumber}.js`));
			}
		};
		script.onerror = (e) => reject(new Error(`Failed to load linkList_${pageNumber}.js`));
		const container = document.getElementById('intuit_links_script_container');
		if (container) {
			container.appendChild(script);
		} else {
			console.error('Script container not found');
			reject(new Error('Script container not found'));
		}
	});
}

export { loadLinkListPage };