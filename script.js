// ============================================
// SHETIMITTA - SMART AGRICULTURE MARKETPLACE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
    
    // Check login state and update navbar
    updateNavbarForLoginState();
    
    // Initialize charts if on the main page
    if (document.getElementById('salesPieChart')) {
        initCharts();
    }
    
    // Set default date for product form
    const endDateInput = document.getElementById('endDate');
    if (endDateInput) {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 30);
        endDateInput.value = futureDate.toISOString().split('T')[0];
    }
});

// ============================================
// INITIALIZATION
// ============================================

function initApp() {
    // Hamburger menu functionality
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger) hamburger.classList.remove('active');
            if (navLinks) navLinks.classList.remove('active');
        });
    });
}

// ============================================
// LOGIN STATE MANAGEMENT
// ============================================

function updateNavbarForLoginState() {
    const authSection = document.getElementById('authSection');
    if (!authSection) return;
    
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userName = localStorage.getItem('userName') || 'User';
    
    if (isLoggedIn) {
        authSection.innerHTML = `
            <div class="profile-icon" onclick="navigateTo('profile.html')" style="cursor: pointer;">
                <i class="fas fa-user-circle" style="font-size: 1.8rem; color: white;"></i>
            </div>
        `;
    } else {
        authSection.innerHTML = `
            <a href="login.html" class="btn-login">Login</a>
        `;
    }
}

function handleLogout() {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    
    // Update navbar
    updateNavbarForLoginState();
    
    alert('You have been logged out.');
    window.location.href = 'index.html';
}

// ============================================
// NAVIGATION
// ============================================

function navigateTo(page) {
    window.location.href = page;
}

// ============================================
// LOGIN / AUTH FUNCTIONALITY
// ============================================

function openLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (email && password) {
        // Simulate successful login
        const authSection = document.getElementById('authSection');
        if (authSection) {
            authSection.innerHTML = `
                <div class="profile-icon" onclick="toggleProfileDropdown()" style="cursor: pointer;">
                    <i class="fas fa-user-circle" style="font-size: 1.8rem; color: white;"></i>
                </div>
            `;
        }
        
        closeLoginModal();
        alert('Login successful! Welcome to ShetiMitta.');
    }
}

function toggleProfileDropdown() {
    const dropdown = document.getElementById('profileDropdown');
    if (dropdown) {
        if (dropdown.style.display === 'none' || dropdown.style.display === '') {
            dropdown.style.display = 'block';
        } else {
            dropdown.style.display = 'none';
        }
    }
}

function handleLogout() {
    const authSection = document.getElementById('authSection');
    if (authSection) {
        authSection.innerHTML = `
            <button class="btn-login" onclick="openLoginModal()">Login</button>
        `;
    }
    
    const dropdown = document.getElementById('profileDropdown');
    if (dropdown) {
        dropdown.style.display = 'none';
    }
    
    alert('You have been logged out.');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    const dropdown = document.getElementById('profileDropdown');
    const profileIcon = document.querySelector('.profile-icon');
    
    if (dropdown && !dropdown.contains(e.target) && !profileIcon?.contains(e.target)) {
        dropdown.style.display = 'none';
    }
});

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('loginModal');
    if (modal && e.target === modal) {
        closeLoginModal();
    }
});

// ============================================
// NOTIFICATIONS
// ============================================

function toggleNotifications() {
    alert('You have 3 new notifications:\n\n1. New order received\n2. Price update for Tomato\n3. Message from buyer');
}

// ============================================
// PRODUCT DETAILS
// ============================================

function viewProductDetails(name, price) {
    alert(`Product: ${name}\nPrice: ₹${price}/kg\n\nContact the farmer for more details or to place an order.`);
}

// ============================================
// MY PRODUCTS - ADD PRODUCT
// ============================================

