import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const continentsTable = sqliteTable('continents', {
    id: integer('id').primaryKey(),
    name: text('name').notNull().unique(),
});

export const countriesTable = sqliteTable('countries', {
    id: integer('id').primaryKey(),
    name: text('name').notNull().unique(),
    continentId: integer('continent_id')
      .notNull()
      .references(() => continentsTable.id, { onDelete: 'cascade' }),
});

export const policiesTable = sqliteTable('policies', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  description: text('age').notNull(),
  categoryId: integer('category_id').notNull().references(() => policyCategoriesTable.id, { onDelete: 'cascade' }),
  email: text('email').unique().notNull(),
  effectiveDate: text('effective_date').notNull(),
  expirationDate: text('expiration_date'), // Can be null if policy is ongoing
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
});

export const policyCategoriesTable = sqliteTable('policy_categories', {
    id: integer('id').primaryKey(),
    name: text('name').notNull().unique(),
  });

export const policyRegionsTable = sqliteTable('policy_regions', {
    id: integer('id').primaryKey(),
    policyId: integer('policy_id').notNull().references(() => policiesTable.id, { onDelete: 'cascade' }),
    countryId: integer('country_id').references(() => countriesTable.id, { onDelete: 'cascade' }), // Nullable for continent-wide policies
    continentId: integer('continent_id').references(() => continentsTable.id, { onDelete: 'cascade' }), // Nullable for country-specific policies
});

export type InsertPolicy = typeof policiesTable.$inferInsert;
export type SelectPolicy = typeof policiesTable.$inferSelect;

export type InsertPolicyCategory = typeof policyCategoriesTable.$inferInsert;
export type SelectPolicyCategory  = typeof policyCategoriesTable.$inferSelect;

export type InsertContinent = typeof continentsTable.$inferInsert;
export type SelectContinent = typeof continentsTable.$inferSelect;

export type InsertCountry = typeof countriesTable.$inferInsert;
export type SelectCountry = typeof countriesTable.$inferSelect;

export type InsertPolicyRegion = typeof policyRegionsTable.$inferInsert;
export type SelectPolicyRegion = typeof policyRegionsTable.$inferSelect;
