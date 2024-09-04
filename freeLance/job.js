document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('job-search');
    const suggestionsDiv = document.getElementById('suggestions');
    const subcategoriesDiv = document.getElementById('subcategories');
    const categories = {
        'Web Development': ['HTML', 'CSS', 'JavaScript', 'React', 'Angular', 'Vue.js', 'Node.js', 'Bootstrap'],
        'Programming': ['Python', 'Java', 'C++', 'JavaScript', 'Ruby', 'PHP', 'Swift', 'Kotlin', 'Rust'],
        'Editing': ['Proofreading', 'Copyediting', 'Technical Editing', 'Developmental Editing', 'Line Editing', 'Substantive Editing'],
        'Graphic Design': ['Photoshop', 'Illustrator', 'InDesign', 'CorelDRAW', 'Sketch', 'Figma', 'Adobe XD', 'Canva'],
        'SEO': ['On-page SEO', 'Off-page SEO', 'Technical SEO', 'Local SEO', 'E-commerce SEO', 'Content SEO', 'Mobile SEO'],
        'Content Writing': ['Blog Writing', 'Technical Writing', 'Creative Writing', 'Copywriting', 'Ghostwriting', 'Press Releases', 'Product Descriptions'],
        'Digital Marketing': ['Social Media Marketing', 'Email Marketing', 'PPC Advertising', 'Content Marketing', 'Affiliate Marketing', 'Influencer Marketing', 'Analytics'],
        'Data Science': ['Machine Learning', 'Deep Learning', 'Data Analysis', 'Data Visualization', 'Big Data', 'Statistical Analysis', 'Predictive Modeling'],
        'Mobile Development': ['iOS Development', 'Android Development', 'Flutter', 'React Native', 'Xamarin', 'SwiftUI', 'Kotlin Multiplatform'],
        'Virtual Assistance': ['Data Entry', 'Customer Support', 'Scheduling', 'Administrative Tasks', 'Email Management', 'Travel Planning', 'Social Media Management'],
        'Audio & Video Production': ['Video Editing', 'Audio Editing', 'Voice Over', 'Animation', 'Sound Design', 'Video Production', 'Podcast Editing'],
        'Translation': ['English to Spanish', 'Spanish to English', 'French to English', 'German to English', 'Mandarin to English', 'Russian to English', 'Arabic to English'],
        'UI/UX Design': ['User Research', 'Wireframing', 'Prototyping', 'User Testing', 'Interaction Design', 'Visual Design', 'Information Architecture'],
        'Game Development': ['Unity', 'Unreal Engine', '2D Game Design', '3D Game Design', 'Game Art', 'Game Programming', 'Level Design'],
        'Cybersecurity': ['Network Security', 'Information Security', 'Ethical Hacking', 'Penetration Testing', 'Incident Response', 'Security Auditing'],
        'Project Management': ['Agile', 'Scrum', 'Kanban', 'Project Planning', 'Risk Management', 'Resource Allocation', 'Project Tracking'],
        'Legal Services': ['Contract Drafting', 'Legal Research', 'Intellectual Property', 'Corporate Law', 'Family Law', 'Criminal Law', 'Employment Law']
        // Add more categories and subcategories
    };

    let selectedIndex = -1;
    let subcategoryIndex = -1;
    let currentCategory = '';

    input.addEventListener('input', () => {
        const query = input.value.toLowerCase();
        suggestionsDiv.innerHTML = ''; // Clear previous suggestions
        subcategoriesDiv.innerHTML = ''; // Clear previous subcategories
        subcategoryIndex = -1; // Reset subcategory index
        selectedIndex = -1; // Reset selected index
        currentCategory = '';

        if (query.length > 0) {
            const filteredCategories = Object.keys(categories).filter(category =>
                category.toLowerCase().includes(query)
            );

            const filteredSubcategories = Object.values(categories).flat().filter(subcategory =>
                subcategory.toLowerCase().includes(query)
            );

            const allSuggestions = [...filteredCategories, ...filteredSubcategories];

            if (allSuggestions.length > 0) {
                suggestionsDiv.style.display = 'block';

                allSuggestions.forEach((item, index) => {
                    const div = document.createElement('div');
                    div.className = 'suggestion-item';
                    div.innerHTML = highlightMatch(item, query);
                    div.dataset.index = index;
                    div.addEventListener('click', () => {
                        input.value = item;
                        if (categories[item]) {
                            currentCategory = item;
                            showSubcategories(item);
                        } else {
                            currentCategory = '';
                            subcategoriesDiv.innerHTML = '';
                            subcategoriesDiv.style.display = 'none';
                        }
                        suggestionsDiv.innerHTML = '';
                        suggestionsDiv.style.display = 'none';
                    });
                    suggestionsDiv.appendChild(div);
                });
            } else {
                suggestionsDiv.style.display = 'none';
            }
        } else {
            suggestionsDiv.style.display = 'none';
        }
    });

    function highlightMatch(text, query) {
        const startIndex = text.toLowerCase().indexOf(query);
        if (startIndex === -1) return text;
        const endIndex = startIndex + query.length;
        return text.slice(0, startIndex) +
            '<span class="highlight">' +
            text.slice(startIndex, endIndex) +
            '</span>' +
            text.slice(endIndex);
    }

    function showSubcategories(category) {
        subcategoriesDiv.innerHTML = '';
        const subcategories = categories[category] || [];
        if (subcategories.length > 0) {
            subcategoriesDiv.style.display = 'block';

            subcategories.forEach((subcat, index) => {
                const div = document.createElement('div');
                div.className = 'subcategory-item';
                div.innerHTML = subcat;
                div.dataset.index = index;
                div.addEventListener('click', () => {
                    input.value = subcat;
                    subcategoriesDiv.innerHTML = '';
                    subcategoriesDiv.style.display = 'none';
                    searchCategory(subcat);
                });
                subcategoriesDiv.appendChild(div);
            });
        } else {
            subcategoriesDiv.style.display = 'none';
        }
    }

    function searchCategory(category) {
        // Implement your search functionality here
        alert(`Searching for: ${category}`); // Placeholder for actual search action
    }

    input.addEventListener('keydown', (e) => {
        const items = document.querySelectorAll('.suggestion-item');
        const subItems = document.querySelectorAll('.subcategory-item');
        if (items.length === 0 && subItems.length === 0) return;

        if (e.key === 'ArrowDown') {
            if (subcategoriesDiv.style.display === 'block') {
                subcategoryIndex = (subcategoryIndex + 1) % subItems.length;
                updateHighlightedSubcategory();
            } else {
                selectedIndex = (selectedIndex + 1) % items.length;
                updateHighlightedSuggestion();
            }
        } else if (e.key === 'ArrowUp') {
            if (subcategoriesDiv.style.display === 'block') {
                subcategoryIndex = (subcategoryIndex - 1 + subItems.length) % subItems.length;
                updateHighlightedSubcategory();
            } else {
                selectedIndex = (selectedIndex - 1 + items.length) % items.length;
                updateHighlightedSuggestion();
            }
        } else if (e.key === 'Enter') {
            if (subcategoriesDiv.style.display === 'block' && subcategoryIndex >= 0 && subcategoryIndex < subItems.length) {
                const selectedSubcategory = subItems[subcategoryIndex].textContent;
                input.value = selectedSubcategory;
                subcategoriesDiv.innerHTML = '';
                subcategoriesDiv.style.display = 'none';
                searchCategory(selectedSubcategory);
            } else if (selectedIndex >= 0 && selectedIndex < items.length) {
                const selectedItem = items[selectedIndex].textContent;
                if (categories[selectedItem]) {
                    currentCategory = selectedItem;
                    showSubcategories(selectedItem);
                    suggestionsDiv.innerHTML = '';
                    suggestionsDiv.style.display = 'none';
                } else {
                    input.value = selectedItem;
                    searchCategory(selectedItem);
                    suggestionsDiv.innerHTML = '';
                    suggestionsDiv.style.display = 'none';
                }
            }
        }
    });

    function updateHighlightedSuggestion() {
        const items = document.querySelectorAll('.suggestion-item');
        items.forEach(item => item.classList.remove('highlighted'));
        if (selectedIndex >= 0) {
            items[selectedIndex].classList.add('highlighted');
            items[selectedIndex].scrollIntoView({ block: 'nearest' });
        }
    }

    function updateHighlightedSubcategory() {
        const subItems = document.querySelectorAll('.subcategory-item');
        subItems.forEach(item => item.classList.remove('highlighted'));
        if (subcategoryIndex >= 0) {
            subItems[subcategoryIndex].classList.add('highlighted');
            subItems[subcategoryIndex].scrollIntoView({ block: 'nearest' });
        }
    }

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-bar')) {
            suggestionsDiv.style.display = 'none';
            subcategoriesDiv.style.display = 'none';
        }
    });
});
