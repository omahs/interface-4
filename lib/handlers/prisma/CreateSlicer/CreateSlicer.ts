const CreateSlicer = async (
  id: number,
  address: string,
  name: string,
  description: string
) => {
  const prisma = (await import("@lib/prisma")).default

  const query = await prisma.slicer.create({
    data: { id, address, name, description },
  })

  return query
}

export default CreateSlicer
