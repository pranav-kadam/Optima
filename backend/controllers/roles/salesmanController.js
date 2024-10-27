const db = require('../../utils/db');

const getProducts = async (req, res) => {
    const {
        productName,
        topSelling,
        highestRating,
        category,
        page = 1,
        pageSize = 20
    } = req.query;

    try {
        let baseQuery = `
            SELECT 
                p.*,
                COALESCE(SUM(s.qty), 0) as total_sales,
                COALESCE(AVG(r.rating), 0) as avg_rating
            FROM products p
            LEFT JOIN sales s ON p.id = s.productid
            LEFT JOIN feedback f ON p.id = f.productid
        `;

        let whereConditions = [];
        let havingConditions = [];
        
        // Add product name filter
        if (productName) {
            whereConditions.push(`p.name ILIKE '%${productName}%'`);
        }

        // Add category filter
        if (category) {
            whereConditions.push(`p.category = '${category}'`);
        }

        // Combine WHERE conditions
        if (whereConditions.length > 0) {
            baseQuery += ` WHERE ${whereConditions.join(' AND ')}`;
        }

        // Group by to aggregate sales and ratings
        baseQuery += ` GROUP BY p.id`;

        // Add top selling filter
        if (topSelling === 'true') {
            havingConditions.push(`SUM(s.qty) > 0`);
        }

        // Add highest rating filter
        if (highestRating === 'true') {
            havingConditions.push(`AVG(r.rating) >= 4`);
        }

        // Combine HAVING conditions
        if (havingConditions.length > 0) {
            baseQuery += ` HAVING ${havingConditions.join(' AND ')}`;
        }

        // Add ordering based on filters
        if (topSelling === 'true') {
            baseQuery += ` ORDER BY total_sales DESC`;
        } else if (highestRating === 'true') {
            baseQuery += ` ORDER BY avg_rating DESC`;
        }

        // Add pagination
        const offset = (page - 1) * pageSize;
        baseQuery += ` LIMIT ${pageSize} OFFSET ${offset}`;

        // Execute query
        const products = await db.query(baseQuery);

        // Get total count for pagination
        const countQuery = `
            SELECT COUNT(*) 
            FROM (${baseQuery.replace(/LIMIT.*OFFSET.*$/, '')}) as subquery
        `;
        const totalCount = await db.query(countQuery);

        return res.status(200).json({
            products: products.rows,
            pagination: {
                currentPage: parseInt(page),
                pageSize: parseInt(pageSize),
                totalItems: parseInt(totalCount.rows[0].count),
                totalPages: Math.ceil(totalCount.rows[0].count / pageSize)
            }
        });

    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
};

module.exports = {
    getProducts
};