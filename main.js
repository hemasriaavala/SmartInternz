// Property data
const properties = [
    {
        id: 1,
        title: "Modern Downtown Apartment",
        location: "Downtown, Seattle, WA",
        price: 2500,
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1200,
        type: "apartment",
        image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
        features: ["Gym", "Pool", "Parking", "Pet-friendly"],
        description: "Beautiful modern apartment in the heart of downtown Seattle. Features high-end finishes, floor-to-ceiling windows, and stunning city views. Walking distance to restaurants, shopping, and public transportation.",
        available: true,
        dateAdded: "2025-01-15"
    },
    {
        id: 2,
        title: "Cozy Studio in Capitol Hill",
        location: "Capitol Hill, Seattle, WA",
        price: 1800,
        bedrooms: 1,
        bathrooms: 1,
        sqft: 600,
        type: "apartment",
        image: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800",
        features: ["Laundry", "Parking", "Balcony"],
        description: "Charming studio apartment in the vibrant Capitol Hill neighborhood. Perfect for young professionals. Close to nightlife, cafes, and parks.",
        available: true,
        dateAdded: "2025-01-14"
    },
    {
        id: 3,
        title: "Luxury 3BR House with Garden",
        location: "Queen Anne, Seattle, WA",
        price: 4500,
        bedrooms: 3,
        bathrooms: 3,
        sqft: 2200,
        type: "house",
        image: "https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=800",
        features: ["Garden", "Garage", "Fireplace", "Deck"],
        description: "Stunning 3-bedroom house with private garden and panoramic city views. Features include hardwood floors, updated kitchen, and spacious living areas.",
        available: true,
        dateAdded: "2025-01-13"
    },
    {
        id: 4,
        title: "Waterfront Condo with View",
        location: "Belltown, Seattle, WA",
        price: 3200,
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1400,
        type: "condo",
        image: "https://images.pexels.com/photos/1571473/pexels-photo-1571473.jpeg?auto=compress&cs=tinysrgb&w=800",
        features: ["Water View", "Concierge", "Gym", "Rooftop"],
        description: "Luxurious waterfront condo with breathtaking Elliott Bay views. Building amenities include 24/7 concierge, fitness center, and rooftop deck.",
        available: true,
        dateAdded: "2025-01-12"
    },
    {
        id: 5,
        title: "Spacious Family Townhouse",
        location: "Fremont, Seattle, WA",
        price: 3800,
        bedrooms: 4,
        bathrooms: 3,
        sqft: 2000,
        type: "townhouse",
        image: "https://images.pexels.com/photos/1571475/pexels-photo-1571475.jpeg?auto=compress&cs=tinysrgb&w=800",
        features: ["Garage", "Yard", "Storage", "Patio"],
        description: "Perfect family home with 4 bedrooms and private yard. Located in the quirky Fremont neighborhood with great schools and family-friendly amenities.",
        available: true,
        dateAdded: "2025-01-11"
    },
    {
        id: 6,
        title: "Urban Loft in SoDo",
        location: "SoDo, Seattle, WA",
        price: 2200,
        bedrooms: 1,
        bathrooms: 1,
        sqft: 900,
        type: "apartment",
        image: "https://images.pexels.com/photos/1571477/pexels-photo-1571477.jpeg?auto=compress&cs=tinysrgb&w=800",
        features: ["High Ceilings", "Exposed Brick", "Parking"],
        description: "Industrial-style loft with high ceilings and exposed brick walls. Perfect for creatives and young professionals.",
        available: true,
        dateAdded: "2025-01-10"
    },
    {
        id: 7,
        title: "Charming Craftsman Bungalow",
        location: "Wallingford, Seattle, WA",
        price: 3500,
        bedrooms: 3,
        bathrooms: 2,
        sqft: 1800,
        type: "house",
        image: "https://images.pexels.com/photos/1571479/pexels-photo-1571479.jpeg?auto=compress&cs=tinysrgb&w=800",
        features: ["Original Details", "Garden", "Fireplace", "Hardwood"],
        description: "Beautiful craftsman bungalow with original details and modern updates. Features include restored hardwood floors and a lovely garden.",
        available: true,
        dateAdded: "2025-01-09"
    },
    {
        id: 8,
        title: "High-Rise Apartment with Amenities",
        location: "South Lake Union, Seattle, WA",
        price: 2800,
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1100,
        type: "apartment",
        image: "https://images.pexels.com/photos/1571481/pexels-photo-1571481.jpeg?auto=compress&cs=tinysrgb&w=800",
        features: ["Pool", "Gym", "Concierge", "Parking"],
        description: "Modern high-rise apartment with full amenities. Located in the tech hub of South Lake Union with easy access to Amazon and other major employers.",
        available: true,
        dateAdded: "2025-01-08"
    }
];

