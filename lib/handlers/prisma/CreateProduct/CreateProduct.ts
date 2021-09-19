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
  image?: string,
  productId?: number
) => {
  let query
  try {
    query = await prisma.product.create({
      data: {
        slicerId,
        name,
        description,
        image,
        creator,
        uid,
        tempProductHash,
        hash,
        productId,
        // version
      },
    })
  } catch (err) {
    console.log(err)
  }

  return query
}

export default CreateProduct
