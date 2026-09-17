import FoodSpot from "@/components/food-spot";
import { site } from "@/data/site";
export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FastFoodRestaurant",
    name: site.name,
    telephone: site.phone,
    ...(site.url ? { url: site.url } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rue Caïd Ahmed Riffi 3",
      addressLocality: "Tanger",
      addressCountry: "MA",
    },
    servesCuisine: ["Burgers", "Halal"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "12:00",
        closes: "05:00",
      },
    ],
    sameAs: [site.instagram, site.brusselsInstagram],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <FoodSpot />
    </>
  );
}
