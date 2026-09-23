
// Configure Tailwind dynamically if CDN script is present
if (window.tailwind) {
    tailwind.config = {
        theme: {
            extend: {
                colors: {
                    pine: {
                        50: '#f0f7f4',
                        100: '#dbece4',
                        500: '#2d6a4f',
                        600: '#1b4332',
                        700: '#081c15',
                    },
                    amber: {
                        500: '#f59e0b',
                        600: '#d97706',
                    }
                },
                fontFamily: {
                    sans: ['Inter', 'sans-serif'],
                }
            }
        }
    };
}

// Initial Sample Data for Baguio Rental Listings
let listings = [
    {
        id: 1,
        title: "Session Road Heights Transient & Dorm",
        type: "Dormitory",
        roomType: "Shared (2 Pax)",
        location: "Session Road / CBD",
        price: 3800,
        rating: 4.8,
        status: "Available",
        amenities: ["WiFi", "Water Heater", "Water Included"],
        owner: "Atty. Evelyn Ramos",
        phone: "+63 917 123 4567",
        description: "Walking distance to University of Baguio (UB) and Saint Louis University (SLU) Main Campus. Includes study tables, 24/7 CCTV security, and hot shower system suitable for Baguio cold weather.",
        universities: { "SLU Main": "5 mins", "UB": "3 mins", "UP Baguio": "10 mins", "UC": "7 mins" },
        images: [
            "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80"
        ],
        mapPos: { top: "35%", left: "48%" }
    },
    {
        id: 2,
        title: "Maryheights Bakakeng Student Boarding",
        type: "Boarding House",
        roomType: "Shared (4 Pax)",
        location: "Bakakeng / SLU Maryheights",
        price: 2500,
        rating: 4.6,
        status: "Available",
        amenities: ["WiFi", "Water Included", "Cooking Allowed"],
        owner: "Mrs. Remedios Castro",
        phone: "+63 920 987 6543",
        description: "Perfect for SLU Bakakeng students! Safe and quiet residential neighborhood with nearby laundry shops and affordable student eateries.",
        universities: { "SLU Maryheights": "2 mins walk", "UC": "20 mins jeep", "UB": "25 mins jeep", "SLU Main": "25 mins jeep" },
        images: [
            "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80"
        ],
        mapPos: { top: "70%", left: "30%" }
    },
    {
        id: 3,
        title: "Pine Woods View Studio Apartment",
        type: "Apartment",
        roomType: "Studio Unit",
        location: "General Luna / Main SLU",
        price: 12000,
        rating: 4.9,
        status: "Available",
        amenities: ["WiFi", "Water Heater", "Own CR", "Cooking Allowed"],
        owner: "Engr. Manuel Tan",
        phone: "+63 918 555 1029",
        description: "Spacious studio unit with private bathroom, kitchen counter, balcony with pine tree view. Ideal for medical/law students seeking a quiet study environment.",
        universities: { "SLU Main": "4 mins walk", "UB": "8 mins walk", "UC": "12 mins walk", "UP Baguio": "15 mins walk" },
        images: [
            "https://images.unsplash.com/photo-1502672016976-184518770b7d?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80"
        ],
        mapPos: { top: "25%", left: "55%" }
    },
    {
        id: 4,
        title: "Trancoville Ladies Transient & Bedspace",
        type: "Boarding House",
        roomType: "Single Room",
        location: "Trancoville",
        price: 4500,
        rating: 4.4,
        status: "Fully Booked",
        amenities: ["WiFi", "Water Heater", "Water Included"],
        owner: "Auntie Rose Flores",
        phone: "+63 908 333 8811",
        description: "Exclusive for female students and boarders. One ride jeepney to SLU Main, UB, and Public Market. Gated compound with curfew policies for safety.",
        universities: { "SLU Main": "8 mins jeep", "UB": "10 mins jeep", "UC": "12 mins jeep", "UP Baguio": "18 mins jeep" },
        images: [
            "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=400&q=80"
        ],
        mapPos: { top: "20%", left: "68%" }
    }
];

let favorites = [];
let inquiries = [];
let currentRole = 'tenant';
let currentViewMode = 'list';
let showOnlyFavorites = false;

