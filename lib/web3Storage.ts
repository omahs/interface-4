import { Web3Storage } from "web3.storage"

const web3Storage = (webStorageKey: string) =>
  //@ts-ignore
  new Web3Storage({ token: webStorageKey })

export default web3Storage
