CREATE TABLE products (
                          id SERIAL PRIMARY KEY,
                          productName VARCHAR(255) NOT NULL,
                          description TEXT NOT NULL,
                          price DECIMAL(10, 2) NOT NULL,
                          discount DECIMAL(5, 2),
                          quantityInStock INTEGER NOT NULL
);
