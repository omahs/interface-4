import prisma from "@lib/db"

const CreateProduct = async (
  slicerId: number,
  name: string,
  description: string,
  creator: string,
  uid: string,
  hash: string,
  tempProductHash: string,
  image?: string,
  productId?: number,
  purchaseInfo?: object
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
        purchaseInfo,
        // version
      },
    })
  } catch (err) {
    console.log(err)
  }

  return query
}

export default CreateProduct
