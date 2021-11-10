const AddRevert = async (hash: string) => {
  const prisma = (await import("@lib/prisma")).default

  const query = await prisma.revert.create({
    data: { hash },
  })

  return query
}

export default AddRevert
