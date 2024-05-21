/**
 * 
 * @param {string} what sql[-|*] | objc[-|*]
 * @param {string} name of query
 * @returns string or obj
 */
export function get_query(what = 'sql[-|*] | objc[-|*]', name) {
    try {
        //console.log('get_query()', what, name)
        let x = queries[name][what] 
        //console.log(' - found: ', x)
        return x
    } catch (error) {
        console.log(`Query ${what} for ${name} not found`)
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
                        ORDER BY cat.parent_uuid, cat.name ASC;
        `,
        "sql-": `SELECT  
                            cat.uuid, 
                            cat.parent_uuid, 
                            cat.name, cat.slug, 
                            COUNT(c.uuid) AS company_count  
                        FROM gp_categories cat 
                        LEFT JOIN gp_companies c ON cat.uuid = c.category_uuid AND c.is_public = true 
                        GROUP BY cat.uuid, cat.parent_uuid, cat.name, cat.slug 
                        ORDER BY cat.parent_uuid, cat.name ASC;
        `,

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
    },


    "select_companies_by_search": {
        "sql-": `SELECT * 
                    FROM gp_companies 
                    WHERE 
                        is_public = true AND (
                            name LIKE '%SearchString%' OR
                            street LIKE '%SearchString%'  OR
                            postalcode LIKE '%SearchString%'  OR
                            city LIKE '%SearchString%' OR
                            phone LIKE '%SearchString%'  OR
                            mobile LIKE '%SearchString%'  OR
                            email LIKE '%SearchString%'  OR
                            tags LIKE '%SearchString%'  OR
                            infotext LIKE '%SearchString%' 
                        );
        `
    }
}