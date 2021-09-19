import prisma from "@lib/db"

const UpdateProduct = async (
  id: number,
  tempProductHash: string,
  productId: number
) => {
  const query = await prisma.product.update({
    where: { id },
    data: { tempProductHash, productId },
  })

  return query
}

export default UpdateProduct
