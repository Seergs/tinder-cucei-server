import faker from "faker";
import careers from "./util/careers";
import { getRandomInt } from "./util/utils";
faker.locale = "es_MX";
const genders = ["m", "f", "b"];
const interests = [
  "Bailar",
  "Cantar",
  "Ejercicio",
  "Conocer gente",
  "Viajar",
  "Caminatas",
  "Acampar",
  "Nadar",
  "Gimnasio",
  "Leer",
  "Pintar",
  "Películas",
  "Series",
  "Escuela",
  "Fiesta",
  "Comer",
  "Fotografía",
];

const imageUrls = {
  m: [
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861837/tinder-cucei/dawid-zawila-5nh9BBFwVQg-unsplash_mfqsyt.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861814/tinder-cucei/nate-J5U-22o1ubw-unsplash_asx1bt.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861797/tinder-cucei/hannah-busing-vGHMXnD5A0I-unsplash_eqfclc.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861780/tinder-cucei/alex-iby-XhMSz5I1kn8-unsplash_uy7ogx.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861780/tinder-cucei/alex-iby-XhMSz5I1kn8-unsplash_uy7ogx.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861753/tinder-cucei/irene-strong-v2aKnjMbP_k-unsplash_gq1bca.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861729/tinder-cucei/logan-weaver-p0B7ueoZz8E-unsplash_ofr6al.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861721/tinder-cucei/zheka-boychenko-vPkTWyTgk8E-unsplash_dxgbbj.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861606/tinder-cucei/mitchell-luo-ymo_yC_N_2o-unsplash_l2winv.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861543/tinder-cucei/christian-buehner-DItYlc26zVI-unsplash_jt4nxv.jpg",
  ],
  f: [
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861508/tinder-cucei/atikh-bana-_KaMTEmJnxY-unsplash_yvqycq.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861487/tinder-cucei/benjamin-combs-hiAdjnXZxl8-unsplash_rdtvbv.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861456/tinder-cucei/joshua-rondeau-ZnHRNtwXg6Q-unsplash_ccmxna.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861434/tinder-cucei/ayo-ogunseinde-RrD8ypt8cjY-unsplash_padmob.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861428/tinder-cucei/andriyko-podilnyk-jFAG_ixCrsM-unsplash_lqwipo.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861380/tinder-cucei/freestocks-8a95EVm0ovQ-unsplash_rsxjp7.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861369/tinder-cucei/dmitry-vechorko-yXhJ_eQK0mE-unsplash_wxtobw.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861325/tinder-cucei/joseph-kellner-EH6-hOhDqpA-unsplash_q5elih.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861302/tinder-cucei/gbarkz-vqKnuG8GaQc-unsplash_jxuglu.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861279/tinder-cucei/ayo-ogunseinde--_C4UZRpoQc-unsplash_rymkso.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861266/tinder-cucei/max-AsJirOOLN_s-unsplash_ffa5kd.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861266/tinder-cucei/pietra-schwarzler-FqdfVIdgR98-unsplash_qsash9.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861239/tinder-cucei/valerie-elash-RfoISVdKM4U-unsplash_1_rmseqn.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611425180/tinder-cucei/photo-1494790108377-be9c29b29330_jyxjy5.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611425143/tinder-cucei/photo-1529626455594-4ff0802cfb7e_niyvjo.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611425071/tinder-cucei/photo-1563306406-e66174fa3787_eyoa1j.jpg",
  ],
  b: [
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861508/tinder-cucei/atikh-bana-_KaMTEmJnxY-unsplash_yvqycq.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861487/tinder-cucei/benjamin-combs-hiAdjnXZxl8-unsplash_rdtvbv.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861456/tinder-cucei/joshua-rondeau-ZnHRNtwXg6Q-unsplash_ccmxna.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861434/tinder-cucei/ayo-ogunseinde-RrD8ypt8cjY-unsplash_padmob.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861428/tinder-cucei/andriyko-podilnyk-jFAG_ixCrsM-unsplash_lqwipo.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861380/tinder-cucei/freestocks-8a95EVm0ovQ-unsplash_rsxjp7.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861369/tinder-cucei/dmitry-vechorko-yXhJ_eQK0mE-unsplash_wxtobw.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861325/tinder-cucei/joseph-kellner-EH6-hOhDqpA-unsplash_q5elih.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861302/tinder-cucei/gbarkz-vqKnuG8GaQc-unsplash_jxuglu.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861279/tinder-cucei/ayo-ogunseinde--_C4UZRpoQc-unsplash_rymkso.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861266/tinder-cucei/max-AsJirOOLN_s-unsplash_ffa5kd.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861266/tinder-cucei/pietra-schwarzler-FqdfVIdgR98-unsplash_qsash9.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861239/tinder-cucei/valerie-elash-RfoISVdKM4U-unsplash_1_rmseqn.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611425180/tinder-cucei/photo-1494790108377-be9c29b29330_jyxjy5.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611425143/tinder-cucei/photo-1529626455594-4ff0802cfb7e_niyvjo.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611425071/tinder-cucei/photo-1563306406-e66174fa3787_eyoa1j.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861837/tinder-cucei/dawid-zawila-5nh9BBFwVQg-unsplash_mfqsyt.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861814/tinder-cucei/nate-J5U-22o1ubw-unsplash_asx1bt.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861797/tinder-cucei/hannah-busing-vGHMXnD5A0I-unsplash_eqfclc.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861780/tinder-cucei/alex-iby-XhMSz5I1kn8-unsplash_uy7ogx.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861780/tinder-cucei/alex-iby-XhMSz5I1kn8-unsplash_uy7ogx.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861753/tinder-cucei/irene-strong-v2aKnjMbP_k-unsplash_gq1bca.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861729/tinder-cucei/logan-weaver-p0B7ueoZz8E-unsplash_ofr6al.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861721/tinder-cucei/zheka-boychenko-vPkTWyTgk8E-unsplash_dxgbbj.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861606/tinder-cucei/mitchell-luo-ymo_yC_N_2o-unsplash_l2winv.jpg",
    "https://res.cloudinary.com/du2j41pda/image/upload/v1611861543/tinder-cucei/christian-buehner-DItYlc26zVI-unsplash_jt4nxv.jpg",
  ],
};

