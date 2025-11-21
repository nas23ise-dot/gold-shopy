export async function generateStaticParams() {
  const collections = [
    'best-sellers',
    'new-arrivals',
    'bridal-collection',
    'traditional',
    'contemporary',
    'antique'
  ];

  return collections.map((collection) => ({
    collectionName: collection,
  }));
}