// State management
let currentProperties = [...properties];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let currentView = 'grid';
let currentPage = 1;
const propertiesPerPage = 6;

// DOM elements
const propertiesGrid = document.getElementById('properties-grid');
const locationSearch = document.getElementById('location-search');
const searchBtn = document.getElementById('search-btn');
const propertyTypeFilter = document.getElementById('property-type');
const bedroomsFilter = document.getElementById('bedrooms');
const priceRangeFilter = document.getElementById('price-range');
const sortBy = document.getElementById('sort-by');
const viewBtns = document.querySelectorAll('.view-btn');
const loadMoreBtn = document.getElementById('load-more-btn');
const modal = document.getElementById('property-modal');
const modalClose = document.getElementById('modal-close');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderProperties();
    setupEventListeners();
    updateFavorites();
});

// Event listeners
function setupEventListeners() {
    // Search functionality
    searchBtn.addEventListener('click', handleSearch);
    locationSearch.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // Filters
    propertyTypeFilter.addEventListener('change', applyFilters);
    bedroomsFilter.addEventListener('change', applyFilters);
    priceRangeFilter.addEventListener('change', applyFilters);
    sortBy.addEventListener('change', handleSort);
    
    // View toggle
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentView = this.dataset.view;
            renderProperties();
        });
    });
    
    // Load more
    loadMoreBtn.addEventListener('click', loadMoreProperties);
    
    // Modal
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Search functionality
function handleSearch() {
    const searchTerm = locationSearch.value.toLowerCase().trim();
    
    if (searchTerm) {
        currentProperties = properties.filter(property => 
            property.location.toLowerCase().includes(searchTerm) ||
            property.title.toLowerCase().includes(searchTerm)
        );
    } else {
        currentProperties = [...properties];
    }
    
    applyFilters();
}

// Filter functionality
function applyFilters() {
    let filteredProperties = [...currentProperties];
    
    // Property type filter
    const typeFilter = propertyTypeFilter.value;
    if (typeFilter) {
        filteredProperties = filteredProperties.filter(property => 
            property.type === typeFilter
        );
    }
    
    // Bedrooms filter
    const bedroomsFilterValue = bedroomsFilter.value;
    if (bedroomsFilterValue) {
        const bedrooms = parseInt(bedroomsFilterValue);
        filteredProperties = filteredProperties.filter(property => 
            property.bedrooms >= bedrooms
        );
    }
    
    // Price range filter
    const priceFilter = priceRangeFilter.value;
    if (priceFilter) {
        const [min, max] = priceFilter.split('-').map(p => parseInt(p) || Infinity);
        filteredProperties = filteredProperties.filter(property => 
            property.price >= min && (max === undefined || property.price <= max)
        );
    }
    
    currentProperties = filteredProperties;
    currentPage = 1;
    renderProperties();
}

// Sort functionality
function handleSort() {
    const sortValue = sortBy.value;
    
    switch (sortValue) {
        case 'price-low':
            currentProperties.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            currentProperties.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            currentProperties.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
            break;
        case 'bedrooms':
            currentProperties.sort((a, b) => b.bedrooms - a.bedrooms);
            break;
        default:
            break;
    }
    
    renderProperties();
}

