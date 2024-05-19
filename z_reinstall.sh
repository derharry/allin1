# remove node_modules
rm -rf node_modules

# install dependency packages
bun install

# link local package zeelte
bun link zeelte


# list untrusted and install them
bun pm untrusted
bun pm trust --all

# install prisma
bun install prisma typescript ts-node @types/node --save-dev
bun install @prisma/client

# resync db schema
bun prisma db pull
bun prisma generate

#prisma run issue
#https://github.com/prisma/prisma/discussions/22980