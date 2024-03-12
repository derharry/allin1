# names
Athlets Office DB (ao db)
Event Office (eo db)
Surf Office (so)

# description



# cheatsheet



# links
Icons: https://icon-sets.iconify.design



# reinstall / install / update
install prisma
        https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-postgresql
        npm install prisma --save-dev
        npm install @prisma/client
        npx prisma
        npx prisma init
        edit /prisma/schema.prisma  - set to mysqldb
                datasource db {
                        provider = "mysql"
                        url      = env("DATABASE_URL")
                }
        edit /.env/  - set to DATABASE_URL="mysql://user:pw@url/database?schema=public"
        npmx prisma db pull  - to re-init the schema file and set same as msql-db


--
--install iconify 
--        https://joyofcode.xyz/using-iconify-with-svelte
--        npm install iconify-icon
--        in sveltefile: 
--                import 'iconify-icon'
--                <iconify-icon icon="mdi:home"></iconify-icon>

update
        npm update


svelte:switch
        ...


add to svelte.config.js
        config/kit:
		alias: {
			$components: "./src/components",
			$css: "./src/css",
			$stores: "./src/lib/stores"
		}

add to app.html
		<link rel="stylesheet" href="/src/css/app.css">
		<script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>

# pitfalls
bun or npm  - if update/install not works - use npm as fallback




# create-svelte



# main changes
see install svelte:switch
/src/app.html  - add CSS <link rel="stylesheet" href="/src/css/app.css">