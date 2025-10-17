
const { MongoClient } = require('mongodb');


const uri = "mongodb+srv://njungush444_db_user:Y5TGzDoc12ufyH44@cluster0.xb4zwgz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

async function runAllQueries() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas\n');
    console.log('='.repeat(70));

    const db = client.db('plp_bookstore');
    const books = db.collection('books');

    
    // CRUD Operation
    console.log('\n BASIC CRUD OPERATIONS\n');
    console.log('='.repeat(70));

    // 1. Find all books in a specific genre (Fiction)
    console.log('\n1️  Find all books in "Fiction" genre:');
    console.log('-'.repeat(70));
    const fictionBooks = await books.find({ genre: 'Fiction' }).toArray();
    fictionBooks.forEach(book => {
      console.log(`   • ${book.title} by ${book.author} ($${book.price})`);
    });

    // 2. Find books published after a certain year (2000)
    console.log('\n2️⃣  Find books published after 1950:');
    console.log('-'.repeat(70));
    const recentBooks = await books.find({ published_year: { $gt: 1950 } }).toArray();
    recentBooks.forEach(book => {
      console.log(`   • ${book.title} (${book.published_year}) by ${book.author}`);
    });

    // 3. Find books by a specific author (George Orwell)
    console.log('\n3️⃣  Find books by George Orwell:');
    console.log('-'.repeat(70));
    const orwellBooks = await books.find({ author: 'George Orwell' }).toArray();
    orwellBooks.forEach(book => {
      console.log(`   • ${book.title} (${book.published_year}) - ${book.genre}`);
    });

    // 4. Update the price of a specific book
    console.log('\n4️⃣  Update price of "1984" to $13.99:');
    console.log('-'.repeat(70));
    const updateResult = await books.updateOne(
      { title: '1984' },
      { $set: { price: 13.99 } }
    );
    console.log(`   ✓ Modified ${updateResult.modifiedCount} document(s)`);
    const updatedBook = await books.findOne({ title: '1984' });
    console.log(`   • New price: $${updatedBook.price}`);

    // 5. Delete a book by its title
    console.log('\n5️⃣  Delete "Wuthering Heights":');
    console.log('-'.repeat(70));
    const deleteResult = await books.deleteOne({ title: 'Wuthering Heights' });
    console.log(`   ✓ Deleted ${deleteResult.deletedCount} document(s)`);
    const remainingCount = await books.countDocuments();
    console.log(`   • Total books remaining: ${remainingCount}`);

    // TASK 3: ADVANCED QUERIES
    console.log('\n\n📌 TASK 3: ADVANCED QUERIES\n');
    console.log('='.repeat(70));

    // 1. Find books that are in stock AND published after 2010
    console.log('\n1️⃣  Books in stock AND published after 1950:');
    console.log('-'.repeat(70));
    const inStockRecent = await books.find({
      in_stock: true,
      published_year: { $gt: 1950 }
    }).toArray();
    inStockRecent.forEach(book => {
      console.log(`   • ${book.title} (${book.published_year}) - $${book.price}`);
    });

    // 2. Projection - Return only title, author, and price
    console.log('\n2️⃣  Projection - Title, Author, Price only:');
    console.log('-'.repeat(70));
    const projectedBooks = await books.find(
      {},
      { projection: { title: 1, author: 1, price: 1, _id: 0 } }
    ).limit(5).toArray();
    projectedBooks.forEach(book => {
      console.log(`   • ${book.title} by ${book.author} - $${book.price}`);
    });

    // 3. Sorting - By price ascending
    console.log('\n3️⃣  Books sorted by price (Ascending):');
    console.log('-'.repeat(70));
    const sortedAsc = await books.find().sort({ price: 1 }).limit(5).toArray();
    sortedAsc.forEach(book => {
      console.log(`   • $${book.price.toFixed(2)} - ${book.title}`);
    });

    // 4. Sorting - By price descending
    console.log('\n4️⃣  Books sorted by price (Descending):');
    console.log('-'.repeat(70));
    const sortedDesc = await books.find().sort({ price: -1 }).limit(5).toArray();
    sortedDesc.forEach(book => {
      console.log(`   • $${book.price.toFixed(2)} - ${book.title}`);
    });

    // 5. Pagination - Page 1 (5 books per page)
    console.log('\n5️⃣  Pagination - Page 1 (5 books per page):');
    console.log('-'.repeat(70));
    const page1 = await books.find().limit(5).skip(0).toArray();
    page1.forEach((book, index) => {
      console.log(`   ${index + 1}. ${book.title} by ${book.author}`);
    });

    // 6. Pagination - Page 2
    console.log('\n6️⃣  Pagination - Page 2 (5 books per page):');
    console.log('-'.repeat(70));
    const page2 = await books.find().limit(5).skip(5).toArray();
    page2.forEach((book, index) => {
      console.log(`   ${index + 6}. ${book.title} by ${book.author}`);
    });

    // TASK 4: AGGREGATION PIPELINE
    console.log('\n\n TASK 4: AGGREGATION PIPELINE\n');
    console.log('='.repeat(70));

    // 1. Average price of books by genre
    console.log('\n1️⃣  Average price by genre:');
    console.log('-'.repeat(70));
    const avgPriceByGenre = await books.aggregate([
      {
        $group: {
          _id: '$genre',
          avgPrice: { $avg: '$price' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { avgPrice: -1 }
      }
    ]).toArray();
    avgPriceByGenre.forEach(result => {
      console.log(`   • ${result._id}: $${result.avgPrice.toFixed(2)} (${result.count} books)`);
    });

    // 2. Author with the most books
    console.log('\n2️⃣  Author with the most books:');
    console.log('-'.repeat(70));
    const authorWithMostBooks = await books.aggregate([
      {
        $group: {
          _id: '$author',
          bookCount: { $sum: 1 },
          books: { $push: '$title' }
        }
      },
      {
        $sort: { bookCount: -1 }
      },
      {
        $limit: 5
      }
    ]).toArray();
    authorWithMostBooks.forEach((result, index) => {
      console.log(`   ${index + 1}. ${result._id}: ${result.bookCount} book(s)`);
      result.books.forEach(title => {
        console.log(`      - ${title}`);
      });
    });

    // 3. Group books by publication decade
    console.log('\n3️⃣  Books grouped by decade:');
    console.log('-'.repeat(70));
    const booksByDecade = await books.aggregate([
      {
        $project: {
          title: 1,
          decade: {
            $multiply: [
              { $floor: { $divide: ['$published_year', 10] } },
              10
            ]
          }
        }
      },
      {
        $group: {
          _id: '$decade',
          count: { $sum: 1 },
          books: { $push: '$title' }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]).toArray();
    booksByDecade.forEach(result => {
      console.log(`   • ${result._id}s: ${result.count} book(s)`);
      result.books.forEach(title => {
        console.log(`      - ${title}`);
      });
    });

    // TASK 5: INDEXING
    console.log('\n\n📌 TASK 5: INDEXING\n');
    console.log('='.repeat(70));

    // 1. Create index on title field
    console.log('\n1️⃣  Creating index on "title" field:');
    console.log('-'.repeat(70));
    await books.createIndex({ title: 1 });
    console.log('   ✓ Index created successfully on title');

    // 2. Create compound index on author and published_year
    console.log('\n2️⃣  Creating compound index on "author" and "published_year":');
    console.log('-'.repeat(70));
    await books.createIndex({ author: 1, published_year: -1 });
    console.log('   ✓ Compound index created successfully');

    // 3. List all indexes
    console.log('\n3️⃣  List all indexes:');
    console.log('-'.repeat(70));
    const indexes = await books.indexes();
    indexes.forEach(index => {
      console.log(`   • ${index.name}: ${JSON.stringify(index.key)}`);
    });

    // 4. Performance comparison using explain()
    console.log('\n4️⃣  Performance comparison with explain():');
    console.log('-'.repeat(70));
    
    // Query WITHOUT using index (collection scan)
    console.log('\n   Without Index (searching by genre):');
    const explainWithoutIndex = await books.find({ genre: 'Fiction' }).explain('executionStats');
    console.log(`   • Execution time: ${explainWithoutIndex.executionStats.executionTimeMillis}ms`);
    console.log(`   • Documents examined: ${explainWithoutIndex.executionStats.totalDocsExamined}`);
    console.log(`   • Documents returned: ${explainWithoutIndex.executionStats.nReturned}`);

    // Query WITH index (index scan)
    console.log('\n   With Index (searching by title):');
    const explainWithIndex = await books.find({ title: 'The Hobbit' }).explain('executionStats');
    console.log(`   • Execution time: ${explainWithIndex.executionStats.executionTimeMillis}ms`);
    console.log(`   • Documents examined: ${explainWithIndex.executionStats.totalDocsExamined}`);
    console.log(`   • Documents returned: ${explainWithIndex.executionStats.nReturned}`);
    console.log(`   • Index used: ${explainWithIndex.executionStats.executionStages.indexName || 'None'}`);

    // Query using compound index
    console.log('\n   With Compound Index (searching by author and year):');
    const explainCompound = await books.find({ 
      author: 'George Orwell', 
      published_year: { $gt: 1940 } 
    }).explain('executionStats');
    console.log(`   • Execution time: ${explainCompound.executionStats.executionTimeMillis}ms`);
    console.log(`   • Documents examined: ${explainCompound.executionStats.totalDocsExamined}`);
    console.log(`   • Documents returned: ${explainCompound.executionStats.nReturned}`);

    // ==========================================
    // SUMMARY
    // ==========================================
    console.log('\n\n📊 SUMMARY\n');
    console.log('='.repeat(70));
    const finalCount = await books.countDocuments();
    const totalValue = await books.aggregate([
      { $group: { _id: null, total: { $sum: '$price' } } }
    ]).toArray();
    const avgPrice = await books.aggregate([
      { $group: { _id: null, avg: { $avg: '$price' } } }
    ]).toArray();

    console.log(`   • Total books: ${finalCount}`);
    console.log(`   • Total inventory value: $${totalValue[0].total.toFixed(2)}`);
    console.log(`   • Average book price: $${avgPrice[0].avg.toFixed(2)}`);
    console.log(`   • Total indexes: ${indexes.length}`);
    
    console.log('\n✅ All queries executed successfully!');
    console.log('='.repeat(70) + '\n');

  } catch (err) {
    console.error('❌ Error:', err.message);
    throw err;
  } finally {
    await client.close();
    console.log('🔌 Connection closed\n');
  }
}

// Run all queries
runAllQueries().catch(console.error);