// Initialize Web App on Page Load
document.addEventListener('DOMContentLoaded', () => {
    applyFilters();
    updateDashboardStats();
});

// Role Switcher Logic (Student/Tenant vs Landlord)
function switchRole(role) {
    currentRole = role;
    const tenantView = document.getElementById('tenant-view');
    const landlordView = document.getElementById('landlord-view');
    const btnTenant = document.getElementById('btn-role-tenant');
    const btnLandlord = document.getElementById('btn-role-landlord');

    if (role === 'tenant') {
        tenantView.classList.remove('hidden');
        landlordView.classList.add('hidden');
        
        btnTenant.className = "px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 bg-white text-pine-700 shadow-sm font-bold";
        btnLandlord.className = "px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 text-pine-100 hover:text-white";
    } else {
        tenantView.classList.add('hidden');
        landlordView.classList.remove('hidden');
        
        btnLandlord.className = "px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 bg-white text-pine-700 shadow-sm font-bold";
        btnTenant.className = "px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 text-pine-100 hover:text-white";
        
        renderLandlordTable();
        renderInquiriesList();
        updateDashboardStats();
    }
}

// Switch between Grid List & Simulated Map
function setViewMode(mode) {
    currentViewMode = mode;
    const grid = document.getElementById('listings-grid');
    const map = document.getElementById('listings-map-container');
    const btnList = document.getElementById('view-mode-list');
    const btnMap = document.getElementById('view-mode-map');

    if (mode === 'list') {
        grid.classList.remove('hidden');
        map.classList.add('hidden');
        btnList.className = "p-2 rounded-lg bg-white text-pine-600 shadow-sm text-xs font-bold";
        btnMap.className = "p-2 rounded-lg text-slate-500 hover:text-slate-700 text-xs font-bold";
    } else {
        grid.classList.add('hidden');
        map.classList.remove('hidden');
        btnMap.className = "p-2 rounded-lg bg-white text-pine-600 shadow-sm text-xs font-bold";
        btnList.className = "p-2 rounded-lg text-slate-500 hover:text-slate-700 text-xs font-bold";
        renderMapPins();
    }
}

// Helper to Update Max Price Slider Label
function updatePriceLabel(value) {
    document.getElementById('price-value').innerText = `₱${parseInt(value).toLocaleString()}`;
}

// Toggle Favorites Filter Mode
function toggleFavoritesFilter() {
    showOnlyFavorites = !showOnlyFavorites;
    const favBtn = document.getElementById('favorites-toggle-btn');
    if (showOnlyFavorites) {
        favBtn.classList.add('bg-amber-500/30', 'border-amber-500');
        showToast("Filtering saved favorites only.");
    } else {
        favBtn.classList.remove('bg-amber-500/30', 'border-amber-500');
    }
    applyFilters();
}

// Favorite Button Handler
function toggleFavorite(id, event) {
    if (event) event.stopPropagation();
    const index = favorites.indexOf(id);
    if (index > -1) {
        favorites.splice(index, 1);
        showToast("Removed property from saved favorites.");
    } else {
        favorites.push(id);
        showToast("Added property to saved favorites!");
    }

    const badge = document.getElementById('fav-count-badge');
    if (favorites.length > 0) {
        badge.innerText = favorites.length;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }

    applyFilters();
}

