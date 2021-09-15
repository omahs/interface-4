import prisma from "@lib/db"

const CreateProduct = async (
  slicerId: number,
  name: string,
  description: string,
  hash: string,
  image?: string
) => {
  const query = await prisma.product.create({
    data: { slicerId, name, description, image, hash },
  })

  return query
}

export default CreateProduct
