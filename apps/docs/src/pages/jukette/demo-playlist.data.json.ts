import playlist from '../../sites/jukette/data/demo-playlist.json'

export const GET = () =>
	new Response(JSON.stringify(playlist), {
		headers: {
			'content-type': 'application/json; charset=utf-8',
		},
	})
