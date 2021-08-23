const { expect, assert } = require("chai")
const { ethers, upgrades } = require("hardhat")

describe("Slice", () => {
  let sliceCore
  let slc
  let slice
  let slicerBeacon
  let a0
  let a1
  let a2
  let a3
  let s0
  let s1
  let slicer0
  let slicer1

  before(async () => {
    const SLICECORE = await ethers.getContractFactory("SliceCore")
    sliceCore = await upgrades.deployProxy(SLICECORE, { kind: "uups" })
    await sliceCore.deployed()

    const SLC = await ethers.getContractFactory("SLC")
    slc = await upgrades.deployProxy(SLC, [sliceCore.address], {
      kind: "uups",
    })
    await slc.deployed()

    const SLICE = await ethers.getContractFactory("Slice")
    slice = await upgrades.deployProxy(
      SLICE,
      [slc.address, sliceCore.address],
      {
        kind: "uups",
      }
    )
    await slice.deployed()

    await slc.transferOwnership(slice.address)
    await sliceCore.transferOwnership(slice.address)

    const SLICERBEACONV0 = await ethers.getContractFactory("SlicerDummyV0")
    slicerBeacon = await SLICERBEACONV0.deploy()
    await slicerBeacon.deployed()
    await slice._upgradeSlicers(slicerBeacon.address)

    const [addr0, addr1, addr2, addr3] = await ethers.getSigners()
    a0 = addr0.address
    a1 = addr1.address
    a2 = addr2.address
    a3 = addr3.address

    await slice.slice([a0, a1], [90, 10], 20, false)
    s0 = await sliceCore.slicers(0)
    await slice.slice([a0, s0], [90, 10], 10, false)
    s1 = await sliceCore.slicers(1)
    slicer0 = await ethers.getContractAt("Slicer", s0)
    slicer1 = await ethers.getContractAt("Slicer", s1)
  })

  describe("Contracts initialization", () => {
    it("Contract addresses correspond", async () => {
      assert(sliceCore.address === "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512")
      assert(slc.address === "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9")
      assert(slice.address === "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707")
    })
    it("Contract owners correspond", async () => {
      expect(await sliceCore.owner()).to.be.equal(slice.address)
      expect(await slc.owner()).to.be.equal(slice.address)
      expect(await slice.owner()).to.be.equal(a0)
    })
  })

  describe("Slicer creation", () => {
    it("Slicer is created", async () => {
      expect(await sliceCore.balanceOf(a0, 0)).to.be.equal(90)
      expect(await sliceCore.balanceOf(a1, 0)).to.be.equal(10)
    })
    it("Slicer Info correspond", async () => {
      const info = await slicer0.slicerInfo()
      expect(Number(info[3])).to.be.equal(20)
    })
  })

  describe("Transfers", () => {
    it("Transfer goes through", async () => {
      await sliceCore.safeTransferFrom(a0, a1, 0, 1, [])
      expect(Number(await sliceCore.balanceOf(a1, 0))).to.be.equal(11)
    })
    // it("Payment loop prevented", async () => {
    //   await sliceCore.safeTransferFrom(a0, s1, 0, 1, [])
    //   expect(Number(sliceCore.balanceOf(s1))).to.be.equal(0)
    // })
  })

  describe("Products", () => {
    it("New product added", async () => {
      await slicer0.addProduct(
        0,
        10000000000,
        false,
        true,
        true,
        2,
        [],
        [],
        [],
        []
      )
      const productPrice = await slicer0.productPrice(1)
      expect(Number(productPrice)).to.be.equal(10000000000)
    })

    // it("Product removed", async () => {
    //   await slicer0.addProduct(0, 10000000000, false, true, true, 2, [], [])
    //   await slicer0.removeProduct(1)
    //   const productPrice = await slicer0.productPrice(1)
    //   expect(Number(productPrice[0])).to.be.equal(0)
    // })
  })

  describe("Payments and releases", () => {
    before("Pay product", async () => {
      await slice.payProducts([s0], [1], [1], { value: 10000000000 })
    })

    it("Product paid", async () => {
      expect(await slicer0.unreleased(a0)).to.be.equal(8677500000)
    })

    it("Trigger release", async () => {
      expect(await slicer0.unreleased(a1)).to.be.equal(1072500000)
      expect(await slc.balanceOf(a1)).to.be.equal(0)
      await slice.triggerRelease(a1, [s0], 10)
      expect(await slicer0.unreleased(a1)).to.be.equal(0)
      expect(await slicer0.released(a1)).to.be.equal(1072500000)
      expect(await slc.balanceOf(a1)).not.to.be.equal(0)
    })

    it("Trasfer with release", async () => {
      expect(await slicer0.unreleased(a0)).to.be.equal(8677500000)
      await sliceCore.safeTransferFrom(a0, a1, 0, 1, [])
      expect(await slicer0.released(a0)).to.be.equal(8677500000)
      expect(await slicer0.unreleased(a0)).to.be.equal(0)
    })
  })

  describe("Upgrades", () => {
    it("Slice upgraded", async () => {
      const SLICEV1 = await ethers.getContractFactory("SliceDummy")
      slice = await upgrades.upgradeProxy(slice.address, SLICEV1)
      expect(await slice.testDummy()).to.be.equal(42)
    })

    it("Slicer beacon upgraded", async () => {
      const SLICERBEACONV1 = await ethers.getContractFactory("SlicerDummyV1")
      const slicerBeaconV1 = await SLICERBEACONV1.deploy()
      await slicerBeaconV1.deployed()
      await slice._upgradeSlicers(slicerBeaconV1.address)
      slicer0 = await ethers.getContractAt("SlicerDummyV1", s0)

      const info = await slicer0.slicerInfo()
      expect(info[1]).to.be.equal(2)
      expect(await slicer0.testDummy()).to.be.equal(42)
    })
  })
})
