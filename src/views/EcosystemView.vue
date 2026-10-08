<template>
  <div class="ecosystem-page">
    <Navbar />

    <main class="ecosystem-page__body">
      <!-- Hero -->
      <section class="ecosystem-hero">
        <div class="ecosystem-hero__content">
          <h1 v-reveal="{ distance: 36 }" class="ecosystem-hero__title">YASBe Ecosystem</h1>
          <p v-reveal="{ delay: 80, distance: 28 }" class="ecosystem-hero__tagline">
            Connect. Participate. Grow.
          </p>
          <div v-reveal="{ delay: 140, distance: 24 }" class="ecosystem-hero__intro">
            <p>
              The YASBe Ecosystem brings together global financial technology, businesses, customers,
              referral partners, merchants, and service providers in one connected network.
            </p>
            <p>
              Built around YASBe’s financial technology platform, the Ecosystem gives eligible
              participants access to YASBe products and services, preferential pricing, referral
              opportunities, rewards, and exclusive offers from participating partners.
            </p>
            <p>
              Whether you are a customer, business, merchant, or referral partner, there are multiple
              ways to participate and benefit.
            </p>
          </div>
        </div>
      </section>

      <!-- One Ecosystem. More Possibilities. -->
      <section class="ecosystem-section">
        <div class="ecosystem-section__inner">
          <h2 v-reveal class="ecosystem-section__heading">One Ecosystem. More Possibilities.</h2>
          <p v-reveal="{ delay: 60 }" class="ecosystem-section__paragraph">
            The YASBe Ecosystem connects our platform products and services with a growing network of
            partners and benefits.
          </p>
        </div>
      </section>

      <!-- YASBe Platform -->
      <section class="ecosystem-section">
        <div class="ecosystem-section__inner">
          <h2 v-reveal class="ecosystem-section__heading">YASBe Platform</h2>
          <p v-reveal="{ delay: 60 }" class="ecosystem-section__paragraph">
            Access eligible YASBe products and services, which may include:
          </p>
          <ul v-reveal="{ delay: 100 }" class="ecosystem-list ecosystem-list--cols">
            <li v-for="item in platformItems" :key="item" class="ecosystem-list__item">
              {{ item }}
            </li>
          </ul>
          <p v-reveal="{ delay: 140 }" class="ecosystem-section__note">
            Product availability is subject to jurisdiction, eligibility, onboarding requirements, and
            applicable product terms.
          </p>
        </div>
      </section>

      <!-- Rewards & Benefits -->
      <section class="ecosystem-section">
        <div class="ecosystem-section__inner">
          <h2 v-reveal class="ecosystem-section__heading">Rewards &amp; Benefits</h2>
          <p v-reveal="{ delay: 60 }" class="ecosystem-section__paragraph">
            Eligible participants may receive access to benefits such as:
          </p>
          <ul v-reveal="{ delay: 100 }" class="ecosystem-list ecosystem-list--cols">
            <li v-for="item in rewardItems" :key="item" class="ecosystem-list__item">
              {{ item }}
            </li>
          </ul>
          <p v-reveal="{ delay: 140 }" class="ecosystem-section__note">
            Benefits may vary by program, eligibility, location, and availability.
          </p>
        </div>
      </section>

      <!-- Partner Offers -->
      <section class="ecosystem-section">
        <div class="ecosystem-section__inner">
          <h2 v-reveal class="ecosystem-section__heading">Partner Offers</h2>
          <p v-reveal="{ delay: 60 }" class="ecosystem-section__paragraph">
            The YASBe Ecosystem is designed to extend beyond financial services.
          </p>
          <p v-reveal="{ delay: 80 }" class="ecosystem-section__paragraph">
            Participating Partner Merchants and service providers may offer exclusive benefits to
            eligible YASBe customers, including:
          </p>
          <ul v-reveal="{ delay: 100 }" class="ecosystem-list ecosystem-list--cols">
            <li v-for="item in partnerOfferItems" :key="item" class="ecosystem-list__item">
              {{ item }}
            </li>
          </ul>
          <p v-reveal="{ delay: 140 }" class="ecosystem-section__note">
            Partner Offers are provided subject to the applicable partner’s terms, availability,
            eligibility requirements, and restrictions.
          </p>
        </div>
      </section>

      <!-- Participate -->
      <section class="ecosystem-section ecosystem-section--gray">
        <div class="ecosystem-section__inner">
          <h2 v-reveal class="ecosystem-section__heading">Participate in the YASBe Ecosystem</h2>
          <p v-reveal="{ delay: 60 }" class="ecosystem-section__paragraph">
            There are different ways to become part of the YASBe Ecosystem.
          </p>

          <div class="ecosystem-cards">
            <article v-reveal="{ delay: 0, distance: 28 }" class="ecosystem-card">
              <h3 class="ecosystem-card__title">Become a YASBe Customer</h3>
              <p class="ecosystem-card__lead">Start by becoming a verified YASBe customer.</p>
              <p class="ecosystem-card__text">
                Individual customers must successfully complete applicable Know Your Customer (KYC)
                requirements, while business customers must successfully complete applicable Know Your
                Business (KYB) requirements, together with any other onboarding and compliance checks
                required for the relevant YASBe products or services.
              </p>
              <p class="ecosystem-card__text">
                Once successfully onboarded, eligible customers can access applicable YASBe products,
                Ecosystem benefits, rewards, preferential offers, and partner promotions.
              </p>
            </article>

            <article v-reveal="{ delay: 60, distance: 28 }" class="ecosystem-card">
              <h3 class="ecosystem-card__title">Join the YASBe Referral Program</h3>
              <p class="ecosystem-card__text">
                The YASBe Referral Program is available to eligible verified YASBe customers.
              </p>
              <p class="ecosystem-card__text">To participate, you must first:</p>
              <ol class="ecosystem-list ecosystem-list--ordered">
                <li class="ecosystem-list__item">Become a YASBe customer;</li>
                <li class="ecosystem-list__item">Successfully complete the applicable KYC or KYB verification process; and</li>
                <li class="ecosystem-list__item">Apply for and be accepted into the YASBe Referral Program.</li>
              </ol>
              <p class="ecosystem-card__text">
                Approved Referral Partners may introduce eligible individuals and businesses to YASBe
                and participate in applicable referral incentive programs.
              </p>
              <p class="ecosystem-card__text">
                Depending on the applicable program, Referral Partners may receive:
              </p>
              <ul class="ecosystem-list">
                <li class="ecosystem-list__item">Referral commissions</li>
                <li class="ecosystem-list__item">Transaction-based incentives</li>
                <li class="ecosystem-list__item">Promotional rewards</li>
                <li class="ecosystem-list__item">Preferential pricing on selected YASBe products and services</li>
                <li class="ecosystem-list__item">Partner campaigns and business opportunities</li>
              </ul>
              <p class="ecosystem-card__note">
                Participation, qualification, referral activities, and compensation are subject to the
                applicable YASBe Referral Program Terms.
              </p>
            </article>

            <article v-reveal="{ delay: 120, distance: 28 }" class="ecosystem-card">
              <h3 class="ecosystem-card__title">Become an Ecosystem Partner</h3>
              <p class="ecosystem-card__text">
                We welcome businesses and brands that want to bring additional value to the YASBe
                community.
              </p>
              <p class="ecosystem-card__text">Potential Ecosystem Partners may include:</p>
              <div class="ecosystem-chips">
                <span v-for="partner in partnerTypes" :key="partner" class="ecosystem-chips__item">
                  {{ partner }}
                </span>
              </div>
              <p class="ecosystem-card__text">
                Partners can work with YASBe to create exclusive offers, customer benefits, joint
                campaigns, referral opportunities, technology integrations, and other commercial
                collaborations.
              </p>
            </article>
          </div>
        </div>
      </section>

      <!-- Why Join -->
      <section class="ecosystem-section">
        <div class="ecosystem-section__inner">
          <h2 v-reveal class="ecosystem-section__heading">Why Join the YASBe Ecosystem?</h2>

          <div class="ecosystem-cards ecosystem-cards--three">
            <article v-reveal="{ delay: 0, distance: 28 }" class="ecosystem-card ecosystem-card--bordered">
              <h3 class="ecosystem-card__title">For Customers</h3>
              <p class="ecosystem-card__lead">Access more than financial technology.</p>
              <p class="ecosystem-card__text">
                Use YASBe products while unlocking eligible rewards, preferential pricing, merchant
                offers, travel benefits, and other Ecosystem privileges.
              </p>
            </article>

            <article v-reveal="{ delay: 60, distance: 28 }" class="ecosystem-card ecosystem-card--bordered">
              <h3 class="ecosystem-card__title">For Referral Partners</h3>
              <p class="ecosystem-card__lead">Turn your network into opportunity.</p>
              <p class="ecosystem-card__text">
                As a verified YASBe customer, you may apply to become a Referral Partner, introduce
                qualified customers to YASBe, and participate in applicable referral and incentive
                programs.
              </p>
            </article>

            <article v-reveal="{ delay: 120, distance: 28 }" class="ecosystem-card ecosystem-card--bordered">
              <h3 class="ecosystem-card__title">For Ecosystem Partners</h3>
              <p class="ecosystem-card__lead">
                Connect your products and services with YASBe customers and businesses.
              </p>
              <p class="ecosystem-card__text">
                Create targeted offers, increase brand exposure, reach new customer segments, and
                explore joint commercial opportunities through the YASBe Ecosystem.
              </p>
            </article>
          </div>
        </div>
      </section>

      <!-- Grow With YASBe -->
      <section class="ecosystem-section">
        <div class="ecosystem-section__inner">
          <h2 v-reveal class="ecosystem-section__heading">Grow With YASBe</h2>
          <p v-reveal="{ delay: 60 }" class="ecosystem-section__paragraph">
            The YASBe Ecosystem is built to grow with its participants.
          </p>
          <p v-reveal="{ delay: 80 }" class="ecosystem-section__paragraph">
            As YASBe expands its platform, products, markets, and partner network, we aim to create
            more ways for customers and partners to connect, transact, participate, and benefit.
          </p>
        </div>
      </section>

      <!-- CTA -->
      <section class="ecosystem-cta">
        <div class="ecosystem-cta__inner">
          <h2 v-reveal class="ecosystem-cta__heading">Join the YASBe Ecosystem</h2>
          <p v-reveal="{ delay: 60 }" class="ecosystem-cta__subtitle">
            Start as a YASBe customer. Complete your verification. Unlock more ways to participate.
          </p>
          <div v-reveal="{ delay: 120 }" class="ecosystem-cta__actions">
            <a
              :href="customerRegisterUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="ecosystem-cta__button"
            >
              Become a YASBe Customer
            </a>
            <a
              :href="customerRegisterUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="ecosystem-cta__button ecosystem-cta__button--outline"
            >
              Join the Referral Program
            </a>
            <a href="mailto:marketing@yasbe.com" class="ecosystem-cta__link">
              Become an Ecosystem Partner: marketing@yasbe.com
            </a>
          </div>
        </div>
      </section>

      <!-- Disclaimer -->
      <section class="ecosystem-disclaimer">
        <div class="ecosystem-disclaimer__inner">
          <p>
            YASBe products, services, rewards, discounts, referral incentives, and partner offers are
            subject to eligibility, jurisdiction, availability, applicable KYC/KYB and compliance
            requirements, and applicable terms and conditions. Third-party offers are provided by
            participating partners and may be modified or discontinued from time to time.
          </p>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

