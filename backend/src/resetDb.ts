import db from "./db";
import User from './entities/user.entity';
import Category from './entities/category.entity';
import Material from './entities/material.entity';
import { UserRoleEnum } from "./types";
 import * as argon2 from "argon2";

async function cleadDb() {
  const runner = db.createQueryRunner();
  await runner.query(`DROP TABLE IF EXISTS book`);
  await runner.query(`DROP TABLE IF EXISTS reservation_material`);
  await runner.query(`DROP TABLE IF EXISTS reservation`);  
  await runner.query(`DROP TABLE IF EXISTS material`);
  await runner.query(`DROP TABLE IF EXISTS category`);
  await runner.query(`DROP TABLE IF EXISTS "user"`);
  await db.synchronize();
}

async function main() {
  await db.initialize();
  await cleadDb();

  await db.createQueryBuilder()
    .insert()
    .into(User)
    .values([
      {
        firstName: "Client1",
        lastName: "CLastname",
        email: "client1@client.com",
        password: `${await argon2.hash("123456")}`,
        phone: "066080398510",
        role: UserRoleEnum.user
      },
      { 
        firstName: "Admin1",
        lastName: "ALastname",
        email: "admin1@admin.com",
        password: `${await argon2.hash("123456")}`,
        phone: "068080398510",
        role: UserRoleEnum.admin
      },
    ]).execute()

    await db.createQueryBuilder()
    .insert()
    .into(Category)
    .values([
      { name: "snowboard"} ,
      { name: "sky" },
      { name: "shoe"},
      {  name: "accessory" },
    ]).execute()

    const catSnowboard = await db.getRepository(Category).findOneBy({name: "snowboard"});
    const catSky = await db.getRepository(Category).findOneBy({name: "sky"});
    const catShoe = await db.getRepository(Category).findOneBy({name: "shoe"});
    const catAccessory = await db.getRepository(Category).findOneBy({name: "accessory"});

    await db.createQueryBuilder()
    .insert()
    .into(Material)
    .values([
      {
        name: "Liberty",
        picture: "https://static.netski.com/media-resize/eyJhdXRvV2VicCI6dHJ1ZSwiYnVja2V0Ijoic2tpc2V0LW1lZGlhcyIsImtleSI6Im1lZGlhLW1hdGVyaWFsXC9zZWFzb25fMjRcL3Nub3dib2FyZFwvYmlnLXZcL3Nub3dib2FyZF8yODIucG5nIn0=",
        price: 49,
        quantity: 50,
        description: "La Liberty, avec son flex confortable et son profil Flat Out Rocker est idéale pour les sorties tout-terrain : tolérante et sans accrochage, son comportement est prévisible.",
        category: {id: catSnowboard?.id}
      }
    ]).execute()

    await db.createQueryBuilder()
    .insert()
    .into(Material)
    .values([
      {
        name: "REDSTER Q7.8 REVOSHOCK S",
        picture: "https://static.netski.com/media-resize/eyJhdXRvV2VicCI6dHJ1ZSwiYnVja2V0Ijoic2tpc2V0LW1lZGlhcyIsImtleSI6Im1lZGlhLW1hdGVyaWFsXC9zZWFzb25fMjRcL3NraVwvYmlnLXZcL2RiLXNraV8xMjQ0LnBuZyJ9",
        price: 33,
        quantity: 50,
        description: "Un excellent ski de piste performant dans toutes les conditions de neige. La technologie Revoshock absorbe les vibrations pour en faire un ski souple mais réactif.",
        category: {id: catSky?.id}
      }
    ]).execute()

    await db.createQueryBuilder()
    .insert()
    .into(Material)
    .values([
      {
        name: "Black Pearl 88 SP",
        picture: "https://static.netski.com/media-resize/eyJhdXRvV2VicCI6dHJ1ZSwiYnVja2V0Ijoic2tpc2V0LW1lZGlhcyIsImtleSI6Im1lZGlhLW1hdGVyaWFsXC9zZWFzb25fMjRcL3NraVwvYmlnLXZcL2RiLXNraV80ODAucG5nIn0=",
        price: 33,
        quantity: 50,
        description: "Avec sa construction stable et rassurante, ce ski de s'adapte aux exigences et aux performances de chaque skieuse.",
        category: {id: catSky?.id}
      }
    ]).execute()

    await db.createQueryBuilder()
    .insert()
    .into(Material)
    .values([
      {
        name: "TRIXIE",
        picture: "https://static.netski.com/media-resize/eyJhdXRvV2VicCI6dHJ1ZSwiYnVja2V0Ijoic2tpc2V0LW1lZGlhcyIsImtleSI6Im1lZGlhLW1hdGVyaWFsXC9zZWFzb25fMjRcL3Nob2VzXC9iaWdcL3Nob2VzXzYyNi5wbmcifQ==",
        price: 20,
        quantity: 100,
        description: "Ski de piste polyvalent et performant quelles que soient les conditions d'enneigement.",
        category: {id: catShoe?.id}
      }
    ]).execute()

    await db.createQueryBuilder()
    .insert()
    .into(Material)
    .values([
      {
        name: "Bâtons de Ski Leki Bold Lite",
        picture: "https://cdn.etrias.nl/media/cache/product_lg/S/k/Skistok-Leki-Bold-Lite-S-Black-Fluorescent-Red-White.jpg",
        price: 10,
        quantity: 200,
        description: "Ces superbes bâtons de ski proviennent de la marque Leki. Le bâton est de haute qualité et est idéal pour les débutants et débutantes grâce à sa polyvalence. Les bâtons sont équipés du système Trigger S, qui leur donne une bonne prise en main et un verrouillage facile. Ainsi, vous pouvez facilement recommencer à skier après vous être arrêté. En cas de chute, un système de clic se déclenche automatiquement, ce qui évite les accidents douloureux. Les bâtons sont équipés d'une poignée antidérapante et ont une bonne prise en main pour éviter de fatiguer les mains. Les bâtons sont en aluminium léger.",
        category: {id: catAccessory?.id}
      }
    ]).execute()

    await db.createQueryBuilder()
    .insert()
    .into(Material)
    .values([
      {
        name: "Allspeed Visor Impacts",
        picture: "https://contents.mediadecathlon.com/m4169172/k$6ff133dacc382160fb170fdcc836ef50/sq/casque-de-skisnow-allspeed-visor-impacts-photochromique-homme.jpg?format=auto&f=2400x2400",
        price: 15,
        quantity: 50,
        description: "Il est doté de notre technologie IMPACTS, combinant une coque rigide et une mousse multi-impact pour une durabilité globale améliorée sans faire de compromis sur l'ajustement, le style ou le poids.",
        category: {id: catAccessory?.id}
      }
    ]).execute()
  console.log("done !");
  
  await db.destroy();
  process.exit(0);
}

main();
