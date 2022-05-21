declare global {
  interface Window {
    ethereum: any
  }
  const sa_event: (arg: string) => void
}

export {}
