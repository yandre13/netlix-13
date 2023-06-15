// seed.ts
import { db } from '..'
import { movies } from '../schema'

const main = async () => {
  try {
    await db.delete(movies)
    const results = await db
      .insert(movies)
      .values([
        {
          title: 'Big Buck Bunny',
          description:
            'Three rodents amuse themselves by harassing creatures of the forest. However, when they mess with a bunny, he decides to teach them a lesson.',
          posterUrl:
            'https://dr66lyt7li8ja.cloudfront.net/public/Big.Buck.Bunny-Screen.png',
          releaseDate: 'Jun 2008',
          duration: '34 min',
          genres: ['Animation', 'Short', 'Comedy'],
          actors: ['Sacha Goedegebure', 'Enrico Valdez', 'Nathan De Groot'],
          directors: ['Sacha Goedegebure', 'Enrico Valdez'],
          writers: ['Sacha Goedegebure', 'Enrico Valdez'],
          trailerUrl:
            'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        },
        {
          title: 'Sintel',
          description:
            'A lonely young woman, Sintel, helps and befriends a dragon, whom she calls Scales. But when he is kidnapped by an adult dragon, Sintel decides to embark on a dangerous quest to find her lost friend Scales.',
          posterUrl: 'https://dr66lyt7li8ja.cloudfront.net/public/Sintel-3.jpg',
          releaseDate: 'Nov 2010',
          duration: '14 min',
          genres: ['Animation', 'Short', 'Fantasy'],
          actors: ['Halina Reijn', 'Thom Hoffman'],
          directors: ['Colin Levy'],
          writers: ['Colin Levy'],
          trailerUrl:
            'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        },
        {
          title: 'The Super Mario Bros. Movie',
          description:
            'Two Brooklyn plumbers, Mario and Luigi, must travel to another dimension to rescue a princess from the evil dictator King Koopa and stop him from taking over the world.',
          posterUrl:
            'https://dr66lyt7li8ja.cloudfront.net/public/Super-Mario-wall.jpg',
          releaseDate: 'Apr 2023',
          duration: '94 min',
          genres: ['Adventure', 'Comedy', 'Family'],
          actors: ['Bob Hoskins', 'John Leguizamo', 'Dennis Hopper'],
          directors: ['Annabel Jankel', 'Rocky Morton'],
          writers: ['Parker Bennett', 'Terry Runte', 'Ed Solomon'],
          trailerUrl:
            'https://dr66lyt7li8ja.cloudfront.net/public/Super-Mario-Bros.mp4',
        },
        {
          title: 'Fast X',
          description: `Over many missions and against impossible odds, Dom Toretto and his family have outsmarted, out-nerved and outdriven every foe in their path. Now, they confront the most lethal opponent they've ever faced: A terrifying threat emerging from the shadows of the past who's fueled by blood revenge, and who is determined to shatter this family and destroy everything—and everyone—that Dom loves, forever.`,
          posterUrl: 'https://dr66lyt7li8ja.cloudfront.net/public/Fast-X.jpg',
          releaseDate: 'May 17 2023',
          duration: '2h 25min',
          genres: ['Action', 'Adventure', 'Crime'],
          actors: [
            'Vin Diesel',
            'Michelle Rodriguez',
            'Brie Larson',
            'Jordana Brewster',
            'John Cena',
            'Martyn Ford',
            'Cardi B',
            'Clint Eastwood',
            'Jason Statham',
            'Dwayne Johnson',
          ],
          directors: ['Justin Lin', 'Vin Diesel'],
          writers: ['Daniel Casey', 'Gary Scott Thompson'],
          trailerUrl:
            'https://dr66lyt7li8ja.cloudfront.net/public/FAST_X _ Final-Trailer.mp4',
        },
        {
          title: 'Guardians of the Galaxy Vol. 3',
          description:
            'Peter Quill, still reeling from the loss of Gamora, must rally his team around him to defend the universe along with protecting one of their own. A mission that, if not completed successfully, could quite possibly lead to the end of the Guardians as we know them.',
          posterUrl:
            'https://dr66lyt7li8ja.cloudfront.net/public/guardians-of-the-galaxy-v3jpg.jpg	',
          releaseDate: 'May 03 2023',
          duration: '2h 25min',
          genres: ['Action', 'Adventure', 'Comedy'],
          actors: [
            'Chris Pratt',
            'Zoe Saldana',
            'Dave Bautista',
            'Karen Gillan',
          ],
          directors: ['James Gunn'],
          writers: ['James Gunn'],
          trailerUrl:
            'https://dr66lyt7li8ja.cloudfront.net/public/Marvel_Studios-Guardians_of_the_Galaxy_Vol3.mp4',
        },
      ])
      .returning()
    console.log('inserted rows: ' + results.length)
  } catch (error) {
    console.log(error)
  }
  process.exit(0)
}
main()
