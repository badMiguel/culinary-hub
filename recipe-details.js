function createTabs(tabNames, recipe, container) {
    // Create the tabs container div and add a class for styling
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'tabs-container';

    // Create the content container div and add a class for styling
    const contentContainer = document.createElement('div');
    contentContainer.id = 'content-container';

    // Loop over each tab name to create individual tabs and their corresponding content sections
    tabNames.forEach((tabName, index) => {
        // Create a button for each tab and set up its properties
        const tabButton = document.createElement('button');
        tabButton.innerText = tabName;
        tabButton.id = `tab-${tabName}`;
        tabButton.className = 'tab-button';
        tabButton.setAttribute('aria-controls', `content-${tabName}`);

        // Only the first tab is active initially
        if (index === 0) {
            tabButton.classList.add('active');
        }

        // Event listener to switch tabs on click
        tabButton.addEventListener('click', function() {
            // Remove active class from all tab buttons
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            // Hide all content sections
            document.querySelectorAll('.tab-content').forEach(content => {
                content.style.display = 'none';
            });

            // Add active class to the clicked tab and display its content
            tabButton.classList.add('active');
            const contentToShow = document.getElementById(`content-${tabName}`);
            contentToShow.style.display = 'block';
        });

        // Add the tab button to the tabs container
        tabsContainer.appendChild(tabButton);

        // Create a content div for each tab and set up its properties
        const tabContent = document.createElement('div');
        tabContent.id = `content-${tabName}`;
        tabContent.className = 'tab-content';
        tabContent.setAttribute('aria-labelledby', `tab-${tabName}`);

        // Only the first content section is visible initially
        if (index !== 0) {
            tabContent.style.display = 'none';
        }

        // Generate the specific content for this tab
        showDetails(tabName, recipe, tabContent);

        // Add the content section to the content container
        contentContainer.appendChild(tabContent);
    });

    // Append the tabs and content containers to the main container passed to the function
    container.appendChild(tabsContainer);
    container.appendChild(contentContainer);
}
