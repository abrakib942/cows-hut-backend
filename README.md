# Live Link: [https://cows-hut-backend.vercel.app/](https://cows-hut-backend.vercel.app/)

# Application Routes:

# User

- api/v1/auth/signup (POST)
- api/v1/users (GET)
- api/v1/users/648ed70206d707000dc8b38b (Single GET)
- api/v1/users/648ed70206d707000dc8b38b (PATCH)
- api/v1/users/648ed70206d707000dc8b38b (DELETE)

# Cows

- api/v1/cows (POST)
- api/v1/cows (GET)
- api/v1/cows/648ed7f606d707000dc8b3a3 (Single GET)
- api/v1/cows/648ed7f606d707000dc8b3a3 (PATCH)
- api/v1/cows/648ed7f606d707000dc8b3a3 (DELETE)

# Pagination and Filtering routes of Cows

- api/v1/cows?page=1&limit=10
- api/v1/cows?sortBy=price&sortOrder=asc
- api/v1/cows?minPrice=1000&maxPrice=5000
- api/v1/cows?location=Dhaka
- api/v1/cows?searchTerm=Dha

# Orders

- api/v1/orders (POST)
- api/v1/orders (GET)