const users: any = [];
const views: any = [];

for (let i = 0; i < 300; ++i) {
  const genderIndex = getRandomInt(0, 2);
  const gender = genders[genderIndex];
  const lastName = faker.name.lastName();
  const career = careers[getRandomInt(0, careers.length - 1)];
  const description = faker.lorem.paragraph();
  const birthday = faker.date.between("1990-01-01", "2001-12-31");
  const numberOfSecondaryImages = getRandomInt(0, 2);
  let firstName: string = "";
  let primaryImageUrl;
  let secondaryImagesUrl: string[] = [];
  switch (gender) {
    case "m": {
      firstName = faker.name.firstName(0);
      const primaryImageIndex = getRandomInt(0, imageUrls.m.length - 1);
      primaryImageUrl = imageUrls.m[primaryImageIndex];
      for (let j = 0; j < numberOfSecondaryImages; ++j) {
        let secondaryImagesIndex = getRandomInt(0, imageUrls.m.length - 1);
        while (secondaryImagesIndex === primaryImageIndex) {
          secondaryImagesIndex = getRandomInt(0, imageUrls.m.length - 1);
        }
        secondaryImagesUrl.push(imageUrls.m[secondaryImagesIndex]!);
      }
      break;
    }
    case "f": {
      firstName = faker.name.firstName(1);
      const primaryImageIndex = getRandomInt(0, imageUrls.f.length - 1);
      primaryImageUrl = imageUrls.f[primaryImageIndex];
      for (let j = 0; j < numberOfSecondaryImages; ++j) {
        let secondaryImagesIndex = getRandomInt(0, imageUrls.f.length - 1);
        while (secondaryImagesIndex === primaryImageIndex) {
          secondaryImagesIndex = getRandomInt(0, imageUrls.f.length - 1);
        }
        secondaryImagesUrl.push(imageUrls.f[secondaryImagesIndex]!);
      }
      break;
    }
    case "b": {
      firstName = faker.name.firstName(getRandomInt(0, 1));
      const primaryImageIndex = getRandomInt(0, imageUrls.b.length - 1);

      primaryImageUrl = imageUrls.b[primaryImageIndex];
      for (let j = 0; j < numberOfSecondaryImages; ++j) {
        let secondaryImagesIndex = getRandomInt(0, imageUrls.b.length - 1);
        while (secondaryImagesIndex === primaryImageIndex) {
          secondaryImagesIndex = getRandomInt(0, imageUrls.b.length - 1);
        }
        secondaryImagesUrl.push(imageUrls.b[secondaryImagesIndex]!);
      }
      break;
    }
  }

  let preferencesInterests: string[] = [];
  const numberOfInterests = getRandomInt(1, 10);
  for (let i = 0; i < numberOfInterests; ++i) {
    let newInterst = interests[getRandomInt(0, interests.length - 1)];
    while (preferencesInterests.includes(newInterst!)) {
      newInterst = interests[getRandomInt(0, interests.length - 1)];
    }
    preferencesInterests.push(newInterst!);
  }
  const preferences = {
    interests: preferencesInterests,
  };
  const studentCode = `${i}`.padStart(9, "0");

  users.push({
    firstName,
    lastName,
    career,
    description,
    birthday,
    gender,
    primaryImageUrl,
    secondaryImagesUrl,
    preferences,
    studentCode,
  });
}

export { users, views };