function addProduct(event) {
    event.preventDefault();
    
    const productName = document.getElementById('productName').value;
    const productType = document.getElementById('productType').value;
    const productPrice = document.getElementById('productPrice').value;
    const productQuantity = document.getElementById('productQuantity').value;
    const endDate = document.getElementById('endDate').value;
    
    if (productName && productType && productPrice && productQuantity && endDate) {
        // Create product object
        const product = {
            id: Date.now(),
            name: productName,
            type: productType,
            price: productPrice,
            quantity: productQuantity,
            endDate: endDate,
            status: 'Active'
        };
        
        // Save to localStorage
        let products = JSON.parse(localStorage.getItem('shetiProducts')) || [];
        products.push(product);
        localStorage.setItem('shetiProducts', JSON.stringify(products));
        
        // Display the product
        displayProduct(product);
        
        // Reset form
        document.getElementById('productForm').reset();
        
        // Set new default date
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + 30);
        document.getElementById('endDate').value = newDate.toISOString().split('T')[0];
        
        alert('Product added successfully!');
    }
}

function displayProduct(product) {
    const grid = document.getElementById('productPreviewGrid');
    if (!grid) return;
    
    const card = document.createElement('div');
    card.className = 'product-preview-card';
    card.innerHTML = `
        <div class="product-preview-header">
            <h4>${product.name}</h4>
            <span class="product-type-badge">${product.type}</span>
        </div>
        <div class="product-preview-details">
            <span>Price:</span>
            <strong>₹${product.price}/kg</strong>
        </div>
        <div class="product-preview-details">
            <span>Quantity:</span>
            <strong>${product.quantity} kg</strong>
        </div>
        <div class="product-preview-details">
            <span>Status:</span>
            <strong style="color: #4caf50;">${product.status}</strong>
        </div>
        <div class="product-preview-date">
            <i class="fas fa-calendar-alt"></i> Valid until: ${formatDate(product.endDate)}
        </div>
    `;
    
    grid.appendChild(card);
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Load existing products
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('shetiProducts')) || [];
    const grid = document.getElementById('productPreviewGrid');
    
    if (grid) {
        grid.innerHTML = '';
        products.forEach(product => displayProduct(product));
    }
}

// ============================================
// CHARTS - CHART.JS INTEGRATION
// ============================================

