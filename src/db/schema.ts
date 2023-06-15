import { InferModel, relations } from 'drizzle-orm'
import {
  pgTable,
  text,
  doublePrecision,
  uuid,
  timestamp,
  integer,
  primaryKey,
} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  username: text('username'),
  picture: text('picture'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
export const usersRelations = relations(users, ({ many }) => ({
  profiles: many(profiles),
}))

export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  picture: text('picture').notNull(),
  userId: text('user_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
export const profilesRelations = relations(profiles, ({ one, many }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id],
  }),
  reviews: many(reviews),
  favorites: many(favorites),
}))

export const movies = pgTable('movies', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  posterUrl: text('poster_url').notNull(),
  releaseDate: text('release_date').notNull(),
  rating: doublePrecision('rating'),
  duration: text('duration').notNull(),
  genres: text('genres').array().notNull(),
  actors: text('actors').array().notNull(),
  directors: text('directors').array().notNull(),
  writers: text('writers').array().notNull(),
  trailerUrl: text('trailer_url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
export const moviesRelations = relations(movies, ({ many }) => ({
  reviews: many(reviews),
  favorites: many(favorites),
}))

export const reviews = pgTable('reviews', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  rating: integer('rating'),
  movieId: text('movie_id').notNull(),
  authorId: text('author_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
export const reviewsRelations = relations(reviews, ({ one }) => ({
  movie: one(movies, {
    fields: [reviews.movieId],
    references: [movies.id],
  }),
  author: one(profiles, {
    fields: [reviews.authorId],
    references: [profiles.id],
  }),
}))

export const favorites = pgTable(
  'favorites',
  {
    profileId: uuid('profile_id')
      .notNull()
      .references(() => profiles.id),
    movieId: uuid('movie_id')
      .notNull()
      .references(() => movies.id),
  },
  (t) => ({
    pk: primaryKey(t.profileId, t.movieId),
  })
)

export const favoritesRelations = relations(favorites, ({ one }) => ({
  profile: one(profiles, {
    fields: [favorites.profileId],
    references: [profiles.id],
  }),
  movie: one(movies, {
    fields: [favorites.movieId],
    references: [movies.id],
  }),
}))

export type UserProps = InferModel<typeof users>
export type NewUserProps = InferModel<typeof users, 'insert'>
export type ProfileProps = InferModel<typeof profiles>
export type NewProfileProps = InferModel<typeof profiles, 'insert'>
export type MovieProps = InferModel<typeof movies>
export type FavMovieProps = InferModel<typeof movies> & { isFavorite: boolean }
export type FavoriteProps = InferModel<typeof favorites>
