function flipImage(item) {
  // Hapus kelas 'flipped' dari semua gambar lain terlebih dahulu
  const allItems = document.querySelectorAll('.gallery-item');
  allItems.forEach((el) => {
    if (el !== item) {
      el.classList.remove('flipped');
    }
  });

  // Tambahkan atau hapus kelas 'flipped' pada gambar yang diklik
  item.classList.toggle('flipped');
}

// Fungsi untuk menangani klik di luar gambar
function handleOutsideClick(event) {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  // Mengecek apakah klik terjadi di luar elemen gallery-item
  galleryItems.forEach((item) => {
    if (!item.contains(event.target)) {
      item.classList.remove('flipped');
    }
  });
}

// Daftarkan event listener untuk mendeteksi klik di luar gambar
document.addEventListener('click', handleOutsideClick);

// Fungsi tambahan untuk menangani klik pada bagian belakang gambar
function handleBackClick(country) {
  alert('You clicked on the back of the image for ' + country);
}

// Fungsi Haversine untuk menghitung jarak antara dua koordinat
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // returns the distance in km
}
// Check storage and download function
function checkStorageAndDownload() {
  const sizeInZB = 9999999; // Example size (in ZB, adjust accordingly)

  if (navigator.storage && navigator.storage.estimate) {
    navigator.storage.estimate().then((storage) => {
      const availableSpace = storage.quota - storage.usage;
      if (availableSpace >= sizeInZB * Math.pow(10, 21)) { // Convert size from ZB to bytes
        alert('Sufficient storage. Proceeding to download...');
        checkUserLocation(); // Proceed to location check
      } else {
        alert('Insufficient storage space for the file.');
      }
    }).catch((error) => {
      alert('Error checking storage: ' + error);
    });
  } else {
    alert('Storage estimation not supported by this browser.');
  }
}

// Function to check user's location and verify with high-risk zones
function checkUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const highRiskAreas = [
        { lat: 35.3606, lng: 137.4280 },
        { lat: 38.2970, lng: 141.0196 },
        { lat: -77.533, lng: 167.167 }, 
        { lat: -1.516, lng: 29.250 }, 
        { lat: -6.102, lng: 105.423 },
        { lat: -8.3405, lng: 116.4707 }, 
        { lat: 37.7510, lng: -119.5966 }, 
        { lat: 44.4280, lng: -110.5885 },
        { lat: 40.8216, lng: 14.4265 }, 
        { lat: -13.1667, lng: -72.5448 }, 
        { lat: 35.3622, lng: 138.7304 },
        { lat: -26.5225, lng: -68.3480 }, 
        { lat: 66.5608, lng: -53.0924 }, 
        { lat: -90.0000, lng: 0.0000 },
        { lat: 78.2232, lng: 15.6469 }, 
        { lat: -54.4296, lng: -36.5879 }, 
        { lat: -77.8463, lng: 166.6764 },
        { lat: -48.7758, lng: 123.3556 }, 
        { lat: -27.1127, lng: -109.3497 }, 
        { lat: 4.6126, lng: -74.0705 },
        { lat: -15.6010, lng: -71.9585 }, 
        { lat: -16.9203, lng: 145.7710 }, 
        { lat: 0.0000, lng: -160.0000 },
        { lat: 32.3078, lng: -64.7505 }, 
        { lat: -55.0406, lng: -67.5760 }, 
        { lat: -29.7167, lng: -176.3167 },
        { lat: -36.0562, lng: -75.1831 }, 
        { lat: 27.9881, lng: 86.9250 }, 
        { lat: -66.5533, lng: -60.9902 },
        { lat: -10.5000, lng: 161.0333 }, 
        { lat: 29.4250, lng: -98.4930 }, 
        { lat: -54.4400, lng: -37.3200 },
        { lat: -10.9720, lng: -77.6040 }, 
        { lat: -31.9505, lng: 115.8605 }, 
        { lat: -5.8833, lng: -35.2167 },
        { lat: -22.9035, lng: -43.2096 }, 
        { lat: 24.7136, lng: 46.6753 }, 
        { lat: 40.7128, lng: -74.0060 },
        { lat: 25.276987, lng: 55.296249 }, 
        { lat: 31.2304, lng: 121.4737 }, 
        { lat: -25.2744, lng: 133.7751 },
        { lat: 51.5074, lng: -0.1278 }, 
        { lat: 34.0522, lng: -118.2437 }, 
        { lat: -33.9249, lng: 18.4241 },
        { lat: 55.7558, lng: 37.6173 }, 
        { lat: 28.7041, lng: 77.1025 }, 
        { lat: 48.8566, lng: 2.3522 },
        { lat: 35.6895, lng: 139.6917 }, 
        { lat: -23.5505, lng: -46.6333 }, 
        { lat: 19.4326, lng: -99.1332 },
        { lat: -1.286389, lng: 36.817223 }, 
        { lat: 41.9028, lng: 12.4964 }
      ];

      let closestLocation = null;
      let closestDistance = Infinity;

      // Loop through the high-risk areas and calculate the distance
      highRiskAreas.forEach(area => {
        const distance = haversine(latitude, longitude, area.lat, area.lng);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestLocation = area;
        }
      });

      alert(`The closest high-risk area is at (Lat: ${closestLocation.lat}, Lng: ${closestLocation.lng}) with a distance of ${closestDistance.toFixed(2)} km.`);

      if (closestDistance < 0.005) {
        generateTokenAndDownload();
      } else {
        alert('You are not close enough to a high-risk area to proceed with the download.');
      }
    }, (error) => {
      alert('Error getting geolocation: ' + error.message);
    });
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