// Render properties
function renderProperties() {
    const startIndex = 0;
    const endIndex = currentPage * propertiesPerPage;
    const propertiesToShow = currentProperties.slice(startIndex, endIndex);
    
    propertiesGrid.innerHTML = '';
    
    if (propertiesToShow.length === 0) {
        propertiesGrid.innerHTML = `
            <div class="no-results">
                <h3>No properties found</h3>
                <p>Try adjusting your search criteria or filters.</p>
            </div>
        `;
        return;
    }
    
    propertiesToShow.forEach(property => {
        const propertyCard = createPropertyCard(property);
        propertiesGrid.appendChild(propertyCard);
    });
    
    // Show/hide load more button
    if (endIndex >= currentProperties.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
    
    // Apply animations
    animateCards();
}

// Create property card
function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'property-card';
    card.setAttribute('data-id', property.id);
    
    const isFavorite = favorites.includes(property.id);
    
    card.innerHTML = `
        <img src="${property.image}" alt="${property.title}" class="property-image">
        <div class="property-info">
            <div class="property-price">$${property.price.toLocaleString()}/month</div>
            <h3 class="property-title">${property.title}</h3>
            <div class="property-location">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>
                ${property.location}
            </div>
            <div class="property-features">
                <div class="feature">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9,22 9,12 15,12 15,22"></polyline>
                    </svg>
                    ${property.bedrooms} bed
                </div>
                <div class="feature">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1 1v5a1.5 1.5 0 0 0 3 0V4a2 2 0 0 1 2-2z"></path>
                        <path d="M15 6 17.5 3.5a1.5 1.5 0 0 1 1 1v5a1.5 1.5 0 0 1-3 0V4a2 2 0 0 0-2-2z"></path>
                        <path d="M9 18h6"></path>
                        <path d="M10 14h4v4h-4z"></path>
                    </svg>
                    ${property.bathrooms} bath
                </div>
                <div class="feature">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                        <line x1="8" y1="21" x2="16" y2="21"></line>
                        <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                    ${property.sqft} sqft
                </div>
            </div>
            <div class="property-actions">
                <button class="btn btn-primary view-details-btn" data-id="${property.id}">View Details</button>
                <button class="btn btn-secondary">Contact</button>
                <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-id="${property.id}">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="${isFavorite ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
            </div>
        </div>
    `;
    
    // Add event listeners
    card.addEventListener('click', function(e) {
        if (!e.target.closest('.property-actions')) {
            openModal(property);
        }
    });
    
    card.querySelector('.view-details-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        openModal(property);
    });
    
    card.querySelector('.favorite-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        toggleFavorite(property.id);
    });
    
    return card;
}

// Load more properties
function loadMoreProperties() {
    currentPage++;
    renderProperties();
}

// Favorite functionality
function toggleFavorite(propertyId) {
    const index = favorites.indexOf(propertyId);
    
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(propertyId);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavorites();
}

function updateFavorites() {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(btn => {
        const propertyId = parseInt(btn.dataset.id);
        const isFavorite = favorites.includes(propertyId);
        
        btn.classList.toggle('active', isFavorite);
        const svg = btn.querySelector('svg');
        svg.setAttribute('fill', isFavorite ? 'currentColor' : 'none');
    });
}

// Modal functionality
function openModal(property) {
    modalTitle.textContent = property.title;
    modalBody.innerHTML = `
        <img src="${property.image}" alt="${property.title}" class="modal-image">
        <div class="modal-details">
            <div class="detail-group">
                <h4>Property Details</h4>
                <ul class="detail-list">
                    <li><strong>Price:</strong> $${property.price.toLocaleString()}/month</li>
                    <li><strong>Type:</strong> ${property.type.charAt(0).toUpperCase() + property.type.slice(1)}</li>
                    <li><strong>Bedrooms:</strong> ${property.bedrooms}</li>
                    <li><strong>Bathrooms:</strong> ${property.bathrooms}</li>
                    <li><strong>Square Feet:</strong> ${property.sqft}</li>
                </ul>
            </div>
            <div class="detail-group">
                <h4>Features & Amenities</h4>
                <ul class="detail-list">
                    ${property.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
        </div>
        <div class="modal-description">
            <h4>Description</h4>
            <p>${property.description}</p>
        </div>
        <div class="modal-actions">
            <button class="btn btn-outline">Save to Favorites</button>
            <button class="btn btn-secondary">Schedule Tour</button>
            <button class="btn btn-primary">Contact Agent</button>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Animation functions
function animateCards() {
    const cards = document.querySelectorAll('.property-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Utility functions
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }).format(price);
}

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Add debounced search
const debouncedSearch = debounce(handleSearch, 300);
locationSearch.addEventListener('input', debouncedSearch);

// Initialize with smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading states
function showLoading() {
    propertiesGrid.innerHTML = '<div class="loading">Loading properties...</div>';
}

function hideLoading() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.remove();
    }
}

// Add error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
});

// Add performance monitoring
window.addEventListener('load', function() {
    console.log('Page loaded successfully');
});

// Add accessibility features
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add CSS for keyboard navigation
const style = document.createElement('style');
style.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-blue) !important;
        outline-offset: 2px !important;
    }
    
    .loading {
        text-align: center;
        padding: var(--spacing-12);
        color: var(--neutral-600);
        font-size: var(--font-size-lg);
    }
    
    .no-results {
        text-align: center;
        padding: var(--spacing-12);
        color: var(--neutral-600);
        grid-column: 1 / -1;
    }
    
    .no-results h3 {
        margin-bottom: var(--spacing-4);
        color: var(--neutral-700);
    }
`;
document.head.appendChild(style);