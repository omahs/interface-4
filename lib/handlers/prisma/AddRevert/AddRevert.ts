const AddRevert = async (hash: string) => {
  const prisma = (await import("@lib/db")).default

  const query = await prisma.revert.create({
    data: { hash },
  })

  return query
}

export default AddRevert
