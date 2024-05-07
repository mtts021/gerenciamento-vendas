DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status_payment') THEN
        CREATE TYPE "status_payment" AS ENUM (
          'Pago',
          'Pendente'
        );
    END IF;
END$$;

CREATE TABLE IF NOT EXISTS "products" (
  "id" SERIAL PRIMARY KEY,
  "bar_code" VARCHAR(13) UNIQUE,
  "name" VARCHAR(255),
  "description" VARCHAR(255),
  "brand" VARCHAR(255),
  "price" REAL,
  "quantity" INT
);

CREATE TABLE IF NOT EXISTS "sales" (
  "id" SERIAL PRIMARY KEY,
  "valor" int,
  "date_sale" date,
  "status_payment" STATUS_PAYMENT,
  "name_client" varchar(255),
  "last_name_client" varchar(255)
);

CREATE TABLE IF NOT EXISTS "sale_products" (
  "id" SERIAL PRIMARY KEY,
  "sale_id" int,
  "product_id" int
);

ALTER TABLE "sale_products" ADD FOREIGN KEY ("sale_id") REFERENCES "sales" ("id");

ALTER TABLE "sale_products" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");
