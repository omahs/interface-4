import prisma from "@lib/db"

const CreateSlicer = async (
  id: number,
  address: string,
  name: string,
  description: string
) => {
  const query = await prisma.slicer.create({
    data: { id, address, name, description },
  })

  return query
}

export default CreateSlicer