function initCharts() {
    // Sales Pie Chart
    const pieCtx = document.getElementById('salesPieChart');
    if (pieCtx) {
        new Chart(pieCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Sold', 'Not Sold'],
                datasets: [{
                    data: [65, 35],
                    backgroundColor: ['#2e7d32', '#e5e7eb'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            usePointStyle: true
                        }
                    }
                },
                cutout: '60%'
            }
        });
    }
    
    // Monthly Sales Bar Chart
    const barCtx = document.getElementById('monthlySalesChart');
    if (barCtx) {
        new Chart(barCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Sales (₹)',
                    data: [12000, 19000, 15000, 22000, 18000, 25000],
                    backgroundColor: '#2e7d32',
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#e5e7eb'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    // Load existing products
    loadProducts();
}

// ============================================
// DAILY DIARY TRACKING SYSTEM
// ============================================

// Add new diary entry
function addDiaryEntry() {
    const date = document.getElementById('entryDate').value;
    const weather = document.getElementById('entryWeather').value;
    const temperature = document.getElementById('entryTemperature').value;
    const activity = document.getElementById('entryActivity').value;
    const notes = document.getElementById('entryNotes').value;
    const crop = document.getElementById('entryCrop').value;
    const cropHealth = document.getElementById('entryCropHealth').value;

    // Validation
    if (!date || weather === '--Select Weather--' || !activity || !notes || !crop || cropHealth === '--Select Health Status--') {
        alert('Please fill in all required fields!');
        return;
    }

    // Create entry object
    const entry = {
        id: Date.now(),
        date: date,
        weather: weather,
        temperature: temperature || 'N/A',
        activity: activity,
        notes: notes,
        crop: crop,
        cropHealth: cropHealth,
        createdAt: new Date().toLocaleString()
    };

    // Get existing entries from localStorage
    let entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
    
    // Add new entry
    entries.unshift(entry);
    
    // Save to localStorage
    localStorage.setItem('diaryEntries', JSON.stringify(entries));

    // Show success message
    alert('Entry added successfully!');

    // Clear form
    clearForm();

    // Refresh display
    displayAllEntries();
}

// Clear form inputs
function clearForm() {
    document.getElementById('entryDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('entryWeather').value = '--Select Weather--';
    document.getElementById('entryTemperature').value = '';
    document.getElementById('entryActivity').value = '';
    document.getElementById('entryNotes').value = '';
    document.getElementById('entryCrop').value = '';
    document.getElementById('entryCropHealth').value = '--Select Health Status--';
}

// Display all diary entries
function displayAllEntries() {
    const container = document.getElementById('diaryEntries');
    if (!container) return;

    const entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];

    if (entries.length === 0) {
        container.innerHTML = '<p class="no-entries">No entries yet. Add your first entry above!</p>';
        return;
    }

    let html = '';
    entries.forEach(entry => {
        html += createEntryHTML(entry);
    });

    container.innerHTML = html;
}

// Create HTML for a single entry
function createEntryHTML(entry) {
    const entryDate = new Date(entry.date).toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    return `
        <div class="diary-entry" data-id="${entry.id}">
            <div class="entry-header">
                <span class="entry-date">${entryDate}</span>
                <span class="entry-weather">${entry.weather}</span>
            </div>
            <div class="entry-detail">
                <strong>Temperature:</strong> ${entry.temperature}°C
            </div>
            <div class="entry-detail">
                <strong>Activity:</strong> ${entry.activity}
            </div>
            <div class="entry-detail">
                <strong>Crop:</strong> ${entry.crop}
            </div>
            <div class="entry-detail">
                <strong>Crop Health:</strong> ${entry.cropHealth}
            </div>
            <div class="entry-notes">
                <strong>Notes:</strong><br/>
                ${entry.notes}
            </div>
            <div class="entry-actions">
                <button class="btn-delete" onclick="deleteDiaryEntry(${entry.id})">Delete</button>
            </div>
        </div>
    `;
}

// Delete diary entry
function deleteDiaryEntry(id) {
    if (confirm('Are you sure you want to delete this entry?')) {
        let entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
        entries = entries.filter(entry => entry.id !== id);
        localStorage.setItem('diaryEntries', JSON.stringify(entries));
        displayAllEntries();
        alert('Entry deleted successfully!');
    }
}

// Filter entries by date
function filterByDate() {
    const filterDate = document.getElementById('filterDate').value;
    
    if (!filterDate) {
        alert('Please select a date to filter!');
        return;
    }

    const container = document.getElementById('diaryEntries');
    if (!container) return;

    const entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
    const filteredEntries = entries.filter(entry => entry.date === filterDate);

    if (filteredEntries.length === 0) {
        container.innerHTML = `<p class="no-entries">No entries found for ${new Date(filterDate).toLocaleDateString()}.</p>`;
        return;
    }

    let html = '';
    filteredEntries.forEach(entry => {
        html += createEntryHTML(entry);
    });

    container.innerHTML = html;
}

// Clear filter and show all entries
function clearFilter() {
    document.getElementById('filterDate').value = '';
    displayAllEntries();
}

// Export diary entries as JSON
function exportDiaryEntries() {
    const entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
    const dataStr = JSON.stringify(entries, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `diary_backup_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Get diary statistics
function getDiaryStats() {
    const entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
    
    const stats = {
        totalEntries: entries.length,
        crops: {},
        weatherCount: {},
        healthCount: {}
    };

    entries.forEach(entry => {
        // Count crops
        stats.crops[entry.crop] = (stats.crops[entry.crop] || 0) + 1;
        
        // Count weather
        stats.weatherCount[entry.weather] = (stats.weatherCount[entry.weather] || 0) + 1;
        
        // Count health status
        stats.healthCount[entry.cropHealth] = (stats.healthCount[entry.cropHealth] || 0) + 1;
    });

    return stats;
}