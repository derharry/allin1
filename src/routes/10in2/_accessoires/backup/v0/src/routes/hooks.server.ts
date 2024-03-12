import type { Handle } from '@sveltejs/kit'
import { p } from '$lib/helpers'

export const handle: Handle = async ({ event, resolve }) => {
  p('hi hooks');
  return new Response('🍌')
}
