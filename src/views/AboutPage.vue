<template>
  <div class="about">
    <div class="about__grid">
      <div class="about__text-container">
        <div class="about__text">
          <h1 class="about__text-heading">Our Story</h1>
          <p>
            Launced in 2015, Exclusive is South Asia’s premier online shopping
            makterplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sallers and 300 brands and serves 3 millioons customers
            across the region.
          </p>
          <p>
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assotment in categories
            ranging from consumer.
          </p>
        </div>
      </div>
      <div>
        <img src="/contactImage.png" />
      </div>
    </div>
    <div class="about__cards-container">
      <base-sales-card
        v-for="card in cards"
        :key="card.id"
        :id="card.id"
        :amount="card.amount"
        :subtitle="card.subtitle"
      >
        <component :is="card.image"
      /></base-sales-card>
    </div>
    <div class="about__carousel-container">
      <base-team-carousel :members="teamMembers"></base-team-carousel>
    </div>
    <div class="about__service-features">
      <base-service-features :features="features"></base-service-features>
    </div>
  </div>
</template>

<script>
import BaseIconGift from "@/modules/shared/components/icons/BaseIconGift.vue";
import BaseIconMoney from "@/modules/shared/components/icons/BaseIconMoney.vue";
import BaseIconRevenue from "@/modules/shared/components/icons/BaseIconRevenue.vue";
import BaseIconShop from "@/modules/shared/components/icons/BaseIconShop.vue";
import BaseIconDelivery from "@/modules/shared/components/icons/BaseIconDelivery.vue";
import BaseIconSupport from "@/modules/shared/components/icons/BaseIconSupport.vue";
import BaseIconGuarantee from "@/modules/shared/components/icons/BaseIconGuarantee.vue";

export default {
  data() {
    return {
      cards: [
        {
          id: 1,
          image: BaseIconShop,
          amount: 10.5,
          subtitle: "Sallers active our site",
        },
        {
          id: 2,
          image: BaseIconMoney,
          amount: 33,
          subtitle: "Monthly Product sale",
        },
        {
          id: 3,
          image: BaseIconGift,
          amount: 45.5,
          subtitle: "Customer active in our site",
        },
        {
          id: 4,
          image: BaseIconRevenue,
          amount: 25,
          subtitle: "Annual gross sale in out site",
        },
      ],
      teamMembers: [
        {
          id: 1,
          name: "Tom Cruise",
          role: "Founder & Chairman",
          image: "/tom.png",
          twitter: "#",
          instagram: "#",
          linkedin: "#",
        },
        {
          id: 2,
          name: "Emma Watson",
          role: "Managing Director",
          image: "/emma.png",
          twitter: "#",
          instagram: "#",
          linkedin: "#",
        },
        {
          id: 3,
          name: "Will Smith",
          role: "Product Designer",
          image: "/will.png",
          twitter: "#",
          instagram: "#",
          linkedin: "#",
        },
        {
          id: 4,
          name: "Emily Blunt",
          role: "Marketing Lead",
          image: "/emma.png",
          twitter: "#",
          instagram: "#",
          linkedin: "#",
        },
        {
          id: 5,
          name: "Andrew Garflied",
          role: "Operations Manager",
          image: "/tom.png",
          twitter: "#",
          instagram: "#",
          linkedin: "#",
        },
      ],
      features: [
        {
          id: 1,
          icon: BaseIconDelivery,
          title: "FREE AND FAST DELIVERY",
          subtitle: "Free delivery for all orders over $140",
        },
        {
          id: 2,
          icon: BaseIconSupport,
          title: "24/7 CUSTOMER SERVICE",
          subtitle: "Friendly 24/7 customer support",
        },
        {
          id: 3,
          icon: BaseIconGuarantee,
          title: "MONEY BACK GUARANTEE",
          subtitle: "We return money within 30 days",
        },
      ],
    };
  },
};
</script>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.about__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.about__text-container {
  display: flex;
  align-items: center;
}

.about__text {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 80%;
}

.about__text-heading {
  font-weight: 600;
  font-size: 54px;
  letter-spacing: 6%;
}

.about__cards-container {
  display: flex;
  align-items: center;
  gap: 25px;
}

.about__carousel-container {
  margin-bottom: 40px;
}

.about__service-features {
  margin-bottom: 40px;
}
</style>