// Master Search & Filter Engine
function applyFilters() {
    const searchVal = document.getElementById('search-input').value.toLowerCase();
    const typeVal = document.getElementById('type-filter').value;
    const locationVal = document.getElementById('location-filter').value;
    const roomtypeVal = document.getElementById('roomtype-filter').value;
    const maxPrice = parseInt(document.getElementById('price-filter').value);
    const sortBy = document.getElementById('sort-by').value;

    const selectedAmenities = Array.from(document.querySelectorAll('.amenity-checkbox:checked')).map(cb => cb.value);

    let filtered = listings.filter(item => {
        if (showOnlyFavorites && !favorites.includes(item.id)) return false;

        const matchesSearch = item.title.toLowerCase().includes(searchVal) || 
                              item.location.toLowerCase().includes(searchVal) ||
                              item.description.toLowerCase().includes(searchVal);
        const matchesType = (typeVal === 'All') || item.type === typeVal;
        const matchesLocation = (locationVal === 'All') || item.location === locationVal;
        const matchesRoomType = (roomtypeVal === 'All') || item.roomType === roomtypeVal;
        const matchesPrice = item.price <= maxPrice;

        const matchesAmenities = selectedAmenities.every(amenity => item.amenities.includes(amenity));

        return matchesSearch && matchesType && matchesLocation && matchesRoomType && matchesPrice && matchesAmenities;
    });

    // Sorting
    if (sortBy === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    document.getElementById('results-count').innerText = filtered.length;
    renderListingsGrid(filtered);
    if (currentViewMode === 'map') renderMapPins(filtered);
}

// Render Grid Card Items
function renderListingsGrid(items) {
    const grid = document.getElementById('listings-grid');
    grid.innerHTML = '';

    if (items.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full py-12 text-center text-slate-400 bg-white rounded-2xl border border-slate-200/80">
                <i class="fa-solid fa-house-circle-xmark text-4xl mb-2 text-slate-300"></i>
                <p class="font-bold text-slate-600 text-sm">No matching Baguio rental properties found.</p>
                <p class="text-xs text-slate-400 mt-1">Try relaxing your search terms, price range, or amenity filters.</p>
            </div>
        `;
        return;
    }

    items.forEach(item => {
        const isFav = favorites.includes(item.id);
        const card = document.createElement('div');
        card.className = "bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col cursor-pointer group";
        card.onclick = () => openPropertyModal(item.id);

        card.innerHTML = `
            <div class="relative h-48 bg-slate-100 overflow-hidden">
                <img src="${item.images[0]}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                <div class="absolute top-3 left-3 bg-slate-900/70 backdrop-blur-xs text-white text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider">
                    ${item.type}
                </div>
                <button onclick="toggleFavorite(${item.id}, event)" class="absolute top-3 right-3 w-8 h-8 rounded-full ${isFav ? 'bg-amber-500 text-white' : 'bg-white/80 text-slate-600 hover:bg-white'} backdrop-blur-xs flex items-center justify-center shadow-md transition-colors">
                    <i class="fa-solid fa-heart ${isFav ? 'text-white' : 'text-slate-400'}"></i>
                </button>
                <div class="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-pine-700 font-extrabold text-xs px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                    <i class="fa-solid fa-star text-amber-500 text-[10px]"></i> ${item.rating}
                </div>
            </div>

            <div class="p-4 flex-1 flex flex-col justify-between gap-3">
                <div>
                    <h3 class="font-bold text-sm text-slate-800 line-clamp-1 group-hover:text-pine-600 transition-colors">${item.title}</h3>
                    <p class="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                        <i class="fa-solid fa-location-dot text-rose-500 text-[10px]"></i> ${item.location}
                    </p>
                </div>

                <div class="flex flex-wrap gap-1">
                    <span class="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-md">${item.roomType}</span>
                    ${item.amenities.slice(0, 2).map(a => `<span class="text-[10px] bg-pine-50 text-pine-700 font-medium px-2 py-0.5 rounded-md">${a}</span>`).join('')}
                    ${item.amenities.length > 2 ? `<span class="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md">+${item.amenities.length - 2}</span>` : ''}
                </div>

                <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                        <span class="text-[10px] text-slate-400 block font-medium">Monthly Rate</span>
                        <span class="text-base font-extrabold text-pine-600">₱${item.price.toLocaleString()}</span>
                    </div>
                    <span class="text-xs font-bold text-pine-600 hover:underline flex items-center gap-1">
                        View Details <i class="fa-solid fa-arrow-right text-[10px]"></i>
                    </span>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Render Pins on Interactive Map View
function renderMapPins(itemsToRender) {
    const items = itemsToRender || listings;
    const container = document.getElementById('map-pins-container');
    container.innerHTML = '';

    items.forEach(item => {
        const pin = document.createElement('div');
        pin.className = "absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group z-10";
        pin.style.top = item.mapPos.top;
        pin.style.left = item.mapPos.left;
        pin.onclick = () => openPropertyModal(item.id);

        pin.innerHTML = `
            <div class="bg-pine-600 hover:bg-amber-500 text-white text-xs font-extrabold px-2.5 py-1 rounded-full shadow-lg border-2 border-white flex items-center gap-1 transition-all group-hover:scale-110">
                <i class="fa-solid fa-house-flag text-[10px]"></i> ₱${item.price.toLocaleString()}
            </div>
        `;
        container.appendChild(pin);
    });
}

// Property Details Modal Handler
function openPropertyModal(id) {
    const item = listings.find(l => l.id === id);
    if (!item) return;

    document.getElementById('modal-title').innerText = item.title;
    document.getElementById('modal-location').innerHTML = `<i class="fa-solid fa-location-dot text-rose-500"></i> ${item.location}`;
    document.getElementById('modal-type-badge').innerText = `${item.type} • ${item.roomType}`;
    
    const statusBadge = document.getElementById('modal-status-badge');
    statusBadge.innerText = item.status;
    statusBadge.className = item.status === 'Available' ? 'px-2.5 py-0.5 rounded-md font-bold text-[11px] bg-emerald-100 text-emerald-800' : 'px-2.5 py-0.5 rounded-md font-bold text-[11px] bg-rose-100 text-rose-800';

    document.getElementById('modal-price').innerText = `₱${item.price.toLocaleString()} / mo`;
    document.getElementById('modal-owner-name').innerText = item.owner;
    document.getElementById('modal-owner-phone').innerText = item.phone;
    document.getElementById('modal-description').innerText = item.description;

    document.getElementById('modal-img-main').src = item.images[0] || '';
    document.getElementById('modal-img-sub1').src = item.images[1] || item.images[0] || '';
    document.getElementById('modal-img-sub2').src = item.images[2] || item.images[0] || '';

    // Render Universities Proximity
    const univContainer = document.getElementById('modal-universities');
    univContainer.innerHTML = '';
    if (item.universities) {
        Object.entries(item.universities).forEach(([univ, dist]) => {
            univContainer.innerHTML += `
                <div class="bg-slate-100 p-2 rounded-xl text-center">
                    <span class="block text-[10px] font-bold text-slate-500">${univ}</span>
                    <span class="block text-xs font-extrabold text-pine-600">${dist}</span>
                </div>
            `;
        });
    }

    // Render Amenities
    const amenContainer = document.getElementById('modal-amenities');
    amenContainer.innerHTML = item.amenities.map(a => `<span class="px-2.5 py-1 bg-pine-50 text-pine-700 text-xs font-semibold rounded-lg border border-pine-100"><i class="fa-solid fa-check text-[10px] mr-1"></i>${a}</span>`).join('');

    document.getElementById('inquiry-property-id').value = item.id;
    document.getElementById('property-modal').classList.remove('hidden');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

// Handle Student Inquiry Submission
function handleInquirySubmit(e) {
    e.preventDefault();
    const propId = parseInt(document.getElementById('inquiry-property-id').value);
    const prop = listings.find(l => l.id === propId);
    
    const newInquiry = {
        id: Date.now(),
        propertyTitle: prop ? prop.title : 'General Rental Inquiry',
        name: document.getElementById('inquiry-name').value,
        contact: document.getElementById('inquiry-contact').value,
        message: document.getElementById('inquiry-message').value,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };

    inquiries.unshift(newInquiry);
    closeModal('property-modal');
    showToast("Inquiry sent successfully to the property owner!");
    e.target.reset();
}

// Landlord View Dashboard Functions
function switchLandlordTab(tab) {
    const propTab = document.getElementById('landlord-tab-properties');
    const inqTab = document.getElementById('landlord-tab-inquiries');
    const btnProp = document.getElementById('tab-btn-properties');
    const btnInq = document.getElementById('tab-btn-inquiries');

    if (tab === 'properties') {
        propTab.classList.remove('hidden');
        inqTab.classList.add('hidden');
        btnProp.className = "px-4 py-2 text-xs font-bold text-pine-600 border-b-2 border-pine-600 flex items-center gap-2";
        btnInq.className = "px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 flex items-center gap-2";
    } else {
        propTab.classList.add('hidden');
        inqTab.classList.remove('hidden');
        btnInq.className = "px-4 py-2 text-xs font-bold text-pine-600 border-b-2 border-pine-600 flex items-center gap-2";
        btnProp.className = "px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 flex items-center gap-2";
    }
}

function renderLandlordTable() {
    const tbody = document.getElementById('landlord-listings-table');
    tbody.innerHTML = '';

    listings.forEach(item => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-slate-50/80 transition-colors";
        tr.innerHTML = `
            <td class="py-3 px-4">
                <p class="font-bold text-slate-800">${item.title}</p>
                <p class="text-[11px] text-slate-400">${item.type} • ${item.roomType}</p>
            </td>
            <td class="py-3 px-4 font-medium text-slate-600">${item.location}</td>
            <td class="py-3 px-4 font-extrabold text-pine-600">₱${item.price.toLocaleString()}</td>
            <td class="py-3 px-4">
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${item.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}">
                    ${item.status}
                </span>
            </td>
            <td class="py-3 px-4 text-right">
                <button onclick="toggleListingStatus(${item.id})" class="px-2.5 py-1 text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg">
                    Toggle Status
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function toggleListingStatus(id) {
    const item = listings.find(l => l.id === id);
    if (item) {
        item.status = item.status === 'Available' ? 'Fully Booked' : 'Available';
        renderLandlordTable();
        updateDashboardStats();
        showToast(`Updated "${item.title}" status to ${item.status}.`);
    }
}

function renderInquiriesList() {
    const container = document.getElementById('inquiries-list');
    container.innerHTML = '';

    if (inquiries.length === 0) {
        container.innerHTML = `<p class="text-xs text-slate-400 py-6 text-center">No tenant inquiries received yet.</p>`;
        return;
    }

    inquiries.forEach(inq => {
        container.innerHTML += `
            <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 flex flex-col gap-1 text-xs">
                <div class="flex items-center justify-between">
                    <span class="font-bold text-slate-800">${inq.name} <span class="text-slate-400 font-normal">(${inq.contact})</span></span>
                    <span class="text-[10px] text-slate-400 font-medium">${inq.date}</span>
                </div>
                <p class="text-pine-700 font-bold text-[11px]">Re: ${inq.propertyTitle}</p>
                <p class="text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200/60 mt-1">${inq.message}</p>
            </div>
        `;
    });
}

function updateDashboardStats() {
    document.getElementById('stat-total-properties').innerText = listings.length;
    document.getElementById('stat-available-properties').innerText = listings.filter(l => l.status === 'Available').length;
    document.getElementById('stat-booked-properties').innerText = listings.filter(l => l.status === 'Fully Booked').length;
    document.getElementById('stat-inquiries').innerText = inquiries.length;
}

// Open / Create New Listing Modal
function openAddListingModal() {
    document.getElementById('add-listing-modal').classList.remove('hidden');
}

function handleCreateListing(e) {
    e.preventDefault();
    const selectedAmenities = Array.from(document.querySelectorAll('input[name="new-amenities"]:checked')).map(cb => cb.value);

    const newListing = {
        id: Date.now(),
        title: document.getElementById('new-title').value,
        type: document.getElementById('new-type').value,
        roomType: document.getElementById('new-roomtype').value,
        location: document.getElementById('new-location').value,
        price: parseInt(document.getElementById('new-price').value),
        rating: 5.0,
        status: "Available",
        amenities: selectedAmenities,
        owner: document.getElementById('new-owner').value,
        phone: document.getElementById('new-phone').value,
        description: document.getElementById('new-desc').value,
        universities: { "SLU Main": "10 mins", "UB": "10 mins" },
        images: ["https://images.unsplash.com/photo-1502672016976-184518770b7d?auto=format&fit=crop&w=600&q=80"],
        mapPos: { top: "50%", left: "50%" }
    };

    listings.unshift(newListing);
    closeModal('add-listing-modal');
    applyFilters();
    renderLandlordTable();
    updateDashboardStats();
    showToast("New property listing published successfully!");
    e.target.reset();
}

// Custom Toast System
function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = "bg-slate-900/90 text-white text-xs px-4 py-2.5 rounded-xl shadow-xl backdrop-blur-xs flex items-center gap-2 pointer-events-auto transition-all transform translate-y-2 opacity-0";
    toast.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-400"></i> ${message}`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
    }, 10);

    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}