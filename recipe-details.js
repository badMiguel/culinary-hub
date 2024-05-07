function createTabs(tabNames, recipe, container) {
    const tabsContainer = document.createElement('div');
    const contentContainer = document.createElement('div');
    contentContainer.id = 'content-container';

    tabNames.forEach(tabName => {
        const tabButton = document.createElement('button');
        tabButton.innerText = tabName;
        tabButton.addEventListener('click', function() {
            // Hide all content first
            document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
            // Show the clicked tab's content
            document.getElementById(tabName).style.display = 'block';
        });
        tabsContainer.appendChild(tabButton);

        // Initially hide content sections
        const tabContent = document.createElement('div');
        tabContent.id = tabName;
        tabContent.className = 'tab-content';
        tabContent.style.display = 'none'; // Hide content initially
        showDetails(tabName, recipe, tabContent);
        contentContainer.appendChild(tabContent);
    });

    container.appendChild(tabsContainer);
    container.appendChild(contentContainer);
}
