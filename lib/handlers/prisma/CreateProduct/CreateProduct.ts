const CreateProduct = async (
  slicerId: number,
  name: string,
  shortDescription: string,
  description: string,
  creator: string,
  uid: string,
  hash: string,
  tempProductHash: string,
  image?: string,
  productId?: number | null,
  purchaseInfo?: object,
  texts?: {
    thanks?: string
    instructions?: string
  }
) => {
  const prisma = (await import("@lib/prisma")).default

  let query
  try {
    query = await prisma.product.create({
      data: {
        slicerId,
        name,
        shortDescription,
        description,
        image,
        creator,
        uid,
        tempProductHash,
        hash,
        productId,
        purchaseInfo,
        texts
        // version
      }
    })
  } catch (err) {
    console.log(err)
  }

  return query
}

export default CreateProduct
