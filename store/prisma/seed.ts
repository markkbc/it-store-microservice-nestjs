import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const categories = [
    {
      name: 'mobile',
    },
    {
      name: 'labtop',
    },
  ];
  await prisma.categories.createMany({
    data: categories,
  });

  const products = [
    {
      name: 'Iphone 12',
      description: 'description iphone 12',
      price: 30000,
      thumbnail: 'www.apple.com',
      categoryId: 1,
    },
    {
      name: 'Iphone 13',
      description: 'description iphone 13',
      price: 40000,
      thumbnail: 'www.apple.com',
      categoryId: 1,
    },
    {
      name: 'Samsung note 20',
      description: 'description Samsung note 20',
      price: 40000,
      thumbnail: 'www.apple.com',
      categoryId: 1,
    },
    {
      name: 'Macbook Pro',
      description: 'description MacbookPro',
      price: 30000,
      thumbnail: 'www.apple.com',
      categoryId: 2,
    },
    {
      name: 'Macbook Air',
      description: 'description iphone 13',
      price: 40000,
      thumbnail: 'www.apple.com',
      categoryId: 2,
    },
    {
      name: 'MSI',
      description: 'description MSI',
      price: 40000,
      thumbnail: 'www.apple.com',
      categoryId: 2,
    },
  ];
  await prisma.products.createMany({
    data: products,
  });
  const receipts = [
    {
      total: 40000,
      membershipId: '123456',
      title: 'MSI',
      productId: 6,
      categoryId: 2,
    },
    {
      total: 40000,
      membershipId: '123456',
      title: 'Macbook Air',
      productId: 5,
      categoryId: 2,
    },
  ];
  await prisma.receipts.createMany({
    data: receipts,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
