import prisma from "@lib/db"

const AddRevert = async (hash: string) => {
  const query = await prisma.revert.create({
    data: { hash },
  })

  return query
}

export default AddRevert
