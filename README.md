# MongoDB Week 1 Assignment - Book Store Database

## 📚 Project Overview
This project demonstrates MongoDB fundamentals including database setup, CRUD operations, advanced queries, aggregation pipelines, and indexing optimization.

## 🎯 Assignment Completion

### Tasks Completed
- ✅ Task 1: MongoDB Setup (Atlas Database)
- ✅ Task 2: Basic CRUD Operations
- ✅ Task 3: Advanced Queries (Filtering, Projection, Sorting, Pagination)
- ✅ Task 4: Aggregation Pipeline
- ✅ Task 5: Indexing for Performance

## 🗂️ Database Structure

**Database Name:** `plp_bookstore`  
**Collection Name:** `books`

### Document Schema
Each book document contains:
- `title` (string) - Book title
- `author` (string) - Author name
- `genre` (string) - Book genre
- `published_year` (number) - Publication year
- `price` (number) - Book price
- `in_stock` (boolean) - Availability status
- `pages` (number) - Number of pages
- `publisher` (string) - Publisher name

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB installation)
- npm (comes with Node.js)

### Setup Steps

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd <repo-folder>
   ```

2. **Install dependencies:**
   ```bash
   npm install mongodb
   ```

3. **Configure MongoDB connection:**
   - Open `insert_books.js` and `queries.js`
   - Update the `uri` variable with your MongoDB connection string
   - For Atlas: Use the connection string from your cluster
   - For local: Use `mongodb://localhost:27017`

## 🚀 Running the Scripts

### 1. Insert Sample Data
Populates the database with 12 sample books:
```bash
node insert_books.js
```

**Expected Output:**
```
✅ Connected to MongoDB Atlas successfully!
📊 Current books in collection: 0
📚 Inserting books...
✅ 12 books inserted successfully!
```

### 2. Execute All Queries
Runs all assignment tasks (CRUD, Advanced Queries, Aggregation, Indexing):
```bash
node queries.js
```

**Expected Output:**
- Complete execution of all tasks
- Performance metrics for indexed vs non-indexed queries
- Summary statistics of the database

## 📋 Features Demonstrated

### CRUD Operations
- **Create:** Insert multiple book documents
- **Read:** Query books by genre, author, year
- **Update:** Modify book prices
- **Delete:** Remove books by title

### Advanced Queries
- Complex filtering (multiple conditions)
- Field projection (selective field retrieval)
- Sorting (ascending/descending)
- Pagination (limit and skip)

### Aggregation Pipeline
- Calculate average price by genre
- Find authors with most books
- Group books by publication decade

### Indexing
- Single field index on `title`
- Compound index on `author` and `published_year`
- Performance analysis using `explain()`

## 📊 Sample Queries

### Find Fiction Books
```javascript
db.books.find({ genre: 'Fiction' })
```

### Find Books Published After 1950
```javascript
db.books.find({ published_year: { $gt: 1950 } })
```

### Average Price by Genre
```javascript
db.books.aggregate([
  {
    $group: {
      _id: '$genre',
      avgPrice: { $avg: '$price' }
    }
  }
])
```

## 🔍 Performance Optimization

### Indexes Created
1. **Single Index:** `title` (ascending)
2. **Compound Index:** `author` (ascending), `published_year` (descending)

### Performance Improvement
- Index usage reduces document examination
- Faster query execution times
- Efficient data retrieval for common queries

## 📁 Project Structure
```
.
├── insert_books.js       # Script to populate database
├── queries.js            # All assignment queries
├── README.md            # This file
├── package.json         # Node.js dependencies
└── screenshot.png       # MongoDB Atlas screenshot
```

## 🛠️ Technologies Used
- **Database:** MongoDB Atlas / MongoDB Community Edition
- **Runtime:** Node.js
- **Driver:** MongoDB Node.js Driver (mongodb npm package)
- **Tools:** MongoDB Shell (mongosh), MongoDB Compass

## 📝 Notes
- The database contains 12 sample books across various genres
- All queries are fully functional and tested
- Indexes significantly improve query performance
- Connection string should be kept private (use environment variables in production)

## 🎓 Learning Outcomes
- Understanding MongoDB document structure
- Proficiency in MongoDB query language
- Knowledge of aggregation framework
- Understanding of database indexing
- Performance optimization techniques

## 👤 Author
**Student Name:** Peter Waweru 
**Assignment:** MongoDB Week 1 - Data Layer Fundamentals  
**Date:** 17 October 2025

## 📧 Support
For questions or issues, please contact your instructor or refer to:
- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/)

---

**Assignment Status:** ✅ Complete