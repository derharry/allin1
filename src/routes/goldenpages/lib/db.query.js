/**
 * 
 * @param {string} what sql[-|*] | objc[-|*]
 * @param {string} name of query
 * @returns string or obj
 */
export function get_query(what = 'sql[-|*] | objc[-|*]', name) {
    try {
        return queries[name][what]
    } catch (error) {
        //throw new Error(`Query ${what} for ${name} not found`)
        return false
    }

}

/**
 * collection of all SQL and Prisma queries and objects
 * @type {object}
 */
const queries = {

    "select_categories_with_companies": {
        "sql*":    `SELECT  
                            cat.uuid, 
                            cat.parent_uuid, 
                            cat.name, 
                            cat.slug, 
                            COUNT(c.uuid) AS company_count FROM gp_categories cat 
                        LEFT JOIN gp_companies c ON cat.uuid = c.category_uuid 
                        GROUP BY cat.uuid, cat.parent_uuid, cat.name, cat.slug 
                        ORDER BY cat.parent_uuid, cat.name ASC;`,
        "sql-": `SELECT  
                            cat.uuid, 
                            cat.parent_uuid, 
                            cat.name, cat.slug, 
                            COUNT(c.uuid) AS company_count  
                        FROM gp_categories cat 
                        LEFT JOIN gp_companies c ON cat.uuid = c.category_uuid AND c.is_public = true 
                        GROUP BY cat.uuid, cat.parent_uuid, cat.name, cat.slug 
                        ORDER BY cat.parent_uuid, cat.name ASC;`,

        // PRISMA cannot do ORDER BY parent_uuid in this case - use SQL
        "prisma*":  {
                        include: {
                            _count: {
                                    select: { gp_companies: true },
                                },
                        },
                        orderBy: {
                            name: 'asc',
                        },
                    },
        "prisma-": {
                        include: {
                            _count: {
                                select: {
                                    gp_companies: {
                                        where: {
                                            is_public: true,
                                        },
                                    },
                                },
                            },
                        },
                        orderBy: {
                            name: 'asc',
                        },
                    }
    }
}