// Function to generate a random token, encrypt it, and start download
function generateTokenAndDownload() {
  const token = generateRandomToken();
  const encryptedToken = encryptToken(token);

  // Save the token and its expiration time
  const expirationTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours from now
  sessionStorage.setItem('token', encryptedToken);
  sessionStorage.setItem('expiration', expirationTime);

  // Create a download file with the encrypted token
  const blob = new Blob([encryptedToken], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'tokenFile.txt';
  link.click();
}

// Function to generate a random token of 22 characters
function generateRandomToken() {
  const charset = 'あいうえおかきくけこさしすせそたちつてとにぬねのまみむめもやゆよらりるれろわをんABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 22; i++) {
    token += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return token;
}

// Simple encryption (reverse the string)
function encryptToken(token) {
  return token.split('').reverse().join('');
}

// Function to check if the token is expired
function checkTokenExpiration() {
  const expirationTime = sessionStorage.getItem('expiration');
  if (expirationTime && Date.now() > expirationTime) {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('expiration');
    alert('Token has expired. Please generate a new one.');
  } else {
    alert('Token is still valid.');
  }
}

// Update progress bar (dummy example)
function updateProgressBar(percentage) {
  const progressBar = document.getElementById('progressBar');
  progressBar.style.width = percentage + '%';
}

// Toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// Validate email format
function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

// Format date to long format
function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
}

// Show or hide an element
function toggleVisibility(elementId) {
  const element = document.getElementById(elementId);
  element.style.display = (element.style.display === 'none' ? 'block' : 'none');
}

// Scroll to top of the page
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Copy text to clipboard
function copyTextToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

// Get cookie value
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

// Set cookie
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = 'expires=' + d.toUTCString();
  document.cookie = name + '=' + value + ';' + expires + ';path=/';
}

// Track page view
function trackPageView(page) {
  window.ga('send', 'pageview', page);
}

// Get a random integer between min and max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Disable right-click
function disableRightClick(event) {
  event.preventDefault();
}
document.addEventListener('contextmenu', disableRightClick);

// Start countdown
function startCountdown(endDate) {
  const countdown = setInterval(function() {
    const now = new Date().getTime();
    const distance = endDate - now;

    if (distance < 0) {
      clearInterval(countdown);
      alert('Countdown finished');
    }
  }, 1000);
}

// Change font size
function changeFontSize(size) {
  document.body.style.fontSize = size + 'px';
}

// Detect mobile device
function isMobileDevice() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

// Create a toast notification
function showToast(message) {
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Convert hex to RGB
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

// Check internet connection
function checkInternetConnection() {
  if (navigator.onLine) {
    alert('You are online');
  } else {
    alert('You are offline');
  }
}

// Save JSON to local storage
function saveJsonToLocalStorage(key, jsonData) {
  localStorage.setItem(key, JSON.stringify(jsonData));
}

// Validate password strength
function validatePassword(password) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return regex.test(password);
}

// Prevent form submit on Enter key
function preventFormSubmitOnEnter(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
}

function handleBackClick(country, event) {
  event.stopPropagation(); // Mencegah propagasi klik ke elemen induk
  alert('You clicked on the back of the image for ' + country);
}
