const UpdateProduct = async (
  id: number,
  tempProductHash: string,
  productId: number
) => {
  const prisma = (await import("@lib/prisma")).default

  const query = await prisma.product.update({
    where: { id },
    data: { tempProductHash, productId },
  })

  return query
}

export default UpdateProduct
