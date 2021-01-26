import faker from "faker";
import careers from "./util/careers";
import { getRandomInt } from "./util/utils";
faker.locale = "es_MX";
const genders = ["m", "f", "b"];
const interests = ["Bailar", "Cantar", "Ejercicio", "Conocer gente", "Viajar"];

const data: any = [];

for (let i = 0; i < 100; ++i) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const career = careers[getRandomInt(0, careers.length - 1)];
  const description = faker.lorem.paragraph();
  const birthday = faker.date.between("1990-01-01", "2001-12-31");
  const gender = genders[getRandomInt(0, 2)];
  const primaryImageUrl = faker.image.imageUrl();
  const preferencesInterests = [
    interests[getRandomInt(0, interests.length - 1)],
  ];
  const studentCode = `${i}`.padStart(9, "0");

  data.push({
    firstName,
    lastName,
    career,
    description,
    birthday,
    gender,
    primaryImageUrl,
    preferencesInterests,
    studentCode,
  });
}

export default data;
