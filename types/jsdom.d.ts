// jsdom 25 has no published types. The consent-runtime test imports VirtualConsole.
declare module 'jsdom' {
  export class VirtualConsole {
    on(type: string, callback: (error: Error) => void): void
  }
}
