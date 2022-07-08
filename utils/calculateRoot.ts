import keccak256 from "keccak256"
import MerkleTree from "merkletreejs"

const calculateRoot = (addresses: string[]) => {
  const leafNodes = addresses.map((addr) => keccak256(addr))
  const tree = new MerkleTree(leafNodes, keccak256, {
    sortPairs: true
  })
  return tree.getHexRoot()
}

export default calculateRoot
