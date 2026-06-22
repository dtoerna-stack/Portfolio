export default function adapter() {
  return {
    name: 'static-snapshot-adapter',
    async adapt() {
      // scripts/build-static.mjs assembles the final Cloudflare Pages output.
    }
  }
}
