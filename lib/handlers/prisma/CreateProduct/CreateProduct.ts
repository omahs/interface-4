import prisma from "@lib/db"

const CreateProduct = async (
  slicerId: number,
  name: string,
  description: string,
  creator: string,
  uid: string,
  hash: string,
  tempProductHash: string,
  // version: number,
  image?: string
) => {
  const query = await prisma.product.create({
    data: {
      slicerId,
      name,
      description,
      image,
      creator,
      uid,
      tempProductHash,
      hash,
      // version
    },
  })

  return query
}

export default CreateProduct