const customerRegisterUrl = 'https://customer.yasbe.com/register'

const platformItems = [
  'Named Accounts',
  'Global Collection & Payout',
  'Global Payment Rails',
  'Stablecoin On & Off-Ramp',
  'Digital Asset Trading & OTC',
  'YASBe Card',
  'Digital Wallet Services',
  'APIs & Embedded Financial Technology',
]

const rewardItems = [
  'Preferential or discounted pricing on selected YASBe products and services',
  'YASBe rewards, points, credits, or promotional incentives',
  'Special campaigns and member-only offers',
  'Gift vouchers and promotional benefits',
  'Merchant discounts and preferential offers',
  'Travel and lifestyle benefits from participating partners',
]

const partnerOfferItems = [
  'Shopping and merchant vouchers',
  'Dining and lifestyle offers',
  'Airline and travel benefits',
  'Hotel and resort offers',
  'Business and professional service benefits',
  'Special promotions and experiences',
]

const partnerTypes = [
  'Merchants',
  'Airlines',
  'Hotels & Resorts',
  'Travel Providers',
  'Technology Companies',
  'Professional Services',
  'Financial Institutions',
  'Payment Companies',
  'Lifestyle Brands',
]
</script>

<style scoped src="../styles/views/EcosystemView.css"></style>
